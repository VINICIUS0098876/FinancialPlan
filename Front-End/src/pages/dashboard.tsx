// src/pages/dashboard.tsx
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Checklist from "./checklist";
import { 
  getExchangeGoals, 
  createExchangeGoal, 
  updateExchangeGoal, 
  deleteExchangeGoal, 
  ExchangeGoal 
} from "@/service/exchangeGoal";
import { getTransactions, Transaction } from "@/service/transaction"; 
import Profile from "./profile"; 
import Transactions from "./transactions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  LayoutDashboard, 
  PlaneTakeoff, 
  Receipt, 
  LogOut, 
  Trash2, 
  Pencil, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  User,
  Globe2,
  Target,
  TrendingUp,
  ListTodo,
  Menu, // Ícone do Menu Hamburguer
  X     // Ícone de Fechar Menu
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

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'profile' | 'transactions' | 'checklist'>('dashboard');

  // NOVO ESTADO: Controla a abertura do menu no celular
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

  const [userName, setUserNameState] = useState(() => {
    const storedName = localStorage.getItem("userName");
    return (storedName && storedName !== "undefined") ? storedName : "Viajante";
  });

  const closeModal = () => setModal(prev => ({ ...prev, isOpen: false }));

  const showModal = (type: ModalConfig['type'], title: string, message: string, onConfirm: () => void = closeModal, confirmText?: string) => {
    setModal({ isOpen: true, type, title, message, onConfirm, confirmText });
  };

  const fetchDashboardData = useCallback(async () => {
    try {
      const [goalsData, txData] = await Promise.all([
        getExchangeGoals().catch(() => []), 
        getTransactions().catch(() => [])
      ]);
      
      setGoals(Array.isArray(goalsData) ? goalsData : []);
      setAllTransactions(Array.isArray(txData) ? txData : []);
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
        showModal('success', 'Tudo certo!', 'O planejamento foi atualizado com sucesso.');
      } else {
        await createExchangeGoal({
          destination: newGoal.destination,
          target_currency: newGoal.target_currency,
          amount_needed: Number(newGoal.amount_needed),
          deadline: new Date("2027-12-31T00:00:00Z").toISOString() 
        });
        showModal('success', 'Destino Criado!', 'Seu novo planejamento foi salvo com sucesso.');
      }
      resetForm();
      await fetchDashboardData(); 
    } catch (error) {
      console.error("Erro ao salvar planejamento:", error);
      showModal('error', 'Ops, algo deu errado', 'Não foi possível processar os dados.');
    } finally {
      setIsSubmitting(false);
    }
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
    showModal('confirm', 'Excluir Planejamento?', 'Atenção: Ao apagar este destino, TODAS as transações ligadas a ele também serão excluídas do seu saldo total. Tem certeza?',
      async () => {
        closeModal();
        try {
          await deleteExchangeGoal(id);
          await fetchDashboardData();
          setTimeout(() => showModal('success', 'Excluído', 'O planejamento foi apagado.'), 300);
        } catch (error) {
          console.error("Erro ao excluir planejamento:", error);
          setTimeout(() => showModal('error', 'Erro', 'Não foi possível excluir o planejamento.'), 300);
        }
      }, 'Excluir Destino'
    );
  };

  const resetForm = () => {
    setIsCreating(false);
    setEditingId(null);
    setNewGoal({ id_user: "", destination: "", target_currency: "EUR", amount_needed: "" });
  };

  const handleLogout = () => {
    showModal('confirm', 'Sair da conta?', 'Tem certeza que deseja sair do painel? Você precisará fazer login novamente.',
      () => {
        closeModal();
        localStorage.removeItem("authToken");
        localStorage.removeItem("userName");
        localStorage.clear();
        navigate("/login");
      }, 'Sair'
    );
  };

  // Função para trocar de aba e já fechar o menu no celular automaticamente
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

  // Pega a primeira letra do nome para fazer o Avatar
  const userInitial = userName ? userName.charAt(0).toUpperCase() : "V";

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden relative">
      
      {/* OVERLAY ESCURO PARA MOBILE (Quando o menu abre, o fundo fica escuro) */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* SIDEBAR (Agora responsiva e animada) */}
      <aside className={`fixed md:static inset-y-0 left-0 z-50 w-72 bg-slate-900 flex flex-col transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} border-r border-slate-800 shadow-2xl md:shadow-none`}>
        <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* LOGO E BOTÃO FECHAR (MOBILE) */}
        <div className="p-8 relative z-10 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Financial<span className="text-emerald-500">Plan</span>
          </h1>
          <button className="md:hidden text-slate-400 hover:text-white transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* NAVEGAÇÃO */}
        <nav className="flex-1 px-4 py-2 space-y-2 relative z-10">
          <button onClick={() => changeTab('dashboard')} className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl font-semibold transition-colors ${activeTab === 'dashboard' ? 'bg-emerald-600/15 text-emerald-500' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
            <LayoutDashboard size={20} /> Painel
          </button>
          
          <button onClick={() => changeTab('profile')} className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl font-semibold transition-colors ${activeTab === 'profile' ? 'bg-emerald-600/15 text-emerald-500' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
            <User size={20} /> Meu Perfil
          </button>

          <button onClick={() => changeTab('transactions')} className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl font-semibold transition-colors ${activeTab === 'transactions' ? 'bg-emerald-600/15 text-emerald-500' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
            <Receipt size={20} /> Transações
          </button>

          <button onClick={() => changeTab('checklist')} className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl font-semibold transition-colors ${activeTab === 'checklist' ? 'bg-emerald-600/15 text-emerald-500' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
            <ListTodo size={20} /> Checklist
          </button>
        </nav>

        {/* NOVO DESIGN DO PERFIL (No rodapé da Sidebar) */}
        <div className="p-4 relative z-10 mt-auto">
          <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-4 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold text-lg border border-emerald-500/30">
                {userInitial}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-xs text-slate-400 font-medium">Logado como</p>
                <p className="text-sm text-white font-bold truncate">{userName}</p>
              </div>
            </div>
            
            <div className="h-px w-full bg-slate-700/50"></div>
            
            <button onClick={handleLogout} className="flex items-center justify-center gap-2 w-full py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-500 rounded-lg font-medium transition-colors">
              <LogOut size={16} /> Sair da conta
            </button>
          </div>
        </div>
      </aside>

      {/* ÁREA PRINCIPAL DINÂMICA */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* HEADER MOBILE (Só aparece em telas pequenas) */}
        <header className="md:hidden bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-30 shadow-sm">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Financial<span className="text-emerald-500">Plan</span>
          </h1>
          <button onClick={() => setIsMobileMenuOpen(true)} className="text-slate-500 hover:text-emerald-600 transition-colors p-1">
            <Menu size={26} />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto relative">
          <div className="max-w-6xl mx-auto p-6 md:p-8 lg:p-12">
            
            {/* ================= ABA: PAINEL DE METAS ================= */}
            {activeTab === 'dashboard' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Visão Geral</h2>
                    <p className="text-slate-500 mt-2 text-base md:text-lg">Acompanhe o progresso dos seus intercâmbios.</p>
                  </div>
                  <Button 
                    onClick={isCreating ? resetForm : () => setIsCreating(true)} 
                    className={`w-full md:w-auto text-white shadow-md h-12 px-6 font-semibold transition-all ${isCreating ? 'bg-slate-500 hover:bg-slate-600' : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20 hover:scale-105'}`}
                  >
                    {isCreating ? "Cancelar" : "+ Criar Novo Destino"}
                  </Button>
                </div>

                {!isCreating && !loading && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-10">
                    
                    {/* CARD 1: DESTINOS */}
                    <div className="bg-white p-5 md:p-6 rounded-3xl shadow-sm border border-slate-200 flex items-center gap-4 h-full">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                        <Globe2 size={24} className="md:w-7 md:h-7" />
                      </div>
                      <div>
                        <p className="text-xs md:text-sm font-semibold text-slate-500">Destinos Ativos</p>
                        <h4 className="text-xl md:text-2xl font-bold text-slate-800">{totalGoalsCount}</h4>
                      </div>
                    </div>

                    {/* CARD 2: OBJETIVO TOTAL */}
                    <div className="bg-white p-5 md:p-6 rounded-3xl shadow-sm border border-slate-200 flex items-center gap-4 h-full">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                        <Target size={24} className="md:w-7 md:h-7" />
                      </div>
                      
                      <div className="flex flex-col flex-1 overflow-hidden">
                        <p className="text-xs md:text-sm font-semibold text-slate-500 mb-1">Objetivo Total</p>
                        
                        {targetEntries.length === 0 ? (
                          <h4 className="text-xl md:text-2xl font-bold text-slate-800">
                            <span className="text-sm md:text-lg text-slate-400 mr-1">$</span>0
                          </h4>
                        ) : (
                          <div className="flex flex-col gap-1.5 max-h-[76px] overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin' }}>
                            {targetEntries.map(([currency, amount]) => (
                              <h4 key={currency} className="text-lg md:text-xl font-bold text-slate-800 leading-none shrink-0">
                                <span className="text-xs md:text-sm text-slate-400 mr-1">{currency}</span>
                                {amount.toLocaleString('pt-BR')}
                              </h4>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* CARD 3: TOTAL GUARDADO */}
                    <div className="bg-white p-5 md:p-6 rounded-3xl shadow-sm border border-slate-200 flex items-center gap-4 relative overflow-hidden h-full">
                      <div className="absolute right-0 top-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl"></div>
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center relative z-10 shrink-0">
                        <TrendingUp size={24} className="md:w-7 md:h-7" />
                      </div>
                      <div className="relative z-10">
                        <p className="text-xs md:text-sm font-semibold text-slate-500">Total Guardado (BRL)</p>
                        <h4 className="text-xl md:text-2xl font-bold text-emerald-600">
                          <span className="text-sm md:text-lg text-emerald-400 mr-1">R$</span>
                          {totalSavedAmount.toLocaleString('pt-BR')}
                        </h4>
                      </div>
                    </div>

                  </div>
                )}

                {/* FORMULÁRIO DE CRIAÇÃO/EDIÇÃO */}
                {isCreating && (
                  <div className="mb-10 p-6 md:p-8 bg-white rounded-3xl shadow-sm border border-emerald-100 relative overflow-hidden animate-in zoom-in-95 duration-200">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
                    <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                      <PlaneTakeoff className="text-emerald-500" />
                      {editingId ? "Editando Destino" : "Configurar Novo Destino"}
                    </h3>
                    
                    <form onSubmit={handleSaveGoal} className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-end">
                      <div className="md:col-span-5 space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Para onde você vai?</label>
                        <Input value={newGoal.destination} onChange={(e) => setNewGoal({...newGoal, destination: e.target.value})} placeholder="Ex: Dublin, Irlanda" className="h-12 bg-slate-50 focus:bg-white" required />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Moeda Alvo</label>
                        <Input value={newGoal.target_currency} onChange={(e) => setNewGoal({...newGoal, target_currency: e.target.value.toUpperCase()})} maxLength={3} placeholder="EUR" className="h-12 bg-slate-50 focus:bg-white" required />
                      </div>
                      <div className="md:col-span-3 space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Valor Necessário</label>
                        <Input type="number" value={newGoal.amount_needed} onChange={(e) => setNewGoal({...newGoal, amount_needed: e.target.value})} placeholder="Ex: 30000" min="1" className="h-12 bg-slate-50 focus:bg-white" required />
                      </div>
                      <div className="md:col-span-2 mt-2 md:mt-0">
                        <Button type="submit" disabled={isSubmitting} className="w-full bg-emerald-600 hover:bg-emerald-700 h-12 text-md font-bold shadow-md shadow-emerald-600/20">
                          {isSubmitting ? "Salvando..." : (editingId ? "Atualizar" : "Salvar")}
                        </Button>
                      </div>
                    </form>
                  </div>
                )}

                {/* LISTA DE METAS COM SKELETON LOADER */}
                {loading ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                    {/* Renderiza 3 cards "fantasmas" piscando enquanto os dados não chegam */}
                    {[1, 2, 3].map((skeleton) => (
                      <div key={skeleton} className="p-6 md:p-8 bg-white rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between min-h-[280px] animate-pulse">
                        <div className="flex justify-between items-start">
                          <div className="space-y-3 w-full mt-2">
                            <div className="h-3 bg-slate-200 rounded w-1/4"></div>
                            <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                          </div>
                          <div className="w-12 h-8 bg-slate-100 rounded-bl-xl ml-4"></div>
                        </div>
                        <div className="space-y-4 mt-8">
                          <div className="h-3 bg-slate-200 rounded w-1/3"></div>
                          <div className="h-10 bg-slate-200 rounded w-1/2"></div>
                          <div className="flex justify-between mt-2">
                            <div className="h-3 bg-slate-200 rounded w-1/4"></div>
                            <div className="h-3 bg-slate-200 rounded w-1/12"></div>
                          </div>
                        </div>
                        <div className="w-full bg-slate-100 h-2 md:h-3 rounded-full mt-6"></div>
                      </div>
                    ))}
                  </div>
                ) : goals.length === 0 && !isCreating ? (
                  <div className="flex flex-col items-center justify-center p-8 md:p-16 bg-white rounded-3xl shadow-sm border border-slate-100 text-center relative overflow-hidden animate-in fade-in duration-500">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-100 via-emerald-400 to-teal-500 opacity-50"></div>
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
                      <PlaneTakeoff className="text-emerald-500 w-10 h-10 md:w-12 md:h-12" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">Sua jornada começa aqui</h3>
                    <p className="text-sm md:text-base text-slate-500 max-w-md mx-auto mb-8 leading-relaxed">
                      Você ainda não tem nenhum planejamento de intercâmbio cadastrado. Adicione seu primeiro destino para começar a acompanhar seu progresso!
                    </p>
                    <Button onClick={() => setIsCreating(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/30 h-12 md:h-14 px-6 md:px-8 rounded-full font-bold text-base md:text-lg hover:scale-105 transition-all">
                      Adicionar Primeiro Destino
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                    {goals.map((goal, index) => {
                      const currentForeign = allTransactions
                        .filter(t => t.id_exchange_goal === goal.id_exchange_goal)
                        .reduce((acc, t) => acc + Number(t.amount_foreign), 0);

                      const target = Number(goal.amount_needed) || 1;
                      const progress = Math.min((currentForeign / target) * 100, 100);
                      const uniqueKey = goal.id_exchange_goal || index;

                      return (
                        <div key={uniqueKey} className="group p-6 md:p-8 bg-white rounded-3xl shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 hover:border-emerald-200 transition-all duration-300 relative overflow-hidden flex flex-col justify-between min-h-[280px]">
                          
                          <div className="absolute top-0 right-0 flex items-center bg-slate-50/80 backdrop-blur-sm rounded-bl-3xl border-b border-l border-slate-100">
                            <div className="flex opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                              <button onClick={() => handleEditClick(goal)} className="p-3 text-slate-400 hover:text-emerald-600 hover:bg-white rounded-bl-xl transition-all" title="Editar">
                                <Pencil size={16} />
                              </button>
                              <button onClick={() => handleDeleteClick(goal.id_exchange_goal as string)} className="p-3 text-slate-400 hover:text-red-500 hover:bg-white transition-all" title="Excluir">
                                <Trash2 size={16} />
                              </button>
                            </div>
                            <div className="px-4 py-2 md:px-5 md:py-3 font-black text-xs md:text-sm text-slate-600 border-l border-slate-200/50 ml-1">
                              {goal.target_currency}
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-[10px] md:text-xs font-bold text-emerald-500 uppercase tracking-widest mb-1">Destino</p>
                            <h3 className="text-xl md:text-2xl font-bold text-slate-800 pr-20 leading-tight">{goal.destination}</h3>
                          </div>
                          
                          <div className="mt-6 md:mt-8">
                            <p className="text-xs md:text-sm font-medium text-slate-500 mb-1">Moeda Estrangeira</p>
                            <p className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight flex items-baseline gap-1">
                              <span className="text-lg md:text-xl text-emerald-500 font-bold">{goal.target_currency}</span>
                              {currentForeign.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} 
                            </p>
                            <div className="flex justify-between items-center mt-2">
                              <p className="text-xs md:text-sm font-medium text-slate-400">Meta: {target.toLocaleString('pt-BR')}</p>
                              <p className="text-xs md:text-sm font-bold text-emerald-600">{progress.toFixed(1)}%</p>
                            </div>
                          </div>
                          
                          <div className="w-full bg-slate-100 h-2 md:h-3 rounded-full mt-4 overflow-hidden shadow-inner">
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

      {/* MODAL CUSTOMIZADO GLOBAL */}
      {modal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 md:p-8 animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-4 mb-4">
              {modal.type === 'success' && <CheckCircle2 className="text-emerald-500 w-8 h-8 md:w-10 md:h-10" />}
              {modal.type === 'error' && <XCircle className="text-red-500 w-8 h-8 md:w-10 md:h-10" />}
              {modal.type === 'confirm' && <AlertCircle className="text-amber-500 w-8 h-8 md:w-10 md:h-10" />}
              <h3 className="text-xl md:text-2xl font-bold text-slate-800">{modal.title}</h3>
            </div>
            <p className="text-slate-600 mb-8 leading-relaxed ml-12 md:ml-14 text-sm md:text-base">{modal.message}</p>
            <div className="flex flex-col-reverse md:flex-row justify-end gap-3 md:gap-4">
              {modal.type === 'confirm' ? (
                <>
                  <Button onClick={closeModal} className="w-full md:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold h-12 md:h-11 px-6 rounded-xl">
                    Cancelar
                  </Button>
                  <Button onClick={modal.onConfirm} className="w-full md:w-auto bg-red-500 hover:bg-red-600 text-white font-bold h-12 md:h-11 px-6 rounded-xl shadow-md shadow-red-500/20">
                    {modal.confirmText || "Confirmar"}
                  </Button>
                </>
              ) : (
                <Button onClick={closeModal} className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 md:h-11 px-8 rounded-xl shadow-md shadow-emerald-600/20">
                  OK, entendi
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}