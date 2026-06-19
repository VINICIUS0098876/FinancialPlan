// src/pages/profile.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getUserById, updateUser, deleteUser } from "@/service/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/components/ui/theme-provider";
import { 
  AlertCircle, Languages, Monitor, Moon, Sun, 
  Camera, User as UserIcon, Mail, KeyRound, Loader2, ShieldCheck
} from "lucide-react";

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
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();
  
  const [profileData, setProfileData] = useState({ name: "", email: "", password: "" });
  const [isFetching, setIsFetching] = useState(true);
  const [isProfileLoading, setIsProfileLoading] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setIsFetching(true);
      const id_user = getUserIdFromToken();
      if (!id_user) return;
      try {
        const userData = await getUserById(id_user);
        setProfileData({ name: userData.name, email: userData.email, password: "" }); 
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
      } finally {
        setIsFetching(false);
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
      
      // Limpamos o campo de senha após o sucesso
      setProfileData(prev => ({ ...prev, password: "" }));
      showModal('success', t('messages.profile_updated'), t('messages.profile_update_success'));
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      showModal('error', t('messages.profile_update_error_title'), t('messages.profile_update_error'));
    } finally {
      setIsProfileLoading(false);
    }
  };

  const handleDeleteAccount = () => {
    showModal('confirm', t('messages.delete_account_title'), t('messages.delete_account_confirm'),
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
      }, t('profile.delete_my_account')
    );
  };

  if (isFetching) {
    return (
      <div className="max-w-5xl mx-auto animate-pulse flex flex-col gap-8">
        <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-lg w-1/3 mb-2"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="h-96 bg-slate-200 dark:bg-slate-800 rounded-3xl md:col-span-1"></div>
          <div className="h-96 bg-slate-200 dark:bg-slate-800 rounded-3xl md:col-span-2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 max-w-5xl mx-auto pb-10">
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">{t('profile.title')}</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">{t('profile.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Coluna Esquerda: Avatar Premium */}
        <div className="md:col-span-1">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 flex flex-col items-center text-center transition-colors relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-emerald-500/10 to-transparent"></div>
            
            <div className="relative inline-block mt-4 mb-6">
              <div className="w-28 h-28 bg-gradient-to-tr from-emerald-100 to-teal-50 dark:from-emerald-900/40 dark:to-teal-900/20 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center text-4xl font-black shadow-inner ring-4 ring-white dark:ring-slate-900 relative z-10">
                {profileData.name ? profileData.name.charAt(0).toUpperCase() : "U"}
              </div>
              <button 
                type="button" 
                title="Alterar foto (Em breve)"
                className="absolute bottom-0 right-0 w-9 h-9 bg-white dark:bg-slate-800 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-full flex items-center justify-center shadow-lg border border-slate-100 dark:border-slate-700 transition-all z-20 hover:scale-110"
              >
                <Camera size={16} />
              </button>
            </div>

            <h3 className="text-2xl font-bold text-slate-800 dark:text-white leading-tight relative z-10">{profileData.name || t('profile.default_user')}</h3>
            <p className="text-slate-500 dark:text-slate-400 mt-1 relative z-10 font-medium">{profileData.email}</p>
            
            <div className="w-full h-px bg-slate-100 dark:bg-slate-800 my-8"></div>
            
            <div className="w-full text-left space-y-3 text-sm">
              <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-xl border border-slate-100 dark:border-slate-700/50">
                <span className="text-slate-500 dark:text-slate-400 font-semibold">{t('profile.status')}</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-100 dark:bg-emerald-500/10 px-2.5 py-1 rounded-md text-xs uppercase tracking-wider flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  {t('profile.status_active')}
                </span>
              </div>
              <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-xl border border-slate-100 dark:border-slate-700/50">
                <span className="text-slate-500 dark:text-slate-400 font-semibold">{t('profile.plan')}</span>
                <span className="text-slate-800 dark:text-slate-200 font-black">{t('profile.plan_traveler')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Coluna Direita: Formulários */}
        <div className="md:col-span-2 space-y-8">

          {/* CARD DE PREFERÊNCIAS DO SISTEMA (IDIOMA) */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors">
            <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center gap-3">
              <Languages className="text-emerald-600" size={24} />
              <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">{t('profile.language_title')}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t('profile.language_desc')}</p>
              </div>
            </div>
            <div className="p-8 flex flex-col sm:flex-row gap-4">
              <button 
                type="button"
                onClick={() => i18n.changeLanguage('pt')} 
                className={`flex-1 h-14 rounded-xl font-bold text-sm transition-all border-2 ${i18n.language === 'pt' ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-400 ring-4 ring-emerald-500/10' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-emerald-300 dark:hover:border-slate-600'}`}
              >
                🇧🇷 Português (BR)
              </button>
              <button 
                type="button"
                onClick={() => i18n.changeLanguage('en')} 
                className={`flex-1 h-14 rounded-xl font-bold text-sm transition-all border-2 ${i18n.language === 'en' ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-400 ring-4 ring-emerald-500/10' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-emerald-300 dark:hover:border-slate-600'}`}
              >
                🇺🇸 English (US)
              </button>
            </div>
          </div>

          {/* CARD DE APARÊNCIA (DARK MODE) */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors">
            <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center gap-3">
              <Moon className="text-emerald-600" size={24} />
              <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">{t('profile.theme_title')}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t('profile.theme_desc')}</p>
              </div>
            </div>
            <div className="p-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button 
                type="button"
                onClick={() => setTheme('light')} 
                className={`flex-1 flex flex-col items-center justify-center gap-3 h-28 rounded-xl font-bold text-sm transition-all border-2 ${theme === 'light' ? 'bg-emerald-50 border-emerald-500 text-emerald-700 dark:bg-emerald-500/10 ring-4 ring-emerald-500/10' : 'bg-white border-slate-200 text-slate-500 hover:border-emerald-300 dark:bg-slate-800 dark:border-slate-700'}`}
              >
                <Sun size={24} className={theme === 'light' ? 'text-emerald-600' : 'text-slate-400'} />
                {t('profile.theme_light')}
              </button>
              <button 
                type="button"
                onClick={() => setTheme('dark')} 
                className={`flex-1 flex flex-col items-center justify-center gap-3 h-28 rounded-xl font-bold text-sm transition-all border-2 ${theme === 'dark' ? 'bg-emerald-50 border-emerald-500 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 ring-4 ring-emerald-500/10' : 'bg-white border-slate-200 text-slate-500 hover:border-emerald-300 dark:bg-slate-800 dark:border-slate-700'}`}
              >
                <Moon size={24} className={theme === 'dark' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'} />
                {t('profile.theme_dark')}
              </button>
              <button 
                type="button"
                onClick={() => setTheme('system')} 
                className={`flex-1 flex flex-col items-center justify-center gap-3 h-28 rounded-xl font-bold text-sm transition-all border-2 ${theme === 'system' ? 'bg-emerald-50 border-emerald-500 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 ring-4 ring-emerald-500/10' : 'bg-white border-slate-200 text-slate-500 hover:border-emerald-300 dark:bg-slate-800 dark:border-slate-700'}`}
              >
                <Monitor size={24} className={theme === 'system' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'} />
                {t('profile.theme_system')}
              </button>
            </div>
          </div>

          {/* CARD DE INFORMAÇÕES BÁSICAS */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors">
            <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center gap-3">
              <ShieldCheck className="text-emerald-600" size={24} />
              <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">{t('profile.basic_info')}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t('profile.basic_info_desc')}</p>
              </div>
            </div>
            
            <div className="p-8">
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 text-left">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">{t('profile.full_name')}</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                        <UserIcon size={18} />
                      </div>
                      <Input 
                        value={profileData.name} 
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})} 
                        className="pl-11 h-12 bg-slate-50 dark:bg-slate-950 dark:border-slate-700 dark:text-white focus:bg-white dark:focus:bg-slate-800 transition-colors font-medium rounded-xl" 
                        required 
                      />
                    </div>
                  </div>

                  <div className="space-y-2 text-left">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">{t('profile.email')}</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                        <Mail size={18} />
                      </div>
                      <Input 
                        value={profileData.email} 
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})} 
                        type="email" 
                        className="pl-11 h-12 bg-slate-50 dark:bg-slate-950 dark:border-slate-700 dark:text-white focus:bg-white dark:focus:bg-slate-800 transition-colors font-medium rounded-xl" 
                        required 
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-left pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
                    {t('profile.security_password')} <span className="text-emerald-600 dark:text-emerald-500 font-normal ml-1">{t('profile.mandatory')}</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                      <KeyRound size={18} />
                    </div>
                    <Input 
                      value={profileData.password} 
                      onChange={(e) => setProfileData({...profileData, password: e.target.value})} 
                      type="password" 
                      placeholder="••••••••" 
                      className="pl-11 h-12 bg-slate-50 dark:bg-slate-950 dark:border-slate-700 dark:text-white focus:bg-white dark:focus:bg-slate-800 transition-colors font-medium rounded-xl" 
                      required 
                    />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed ml-1">
                    Para garantir sua segurança, informe sua senha atual para autorizar as alterações nesta página.
                  </p>
                </div>

                <div className="pt-6 flex justify-end">
                  <Button 
                    type="submit" 
                    disabled={isProfileLoading || !profileData.password} 
                    className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 h-12 px-8 text-md font-bold shadow-md shadow-emerald-600/20 transition-all text-white rounded-xl disabled:opacity-70 flex items-center gap-2"
                  >
                    {isProfileLoading && <Loader2 size={18} className="animate-spin" />}
                    {isProfileLoading ? t('profile.saving') : t('profile.save_changes')}
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* ZONA DE PERIGO */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-red-100 dark:border-red-900/30 overflow-hidden transition-colors">
            <div className="p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex-1">
                <h4 className="text-slate-800 dark:text-slate-200 font-bold mb-2 flex items-center gap-2">
                  <AlertCircle size={18} className="text-red-500" /> 
                  {t('profile.delete_account')}
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-md">
                  {t('profile.delete_account_desc')} Esta ação é irreversível e excluirá todo o seu planejamento de intercâmbio.
                </p>
              </div>
              <Button 
                onClick={handleDeleteAccount} 
                type="button" 
                variant="outline"
                className="w-full md:w-auto bg-transparent border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 hover:border-red-300 dark:hover:border-red-800 h-12 px-8 font-bold whitespace-nowrap transition-all rounded-xl"
              >
                {t('profile.delete_my_account')}
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}