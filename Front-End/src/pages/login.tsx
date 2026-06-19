// src/pages/login.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginUser } from "@/service/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import CustomModal, { ModalConfig } from "@/components/ui/modal";

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Estado do Modal
    const [modal, setModal] = useState<ModalConfig>({
        isOpen: false,
        type: 'success',
        title: '',
        message: '',
        onConfirm: () => {},
        onClose: () => setModal(prev => ({ ...prev, isOpen: false }))
    });

    const closeModal = () => setModal(prev => ({ ...prev, isOpen: false }));

    const showModal = (type: ModalConfig['type'], title: string, message: string, onClose: () => void = closeModal) => {
        setModal(prev => ({ ...prev, isOpen: true, type, title, message, onClose }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try{
           const response = await loginUser(formData);
            
            if (response.token) {
                localStorage.setItem("authToken", response.token);
                const userName = response.user?.name || "Viajante";
                const firstName = userName.split(" ")[0];
                localStorage.setItem("userName", firstName);
                
                // Em vez de ir direto, damos um pequeno feedback visual
                showModal('success', 'Bem-vindo de volta!', `Acessando o painel de ${firstName}...`, () => {
                    closeModal();
                    navigate("/dashboard");
                });

            } else {
                 showModal('error', 'Ops!', 'O servidor não retornou um token válido. Tente novamente.');
            }
        }catch(error){
            console.error("Erro ao fazer login:", error)
            showModal('error', 'Acesso Negado', 'E-mail ou senha incorretos. Verifique suas credenciais.');
        }finally{
            setIsLoading(false)
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

  return (
    <div className="min-h-screen flex w-full font-sans relative">
      
      {/* Coluna da Esquerda */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 text-center">
          <h1 className="text-6xl font-bold text-white mb-6 tracking-tight">
            Financial<span className="text-emerald-500">Plan</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-md mx-auto leading-relaxed">
            O sonho do seu intercâmbio começa com um planejamento seguro.
          </p>
        </div>
      </div>

      {/* Coluna da Direita */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md space-y-8">
          
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Bem-vindo de volta!</h2>
            <p className="text-slate-500 mt-2">Acesse sua conta para gerenciar suas metas.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            
            <div className="space-y-2 text-left">
              <label className="text-sm font-semibold text-slate-700">E-mail</label>
              <Input 
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email" 
                placeholder="seu@email.com" 
                className="focus-visible:ring-emerald-500 h-12"
                required
              />
            </div>

            <div className="space-y-2 text-left">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-slate-700">Senha</label>
                {/* O LINK FOI ATUALIZADO AQUI 👇 */}
                <Link to="/forgot-password" className="text-sm text-emerald-600 hover:underline font-medium">
                  Esqueceu a senha?
                </Link>
              </div>
              <div className="relative">
                  <Input 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    className="focus-visible:ring-emerald-500 h-12 pr-10"
                    required
                  />
                  <button
                    type="button" 
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-emerald-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
              </div>
            </div>

            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-md font-semibold h-12 transition-all"
            type="submit"
            disabled={isLoading}>
                {isLoading ? "Entrando..." : "Entrar"}
            </Button>
            
            <p className="text-center text-sm text-slate-600 mt-6">
              Ainda não tem uma conta?{" "}
              <Link to="/register" className="text-emerald-600 hover:underline font-semibold">
                Criar conta
              </Link>
            </p>

          </form>
        </div>
      </div>
      
      {/* Inserindo o Modal */}
      <CustomModal modal={modal} />

    </div>
  )
}