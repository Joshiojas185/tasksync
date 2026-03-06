// index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql2 = require("mysql2/promise");
const mysql = require("mysql2");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const serveIndex = require("serve-index");
const fs = require("fs");

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Configuration
const pool = mysql2.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: "taskboard",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: "taskboard",
});

// Test Database Connection
pool
  .getConnection()
  .then((connection) => {
    console.log("✅ Connected to MySQL Database (New Schema)");
    connection.release();
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err.message);
  });

// Google OAuth2 Client
const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
);

// ==================== UTILITIES ====================

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET || "your-secret-key",
    { expiresIn: "100d" }
  );
};

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access token required" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");
    const [userRows] = await pool.query(
      "SELECT id, name, email, role FROM User WHERE id = ?",
      [decoded.id]
    );

    if (userRows.length === 0)
      return res.status(401).json({ message: "User not found" });

    const user = userRows[0];
    // DB returns role as string "user" or "admin" (ENUM), convert to array for consistency
    user.role = user.role ? [user.role] : [];
    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

/**
 * Helper: Check if user has access to a specific board.
 */
const checkBoardAccess = async (userId, boardId) => {
  // Admin has access to everything
  const [userRows] = await pool.query("SELECT role FROM User WHERE id = ?", [userId]);
  if (userRows.length === 0) return false;
  if (userRows[0].role === "admin") return true;

  // Check allowed_users
  const [rows] = await pool.query(
    "SELECT * FROM allowed_users WHERE userId = ? AND boardId = ?",
    [userId, boardId]
  );
  return rows.length > 0;
};

/**
 * Helper: Safely parse status field.
 * Handles both JSON strings (["To Do", "Done"]) and comma-separated strings ("To Do,Done")
 */
const parseStatus = (status) => {
  if (!status) return [];
  if (typeof status === "string") {
    try {
      return JSON.parse(status);
    } catch {
      // Fallback for comma-separated strings
      return status.split(",").map(s => s.trim()).filter(Boolean);
    }
  }
  return Array.isArray(status) ? status : [];
};

// =================ROUTE FOR UPLOADING MEDIA===========

const dataFolder = path.join(__dirname, "uploads");
if (!fs.existsSync(dataFolder)) {
  fs.mkdirSync(dataFolder);
}

app.use("/images", express.static(dataFolder), serveIndex(dataFolder, { icons: true }));

const generateUniqueFileName = (originalName) => {
  const ext = path.extname(originalName);
  const name = path.basename(originalName, ext);
  const timestamp = Date.now();
  return `${name}-${timestamp}${ext}`;
};

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dataFolder);
  },
  filename: (req, file, cb) => {
    const uniqueFileName = generateUniqueFileName(file.originalname);
    cb(null, uniqueFileName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/plain",
    // Video types
    "video/mp4",
    "video/webm",
    "video/ogg",
    "video/quicktime",
    "video/x-msvideo",
    "video/x-ms-wmv",
    "video/mpeg",
    "video/3gpp",
    "video/3gpp2",
  ];

  if (
    allowedMimeTypes.includes(file.mimetype) ||
    file.mimetype.startsWith("video/")
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type! Only images, videos, PDFs, Word documents, Excel files, and text files are allowed."
      ),
      false
    );
  }
};

const uploadFile = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 10 * 1024 * 1024, // 100 MB
  },
}).single("file");

app.post("/api/dev/uploadData", (req, res) => {
  uploadFile(req, res, (err) => {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          message: "File size exceeds 100 MB limit",
        });
      }
      return res.status(500).json({
        message: "File upload error",
        error: err.message,
      });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileUrl = `http://localhost:${PORT}/images/${req.file.filename}`;

    res.json({
      message: "File uploaded successfully",
      filename: req.file.filename,
      fileUrl: fileUrl,
    });
  });
});

// ==================== AUTH ROUTES ====================

app.get("/api/dev/search/user", (req, res) => {
  const { q } = req.query;

  if (!q || q.length < 3) {
    return res.status(400).json({
      error: 'Search query parameter "q" is required and must be at least 3 characters long.',
    });
  }

  const query = "SELECT * FROM User WHERE name LIKE ? OR email LIKE ? LIMIT 10";

  db.query(query, [`%${q}%`, `%${q}%`], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.post("/api/dev/auth", async (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: "Authorization code is missing" });

  try {
    const { tokens } = await client.getToken({ code, redirect_uri: "postmessage" });
    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    const conn = await pool.getConnection();
    let user;

    const [rows] = await conn.query("SELECT * FROM User WHERE googleId = ?", [googleId]);
    if (rows.length === 0) {
      const [result] = await conn.query(
        "INSERT INTO User (googleId, email, name, picture, role) VALUES (?, ?, ?, ?, ?)",
        [googleId, email, name, picture, "user"]
      );
      user = { id: result.insertId, googleId, email, name, picture, role: "user" };
    } else {
      user = rows[0];
      await conn.query(
        "UPDATE User SET email = ?, name = ?, picture = ? WHERE googleId = ?",
        [email, name, picture, googleId]
      );
    }

    const token = generateToken(user);

    res.json({
      message: "User authenticated successfully",
      user: {
        id: user.id,
        googleId: user.googleId,
        email: user.email,
        name: user.name,
        picture: user.picture,
        role: [user.role],
      },
      token,
    });
    conn.release();
  } catch (error) {
    console.error("Authentication Error:", error);
    res.status(401).json({ error: "Invalid or expired authorization code" });
  }
});

app.post("/api/auth/google", async (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: "Authorization code is required" });

  try {
    const { tokens } = await client.getToken({
      code,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI || "postmessage",
    });
    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    const [existingUsers] = await pool.query(
      "SELECT * FROM User WHERE googleId = ? OR email = ?",
      [googleId, email]
    );
    let user;

    if (existingUsers.length === 0) {
      const [result] = await pool.query(
        `INSERT INTO User (googleId, email, name, picture, role) VALUES (?, ?, ?, ?, 'user')`,
        [googleId, email, name, picture]
      );
      user = { id: result.insertId, googleId, email, name, picture, role: "user" };
    } else {
      user = existingUsers[0];
      await pool.query(`UPDATE User SET name = ?, picture = ? WHERE id = ?`, [
        name,
        picture,
        user.id,
      ]);
    }

    const token = generateToken(user);
    // Ensure role is array
    const roleArray = user.role ? [user.role] : [];
    res.json({
      success: true,
      message: "Authentication successful",
      user: { ...user, role: roleArray },
      token,
    });
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ success: false, error: "Authentication failed" });
  }
});

app.get("/api/auth/me", verifyToken, (req, res) => res.json({ success: true, user: req.user }));
app.post("/api/auth/logout", verifyToken, (req, res) =>
  res.json({ success: true, message: "Logged out successfully" })
);

// ==================== USER ROUTES ====================

app.get("/api/users", verifyToken, async (req, res) => {
  try {
    if (!req.user.role.includes("admin"))
      return res.status(403).json({ success: false, error: "Admin access required" });
    const [users] = await pool.query(
      `SELECT id, name, email, picture, role, createdAt, updatedAt FROM User ORDER BY createdAt DESC`
    );
    const formattedUsers = users.map((user) => ({
      ...user,
      role: user.role ? [user.role] : [],
    }));
    res.json({ success: true, count: users.length, users: formattedUsers });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ success: false, error: "Failed to fetch users" });
  }
});

app.get("/api/users/:id", verifyToken, async (req, res) => {
  try {
    const [users] = await pool.query(
      "SELECT id, name, email, picture, role FROM User WHERE id = ?",
      [req.params.id]
    );
    if (users.length === 0)
      return res.status(404).json({ success: false, error: "User not found" });
    const user = users[0];
    user.role = user.role ? [user.role] : [];
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to fetch user" });
  }
});

app.put("/api/users/:id/role", verifyToken, async (req, res) => {
  if (!req.user.role.includes("admin"))
    return res.status(403).json({ error: "Admin only" });
  const { role } = req.body;
  const validRoles = ["user", "admin"];
  if (!role || !validRoles.includes(role))
    return res.status(400).json({
      success: false,
      error: `Invalid role: ${validRoles.join(", ")}`,
    });
  try {
    await pool.query("UPDATE User SET role = ? WHERE id = ?", [
      role,
      req.params.id,
    ]);
    res.json({ success: true, message: "Role updated" });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to update role" });
  }
});

// ==================== BOARD ROUTES ====================

app.post("/api/boards", verifyToken, async (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ error: "Title required" });

  try {
    const conn = await pool.getConnection();
    const [result] = await conn.query(
      `INSERT INTO Board (title, description, createdBy) VALUES (?, ?, ?)`,
      [title, description || null, req.user.id]
    );
    await conn.query(
      "INSERT INTO allowed_users (boardId, userId) VALUES (?, ?)",
      [result.insertId, req.user.id]
    );
    conn.release();

    res.status(201).json({
      success: true,
      board: { id: result.insertId, title, description },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to create board" });
  }
});

app.get("/api/boards/:id", verifyToken, async (req, res) => {
  const hasAccess = await checkBoardAccess(req.user.id, req.params.id);
  if (!hasAccess) return res.status(403).json({ error: "Access denied" });

  try {
    const [boards] = await pool.query(
      "SELECT * FROM Board WHERE id = ?",
      [req.params.id]
    );
    if (boards.length === 0)
      return res.status(404).json({ error: "Board not found" });

    const [users] = await pool.query(
      `SELECT u.id, u.name, u.email, u.picture FROM User u 
       INNER JOIN allowed_users au ON u.id = au.userId WHERE au.boardId = ?`,
      [req.params.id]
    );

    res.json({ success: true, board: { ...boards[0], allowedUsers: users } });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.put("/api/boards/:id", verifyToken, async (req, res) => {
  const hasAccess = await checkBoardAccess(req.user.id, req.params.id);
  if (!hasAccess) return res.status(403).json({ error: "Access denied" });

  const { title, description } = req.body;
  try {
    await pool.query(
      "UPDATE Board SET title = ?, description = ? WHERE id = ?",
      [title, description, req.params.id]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

app.get("/api/boards", verifyToken, async (req, res) => {
  try {
    let query, params;
    if (req.user.role.includes("admin")) {
      query = `SELECT * FROM Board ORDER BY createdAt DESC`;
      params = [];
    } else {
      query = `SELECT b.* FROM Board b INNER JOIN allowed_users au ON b.id = au.boardId WHERE au.userId = ? ORDER BY b.createdAt DESC`;
      params = [req.user.id];
    }
    const [boards] = await pool.query(query, params);
    res.json({ success: true, count: boards.length, boards });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to fetch boards" });
  }
});

app.delete("/api/boards/:id", verifyToken, async (req, res) => {
  const hasAccess = await checkBoardAccess(req.user.id, req.params.id);
  if (!hasAccess) return res.status(403).json({ error: "Access denied" });

  try {
    await pool.query("DELETE FROM Board WHERE id = ?", [req.params.id]);
    res.json({ success: true, message: "Board deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

app.post("/api/boards/:id/users", verifyToken, async (req, res) => {
  const hasAccess = await checkBoardAccess(req.user.id, req.params.id);
  if (!hasAccess) return res.status(403).json({ error: "Access denied" });

  const { userId } = req.body;
  if (!userId) return res.status(400).json({ error: "User ID required" });

  try {
    await pool.query(
      "INSERT IGNORE INTO allowed_users (boardId, userId) VALUES (?, ?)",
      [req.params.id, userId]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to add user" });
  }
});

// ==================== EPIC ROUTES ====================

app.get("/api/boards/:boardId/epics", verifyToken, async (req, res) => {
  const hasAccess = await checkBoardAccess(req.user.id, req.params.boardId);
  if (!hasAccess) return res.status(403).json({ error: "Access denied" });

  try {
    const [epics] = await pool.query(
      "SELECT * FROM Epics WHERE boardId = ? ORDER BY createdAt DESC",
      [req.params.boardId]
    );
    res.json({ success: true, epics });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch epics" });
  }
});

app.post("/api/boards/:boardId/epics", verifyToken, async (req, res) => {
  const hasAccess = await checkBoardAccess(req.user.id, req.params.boardId);
  if (!hasAccess) return res.status(403).json({ error: "Access denied" });

  const { title, description } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });

  try {
    const [result] = await pool.query(
      "INSERT INTO Epics (title, description, boardId, createdBy) VALUES (?, ?, ?, ?)",
      [title, description || null, req.params.boardId, req.user.id]
    );
    res.status(201).json({
      success: true,
      epic: { id: result.insertId, title, description },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create epic" });
  }
});

app.get("/api/epics/:id", verifyToken, async (req, res) => {
  try {
    const [epics] = await pool.query(
      "SELECT * FROM Epics WHERE id = ?",
      [req.params.id]
    );
    if (epics.length === 0)
      return res.status(404).json({ error: "Epic not found" });

    const hasAccess = await checkBoardAccess(req.user.id, epics[0].boardId);
    if (!hasAccess) return res.status(403).json({ error: "Access denied" });

    res.json({ success: true, epic: epics[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.put("/api/epics/:id", verifyToken, async (req, res) => {
  const { title, description } = req.body;
  try {
    const [epics] = await pool.query(
      "SELECT boardId FROM Epics WHERE id = ?",
      [req.params.id]
    );
    if (!epics.length)
      return res.status(404).json({ error: "Epic not found" });

    const hasAccess = await checkBoardAccess(req.user.id, epics[0].boardId);
    if (!hasAccess) return res.status(403).json({ error: "Access denied" });

    await pool.query(
      "UPDATE Epics SET title = ?, description = ? WHERE id = ?",
      [title, description, req.params.id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Update failed" });
  }
});

app.delete("/api/epics/:id", verifyToken, async (req, res) => {
  try {
    const [epics] = await pool.query(
      "SELECT boardId FROM Epics WHERE id = ?",
      [req.params.id]
    );
    if (!epics.length)
      return res.status(404).json({ error: "Epic not found" });

    const hasAccess = await checkBoardAccess(req.user.id, epics[0].boardId);
    if (!hasAccess) return res.status(403).json({ error: "Access denied" });

    await pool.query("DELETE FROM Epics WHERE id = ?", [req.params.id]);
    res.json({ success: true, message: "Epic deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Delete failed" });
  }
});

// ==================== SPRINT ROUTES (Fixed) ====================

app.get("/api/epics/:epicId/sprints", verifyToken, async (req, res) => {
  try {
    const [epics] = await pool.query(
      "SELECT boardId FROM Epics WHERE id = ?",
      [req.params.epicId]
    );
    if (!epics.length)
      return res.status(404).json({ error: "Epic not found" });

    const hasAccess = await checkBoardAccess(req.user.id, epics[0].boardId);
    if (!hasAccess) return res.status(403).json({ error: "Access denied" });

    const [sprints] = await pool.query(
      "SELECT * FROM Sprints WHERE epicId = ? ORDER BY startTime DESC",
      [req.params.epicId]
    );

    // Parse status JSON for each sprint using helper
    const formattedSprints = sprints.map((sprint) => ({
      ...sprint,
      status: parseStatus(sprint.status),
    }));

    res.json({ success: true, sprints: formattedSprints });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch sprints" });
  }
});

app.post("/api/epics/:epicId/sprints", verifyToken, async (req, res) => {
  const { title, description, startTime, expiry, status } = req.body;

  if (!title || !startTime || !expiry) {
    return res.status(400).json({
      error: "Title, startTime and expiry are required",
    });
  }

  try {
    const [epics] = await pool.query(
      "SELECT boardId FROM Epics WHERE id = ?",
      [req.params.epicId]
    );
    if (!epics.length)
      return res.status(404).json({ error: "Epic not found" });

    const hasAccess = await checkBoardAccess(req.user.id, epics[0].boardId);
    if (!hasAccess) return res.status(403).json({ error: "Access denied" });

    // Add status field with default
    const defaultStatus = JSON.stringify(["To Do", "In Progress", "Done"]);
    const sprintStatus = status ? JSON.stringify(status) : defaultStatus;

    const [result] = await pool.query(
      "INSERT INTO Sprints (title, description, startTime, expiry, epicId, createdBy, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        title,
        description || null,
        startTime,
        expiry,
        req.params.epicId,
        req.user.id,
        sprintStatus,
      ]
    );

    res.status(201).json({
      success: true,
      sprint: {
        id: result.insertId,
        title,
        startTime,
        expiry,
        status: parseStatus(sprintStatus),
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create sprint" });
  }
});

// GET /api/sprints/:id
app.get("/api/sprints/:id", verifyToken, async (req, res) => {
  try {
    const [sprints] = await pool.query(
      "SELECT * FROM Sprints WHERE id = ?",
      [req.params.id]
    );
    if (!sprints.length)
      return res.status(404).json({ error: "Sprint not found" });

    const sprint = sprints[0];
    // Parse status JSON using helper
    sprint.status = parseStatus(sprint.status);

    const [epics] = await pool.query(
      "SELECT boardId FROM Epics WHERE id = ?",
      [sprint.epicId]
    );
    const hasAccess = await checkBoardAccess(req.user.id, epics[0].boardId);
    if (!hasAccess) return res.status(403).json({ error: "Access denied" });

    res.json({ success: true, sprint });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.put("/api/sprints/:id", verifyToken, async (req, res) => {
  const { title, description, startTime, expiry, status } = req.body;
  try {
    const [sprints] = await pool.query(
      "SELECT epicId FROM Sprints WHERE id = ?",
      [req.params.id]
    );
    if (!sprints.length)
      return res.status(404).json({ error: "Sprint not found" });

    const [epics] = await pool.query(
      "SELECT boardId FROM Epics WHERE id = ?",
      [sprints[0].epicId]
    );
    const hasAccess = await checkBoardAccess(req.user.id, epics[0].boardId);
    if (!hasAccess) return res.status(403).json({ error: "Access denied" });

    // FIXED: Ensure valid value after ternary operator
    const sprintStatus = status ? JSON.stringify(status) : undefined;

    await pool.query(
      "UPDATE Sprints SET title = ?, description = ?, startTime = ?, expiry = ?, status = COALESCE(?, status) WHERE id = ?",
      [title, description, startTime, expiry, sprintStatus, req.params.id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Update failed" });
  }
});

app.delete("/api/sprints/:id", verifyToken, async (req, res) => {
  try {
    const [sprints] = await pool.query(
      "SELECT epicId FROM Sprints WHERE id = ?",
      [req.params.id]
    );
    if (!sprints.length)
      return res.status(404).json({ error: "Sprint not found" });

    const [epics] = await pool.query(
      "SELECT boardId FROM Epics WHERE id = ?",
      [sprints[0].epicId]
    );
    const hasAccess = await checkBoardAccess(req.user.id, epics[0].boardId);
    if (!hasAccess) return res.status(403).json({ error: "Access denied" });

    await pool.query("DELETE FROM Sprints WHERE id = ?", [req.params.id]);
    res.json({ success: true, message: "Sprint deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Delete failed" });
  }
});

// ==================== TASK ROUTES ====================

// GET /api/sprints/:sprintId/tasks
app.get("/api/sprints/:sprintId/tasks", verifyToken, async (req, res) => {
  try {
    const [sprints] = await pool.query(
      "SELECT epicId, status FROM Sprints WHERE id = ?",
      [req.params.sprintId]
    );
    if (!sprints.length)
      return res.status(404).json({ error: "Sprint not found" });

    const [epics] = await pool.query(
      "SELECT boardId FROM Epics WHERE id = ?",
      [sprints[0].epicId]
    );
    const hasAccess = await checkBoardAccess(req.user.id, epics[0].boardId);
    if (!hasAccess) return res.status(403).json({ error: "Access denied" });

    const [tasks] = await pool.query(
      `SELECT t.*, u.name as assigneeName, u.email as assigneeEmail, u.picture as assigneePicture 
       FROM Tasks t 
       LEFT JOIN User u ON t.assigneeId = u.id 
       WHERE t.sprintId = ?`,
      [req.params.sprintId]
    );

    // Parse sprint status to get available statuses using helper
    const sprintStatus = parseStatus(sprints[0].status);

    // Tasks now store just the current status as a string (e.g., "In Progress")
    // We return the available statuses from the sprint as well
    res.json({ success: true, tasks, availableStatus: sprintStatus });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// POST /api/sprints/:sprintId/tasks
app.post("/api/sprints/:sprintId/tasks", verifyToken, async (req, res) => {
  const { title, description, assigneeId, storyPoints, hours, priority, status } =
    req.body;

  if (!title) return res.status(400).json({ error: "Title is required" });

  try {
    const [sprints] = await pool.query(
      "SELECT epicId, status FROM Sprints WHERE id = ?",
      [req.params.sprintId]
    );
    if (!sprints.length)
      return res.status(404).json({ error: "Sprint not found" });

    const [epics] = await pool.query(
      "SELECT boardId FROM Epics WHERE id = ?",
      [sprints[0].epicId]
    );
    const hasAccess = await checkBoardAccess(req.user.id, epics[0].boardId);
    if (!hasAccess) return res.status(403).json({ error: "Access denied" });

    // Default status is the first status in sprint's status array
    const sprintStatusArray = parseStatus(sprints[0].status);
    const taskStatus = status || sprintStatusArray[0]; // Use provided status or default to first sprint status

    const [result] = await pool.query(
      `INSERT INTO Tasks (sprintId, title, description, assigneeId, storyPoints, hours, status, priority, createdBy) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        req.params.sprintId,
        title,
        description || null,
        assigneeId || null,
        storyPoints || 0,
        hours || 0,
        taskStatus,
        priority || "Medium",
        req.user.id,
      ]
    );

    res.status(201).json({
      success: true,
      task: { id: result.insertId, title, status: taskStatus },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create task" });
  }
});

// GET /api/tasks/:id
app.get("/api/tasks/:id", verifyToken, async (req, res) => {
  try {
    const [tasks] = await pool.query(
      "SELECT * FROM Tasks WHERE id = ?",
      [req.params.id]
    );
    if (!tasks.length)
      return res.status(404).json({ error: "Task not found" });

    const task = tasks[0];

    // Get sprint info for available statuses
    const [sprints] = await pool.query(
      "SELECT id, epicId, status FROM Sprints WHERE id = ?",
      [task.sprintId]
    );
    const sprintStatus = parseStatus(sprints[0].status);

    const [epics] = await pool.query(
      "SELECT boardId FROM Epics WHERE id = ?",
      [sprints[0].epicId]
    );
    const hasAccess = await checkBoardAccess(req.user.id, epics[0].boardId);
    if (!hasAccess) return res.status(403).json({ error: "Access denied" });

    const [subtasks] = await pool.query(
      `SELECT s.*, u.name as assigneeName, u.email as assigneeEmail 
       FROM Subtasks s 
       LEFT JOIN User u ON s.assigneeId = u.id 
       WHERE s.taskId = ?`,
      [task.id]
    );

    // Task status is now a simple string (e.g., "In Progress")
    res.json({ success: true, task: { ...task, subtasks }, availableStatus: sprintStatus });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// PUT /api/tasks/:id
app.put("/api/tasks/:id", verifyToken, async (req, res) => {
  const { title, description, assigneeId, storyPoints, hours, priority, status } =
    req.body;
  try {
    const [tasks] = await pool.query(
      "SELECT sprintId FROM Tasks WHERE id = ?",
      [req.params.id]
    );
    if (!tasks.length)
      return res.status(404).json({ error: "Task not found" });

    const [sprints] = await pool.query(
      "SELECT epicId, status FROM Sprints WHERE id = ?",
      [tasks[0].sprintId]
    );
    const [epics] = await pool.query(
      "SELECT boardId FROM Epics WHERE id = ?",
      [sprints[0].epicId]
    );

    const hasAccess = await checkBoardAccess(req.user.id, epics[0].boardId);
    if (!hasAccess) return res.status(403).json({ error: "Access denied" });

    // Validate status if provided - must be in sprint's status array
    if (status) {
      const sprintStatusArray = parseStatus(sprints[0].status);
      if (!sprintStatusArray.includes(status)) {
        return res.status(400).json({
          error: `Invalid status. Available: ${sprintStatusArray.join(", ")}`,
        });
      }
    }

    await pool.query(
      `UPDATE Tasks SET title = ?, description = ?, assigneeId = ?, storyPoints = ?, hours = ?, priority = ?, status = COALESCE(?, status) 
       WHERE id = ?`,
      [
        title,
        description,
        assigneeId,
        storyPoints,
        hours,
        priority,
        status,
        req.params.id,
      ]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Update failed" });
  }
});

app.delete("/api/tasks/:id", verifyToken, async (req, res) => {
  try {
    const [tasks] = await pool.query(
      "SELECT sprintId FROM Tasks WHERE id = ?",
      [req.params.id]
    );
    if (!tasks.length)
      return res.status(404).json({ error: "Task not found" });

    const [sprints] = await pool.query(
      "SELECT epicId FROM Sprints WHERE id = ?",
      [tasks[0].sprintId]
    );
    const [epics] = await pool.query(
      "SELECT boardId FROM Epics WHERE id = ?",
      [sprints[0].epicId]
    );

    const hasAccess = await checkBoardAccess(req.user.id, epics[0].boardId);
    if (!hasAccess) return res.status(403).json({ error: "Access denied" });

    await pool.query("DELETE FROM Tasks WHERE id = ?", [req.params.id]);
    res.json({ success: true, message: "Task deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Delete failed" });
  }
});

// ==================== SUBTASK ROUTES ====================

app.get("/api/tasks/:taskId/subtasks", verifyToken, async (req, res) => {
  try {
    const [tasks] = await pool.query(
      "SELECT sprintId FROM Tasks WHERE id = ?",
      [req.params.taskId]
    );
    if (!tasks.length)
      return res.status(404).json({ error: "Task not found" });

    const [sprints] = await pool.query(
      "SELECT epicId FROM Sprints WHERE id = ?",
      [tasks[0].sprintId]
    );
    const [epics] = await pool.query(
      "SELECT boardId FROM Epics WHERE id = ?",
      [sprints[0].epicId]
    );
    const hasAccess = await checkBoardAccess(req.user.id, epics[0].boardId);
    if (!hasAccess) return res.status(403).json({ error: "Access denied" });

    const [subtasks] = await pool.query(
      `SELECT s.*, u.name as assigneeName, u.email as assigneeEmail 
       FROM Subtasks s 
       LEFT JOIN User u ON s.assigneeId = u.id 
       WHERE s.taskId = ?`,
      [req.params.taskId]
    );
    res.json({ success: true, subtasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch subtasks" });
  }
});

app.post("/api/tasks/:taskId/subtasks", verifyToken, async (req, res) => {
  const { title, description, assigneeId, hours } = req.body;

  if (!title) return res.status(400).json({ error: "Title is required" });

  try {
    const [tasks] = await pool.query(
      "SELECT sprintId FROM Tasks WHERE id = ?",
      [req.params.taskId]
    );
    if (!tasks.length)
      return res.status(404).json({ error: "Task not found" });

    const [sprints] = await pool.query(
      "SELECT epicId FROM Sprints WHERE id = ?",
      [tasks[0].sprintId]
    );
    const [epics] = await pool.query(
      "SELECT boardId FROM Epics WHERE id = ?",
      [sprints[0].epicId]
    );

    const hasAccess = await checkBoardAccess(req.user.id, epics[0].boardId);
    if (!hasAccess) return res.status(403).json({ error: "Access denied" });

    const finalAssignee = assigneeId || req.user.id;

    const [result] = await pool.query(
      "INSERT INTO Subtasks (taskId, title, description, assigneeId, hours, createdBy) VALUES (?, ?, ?, ?, ?, ?)",
      [req.params.taskId, title, description || null, finalAssignee, hours || 0, req.user.id]
    );
    res.status(201).json({
      success: true,
      subtask: { id: result.insertId, title, description, hours: hours || 0 },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create subtask" });
  }
});

app.put("/api/subtasks/:id", verifyToken, async (req, res) => {
  const { title, description, status, hours } = req.body;
  try {
    const [subtasks] = await pool.query(
      "SELECT * FROM Subtasks WHERE id = ?",
      [req.params.id]
    );
    if (!subtasks.length)
      return res.status(404).json({ error: "Subtask not found" });

    const sub = subtasks[0];

    const [tasks] = await pool.query(
      "SELECT sprintId FROM Tasks WHERE id = ?",
      [sub.taskId]
    );
    const [sprints] = await pool.query(
      "SELECT epicId FROM Sprints WHERE id = ?",
      [tasks[0].sprintId]
    );
    const [epics] = await pool.query(
      "SELECT boardId FROM Epics WHERE id = ?",
      [sprints[0].epicId]
    );

    const hasAccess = await checkBoardAccess(req.user.id, epics[0].boardId);
    if (!hasAccess) return res.status(403).json({ error: "Access denied" });

    let completedAt = sub.completedAt;
    if (status === "Done" && sub.status !== "Done") {
      completedAt = new Date();
    } else if (status === "Active") {
      completedAt = null;
    }

    await pool.query(
      "UPDATE Subtasks SET title = ?, description = ?, status = ?, hours = ?, completedAt = ? WHERE id = ?",
      [title, description, status, hours || 0, completedAt, req.params.id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Update failed" });
  }
});

app.delete("/api/subtasks/:id", verifyToken, async (req, res) => {
  try {
    const [subtasks] = await pool.query(
      "SELECT taskId FROM Subtasks WHERE id = ?",
      [req.params.id]
    );
    if (!subtasks.length)
      return res.status(404).json({ error: "Subtask not found" });

    const [tasks] = await pool.query(
      "SELECT sprintId FROM Tasks WHERE id = ?",
      [subtasks[0].taskId]
    );
    const [sprints] = await pool.query(
      "SELECT epicId FROM Sprints WHERE id = ?",
      [tasks[0].sprintId]
    );
    const [epics] = await pool.query(
      "SELECT boardId FROM Epics WHERE id = ?",
      [sprints[0].epicId]
    );

    const hasAccess = await checkBoardAccess(req.user.id, epics[0].boardId);
    if (!hasAccess) return res.status(403).json({ error: "Access denied" });

    await pool.query("DELETE FROM Subtasks WHERE id = ?", [req.params.id]);
    res.json({ success: true, message: "Subtask deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Delete failed" });
  }
});

// ==================== COMMENT ROUTES ====================

app.get("/api/tasks/:taskId/comments", verifyToken , async (req, res) => {
  try {
    const [tasks] = await pool.query(
      "SELECT sprintId FROM Tasks WHERE id = ?",
      [req.params.taskId]
    );
    if (!tasks.length)
      return res.status(404).json({ error: "Task not found" });

    const [sprints] = await pool.query(
      "SELECT epicId FROM Sprints WHERE id = ?",
      [tasks[0].sprintId]
    );
    const [epics] = await pool.query(
      "SELECT boardId FROM Epics WHERE id = ?",
      [sprints[0].epicId]
    );

    const hasAccess = await checkBoardAccess(req.user.id, epics[0].boardId);
    if (!hasAccess) return res.status(403).json({ error: "Access denied" });

    const [comments] = await pool.query(
      `SELECT c.*, u.name as userName, u.picture as userPicture 
       FROM Comments c 
       JOIN User u ON c.userId = u.id 
       WHERE c.taskId = ? AND c.subtaskId IS NULL 
       ORDER BY c.createdAt ASC`,
      [req.params.taskId]
    );
    res.json({ success: true, comments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

app.get("/api/subtasks/:subtaskId/comments", verifyToken, async (req, res) => {
  try {
    const [subtasks] = await pool.query(
      "SELECT taskId FROM Subtasks WHERE id = ?",
      [req.params.subtaskId]
    );
    if (!subtasks.length)
      return res.status(404).json({ error: "Subtask not found" });

    const [tasks] = await pool.query(
      "SELECT sprintId FROM Tasks WHERE id = ?",
      [subtasks[0].taskId]
    );
    const [sprints] = await pool.query(
      "SELECT epicId FROM Sprints WHERE id = ?",
      [tasks[0].sprintId]
    );
    const [epics] = await pool.query(
      "SELECT boardId FROM Epics WHERE id = ?",
      [sprints[0].epicId]
    );

    const hasAccess = await checkBoardAccess(req.user.id, epics[0].boardId);
    if (!hasAccess) return res.status(403).json({ error: "Access denied" });

    const [comments] = await pool.query(
      `SELECT c.*, u.name as userName, u.picture as userPicture 
       FROM Comments c 
       JOIN User u ON c.userId = u.id 
       WHERE c.subtaskId = ? 
       ORDER BY c.createdAt ASC`,
      [req.params.subtaskId]
    );
    res.json({ success: true, comments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

app.post("/api/tasks/:taskId/comments", verifyToken, async (req, res) => {
  const { content, fileName, filePath } = req.body;

  if (!content) return res.status(400).json({ error: "Content is required" });

  try {
    const [tasks] = await pool.query(
      "SELECT sprintId FROM Tasks WHERE id = ?",
      [req.params.taskId]
    );
    if (!tasks.length)
      return res.status(404).json({ error: "Task not found" });

    const [sprints] = await pool.query(
      "SELECT epicId FROM Sprints WHERE id = ?",
      [tasks[0].sprintId]
    );
    const [epics] = await pool.query(
      "SELECT boardId FROM Epics WHERE id = ?",
      [sprints[0].epicId]
    );

    const hasAccess = await checkBoardAccess(req.user.id, epics[0].boardId);
    if (!hasAccess) return res.status(403).json({ error: "Access denied" });

    const [result] = await pool.query(
      "INSERT INTO Comments (taskId, userId, content, fileName, filePath) VALUES (?, ?, ?, ?, ?)",
      [req.params.taskId, req.user.id, content, fileName || null, filePath || null]
    );
    res.status(201).json({ success: true, commentId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to post comment" });
  }
});

app.post("/api/subtasks/:subtaskId/comments", verifyToken, async (req, res) => {
  const { content, fileName, filePath } = req.body;

  if (!content) return res.status(400).json({ error: "Content is required" });

  try {
    const [subtasks] = await pool.query(
      "SELECT taskId FROM Subtasks WHERE id = ?",
      [req.params.subtaskId]
    );
    if (!subtasks.length)
      return res.status(404).json({ error: "Subtask not found" });

    const [tasks] = await pool.query(
      "SELECT sprintId FROM Tasks WHERE id = ?",
      [subtasks[0].taskId]
    );
    const [sprints] = await pool.query(
      "SELECT epicId FROM Sprints WHERE id = ?",
      [tasks[0].sprintId]
    );
    const [epics] = await pool.query(
      "SELECT boardId FROM Epics WHERE id = ?",
      [sprints[0].epicId]
    );

    const hasAccess = await checkBoardAccess(req.user.id, epics[0].boardId);
    if (!hasAccess) return res.status(403).json({ error: "Access denied" });

    const [result] = await pool.query(
      "INSERT INTO Comments (subtaskId, userId, content, fileName, filePath) VALUES (?, ?, ?, ?, ?)",
      [req.params.subtaskId, req.user.id, content, fileName || null, filePath || null]
    );
    res.status(201).json({ success: true, commentId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to post comment" });
  }
});

app.delete("/api/comments/:id", verifyToken, async (req, res) => {
  try {
    const [comments] = await pool.query(
      "SELECT * FROM Comments WHERE id = ?",
      [req.params.id]
    );
    if (!comments.length)
      return res.status(404).json({ error: "Comment not found" });

    const comment = comments[0];

    let boardId;
    if (comment.taskId) {
      const [tasks] = await pool.query(
        "SELECT sprintId FROM Tasks WHERE id = ?",
        [comment.taskId]
      );
      const [sprints] = await pool.query(
        "SELECT epicId FROM Sprints WHERE id = ?",
        [tasks[0].sprintId]
      );
      const [epics] = await pool.query(
        "SELECT boardId FROM Epics WHERE id = ?",
        [sprints[0].epicId]
      );
      boardId = epics[0].boardId;
    } else if (comment.subtaskId) {
      const [subtasks] = await pool.query(
        "SELECT taskId FROM Subtasks WHERE id = ?",
        [comment.subtaskId]
      );
      const [tasks] = await pool.query(
        "SELECT sprintId FROM Tasks WHERE id = ?",
        [subtasks[0].taskId]
      );
      const [sprints] = await pool.query(
        "SELECT epicId FROM Sprints WHERE id = ?",
        [tasks[0].sprintId]
      );
      const [epics] = await pool.query(
        "SELECT boardId FROM Epics WHERE id = ?",
        [sprints[0].epicId]
      );
      boardId = epics[0].boardId;
    }

    const hasAccess = await checkBoardAccess(req.user.id, boardId);
    if (!hasAccess) return res.status(403).json({ error: "Access denied" });

    await pool.query("DELETE FROM Comments WHERE id = ?", [req.params.id]);
    res.json({ success: true, message: "Comment deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Delete failed" });
  }
});

// ==================== UPDATED TIMESHEET (Now uses Work Logs) ====================

/**
 * GET /api/timesheet
 * Get work logs for the logged-in user grouped by day
 */
app.get("/api/timesheet", verifyToken, async (req, res) => {
  const { startDate, endDate, boardId } = req.query;

  let dateFilter = "";
  const params = [req.user.id];

  if (startDate && endDate) {
    dateFilter = "AND wl.workDate BETWEEN DATE(?) AND DATE(?)";
    params.push(startDate, endDate);
  }

  try {
    let boardFilter = "";
    if (boardId) {
      boardFilter = "AND b.id = ?";
      params.push(boardId);
    }

    if (!req.user.role.includes("admin")) {
      boardFilter += " AND bu.userId = ?";
      params.push(req.user.id);
    }

    // Query using SubtaskWorkLogs table
    const query = `
            SELECT 
                wl.id as worklogId,
                wl.workDate,
                wl.hoursWorked,
                s.id as subtaskId,
                s.title as subtaskTitle,
                s.status as subtaskStatus,
                t.id as taskId,
                t.title as taskTitle,
                t.priority,
                sp.id as sprintId,
                sp.title as sprintTitle,
                e.id as epicId,
                e.title as epicTitle,
                b.id as boardId,
                b.title as boardTitle,
                u.name as assigneeName,
                creator.name as creatorName
            FROM SubtaskWorkLogs wl
            JOIN User u ON wl.userId = u.id
            JOIN User creator ON wl.userId = creator.id
            JOIN Subtasks s ON wl.subtaskId = s.id
            JOIN Tasks t ON s.taskId = t.id
            JOIN Sprints sp ON t.sprintId = sp.id
            JOIN Epics e ON sp.epicId = e.id
            JOIN Board b ON e.boardId = b.id
            LEFT JOIN allowed_users bu ON b.id = bu.boardId
            WHERE wl.userId = ? 
            ${dateFilter}
            ${boardFilter}
            ORDER BY wl.workDate DESC, wl.id DESC
        `;

    const [timesheet] = await pool.query(query, params);

    // Group by date
    const dailyHours = {};
    timesheet.forEach((entry) => {
      const date = entry.workDate;
      if (!dailyHours[date]) {
        dailyHours[date] = {
          date: date,
          totalHours: 0,
          tasks: [],
        };
      }
      dailyHours[date].totalHours += parseFloat(entry.hoursWorked) || 0;
      dailyHours[date].tasks.push(entry);
    });

    const groupedTimesheet = Object.values(dailyHours).map((day) => ({
      ...day,
      totalHours: parseFloat(day.totalHours.toFixed(2)),
    })).sort((a, b) => new Date(b.date) - new Date(a.date));

    const totalHours = timesheet.reduce(
      (sum, t) => sum + (parseFloat(t.hoursWorked) || 0),
      0
    );

    res.json({
      success: true,
      totalHours: parseFloat(totalHours.toFixed(2)),
      daysWorked: groupedTimesheet.length,
      timesheet: groupedTimesheet,
    });
  } catch (err) {
    console.error("Timesheet error:", err);
    res.status(500).json({ success: false, error: "Failed to fetch timesheet data" });
  }
});

/**
 * GET /api/timesheet/user/:userId
 * Admin can view other user's timesheet
 */
app.get("/api/timesheet/user/:userId", verifyToken, async (req, res) => {
  if (!req.user.role.includes("admin")) {
    return res.status(403).json({ error: "Only admins can view other users timesheets" });
  }

  const { startDate, endDate } = req.query;
  const targetUserId = req.params.userId;

  let dateFilter = "";
  const params = [targetUserId];

  if (startDate && endDate) {
    dateFilter = "AND wl.workDate BETWEEN DATE(?) AND DATE(?)";
    params.push(startDate, endDate);
  }

  try {
    const query = `
            SELECT 
                wl.id as worklogId,
                wl.workDate,
                wl.hoursWorked,
                s.id as subtaskId,
                s.title as subtaskTitle,
                s.status as subtaskStatus,
                t.id as taskId,
                t.title as taskTitle,
                t.priority,
                sp.id as sprintId,
                sp.title as sprintTitle,
                e.id as epicId,
                e.title as epicTitle,
                b.id as boardId,
                b.title as boardTitle,
                u.name as userName
            FROM SubtaskWorkLogs wl
            JOIN User u ON wl.userId = u.id
            JOIN Subtasks s ON wl.subtaskId = s.id
            JOIN Tasks t ON s.taskId = t.id
            JOIN Sprints sp ON t.sprintId = sp.id
            JOIN Epics e ON sp.epicId = e.id
            JOIN Board b ON e.boardId = b.id
            WHERE wl.userId = ? 
            ${dateFilter}
            ORDER BY wl.workDate DESC, wl.id DESC
        `;

    const [timesheet] = await pool.query(query, params);

    // Group by date
    const dailyHours = {};
    timesheet.forEach((entry) => {
      const date = entry.workDate;
      if (!dailyHours[date]) {
        dailyHours[date] = { date: date, totalHours: 0, tasks: [] };
      }
      dailyHours[date].totalHours += parseFloat(entry.hoursWorked) || 0;
      dailyHours[date].tasks.push(entry);
    });

    const groupedTimesheet = Object.values(dailyHours).map((day) => ({
      ...day,
      totalHours: parseFloat(day.totalHours.toFixed(2)),
    })).sort((a, b) => new Date(b.date) - new Date(a.date));

    const totalHours = timesheet.reduce(
      (sum, t) => sum + (parseFloat(t.hoursWorked) || 0),
      0
    );

    res.json({
      success: true,
      totalHours: parseFloat(totalHours.toFixed(2)),
      daysWorked: groupedTimesheet.length,
      timesheet: groupedTimesheet,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch user timesheet" });
  }
});

// ==================== HEALTH & SERVER START ====================

app.get("/api/health", (req, res) => {
  return res
    .status(200)
    .json({
      success: true,
      message: "Server is running",
      timestamp: new Date().toISOString(),
    });
});

// ==================== UPDATED SUBTASK WORK LOGS (With Hours Validation) ====================

/**
 * GET /api/subtasks/:subtaskId/worklogs
 * Get all work logs for a subtask
 */
app.get("/api/subtasks/:subtaskId/worklogs", verifyToken, async (req, res) => {
  try {
    const [subtasks] = await pool.query(
      "SELECT taskId, hours FROM Subtasks WHERE id = ?",
      [req.params.subtaskId]
    );
    if (!subtasks.length)
      return res.status(404).json({ error: "Subtask not found" });

    const [tasks] = await pool.query(
      "SELECT sprintId FROM Tasks WHERE id = ?",
      [subtasks[0].taskId]
    );
    const [sprints] = await pool.query(
      "SELECT epicId FROM Sprints WHERE id = ?",
      [tasks[0].sprintId]
    );
    const [epics] = await pool.query(
      "SELECT boardId FROM Epics WHERE id = ?",
      [sprints[0].epicId]
    );

    const hasAccess = await checkBoardAccess(req.user.id, epics[0].boardId);
    if (!hasAccess) return res.status(403).json({ error: "Access denied" });

    const [worklogs] = await pool.query(
      `SELECT wl.*, u.name as userName, u.email as userEmail 
       FROM SubtaskWorkLogs wl
       JOIN User u ON wl.userId = u.id
       WHERE wl.subtaskId = ?
       ORDER BY wl.workDate DESC`,
      [req.params.subtaskId]
    );

    // Calculate total logged hours
    const totalLoggedHours = worklogs.reduce(
      (sum, log) => sum + parseFloat(log.hoursWorked || 0),
      0
    );

    res.json({
      success: true,
      subtaskHours: parseFloat(subtasks[0].hours) || 0,
      totalLoggedHours: parseFloat(totalLoggedHours.toFixed(2)),
      remainingHours: parseFloat(
        (subtasks[0].hours - totalLoggedHours).toFixed(2)
      ),
      worklogs,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch work logs" });
  }
});

/**
 * POST /api/subtasks/:subtaskId/worklogs
 * Add work log entry for a subtask (validates against subtask hours)
 */
app.post("/api/subtasks/:subtaskId/worklogs", verifyToken, async (req, res) => {
  const { workDate, hoursWorked } = req.body;

  if (!workDate || !hoursWorked) {
    return res.status(400).json({
      error: "workDate and hoursWorked are required",
    });
  }

  try {
    const [subtasks] = await pool.query(
      "SELECT taskId, hours, assigneeId FROM Subtasks WHERE id = ?",
      [req.params.subtaskId]
    );
    if (!subtasks.length)
      return res.status(404).json({ error: "Subtask not found" });

    const [tasks] = await pool.query(
      "SELECT sprintId FROM Tasks WHERE id = ?",
      [subtasks[0].taskId]
    );
    const [sprints] = await pool.query(
      "SELECT epicId FROM Sprints WHERE id = ?",
      [tasks[0].sprintId]
    );
    const [epics] = await pool.query(
      "SELECT boardId FROM Epics WHERE id = ?",
      [sprints[0].epicId]
    );

    const hasAccess = await checkBoardAccess(req.user.id, epics[0].boardId);
    if (!hasAccess) return res.status(403).json({ error: "Access denied" });

    // Get existing work logs for this subtask
    const [existingLogs] = await pool.query(
      "SELECT SUM(hoursWorked) as totalHours FROM SubtaskWorkLogs WHERE subtaskId = ?",
      [req.params.subtaskId]
    );

    const currentTotal = parseFloat(existingLogs[0].totalHours || 0);
    const newTotal = currentTotal + parseFloat(hoursWorked);
    const estimatedHours = parseFloat(subtasks[0].hours || 0);
    const logUserId = subtasks[0].assigneeId || req.user.id;

    // Validate: new total should not exceed estimated hours
    if (newTotal > estimatedHours) {
      return res.status(400).json({
        error: "Total logged hours cannot exceed subtask hours",
        subtaskHours: estimatedHours,
        currentLoggedHours: currentTotal,
        attemptedToLog: parseFloat(hoursWorked),
        wouldExceedBy: parseFloat((newTotal - estimatedHours).toFixed(2)),
      });
    }

    const [result] = await pool.query(
      "INSERT INTO SubtaskWorkLogs (subtaskId, userId, workDate, hoursWorked) VALUES (?, ?, ?, ?)",
      [req.params.subtaskId, logUserId, workDate, hoursWorked]
    );

    res.status(201).json({
      success: true,
      worklog: {
        id: result.insertId,
        workDate,
        hoursWorked,
        subtaskHours: estimatedHours,
        totalLoggedHours: parseFloat(newTotal.toFixed(2)),
        remainingHours: parseFloat((estimatedHours - newTotal).toFixed(2)),
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add work log" });
  }
});

/**
 * POST /api/subtasks/:subtaskId/worklogs/bulk
 * Add multiple work log entries at once (validates against subtask hours)
 */
app.post("/api/subtasks/:subtaskId/worklogs/bulk", verifyToken, async (req, res) => {
  const { workLogs } = req.body; // Array of { workDate, hoursWorked }

  if (!workLogs || !Array.isArray(workLogs) || workLogs.length === 0) {
    return res.status(400).json({ error: "workLogs array is required" });
  }

  try {
    const [subtasks] = await pool.query(
      "SELECT taskId, hours FROM Subtasks WHERE id = ?",
      [req.params.subtaskId]
    );
    if (!subtasks.length)
      return res.status(404).json({ error: "Subtask not found" });

    const [tasks] = await pool.query(
      "SELECT sprintId FROM Tasks WHERE id = ?",
      [subtasks[0].taskId]
    );
    const [sprints] = await pool.query(
      "SELECT epicId FROM Sprints WHERE id = ?",
      [tasks[0].sprintId]
    );
    const [epics] = await pool.query(
      "SELECT boardId FROM Epics WHERE id = ?",
      [sprints[0].epicId]
    );

    const hasAccess = await checkBoardAccess(req.user.id, epics[0].boardId);
    if (!hasAccess) return res.status(403).json({ error: "Access denied" });

    // Get existing work logs
    const [existingLogs] = await pool.query(
      "SELECT SUM(hoursWorked) as totalHours FROM SubtaskWorkLogs WHERE subtaskId = ?",
      [req.params.subtaskId]
    );

    const currentTotal = parseFloat(existingLogs[0].totalHours || 0);
    const newLogsTotal = workLogs.reduce(
      (sum, log) => sum + parseFloat(log.hoursWorked || 0),
      0
    );
    const newTotal = currentTotal + newLogsTotal;
    const estimatedHours = parseFloat(subtasks[0].hours || 0);

    // Validate
    if (newTotal > estimatedHours) {
      return res.status(400).json({
        error: "Total logged hours cannot exceed subtask hours",
        subtaskHours: estimatedHours,
        currentLoggedHours: currentTotal,
        attemptingToAdd: newLogsTotal,
        wouldExceedBy: parseFloat((newTotal - estimatedHours).toFixed(2)),
      });
    }

    const values = workLogs.map((log) => [
      req.params.subtaskId,
      req.user.id,
      log.workDate,
      log.hoursWorked,
    ]);

    await pool.query(
      "INSERT INTO SubtaskWorkLogs (subtaskId, userId, workDate, hoursWorked) VALUES ?",
      [values]
    );

    res.status(201).json({
      success: true,
      message: `${workLogs.length} work logs added`,
      subtaskHours: estimatedHours,
      totalLoggedHours: parseFloat(newTotal.toFixed(2)),
      remainingHours: parseFloat((estimatedHours - newTotal).toFixed(2)),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add work logs" });
  }
});

/**
 * DELETE /api/worklogs/:id
 * Delete a work log
 */
app.delete("/api/worklogs/:id", verifyToken, async (req, res) => {
  try {
    const [worklogs] = await pool.query(
      "SELECT * FROM SubtaskWorkLogs WHERE id = ?",
      [req.params.id]
    );
    if (!worklogs.length)
      return res.status(404).json({ error: "Work log not found" });

    // Only the user who created the log or admin can delete
    if (
      worklogs[0].userId !== req.user.id &&
      !req.user.role.includes("admin")
    ) {
      return res.status(403).json({ error: "You can only delete your own work logs" });
    }

    await pool.query("DELETE FROM SubtaskWorkLogs WHERE id = ?", [req.params.id]);
    res.json({ success: true, message: "Work log deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete work log" });
  }
});

// ==================== UPDATED COMMENTS (Accepts taskId OR subtaskId) ====================

/**
 * POST /api/comments
 * Add a comment to a task or subtask
 */
app.post("/api/comments", verifyToken, async (req, res) => {
  const { taskId, subtaskId, content, fileName, filePath } = req.body;

  if (!content) return res.status(400).json({ error: "Content is required" });
  if (!taskId && !subtaskId)
    return res.status(400).json({ error: "Either taskId or subtaskId is required" });
  if (taskId && subtaskId)
    return res.status(400).json({ error: "Provide only taskId OR subtaskId, not both" });

  try {
    let boardId;

    if (taskId) {
      // Get board from task
      const [tasks] = await pool.query(
        "SELECT sprintId FROM Tasks WHERE id = ?",
        [taskId]
      );
      if (!tasks.length)
        return res.status(404).json({ error: "Task not found" });

      const [sprints] = await pool.query(
        "SELECT epicId FROM Sprints WHERE id = ?",
        [tasks[0].sprintId]
      );
      const [epics] = await pool.query(
        "SELECT boardId FROM Epics WHERE id = ?",
        [sprints[0].epicId]
      );
      boardId = epics[0].boardId;
    } else if (subtaskId) {
      // Get board from subtask
      const [subtasks] = await pool.query(
        "SELECT taskId FROM Subtasks WHERE id = ?",
        [subtaskId]
      );
      if (!subtasks.length)
        return res.status(404).json({ error: "Subtask not found" });

      const [tasks] = await pool.query(
        "SELECT sprintId FROM Tasks WHERE id = ?",
        [subtasks[0].taskId]
      );
      const [sprints] = await pool.query(
        "SELECT epicId FROM Sprints WHERE id = ?",
        [tasks[0].sprintId]
      );
      const [epics] = await pool.query(
        "SELECT boardId FROM Epics WHERE id = ?",
        [sprints[0].epicId]
      );
      boardId = epics[0].boardId;
    }

    const hasAccess = await checkBoardAccess(req.user.id, boardId);
    if (!hasAccess) return res.status(403).json({ error: "Access denied" });

    const [result] = await pool.query(
      "INSERT INTO Comments (taskId, subtaskId, userId, content, fileName, filePath) VALUES (?, ?, ?, ?, ?, ?)",
      [taskId || null, subtaskId || null, req.user.id, content, fileName || null, filePath || null]
    );

    res.status(201).json({
      success: true,
      commentId: result.insertId,
      message: subtaskId ? "Comment added to subtask" : "Comment added to task",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to post comment" });
  }
});

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Task Management API v2",
    version: "2.0.0",
    hierarchy: "Board -> Epic -> Sprint -> Task -> Subtask",
    endpoints: {
      auth: "/api/auth",
      users: "/api/users",
      boards: "/api/boards",
      epics: "/api/boards/:id/epics",
      sprints: "/api/epics/:id/sprints",
      tasks: "/api/sprints/:id/tasks",
      subtasks: "/api/tasks/:id/subtasks",
      comments: "/api/tasks/:id/comments",
      timesheet: "/api/timesheet",
      health: "/api/health",
    },
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: "Endpoint not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ success: false, error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`
    🚀 Task Management Server v2
    =============================
    Server running on port ${PORT}
    Hierarchy: Board > Epic > Sprint > Task > Subtask
    `);
});

module.exports = app;