// src/pages/reset-password.tsx
import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { resetPassword } from "@/service/user";
import { Lock, AlertCircle } from "lucide-react";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); // Pega o token da URL
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setError("Token de recuperação não encontrado.");
      return;
    }

    setIsLoading(true);
    setError("");
    
    try {
      await resetPassword(token, password);
      // Se deu certo, redireciona o usuário para o login!
      navigate("/login?reset=success");
    } catch (err: unknown) {
      console.error("Erro ao redefinir senha:", err);
      setError(err instanceof Error ? err.message : "Erro ao redefinir a senha.");
    } finally {
      setIsLoading(false);
    }
  };

  // Se a pessoa abrir a página sem um token na URL, mostra um aviso
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-800 mb-2">Link Inválido</h2>
          <p className="text-slate-500 mb-6">Este link de recuperação está quebrado ou faltando informações.</p>
          <Link to="/forgot-password" className="text-emerald-600 font-bold hover:text-emerald-700">Solicitar novo link</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
            Nova <span className="text-emerald-500">Senha</span>
          </h1>
          <p className="text-slate-500 text-sm">
            Crie uma nova senha de segurança para a sua conta.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Nova Senha</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-slate-400 w-5 h-5" />
              <Input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="••••••••" 
                className="pl-10 h-12 bg-slate-50 focus:bg-white" 
                required 
                minLength={6}
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-500 text-center font-medium">{error}</p>}

          <Button type="submit" disabled={isLoading} className="w-full bg-emerald-600 hover:bg-emerald-700 h-12 font-bold text-md shadow-md shadow-emerald-600/20 transition-all">
            {isLoading ? "Salvando..." : "Redefinir Senha"}
          </Button>
        </form>
      </div>
    </div>
  );
}