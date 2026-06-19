// src/pages/transactions.tsx
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import { ExchangeGoal, getExchangeRate } from "@/service/exchangeGoal";
import { generateTransactionsPDF } from "../lib/exportPDF";
import { createTransaction, getTransactions, deleteTransaction, updateTransaction, Transaction, PlatformType } from "@/service/transaction";
import { Trash2, Wallet, Landmark, DollarSign, CreditCard, Banknote, ChevronDown, Pencil, FileDown, Ticket, Bed, Utensils, GraduationCap, FileText, LayoutGrid } from "lucide-react";

interface TransactionsProps {
  goals: ExchangeGoal[];
  showModal: (type: 'success' | 'error' | 'confirm', title: string, message: string, onConfirm?: () => void, confirmText?: string) => void;
  refreshData: () => void;
}

const PLATFORMS = [
  { id: "WISE", nameKey: "accounts.wise", icon: <Landmark size={16} /> },
  { id: "NOMAD", nameKey: "accounts.nomad", icon: <CreditCard size={16} /> },
  { id: "CASH", nameKey: "accounts.cash", icon: <Banknote size={16} /> },
  { id: "OTHER", nameKey: "accounts.other", icon: <Wallet size={16} /> }
];

const CATEGORIES = [
  { id: "Passagens", icon: <Ticket size={16} /> },
  { id: "Acomodação", icon: <Bed size={16} /> },
  { id: "Alimentação", icon: <Utensils size={16} /> },
  { id: "Cursos", icon: <GraduationCap size={16} /> },
  { id: "Documentação & Visto", icon: <FileText size={16} /> },
  { id: "Outros", icon: <LayoutGrid size={16} /> },
];

export default function Transactions({ goals, showModal, refreshData }: TransactionsProps) {
  const { t, i18n } = useTranslation();
  
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const [isGoalOpen, setIsGoalOpen] = useState(false);
  const [isPlatformOpen, setIsPlatformOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false); // NOVO ESTADO
  
  const [editingTxId, setEditingTxId] = useState<string | null>(null);

  const [liveRates, setLiveRates] = useState<Record<string, { bid?: string | number; code?: string | number; ask?: string | number } | string | number>>({});

  const [formData, setFormData] = useState({
    id_exchange_goal: "",
    category: "Outros", 
    description: "",
    amount_brl: "",
    exchange_rate: "",
    amount_foreign: "",
    platform: "WISE" as PlatformType
  });

  const handleCalculationChange = (field: 'amount_brl' | 'exchange_rate', value: string) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value };
      const brl = parseFloat(newData.amount_brl);
      const rate = parseFloat(newData.exchange_rate);

      if (!isNaN(brl) && !isNaN(rate) && brl > 0 && rate > 0) {
        newData.amount_foreign = (brl / rate).toFixed(2);
      }
      return newData;
    });
  };

  const fetchMyTransactions = useCallback(async () => {
    setIsFetching(true);
    try {
      const data = await getTransactions();
      setTransactions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
      setTransactions([]);
    } finally {
      setIsFetching(false);
    }
  }, []);

  useEffect(() => {
    const loadTransactions = async () => {
      await fetchMyTransactions();
    };
    loadTransactions();
  }, [fetchMyTransactions]);

  useEffect(() => {
    const fetchLiveRates = async () => {
      try {
        const data = await getExchangeRate();
        const taxasReais = data.exchangeRate ? data.exchangeRate : data;
        setLiveRates(taxasReais);
      } catch (error) {
        console.error("Erro ao buscar cotações em tempo real:", error);
      }
    };
    fetchLiveRates();
  }, []);

  const handleSelectGoal = (goal: ExchangeGoal) => {
    let newExchangeRate = formData.exchange_rate;
    let valorCotacao: string | number | undefined;

    const sigla = goal.target_currency.trim();
    const dado = liveRates[sigla] || liveRates[`${sigla}BRL`];

    if (dado) {
      if (typeof dado === 'object') {
        valorCotacao = dado.bid || dado.code || dado.ask;
      } else {
        valorCotacao = dado;
      }
    }

    if (valorCotacao && !isNaN(Number(valorCotacao))) {
      newExchangeRate = Number(valorCotacao).toFixed(2);
    } else {
      console.warn("Cotação não encontrada ou inválida para a moeda:", sigla);
    }

    let newAmountForeign = formData.amount_foreign;
    const brl = parseFloat(formData.amount_brl);
    const rate = parseFloat(newExchangeRate);

    if (!isNaN(brl) && !isNaN(rate) && brl > 0 && rate > 0) {
      newAmountForeign = (brl / rate).toFixed(2);
    }

    setFormData({
      ...formData,
      id_exchange_goal: goal.id_exchange_goal as string,
      exchange_rate: newExchangeRate,
      amount_foreign: newAmountForeign
    });
    
    setIsGoalOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.id_exchange_goal) {
      showModal('error', t('messages.attention'), t('messages.select_goal_error'));
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        id_exchange_goal: formData.id_exchange_goal,
        category: formData.category, 
        description: formData.description,
        amount_brl: Number(formData.amount_brl),
        exchange_rate: Number(formData.exchange_rate),
        amount_foreign: Number(formData.amount_foreign),
        platform: formData.platform
      };

      if (editingTxId) {
        await updateTransaction(editingTxId, payload);
        showModal('success', t('messages.updated'), t('messages.update_success'));
      } else {
        await createTransaction(payload);
        showModal('success', t('messages.registered'), t('messages.register_success'));
      }
      
      resetForm();
      fetchMyTransactions();
      refreshData();
    } catch (error) {
      console.error("Erro ao salvar transação:", error);
      showModal('error', t('messages.error'), t('messages.save_error'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = (item: Transaction) => {
    setEditingTxId(item.id_transaction as string);
    setFormData({
      id_exchange_goal: item.id_exchange_goal,
      category: item.category || "Outros", 
      description: item.description,
      amount_brl: String(item.amount_brl),
      exchange_rate: String(item.exchange_rate),
      amount_foreign: String(item.amount_foreign),
      platform: item.platform
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id: string) => {
    showModal('confirm', t('messages.delete_title'), t('messages.delete_confirm'),
      async () => {
        try {
          await deleteTransaction(id);
          fetchMyTransactions();
          refreshData();
          if (editingTxId === id) resetForm(); 
          
          setTimeout(() => {
            showModal('success', t('messages.deleted'), t('messages.delete_success'));
          }, 300);
          
        } catch (error) {
          console.error("Erro ao deletar transação:", error);
          setTimeout(() => {
            showModal('error', t('messages.error'), t('messages.delete_error'));
          }, 300);
        }
      }, t('messages.delete_btn')
    );
  };

  const resetForm = () => {
    setEditingTxId(null);
    setFormData({
      id_exchange_goal: "",
      category: "Outros", 
      description: "",
      amount_brl: "",
      exchange_rate: "",
      amount_foreign: "",
      platform: "WISE"
    });
  };

  const getPlatformIcon = (platform: string) => {
    const found = PLATFORMS.find(p => p.id === platform);
    return found ? found.icon : <Wallet size={16} />;
  };

  const getCategoryIconSmall = (categoryId: string) => {
    const found = CATEGORIES.find(c => c.id === categoryId);
    return found ? found.icon : <LayoutGrid size={16} />;
  };

  const handleExportPDF = () => {
    if (transactions.length === 0) {
      showModal('error', t('messages.attention'), "Não há transações para exportar.");
      return;
    }
    generateTransactionsPDF(transactions, goals, t, i18n.language);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 max-w-5xl mx-auto">
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">{t('transactions.title')}</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">{t('transactions.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLUNA ESQUERDA: Formulário de Registro */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 relative overflow-hidden transition-colors">
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${editingTxId ? 'from-amber-400 to-orange-500' : 'from-emerald-400 to-teal-500'}`}></div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2 mt-2">
              <DollarSign className={editingTxId ? "text-amber-500" : "text-emerald-500"} /> 
              {editingTxId ? t('transactions.editing') : t('transactions.new_input')}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* DROPDOWN CUSTOMIZADO: DESTINO */}
              <div className="space-y-2 relative">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t('transactions.goal_label')}</label>
                <div 
                  onClick={() => setIsGoalOpen(!isGoalOpen)}
                  className="w-full h-12 px-4 flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <span className={`text-sm ${formData.id_exchange_goal ? 'text-slate-800 dark:text-slate-200 font-semibold' : 'text-slate-500 dark:text-slate-400'}`}>
                    {formData.id_exchange_goal 
                      ? goals.find(g => g.id_exchange_goal === formData.id_exchange_goal)?.destination 
                      : t('transactions.select_destination')}
                  </span>
                  <ChevronDown size={18} className={`text-slate-400 transition-transform duration-200 ${isGoalOpen ? 'rotate-180' : ''}`} />
                </div>
                
                {isGoalOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsGoalOpen(false)}></div>
                    <div className="absolute z-20 w-full mt-1 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden py-2 animate-in fade-in slide-in-from-top-2">
                      {goals.length === 0 ? (
                        <p className="text-sm text-slate-500 dark:text-slate-400 p-4 text-center">{t('transactions.no_goals')}</p>
                      ) : (
                        goals.map(goal => (
                          <div 
                            key={goal.id_exchange_goal}
                            onClick={() => handleSelectGoal(goal)}
                            className="px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-700 dark:hover:text-emerald-400 cursor-pointer transition-colors"
                          >
                            {goal.destination} ({goal.target_currency})
                          </div>
                        ))
                      )}
                    </div>
                  </>
                )}
              </div>

               {/* DROPDOWN CUSTOMIZADO: CATEGORIA */}
               <div className="space-y-2 relative">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Categoria</label>
                <div 
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="w-full h-12 px-4 flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2 text-sm text-slate-800 dark:text-slate-200 font-semibold">
                    <span className="text-emerald-600 dark:text-emerald-500">{getCategoryIconSmall(formData.category)}</span>
                    {formData.category}
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
                            setFormData({...formData, category: category.id});
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

              {/* DROPDOWN CUSTOMIZADO: PLATAFORMA */}
              <div className="space-y-2 relative">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t('transactions.platform_label')}</label>
                <div 
                  onClick={() => setIsPlatformOpen(!isPlatformOpen)}
                  className="w-full h-12 px-4 flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2 text-sm text-slate-800 dark:text-slate-200 font-semibold">
                    <span className="text-emerald-600 dark:text-emerald-500">{getPlatformIcon(formData.platform)}</span>
                    {t(PLATFORMS.find(p => p.id === formData.platform)?.nameKey || '')}
                  </div>
                  <ChevronDown size={18} className={`text-slate-400 transition-transform duration-200 ${isPlatformOpen ? 'rotate-180' : ''}`} />
                </div>

                {isPlatformOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsPlatformOpen(false)}></div>
                    <div className="absolute z-20 w-full mt-1 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden py-2 animate-in fade-in slide-in-from-top-2">
                      {PLATFORMS.map(platform => (
                        <div 
                          key={platform.id}
                          onClick={() => {
                            setFormData({...formData, platform: platform.id as PlatformType});
                            setIsPlatformOpen(false);
                          }}
                          className="px-4 py-3 flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-700 dark:hover:text-emerald-400 cursor-pointer transition-colors"
                        >
                          <span className="text-slate-400 group-hover:text-emerald-500">{platform.icon}</span>
                          {t(platform.nameKey)}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t('transactions.description')}</label>
                <Input value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder={t('transactions.desc_placeholder')} className="bg-slate-50 dark:bg-slate-950 dark:border-slate-700 dark:text-white rounded-xl" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t('transactions.amount_brl')}</label>
                  <Input type="number" value={formData.amount_brl} onChange={(e) => handleCalculationChange('amount_brl', e.target.value)} placeholder={t('transactions.amount_placeholder')} step="0.01" min="0.01" className="bg-slate-50 dark:bg-slate-950 dark:border-slate-700 dark:text-white rounded-xl" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t('transactions.exchange_rate')}</label>
                  <Input type="number" value={formData.exchange_rate} onChange={(e) => handleCalculationChange('exchange_rate', e.target.value)} placeholder={t('transactions.rate_placeholder')} step="0.01" min="0.01" className="bg-slate-50 dark:bg-slate-950 dark:border-slate-700 dark:text-white rounded-xl" required />
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex justify-between">
                  {t('transactions.amount_foreign')} <span className="text-xs font-normal text-slate-400">{t('transactions.auto_calculated')}</span>
                </label>
                <Input type="number" value={formData.amount_foreign} onChange={(e) => setFormData({...formData, amount_foreign: e.target.value})} placeholder="0.00" step="0.01" className={`font-bold rounded-xl ${editingTxId ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700/50 text-amber-800 dark:text-amber-400' : 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-700/50 text-emerald-800 dark:text-emerald-400'}`} required />
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <Button type="submit" disabled={isLoading || goals.length === 0} className={`w-full h-12 font-bold shadow-md rounded-xl text-white ${editingTxId ? 'bg-amber-600 hover:bg-amber-700' : 'bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-700'}`}>
                  {isLoading ? t('transactions.saving') : (editingTxId ? t('transactions.update_btn') : t('transactions.register_btn'))}
                </Button>
                {editingTxId && (
                  <Button type="button" onClick={resetForm} variant="outline" className="w-full h-12 font-bold rounded-xl dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
                    {t('transactions.cancel_btn')}
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* COLUNA DIREITA: Histórico */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden h-full flex flex-col min-h-[500px] transition-colors">
            <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">{t('transactions.recent_title')}</h3>
              
              <Button 
                onClick={handleExportPDF} 
                variant="outline" 
                size="sm" 
                className="gap-2 text-emerald-600 dark:text-emerald-500 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 bg-transparent dark:bg-transparent dark:hover:bg-emerald-900/30 transition-colors"
              >
                <FileDown size={16} />
                {t('transactions.export_pdf')}
              </Button>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto">
              {isFetching ? (
                <p className="text-center text-slate-400 mt-10">{t('transactions.loading')}</p>
              ) : transactions.length === 0 ? (
                <div className="text-center mt-16">
                  <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="text-slate-300 dark:text-slate-500 w-10 h-10" />
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 font-semibold text-lg">{t('transactions.empty_state')}</p>
                  <p className="text-sm text-slate-400 mt-2 max-w-sm mx-auto">{t('transactions.empty_desc')}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {transactions.map(item => {
                    const goalName = goals.find(g => g.id_exchange_goal === item.id_exchange_goal)?.destination || t('transactions.deleted_goal');
                    const isEditingThis = editingTxId === item.id_transaction;
                    
                    return (
                      <div key={item.id_transaction} className={`flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl border transition-all group gap-4 ${isEditingThis ? 'border-amber-400 dark:border-amber-500/50 bg-amber-50/30 dark:bg-amber-900/10 shadow-md' : 'border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:border-emerald-100 dark:hover:border-emerald-800 hover:shadow-md'}`}>
                        
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl border flex items-center justify-center shadow-sm ${isEditingThis ? 'bg-amber-100 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400' : 'bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-700 text-emerald-600 dark:text-emerald-500'}`}>
                            {getPlatformIcon(item.platform)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 dark:text-slate-200 text-lg">{item.description}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">{t(PLATFORMS.find(p => p.id === item.platform)?.nameKey || '')}</span>
                              <span className="text-xs font-bold text-emerald-500 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-md border border-emerald-100 dark:border-emerald-800/30">{item.category || "Outros"}</span>
                              <span className="text-xs font-medium text-slate-400">{t('transactions.destination_prefix')}{goalName}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between md:justify-end gap-6 md:border-l md:border-slate-100 dark:md:border-slate-700 md:pl-6 w-full md:w-auto">
                          <div className="text-right">
                            <p className="font-black text-xl text-emerald-600 dark:text-emerald-400">
                              + {Number(item.amount_foreign).toLocaleString(i18n.language === 'en' ? 'en-US' : 'pt-BR', { minimumFractionDigits: 2 })}
                            </p>
                            <p className="text-xs font-medium text-slate-400 mt-1">
                              {t('transactions.paid_prefix')}{Number(item.amount_brl).toLocaleString(i18n.language === 'en' ? 'en-US' : 'pt-BR')}{t('transactions.rate_prefix')}{Number(item.exchange_rate).toFixed(2)})
                            </p>
                          </div>
                          
                          <div className="flex gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleEditClick(item)} className="text-slate-300 dark:text-slate-500 hover:text-amber-500 dark:hover:text-amber-400 p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700 hover:border-amber-200 dark:hover:border-amber-800 transition-all" title={t('transactions.edit_tooltip')}>
                              <Pencil size={18} />
                            </button>
                            <button onClick={() => handleDelete(item.id_transaction as string)} className="text-slate-300 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700 hover:border-red-200 dark:hover:border-red-800 transition-all" title={t('transactions.delete_tooltip')}>
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}