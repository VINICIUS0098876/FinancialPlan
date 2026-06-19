// src/pages/forgot-password.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { requestPasswordReset } from "@/service/user";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      await requestPasswordReset(email);
      setIsSuccess(true);
    } catch (err: unknown) {
        console.error("Erro ao solicitar recuperação de senha:", err);
      setError((err instanceof Error ? err.message : "Não foi possível processar a solicitação.") || "Não foi possível processar a solicitação.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
            Recuperar <span className="text-emerald-500">Senha</span>
          </h1>
          <p className="text-slate-500 text-sm">
            Digite seu e-mail cadastrado e enviaremos um link para você redefinir sua senha.
          </p>
        </div>

        {isSuccess ? (
          <div className="text-center animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="text-emerald-500 w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">E-mail enviado!</h3>
            <p className="text-slate-600 mb-6 text-sm">
              Verifique sua caixa de entrada (e a pasta de spam) para redefinir sua senha.
            </p>
            <Link to="/login" className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors">
              Voltar para o Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Seu E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 text-slate-400 w-5 h-5" />
                <Input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="exemplo@email.com" 
                  className="pl-10 h-12 bg-slate-50 focus:bg-white" 
                  required 
                />
              </div>
            </div>

            {error && <p className="text-sm text-red-500 text-center font-medium">{error}</p>}

            <Button type="submit" disabled={isLoading} className="w-full bg-emerald-600 hover:bg-emerald-700 h-12 font-bold text-md shadow-md shadow-emerald-600/20 transition-all">
              {isLoading ? "Enviando..." : "Enviar Link de Recuperação"}
            </Button>

            <div className="text-center mt-6">
              <Link to="/login" className="inline-flex items-center text-sm text-slate-500 hover:text-slate-800 font-medium transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Lembrei minha senha
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}