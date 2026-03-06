import React, { useEffect } from 'react';
import { BrowserRouter, HashRouter, Routes, Route, Navigate } from "react-router-dom";
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
          <HashRouter>
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
          </HashRouter>
        </GoogleOAuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;