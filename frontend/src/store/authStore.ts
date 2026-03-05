// import { create } from 'zustand';
// import api from '../lib/api';

// interface AuthState {
//   user: any | null;
//   isAuthenticated: boolean;
//   login: (code: string) => Promise<void>;
//   logout: () => void;
//   checkAuth: () => Promise<void>;
// }

// export const useAuthStore = create<AuthState>((set) => ({
//   user: null,
//   isAuthenticated: !!localStorage.getItem('token'),

//   login: async (code: string) => {
//     try {
//       // Hits your specific Google Auth route [cite: 21]
//       const response = await api.post('/api/auth/google', { code });
//       const { token, user } = response.data;
      
//       localStorage.setItem('token', token);
//       set({ user, isAuthenticated: true });
//     } catch (error) {
//       console.error("Login failed", error);
//       throw error;
//     }
//   },

//   logout: () => {
//     localStorage.removeItem('token');
//     set({ user: null, isAuthenticated: false });
//   },

//   checkAuth: async () => {
//     try {
//       const response = await api.get('/api/auth/me'); // Hits your verifyToken route [cite: 21]
//       set({ user: response.data.user, isAuthenticated: true });
//     } catch {
//       localStorage.removeItem('token');
//       set({ user: null, isAuthenticated: false });
//     }
//   }
// }));






import { create } from 'zustand';
import api from '../lib/api';

interface AuthState {
  user: any | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (code: string) => Promise<void>;
  logout: () => void;
  loadUser: () => Promise<void>; // Add this definition [cite: 20]
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: true, // Start as true to prevent flickering

  loadUser: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      set({ isAuthenticated: false, isLoading: false });
      return;
    }
    try {
      const response = await api.get('/api/auth/me'); // Matches index.js route [cite: 10]
      set({ user: response.data.user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      localStorage.removeItem('token');
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  login: async (code: string) => {
    set({ isLoading: true });
    try {
      const response = await api.post('/api/auth/google', { code });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, isAuthenticated: false });
  }
}));