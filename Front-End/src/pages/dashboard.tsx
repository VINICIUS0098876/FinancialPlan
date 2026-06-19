// src/pages/dashboard.tsx
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Checklist from "./checklist";
import { getExchangeGoals, createExchangeGoal, updateExchangeGoal, deleteExchangeGoal, ExchangeGoal } from "@/service/exchangeGoal";
import { getTransactions, Transaction } from "@/service/transaction"; 
import { getBudgets, createBudget, deleteBudget, Budget } from "@/service/budget";
import Profile from "./profile"; 
import Transactions from "./transactions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  LayoutDashboard, PlaneTakeoff, Receipt, LogOut, Trash2, Pencil, 
  CheckCircle2, XCircle, AlertCircle, User, Globe2, Target, TrendingUp, ListTodo, Menu, X,
  Plus, PieChart, Ticket, Bed, Utensils, GraduationCap, FileText, LayoutGrid, ChevronDown, CalendarDays
} from "lucide-react";

type ModalConfig = {
  isOpen: boolean;
  type: 'success' | 'error' | 'confirm';
  title: string;
  message: string;
  confirmText?: string; 
  onConfirm: () => void;
};

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

// Array de categorias com ícones para os Dropdowns bonitos
const CATEGORIES = [
  { id: "Passagens", icon: <Ticket size={16} /> },
  { id: "Acomodação", icon: <Bed size={16} /> },
  { id: "Alimentação", icon: <Utensils size={16} /> },
  { id: "Cursos", icon: <GraduationCap size={16} /> },
  { id: "Documentação & Visto", icon: <FileText size={16} /> },
  { id: "Outros", icon: <LayoutGrid size={16} /> },
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Passagens': return <Ticket size={24} />;
    case 'Acomodação': return <Bed size={24} />;
    case 'Alimentação': return <Utensils size={24} />;
    case 'Cursos': return <GraduationCap size={24} />;
    case 'Documentação & Visto': return <FileText size={24} />;
    default: return <LayoutGrid size={24} />;
  }
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  
  const [activeTab, setActiveTab] = useState<'dashboard' | 'profile' | 'transactions' | 'checklist'>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [goals, setGoals] = useState<ExchangeGoal[]>([]);
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]); 
  const [loading, setLoading] = useState(true);
  
  const [isCreating, setIsCreating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [modal, setModal] = useState<ModalConfig>({
    isOpen: false, type: 'success', title: '', message: '', confirmText: '', onConfirm: () => {}
  });

  const [newGoal, setNewGoal] = useState({ 
    id_user: "", destination: "", target_currency: "EUR", amount_needed: "" 
  });

  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [newBudget, setNewBudget] = useState({ category: 'Passagens', amount_limit: '' });
  
  type DashboardBudget = Budget & { spent: number };

  const [budgets, setBudgets] = useState<DashboardBudget[]>([]);

  const [userName, setUserNameState] = useState(() => {
    const storedName = localStorage.getItem("userName");
    return (storedName && storedName !== "undefined") ? storedName : t('profile.default_user');
  });

  const closeModal = () => setModal(prev => ({ ...prev, isOpen: false }));

  const showModal = (type: ModalConfig['type'], title: string, message: string, onConfirm: () => void = closeModal, confirmText?: string) => {
    setModal({ isOpen: true, type, title, message, onConfirm, confirmText });
  };

  const fetchDashboardData = useCallback(async () => {
    try {
      const [goalsData, txData, budgetsData] = await Promise.all([
        getExchangeGoals().catch(() => []), 
        getTransactions().catch(() => []),
        getBudgets().catch(() => []) 
      ]);
      
      setGoals(Array.isArray(goalsData) ? goalsData : []);
      setAllTransactions(Array.isArray(txData) ? txData : []);
      
      let extractedBudgets: Array<Budget & { amount_limit: string | number }> = [];
      
      if (budgetsData && Array.isArray(budgetsData.budget)) {
        extractedBudgets = budgetsData.budget;
      } else if (budgetsData && Array.isArray(budgetsData.budgets)) {
        extractedBudgets = budgetsData.budgets;
      } else if (Array.isArray(budgetsData)) {
        extractedBudgets = budgetsData;
      }

      const safeBudgets = extractedBudgets.map((b) => ({
        ...b,
        amount_limit: Number(b.amount_limit),
        spent: 0 
      }));

      setBudgets(safeBudgets);
      
    } catch (error) {
      console.error("Erro ao buscar dados do painel:", error);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }
    const loadInitialData = async () => {
      setLoading(true);
      await fetchDashboardData();
      setLoading(false);
    };
    loadInitialData();
  }, [navigate, fetchDashboardData]);

  const handleSaveGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingId) {
        await updateExchangeGoal(editingId, {
          id_user: getUserIdFromToken(),
          destination: newGoal.destination,
          target_currency: newGoal.target_currency,
          amount_needed: Number(newGoal.amount_needed),
          deadline: new Date("2027-12-31T00:00:00Z").toISOString() 
        });
        showModal('success', t('messages.all_good'), t('messages.plan_updated'));
      } else {
        await createExchangeGoal({
          destination: newGoal.destination,
          target_currency: newGoal.target_currency,
          amount_needed: Number(newGoal.amount_needed),
          deadline: new Date("2027-12-31T00:00:00Z").toISOString() 
        });
        showModal('success', t('messages.destination_created'), t('messages.plan_saved'));
      }
      resetForm();
      await fetchDashboardData(); 
    } catch (error) {
      console.error("Erro ao salvar planejamento:", error);
      showModal('error', t('messages.ops_error'), t('messages.process_error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveBudgetForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createBudget({
        category: newBudget.category,
        amount_limit: Number(newBudget.amount_limit)
      });
      
      setIsBudgetModalOpen(false);
      setNewBudget({ category: 'Passagens', amount_limit: '' });
      await fetchDashboardData(); 
      showModal('success', 'Sucesso!', 'Orçamento atualizado com sucesso.');
      
    } catch (error) {
      console.error("Erro ao salvar orçamento:", error);
      showModal('error', 'Ops!', 'Erro ao salvar o orçamento.');
    }
  };

  const handleDeleteBudgetClick = (id: string | undefined) => {
    if (!id) return;
    showModal('confirm', 'Excluir Orçamento', 'Tem certeza que deseja excluir o limite para esta categoria? As transações vinculadas a ela não serão apagadas.',
      async () => {
        closeModal();
        try {
          await deleteBudget(id);
          await fetchDashboardData();
          setTimeout(() => showModal('success', 'Excluído', 'Orçamento excluído com sucesso.'), 300);
        } catch (error) {
          console.error("Erro ao excluir orçamento:", error);
          setTimeout(() => showModal('error', t('messages.error'), 'Não foi possível excluir o orçamento.'), 300);
        }
      }, 'Excluir'
    );
  };

  const handleEditClick = (goal: ExchangeGoal) => {
    setEditingId(goal.id_exchange_goal as string);
    setNewGoal({
      id_user: goal.id_user as string,
      destination: goal.destination,
      target_currency: goal.target_currency,
      amount_needed: String(goal.amount_needed)
    });
    setIsCreating(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteClick = (id: string) => {
    showModal('confirm', t('messages.delete_plan_title'), t('messages.delete_plan_confirm'),
      async () => {
        closeModal();
        try {
          await deleteExchangeGoal(id);
          await fetchDashboardData();
          setTimeout(() => showModal('success', t('messages.deleted'), t('messages.plan_deleted')), 300);
        } catch (error) {
          console.error("Erro ao excluir planejamento:", error);
          setTimeout(() => showModal('error', t('messages.error'), t('messages.delete_plan_error')), 300);
        }
      }, t('messages.delete_plan_btn')
    );
  };

  const resetForm = () => {
    setIsCreating(false);
    setEditingId(null);
    setNewGoal({ id_user: "", destination: "", target_currency: "EUR", amount_needed: "" });
  };

  const handleLogout = () => {
    showModal('confirm', t('messages.logout_title'), t('messages.logout_confirm'),
      () => {
        closeModal();
        localStorage.removeItem("authToken");
        localStorage.removeItem("userName");
        localStorage.clear();

        i18n.changeLanguage('pt');
        
        navigate("/login");
      }, t('messages.logout_btn')
    );
  };

  const changeTab = (tab: typeof activeTab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  const totalGoalsCount = goals.length;
  const targetsByCurrency = goals.reduce((acc, goal) => {
    const currency = goal.target_currency || 'USD';
    acc[currency] = (acc[currency] || 0) + (Number(goal.amount_needed) || 0);
    return acc;
  }, {} as Record<string, number>);

  const targetEntries = Object.entries(targetsByCurrency);
  const totalSavedAmount = allTransactions.reduce((acc, t) => acc + Number(t.amount_brl), 0);
  const userInitial = userName ? userName.charAt(0).toUpperCase() : "U";

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 font-sans overflow-hidden relative transition-colors duration-300">
      
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside className={`fixed md:static inset-y-0 left-0 z-50 w-72 bg-slate-900 flex flex-col transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} border-r border-slate-800 shadow-2xl md:shadow-none`}>
        <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="p-8 relative z-10 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Financial<span className="text-emerald-500">Plan</span>
          </h1>
          <button className="md:hidden text-slate-400 hover:text-white transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-2 space-y-2 relative z-10">
          <button onClick={() => changeTab('dashboard')} className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl font-semibold transition-colors ${activeTab === 'dashboard' ? 'bg-emerald-600/15 text-emerald-500' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
            <LayoutDashboard size={20} /> {t('sidebar.dashboard')}
          </button>
          
          <button onClick={() => changeTab('profile')} className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl font-semibold transition-colors ${activeTab === 'profile' ? 'bg-emerald-600/15 text-emerald-500' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
            <User size={20} /> {t('sidebar.profile')}
          </button>

          <button onClick={() => changeTab('transactions')} className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl font-semibold transition-colors ${activeTab === 'transactions' ? 'bg-emerald-600/15 text-emerald-500' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
            <Receipt size={20} /> {t('sidebar.transactions')}
          </button>

          <button onClick={() => changeTab('checklist')} className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl font-semibold transition-colors ${activeTab === 'checklist' ? 'bg-emerald-600/15 text-emerald-500' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
            <ListTodo size={20} /> {t('sidebar.checklist')}
          </button>
        </nav>

        <div className="p-4 relative z-10 mt-auto">
          <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-4 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold text-lg border border-emerald-500/30">
                {userInitial}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-xs text-slate-400 font-medium">{t('sidebar.logged_as')}</p>
                <p className="text-sm text-white font-bold truncate">{userName}</p>
              </div>
            </div>
            
            <div className="h-px w-full bg-slate-700/50"></div>
            
            <button onClick={handleLogout} className="flex items-center justify-center gap-2 w-full py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-500 rounded-lg font-medium transition-colors">
              <LogOut size={16} /> {t('sidebar.logout')}
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex justify-between items-center sticky top-0 z-30 shadow-sm transition-colors">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            Financial<span className="text-emerald-500">Plan</span>
          </h1>
          <button onClick={() => setIsMobileMenuOpen(true)} className="text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors p-1">
            <Menu size={26} />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto relative">
          <div className="max-w-6xl mx-auto p-6 md:p-8 lg:p-12">
            
            {activeTab === 'dashboard' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">{t('dashboard.title')}</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 text-base md:text-lg">{t('dashboard.subtitle')}</p>
                  </div>
                  <Button 
                    onClick={isCreating ? resetForm : () => setIsCreating(true)} 
                    className={`w-full md:w-auto text-white shadow-md h-12 px-6 font-semibold transition-all ${isCreating ? 'bg-slate-500 hover:bg-slate-600 dark:bg-slate-600 dark:hover:bg-slate-700' : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20 hover:scale-105'}`}
                  >
                    {isCreating ? t('dashboard.cancel') : t('dashboard.create_new')}
                  </Button>
                </div>

                {!isCreating && !loading && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-10">
                      <div className="bg-white dark:bg-slate-900 p-5 md:p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 flex items-center gap-4 h-full transition-colors">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-blue-50 dark:bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                          <Globe2 size={24} className="md:w-7 md:h-7" />
                        </div>
                        <div>
                          <p className="text-xs md:text-sm font-semibold text-slate-500 dark:text-slate-400">{t('dashboard.active_destinations')}</p>
                          <h4 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white">{totalGoalsCount}</h4>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-slate-900 p-5 md:p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 flex items-center gap-4 h-full transition-colors">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-amber-50 dark:bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                          <Target size={24} className="md:w-7 md:h-7" />
                        </div>
                        <div className="flex flex-col flex-1 overflow-hidden">
                          <p className="text-xs md:text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">{t('dashboard.total_objective')}</p>
                          {targetEntries.length === 0 ? (
                            <h4 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white">
                              <span className="text-sm md:text-lg text-slate-400 dark:text-slate-500 mr-1">$</span>0
                            </h4>
                          ) : (
                            <div className="flex flex-col gap-1.5 max-h-[76px] overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin' }}>
                              {targetEntries.map(([currency, amount]) => (
                                <h4 key={currency} className="text-lg md:text-xl font-bold text-slate-800 dark:text-white leading-none shrink-0">
                                  <span className="text-xs md:text-sm text-slate-400 dark:text-slate-500 mr-1">{currency}</span>
                                  {amount.toLocaleString(i18n.language === 'en' ? 'en-US' : 'pt-BR')}
                                </h4>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="bg-white dark:bg-slate-900 p-5 md:p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 flex items-center gap-4 relative overflow-hidden h-full transition-colors">
                        <div className="absolute right-0 top-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl"></div>
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 flex items-center justify-center relative z-10 shrink-0">
                          <TrendingUp size={24} className="md:w-7 md:h-7" />
                        </div>
                        <div className="relative z-10">
                          <p className="text-xs md:text-sm font-semibold text-slate-500 dark:text-slate-400">{t('dashboard.total_saved')}</p>
                          <h4 className="text-xl md:text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                            <span className="text-sm md:text-lg text-emerald-400/80 mr-1">R$</span>
                            {totalSavedAmount.toLocaleString(i18n.language === 'en' ? 'en-US' : 'pt-BR')}
                          </h4>
                        </div>
                      </div>
                    </div>

                    {/* === SESSÃO DE ORÇAMENTOS === */}
                    <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                          <PieChart className="text-emerald-500" />
                          Controle de Orçamentos
                        </h3>
                        <Button onClick={() => setIsBudgetModalOpen(true)} className="bg-white dark:bg-slate-800 text-emerald-600 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 font-semibold rounded-full px-4 md:px-6 shadow-sm">
                          <Plus size={18} className="mr-1 md:mr-2" /> 
                          <span className="hidden md:inline">Novo Limite</span>
                          <span className="md:hidden">Novo</span>
                        </Button>
                      </div>

                      {budgets.length === 0 ? (
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 text-center">
                          <p className="text-slate-500 dark:text-slate-400 mb-4">Você ainda não definiu nenhum orçamento para as categorias.</p>
                          <Button onClick={() => setIsBudgetModalOpen(true)} variant="outline" className="text-emerald-600 dark:text-emerald-500 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 bg-transparent dark:bg-transparent">
                            Criar Primeiro Orçamento
                          </Button>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                          {budgets.map((budget, index) => {

                            const spent = allTransactions
                              .filter(t => t.category === budget.category)
                              .reduce((acc, t) => acc + Number(t.amount_brl), 0);

                            const percentage = Math.min((spent / budget.amount_limit) * 100, 100);
                            const isDanger = percentage >= 90;
                            const isWarning = percentage >= 75 && percentage < 90;
                            
                            let barColor = "bg-emerald-500";
                            if (isDanger) barColor = "bg-red-500";
                            else if (isWarning) barColor = "bg-amber-500";

                            return (
                              <div key={index} className="bg-white dark:bg-slate-900 p-5 md:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all relative overflow-hidden group">
                                <div className="flex justify-between items-start mb-6">
                                  <div className="flex items-center gap-3">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${isDanger ? 'bg-red-50 dark:bg-red-500/10 text-red-500' : isWarning ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-500' : 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500'}`}>
                                      {getCategoryIcon(budget.category)}
                                    </div>
                                    <div>
                                      <h4 className="font-bold text-slate-800 dark:text-white text-lg">{budget.category}</h4>
                                    </div>
                                  </div>
                                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => {
                                        setNewBudget({ category: budget.category, amount_limit: String(budget.amount_limit) });
                                        setIsBudgetModalOpen(true);
                                    }} className="p-2 text-slate-400 hover:text-emerald-500 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800" title="Editar Limite">
                                      <Pencil size={16} />
                                    </button>
                                    <button onClick={() => handleDeleteBudgetClick(budget.id_budget)} className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800" title="Excluir Orçamento">
                                      <Trash2 size={16} />
                                    </button>
                                  </div>
                                </div>

                                <div className="space-y-3">
                                  <div className="flex justify-between text-sm items-end">
                                    <span className="font-black text-slate-800 dark:text-white text-2xl">
                                      R$ {spent.toLocaleString(i18n.language === 'en' ? 'en-US' : 'pt-BR')}
                                    </span>
                                    <span className="text-slate-500 font-medium mb-1">
                                      de R$ {budget.amount_limit.toLocaleString(i18n.language === 'en' ? 'en-US' : 'pt-BR')}
                                    </span>
                                  </div>

                                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 md:h-3 rounded-full overflow-hidden shadow-inner">
                                    <div className={`${barColor} h-full rounded-full transition-all duration-1000`} style={{ width: `${percentage}%` }}></div>
                                  </div>
                                  
                                  <p className={`text-xs font-bold text-right mt-1 ${isDanger ? 'text-red-500' : isWarning ? 'text-amber-500' : 'text-emerald-500'}`}>
                                    {isDanger ? 'Limite estourado!' : `${(100 - percentage).toFixed(1)}% disponível`}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </>
                )}

                {isCreating && (
                  <div className="mb-10 p-6 md:p-8 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-emerald-100 dark:border-slate-800 relative overflow-hidden animate-in zoom-in-95 duration-200 transition-colors">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                      <PlaneTakeoff className="text-emerald-500" />
                      {editingId ? t('dashboard.editing_destination') : t('dashboard.new_destination')}
                    </h3>
                    
                    <form onSubmit={handleSaveGoal} className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-end">
                      <div className="md:col-span-5 space-y-2">
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t('dashboard.where_to')}</label>
                        <Input value={newGoal.destination} onChange={(e) => setNewGoal({...newGoal, destination: e.target.value})} placeholder={t('dashboard.destination_placeholder')} className="h-12 bg-slate-50 dark:bg-slate-950 focus:bg-white dark:focus:bg-slate-800 dark:border-slate-700 dark:text-white transition-colors" required />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t('dashboard.target_currency')}</label>
                        <Input value={newGoal.target_currency} onChange={(e) => setNewGoal({...newGoal, target_currency: e.target.value.toUpperCase()})} maxLength={3} placeholder="EUR" className="h-12 bg-slate-50 dark:bg-slate-950 focus:bg-white dark:focus:bg-slate-800 dark:border-slate-700 dark:text-white transition-colors" required />
                      </div>
                      <div className="md:col-span-3 space-y-2">
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t('dashboard.amount_needed')}</label>
                        <Input type="number" value={newGoal.amount_needed} onChange={(e) => setNewGoal({...newGoal, amount_needed: e.target.value})} placeholder="Ex: 30000" min="1" className="h-12 bg-slate-50 dark:bg-slate-950 focus:bg-white dark:focus:bg-slate-800 dark:border-slate-700 dark:text-white transition-colors" required />
                      </div>
                      <div className="md:col-span-2 mt-2 md:mt-0">
                        <Button type="submit" disabled={isSubmitting} className="w-full bg-emerald-600 hover:bg-emerald-700 h-12 text-md font-bold shadow-md shadow-emerald-600/20">
                          {isSubmitting ? t('dashboard.saving') : (editingId ? t('dashboard.update') : t('dashboard.save'))}
                        </Button>
                      </div>
                    </form>
                  </div>
                )}

                {loading ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                    {[1, 2, 3].map((skeleton) => (
                      <div key={skeleton} className="p-6 md:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 flex flex-col justify-between min-h-[280px] animate-pulse">
                         <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-4"></div>
                         <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-4"></div>
                      </div>
                    ))}
                  </div>
                ) : goals.length === 0 && !isCreating ? (
                  <div className="flex flex-col items-center justify-center p-8 md:p-16 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 text-center relative overflow-hidden animate-in fade-in duration-500 transition-colors">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-100 via-emerald-400 to-teal-500 opacity-50 dark:opacity-30"></div>
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-emerald-50 dark:bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 shadow-inner">
                      <PlaneTakeoff className="text-emerald-500 w-10 h-10 md:w-12 md:h-12" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white mb-2">{t('dashboard.journey_starts')}</h3>
                    <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8 leading-relaxed">
                      {t('dashboard.no_plans_desc')}
                    </p>
                    <Button onClick={() => setIsCreating(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/30 h-12 md:h-14 px-6 md:px-8 rounded-full font-bold text-base md:text-lg hover:scale-105 transition-all">
                      {t('dashboard.add_first_destination')}
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                    {goals.map((goal, index) => {
                      const txForGoal = allTransactions.filter(t => t.id_exchange_goal === goal.id_exchange_goal);
                      const currentForeign = txForGoal.reduce((acc, t) => acc + Number(t.amount_foreign), 0);

                      const target = Number(goal.amount_needed) || 1;
                      const progress = Math.min((currentForeign / target) * 100, 100);
                      const uniqueKey = goal.id_exchange_goal || index;

                      // ==== LÓGICA DE FORECAST ANALYTICS ====
                      let forecastText = "Faça o 1º depósito para calcular";
                      
                      if (currentForeign >= target) {
                         forecastText = "Meta alcançada! 🎉";
                      } else if (txForGoal.length > 0) {
                         const sortedTx = [...txForGoal].sort((a, b) => new Date(a.created_at || new Date()).getTime() - new Date(b.created_at || new Date()).getTime());
                         const firstDate = new Date(sortedTx[0].created_at || new Date());
                         const now = new Date();
                         
                         let monthsDiff = (now.getFullYear() - firstDate.getFullYear()) * 12 + (now.getMonth() - firstDate.getMonth());
                         if (monthsDiff < 1) monthsDiff = 1; 

                         const avgPerMonth = currentForeign / monthsDiff;
                         
                         if (avgPerMonth > 0) {
                            const remainingForeign = target - currentForeign;
                            const monthsLeft = Math.ceil(remainingForeign / avgPerMonth);
                            
                            const forecastDate = new Date();
                            forecastDate.setMonth(forecastDate.getMonth() + monthsLeft);
                            
                            const monthString = forecastDate.toLocaleDateString(i18n.language === 'en' ? 'en-US' : 'pt-BR', { month: 'long', year: 'numeric' });
                            forecastText = `Previsão: ${monthString.charAt(0).toUpperCase() + monthString.slice(1)}`;
                         }
                      }
                      // ========================================

                      return (
                        <div key={uniqueKey} className="group p-6 md:p-8 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 hover:border-emerald-200 dark:hover:border-emerald-800 transition-all duration-300 relative overflow-hidden flex flex-col justify-between min-h-[280px]">
                          <div className="absolute top-0 right-0 flex items-center bg-slate-50/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-bl-3xl border-b border-l border-slate-100 dark:border-slate-700">
                            <div className="flex opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                              <button onClick={() => handleEditClick(goal)} className="p-3 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-white dark:hover:bg-slate-700 rounded-bl-xl transition-all" title="Editar">
                                <Pencil size={16} />
                              </button>
                              <button onClick={() => handleDeleteClick(goal.id_exchange_goal as string)} className="p-3 text-slate-400 hover:text-red-500 hover:bg-white dark:hover:bg-slate-700 transition-all" title="Excluir">
                                <Trash2 size={16} />
                              </button>
                            </div>
                            <div className="px-4 py-2 md:px-5 md:py-3 font-black text-xs md:text-sm text-slate-600 dark:text-slate-300 border-l border-slate-200/50 dark:border-slate-700/50 ml-1">
                              {goal.target_currency}
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-[10px] md:text-xs font-bold text-emerald-500 uppercase tracking-widest mb-1">{t('dashboard.destination_card_label')}</p>
                            <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white pr-20 leading-tight">{goal.destination}</h3>
                          </div>
                          
                          <div className="mt-6 md:mt-8">
                            <p className="text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{t('dashboard.foreign_currency')}</p>
                            <p className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white tracking-tight flex items-baseline gap-1">
                              <span className="text-lg md:text-xl text-emerald-500 font-bold">{goal.target_currency}</span>
                              {currentForeign.toLocaleString(i18n.language === 'en' ? 'en-US' : 'pt-BR', { minimumFractionDigits: 2 })} 
                            </p>
                            
                            {/* BAGDE DE INTELIGÊNCIA E PREVISÃO */}
                            <div className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700/50">
                               <CalendarDays size={14} className={currentForeign >= target ? "text-emerald-500" : "text-amber-500"} />
                               {forecastText}
                            </div>

                            <div className="flex justify-between items-center mt-4">
                              <p className="text-xs md:text-sm font-medium text-slate-400 dark:text-slate-500">{t('dashboard.goal_label')} {target.toLocaleString(i18n.language === 'en' ? 'en-US' : 'pt-BR')}</p>
                              <p className="text-xs md:text-sm font-bold text-emerald-600 dark:text-emerald-400">{progress.toFixed(1)}%</p>
                            </div>
                          </div>
                          
                          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 md:h-3 rounded-full mt-2 overflow-hidden shadow-inner">
                            <div className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-full rounded-full transition-all duration-1000 ease-out relative" style={{ width: `${progress}%` }}>
                              <div className="absolute top-0 left-0 right-0 h-1 bg-white/30 rounded-full"></div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'profile' && (
              <Profile showModal={showModal} setUserNameState={setUserNameState} />
            )}

            {activeTab === 'transactions' && (
              <Transactions goals={goals} showModal={showModal} refreshData={fetchDashboardData} />
            )}

            {activeTab === 'checklist' && (
              <Checklist goals={goals} showModal={showModal} />
            )}
            
          </div>
        </main>
      </div>

      {/* MODAL DE NOVO ORÇAMENTO */}
      {isBudgetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-sm w-full p-6 md:p-8 animate-in zoom-in-95 duration-200 border dark:border-slate-800">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <PieChart className="text-emerald-500" />
                Definir Limite
              </h3>
              <button onClick={() => setIsBudgetModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSaveBudgetForm}>
              <div className="space-y-5 mb-8">
                
                {/* === DROPDOWN DE CATEGORIA CUSTOMIZADO E ELEGANTE === */}
                <div className="space-y-2 relative">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Categoria</label>
                  <div 
                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                    className="w-full h-12 px-4 flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2 text-sm text-slate-800 dark:text-slate-200 font-semibold">
                      <span className="text-emerald-600 dark:text-emerald-500">
                        {CATEGORIES.find(c => c.id === newBudget.category)?.icon || <LayoutGrid size={16} />}
                      </span>
                      {newBudget.category}
                    </div>
                    <ChevronDown size={18} className={`text-slate-400 transition-transform duration-200 ${isCategoryOpen ? 'rotate-180' : ''}`} />
                  </div>

                  {isCategoryOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setIsCategoryOpen(false)}></div>
                      <div className="absolute z-20 w-full mt-1 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden py-2 animate-in fade-in slide-in-from-top-2">
                        {CATEGORIES.map(category => (
                          <div 
                            key={category.id}
                            onClick={() => {
                              setNewBudget({...newBudget, category: category.id});
                              setIsCategoryOpen(false);
                            }}
                            className="px-4 py-3 flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-700 dark:hover:text-emerald-400 cursor-pointer transition-colors"
                          >
                            <span className="text-slate-400 group-hover:text-emerald-500">{category.icon}</span>
                            {category.id}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Valor Limite (R$)</label>
                  <Input 
                    type="number" 
                    value={newBudget.amount_limit} 
                    onChange={(e) => setNewBudget({...newBudget, amount_limit: e.target.value})} 
                    placeholder="Ex: 5000" 
                    min="1"
                    className="h-12 rounded-xl bg-slate-50 dark:bg-slate-950 focus:bg-white border-slate-200 dark:border-slate-700 font-medium text-lg" 
                    required 
                  />
                </div>
              </div>
              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 rounded-xl shadow-md shadow-emerald-600/20">
                Salvar Orçamento
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL CUSTOMIZADO GLOBAL */}
      {modal.isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-sm w-full p-6 md:p-8 animate-in zoom-in-95 duration-200 border dark:border-slate-800">
            <div className="flex items-center gap-4 mb-4">
              {modal.type === 'success' && <CheckCircle2 className="text-emerald-500 w-8 h-8 md:w-10 md:h-10" />}
              {modal.type === 'error' && <XCircle className="text-red-500 w-8 h-8 md:w-10 md:h-10" />}
              {modal.type === 'confirm' && <AlertCircle className="text-amber-500 w-8 h-8 md:w-10 md:h-10" />}
              <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white">{modal.title}</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed ml-12 md:ml-14 text-sm md:text-base">{modal.message}</p>
            <div className="flex flex-col-reverse md:flex-row justify-end gap-3 md:gap-4">
              {modal.type === 'confirm' ? (
                <>
                  <Button onClick={closeModal} className="w-full md:w-auto bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold h-12 md:h-11 px-6 rounded-xl">
                    {t('messages.cancel')}
                  </Button>
                  <Button onClick={modal.onConfirm} className="w-full md:w-auto bg-red-500 hover:bg-red-600 text-white font-bold h-12 md:h-11 px-6 rounded-xl shadow-md shadow-red-500/20">
                    {modal.confirmText || t('messages.confirm')}
                  </Button>
                </>
              ) : (
                <Button onClick={closeModal} className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 md:h-11 px-8 rounded-xl shadow-md shadow-emerald-600/20">
                  {t('messages.ok_got_it')}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}