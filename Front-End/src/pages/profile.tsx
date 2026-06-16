// src/pages/profile.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserById, updateUser, deleteUser } from "@/service/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle } from "lucide-react";

// Definimos o que o componente pai (Dashboard) precisa passar para o Perfil
interface ProfileProps {
  showModal: (
    type: 'success' | 'error' | 'confirm', 
    title: string, 
    message: string, 
    onConfirm?: () => void, 
    confirmText?: string
  ) => void;
  setUserNameState: (name: string) => void;
}

const getUserIdFromToken = () => {
  const token = localStorage.getItem("authToken");
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id_user; 
  } catch (e) {
    console.error("Erro ao decodificar token:", e);
    return null;
  }
};

export default function Profile({ showModal, setUserNameState }: ProfileProps) {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({ name: "", email: "", password: "" });
  const [isProfileLoading, setIsProfileLoading] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const id_user = getUserIdFromToken();
      if (!id_user) return;
      try {
        const userData = await getUserById(id_user);
        setProfileData({ name: userData.name, email: userData.email, password: "" }); 
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const id_user = getUserIdFromToken();
    if (!id_user) return;

    setIsProfileLoading(true);
    try {
      await updateUser(id_user, profileData);
      
      const firstName = profileData.name.split(" ")[0];
      localStorage.setItem("userName", firstName);
      setUserNameState(firstName);

      showModal('success', 'Perfil Atualizado', 'Seus dados foram atualizados com sucesso.');
    } catch (error) {
        console.error("Erro ao atualizar perfil:", error);
      showModal('error', 'Erro ao Atualizar', 'Verifique se os dados estão corretos. (A senha é obrigatória).');
    } finally {
      setIsProfileLoading(false);
    }
  };

  const handleDeleteAccount = () => {
    // Como o showModal vem por propriedade, ele fecha o modal se chamarmos a função passada no clique
    showModal('confirm', 'Excluir Conta Permanentemente?', 'Atenção: Ao excluir sua conta, TODAS as suas metas e transações serão apagadas para sempre. Deseja continuar?',
      async () => {
        const id_user = getUserIdFromToken();
        if (!id_user) return;

        try {
          await deleteUser(id_user);
          localStorage.removeItem("authToken");
          localStorage.removeItem("userName");
          localStorage.clear();
          navigate("/login");
        } catch (error) {
          console.error("Erro ao deletar conta:", error);
        }
      }, 'Excluir Minha Conta'
    );
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 max-w-5xl mx-auto">
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Meu Perfil</h2>
        <p className="text-slate-500 mt-2 text-lg">Gerencie suas informações pessoais e a segurança da conta.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Coluna Esquerda: Avatar */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 flex flex-col items-center text-center">
            <div className="w-28 h-28 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-4xl font-black mb-6 shadow-inner">
              {profileData.name ? profileData.name.charAt(0).toUpperCase() : "U"}
            </div>
            <h3 className="text-2xl font-bold text-slate-800 leading-tight">{profileData.name || "Usuário"}</h3>
            <p className="text-slate-500 mt-1">{profileData.email}</p>
            <div className="w-full h-px bg-slate-100 my-8"></div>
            <div className="w-full text-left space-y-4 text-sm">
              <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg">
                <span className="text-slate-500 font-medium">Status</span>
                <span className="text-emerald-600 font-bold bg-emerald-100 px-2 py-1 rounded-md text-xs uppercase tracking-wider">Ativo</span>
              </div>
              <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg">
                <span className="text-slate-500 font-medium">Plano</span>
                <span className="text-slate-700 font-bold">Viajante</span>
              </div>
            </div>
          </div>
        </div>

        {/* Coluna Direita: Formulários */}
        <div className="md:col-span-2 space-y-8">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-xl font-bold text-slate-800">Informações Básicas</h3>
              <p className="text-sm text-slate-500 mt-1">Atualize seus dados de acesso.</p>
            </div>
            <div className="p-8">
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div className="space-y-2 text-left">
                  <label className="text-sm font-semibold text-slate-700">Nome completo</label>
                  <Input value={profileData.name} onChange={(e) => setProfileData({...profileData, name: e.target.value})} className="h-12 bg-slate-50 focus:bg-white transition-colors" required />
                </div>

                <div className="space-y-2 text-left">
                  <label className="text-sm font-semibold text-slate-700">E-mail principal</label>
                  <Input value={profileData.email} onChange={(e) => setProfileData({...profileData, email: e.target.value})} type="email" className="h-12 bg-slate-50 focus:bg-white transition-colors" required />
                </div>

                <div className="space-y-2 text-left pt-6 mt-6 border-t border-slate-100">
                  <label className="text-sm font-semibold text-slate-700">Senha de Segurança <span className="text-emerald-600 font-normal ml-1">(Obrigatório)</span></label>
                  <Input value={profileData.password} onChange={(e) => setProfileData({...profileData, password: e.target.value})} type="password" placeholder="••••••••" className="h-12 bg-slate-50 focus:bg-white transition-colors" required />
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">Para salvar as alterações acima, confirme sua senha atual. <br/>Se deseja trocar de senha, digite a nova senha neste campo.</p>
                </div>

                <div className="pt-4 flex justify-end">
                  <Button type="submit" disabled={isProfileLoading} className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 h-12 px-8 text-md font-semibold shadow-md shadow-emerald-600/20 transition-all">
                    {isProfileLoading ? "Salvando..." : "Salvar Alterações"}
                  </Button>
                </div>
              </form>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-red-200 overflow-hidden">
            <div className="px-8 py-6 border-b border-red-100 bg-red-50/80">
              <h3 className="text-lg font-bold text-red-700 flex items-center gap-2">
                <AlertCircle size={20} className="text-red-500" /> Zona de Perigo
              </h3>
              <p className="text-sm text-red-500/80 mt-1 font-medium">Ações destrutivas e irreversíveis da sua conta.</p>
            </div>
            <div className="p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex-1">
                <h4 className="text-slate-800 font-bold mb-2">Excluir Conta Permanentemente</h4>
                <p className="text-sm text-slate-500 leading-relaxed max-w-md">Uma vez que você excluir sua conta, não haverá como recuperar suas metas financeiras e transações. Por favor, tenha certeza.</p>
              </div>
              <Button onClick={handleDeleteAccount} type="button" className="w-full md:w-auto bg-white border-2 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300 h-12 px-6 font-semibold whitespace-nowrap transition-all shadow-sm">
                Excluir Minha Conta
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}