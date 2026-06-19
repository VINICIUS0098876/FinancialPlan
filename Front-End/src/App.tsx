// src/App.tsx
import { ReactNode } from "react"; // 1. Importamos o ReactNode
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import ForgotPassword from "./pages/forgot-password";
import ResetPassword from "./pages/reset-password";
import { ThemeProvider } from "@/components/ui/theme-provider"
import './lib/i18n' // Importa a configuração do i18n

// 2. Trocamos JSX.Element por ReactNode
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem("authToken");
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="financialplan-theme">
      <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      <Route 
          path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute> } />
      </Routes>
    </BrowserRouter>
    </div>
    </ThemeProvider>
  );
}