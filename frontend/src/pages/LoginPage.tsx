// import { useGoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
// import { useAuthStore } from '../store/authStore';
// import { useNavigate } from 'react-router-dom';
// import { Button } from "@/components/ui/button";

// export const LoginPage = () => {
//   const login = useAuthStore((state) => state.login);
//   const navigate = useNavigate();

//   const handleGoogleLogin = useGoogleLogin({
//     onSuccess: async (codeResponse) => {
//       await login(codeResponse.code);
//       navigate('/dashboard');
//     },
//     flow: 'auth-code', // Crucial: Your backend uses client.getToken({code}) [cite: 21]
//   });

//   return (
//     <GoogleOAuthProvider clientId= "565855815-lrios6rdi2beva9ie686ip5dscqbht3i.apps.googleusercontent.com">
//       <div className="flex h-screen items-center justify-center bg-slate-50">
//         <div className="w-full max-w-sm p-8 bg-white rounded-xl shadow-lg border border-slate-200">
//           <h1 className="text-2xl font-bold text-center mb-2">JiraBoard</h1>
//           <p className="text-slate-500 text-center mb-8">Sign in to manage your projects</p>
//           <Button 
//             className="w-full py-6 text-md font-semibold" 
//             onClick={() => handleGoogleLogin()}
//           >
//             Continue with Google
//           </Button>
//         </div>
//       </div>
//     </GoogleOAuthProvider>
//   );
// };
























// src/pages/LoginPage.tsx (Partial)
import { useGoogleLogin } from '@react-oauth/google';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

export const LoginPage = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        await login(codeResponse.code); // Passes short code starting with "4/" [cite: 1]
        navigate('/');
      } catch (error) {
        console.error("Authentication failed", error);
      }
    },
    flow: 'auth-code', // Required for your backend exchange [cite: 1]
  });

  return (
    <div className="flex h-screen items-center justify-center bg-slate-50">
      <div className="w-full max-w-sm p-8 bg-white rounded-xl shadow-lg border border-slate-200">
        <h1 className="text-2xl font-bold text-center mb-2">JiraBoard</h1>
        <p className="text-slate-500 text-center mb-8">Sign in to manage your projects</p>
        <Button 
          className="w-full py-6 text-md font-semibold" 
          onClick={() => handleGoogleLogin()}
        >
          Continue with Google
        </Button>
      </div>
    </div>
  );
};