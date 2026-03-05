// // // import { useAuthStore } from './store/authStore';
// // // import { LoginPage } from './pages/LoginPage';
// // // import { Toaster } from "@/components/ui/toaster";
// // // import { Toaster as Sonner } from "@/components/ui/sonner";
// // // import { TooltipProvider } from "@/components/ui/tooltip";
// // // import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// // // import { BrowserRouter, Routes, Route } from "react-router-dom";
// // // import BoardsPage from "./pages/BoardsPage";
// // // import BoardDetailPage from "./pages/BoardDetailPage";
// // // import NotFound from "./pages/NotFound";

// // // const queryClient = new QueryClient();

// // // const App = () => (
// // //   <QueryClientProvider client={queryClient}>
// // //     <TooltipProvider>
// // //       <Toaster />
// // //       <Sonner />
// // //       <BrowserRouter>
// // //         <div className="dark">
// // //           <Routes>
// // //             <Route path="/" element={<BoardsPage />} />
// // //             <Route path="/board/:boardId" element={<BoardDetailPage />} />
// // //             <Route path="*" element={<NotFound />} />
// // //           </Routes>
// // //         </div>
// // //       </BrowserRouter>
// // //     </TooltipProvider>
// // //   </QueryClientProvider>
// // // );

// // // export default App;








// // import React, { useEffect } from 'react';
// // import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// // import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// // import { TooltipProvider } from "@/components/ui/tooltip";
// // import { Toaster } from "@/components/ui/toaster";
// // import { Toaster as Sonner } from "@/components/ui/sonner";

// // // State and Authentication
// // import { useAuthStore } from './store/authStore';
// // import { LoginPage } from './pages/LoginPage';

// // // Pages
// // import BoardsPage from "./pages/BoardsPage";
// // import BoardDetailPage from "./pages/BoardDetailPage";
// // import NotFound from "./pages/NotFound";

// // import './App.css';

// // const queryClient = new QueryClient();

// // // Helper component to protect private routes [cite: 5]
// // const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
// //   const { isAuthenticated, isLoading } = useAuthStore();

// //   if (isLoading) {
// //     return (
// //       <div className="flex items-center justify-center min-h-screen bg-slate-950 text-white">
// //         Loading...
// //       </div>
// //     );
// //   }

// //   if (!isAuthenticated) {
// //     return <Navigate to="/login" replace />;
// //   }

// //   return <>{children}</>;
// // };

// // const App = () => {
// //   const { loadUser, isAuthenticated } = useAuthStore();

// //   // Verify the user's session on initial app load [cite: 5]
// //   useEffect(() => {
// //     loadUser();
// //   }, [loadUser]);

// //   return (
// //     <QueryClientProvider client={queryClient}>
// //       <TooltipProvider>
// //         <Toaster />
// //         <Sonner />
// //         <BrowserRouter>
// //           <div className="dark">
// //             <Routes>
// //               {/* Public Route */}
// //               <Route 
// //                 path="/login" 
// //                 element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" replace />} 
// //               /> 

// //               {/* Protected Application Routes */}
// //               <Route 
// //                 path="/" 
// //                 element={
// //                   <ProtectedRoute>
// //                     <BoardsPage />
// //                   </ProtectedRoute>
// //                 } 
// //               /> [cite: 5]
              
// //               <Route 
// //                 path="/board/:boardId" 
// //                 element={
// //                   <ProtectedRoute>
// //                     <BoardDetailPage />
// //                   </ProtectedRoute>
// //                 } 
// //               /> [cite: 5]

// //               {/* Catch-all */}
// //               <Route path="*" element={<NotFound />} />
// //             </Routes>
// //           </div>
// //         </BrowserRouter>
// //       </TooltipProvider>
// //     </QueryClientProvider>
// //   );
// // };

// // export default App;





































































// import React, { useEffect } from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";

// import { useAuthStore } from './store/authStore';
// import { LoginPage } from './pages/LoginPage';
// import BoardsPage from "./pages/BoardsPage";
// import BoardDetailPage from "./pages/BoardDetailPage";
// import NotFound from "./pages/NotFound";

// const queryClient = new QueryClient();

// const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
//   const { isAuthenticated, isLoading } = useAuthStore();

//   if (isLoading) return <div className="flex h-screen items-center justify-center dark:bg-slate-950">Loading...</div>;
//   return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
// };

// const App = () => {
//   const { loadUser, isAuthenticated } = useAuthStore();

//   useEffect(() => {
//     loadUser(); // Now this will be defined
//   }, [loadUser]);

//   return (
//     <QueryClientProvider client={queryClient}>
//       <TooltipProvider>
//         <Toaster />
//         <Sonner />
//         <BrowserRouter>
//           <div className="dark">
//             <Routes>
//               <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" replace />} />
//               <Route path="/" element={<ProtectedRoute><BoardsPage /></ProtectedRoute>} />
//               <Route path="/board/:boardId" element={<ProtectedRoute><BoardDetailPage /></ProtectedRoute>} />
//               <Route path="*" element={<NotFound />} />
//             </Routes>
//           </div>
//         </BrowserRouter>
//       </TooltipProvider>
//     </QueryClientProvider>
//   );
// };

// export default App;


















import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { GoogleOAuthProvider } from '@react-oauth/google'; //

import { useAuthStore } from './store/authStore';
import { LoginPage } from './pages/LoginPage';
import BoardsPage from "./pages/BoardsPage";
import BoardDetailPage from "./pages/BoardDetailPage";
import TimesheetPage from './pages/TimesheetPage';
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) return <div className="flex h-screen items-center justify-center dark:bg-slate-950">Loading...</div>;
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const App = () => {
  const { loadUser, isAuthenticated } = useAuthStore();

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Wrap with GoogleOAuthProvider using your Client ID [cite: 1] */}
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || ""}>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="dark">
              <Routes>
                <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" replace />} />
                <Route path="/" element={<ProtectedRoute><BoardsPage /></ProtectedRoute>} />
                <Route path="/board/:boardId" element={<ProtectedRoute><BoardDetailPage /></ProtectedRoute>} />
                {/* Add the Timesheet Route */}
                <Route path="/timesheet" element={<ProtectedRoute><TimesheetPage /></ProtectedRoute>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </GoogleOAuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;