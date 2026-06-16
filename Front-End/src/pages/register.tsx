// src/pages/register.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "@/service/auth";
import { Eye, EyeOff } from "lucide-react";
import CustomModal, { ModalConfig } from "@/components/ui/modal";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar senha
  
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

    try {
      await registerUser(formData);
      
      // Abre o modal de sucesso. Passamos uma função para o onClose que redireciona após fechar o modal.
      showModal(
        'success', 
        'Bem-vindo(a)!', 
        'Seu cadastro foi realizado com sucesso. Agora você pode acessar sua conta.',
        () => {
            closeModal();
            navigate("/login");
        }
      );
      
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      showModal('error', 'Ops!', 'Erro ao realizar o cadastro. Verifique os dados e tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

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
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              Sua primeira vez aqui?
            </h2>
            <p className="text-slate-500 mt-2">
              Preencha seus dados para começar.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2 text-left">
              <label className="text-sm font-semibold text-slate-700">Nome completo</label>
              <Input
                onChange={handleChange}
                value={formData.name}
                name="name"
                type="text"
                placeholder="Seu nome"
                className="focus-visible:ring-emerald-500 h-12"
                required
              />
            </div>

            <div className="space-y-2 text-left">
              <label className="text-sm font-semibold text-slate-700">E-mail</label>
              <Input
                onChange={handleChange}
                value={formData.email}
                name="email"
                type="email"
                placeholder="seu@email.com"
                className="focus-visible:ring-emerald-500 h-12"
                required
              />
            </div>

            <div className="space-y-2 text-left">
              <label className="text-sm font-semibold text-slate-700">Senha</label>
              <div className="relative">
                <Input
                  onChange={handleChange}
                  value={formData.password}
                  name="password"
                  type={showPassword ? "text" : "password"} // Dinâmico!
                  placeholder="••••••••"
                  className="focus-visible:ring-emerald-500 h-12 pr-10" // Padding right para o ícone não sobrepor o texto
                  required
                />
                <button
                  type="button" // Importante para não submeter o formulário ao clicar
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-emerald-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <Button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-md font-semibold h-12 transition-all"
            >
              {isLoading ? "Cadastrando..." : "Cadastrar"}
            </Button>

            <p className="text-center text-sm text-slate-600 mt-6">
              Já tem uma conta?{" "}
              <Link to="/login" className="text-emerald-600 hover:underline font-semibold">
                Entrar
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Inserindo o Modal */}
      <CustomModal modal={modal} />
    </div>
  );
}