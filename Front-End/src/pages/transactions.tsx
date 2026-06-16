// src/pages/transactions.tsx
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExchangeGoal } from "@/service/exchangeGoal";
import { createTransaction, getTransactions, deleteTransaction, updateTransaction, Transaction, PlatformType } from "@/service/transaction";
import { Trash2, Wallet, Landmark, DollarSign, CreditCard, Banknote, ChevronDown, Pencil } from "lucide-react";

interface TransactionsProps {
  goals: ExchangeGoal[];
  showModal: (type: 'success' | 'error' | 'confirm', title: string, message: string, onConfirm?: () => void, confirmText?: string) => void;
  refreshData: () => void;
}

const PLATFORMS = [
  { id: "WISE", name: "Conta Wise", icon: <Landmark size={16} /> },
  { id: "NOMAD", name: "Conta Nomad", icon: <CreditCard size={16} /> },
  { id: "CASH", name: "Dinheiro Físico (Espécie)", icon: <Banknote size={16} /> },
  { id: "OTHER", name: "Outros Bancos / Corretoras", icon: <Wallet size={16} /> }
];

export default function Transactions({ goals, showModal, refreshData }: TransactionsProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const [isGoalOpen, setIsGoalOpen] = useState(false);
  const [isPlatformOpen, setIsPlatformOpen] = useState(false);
  
  // NOVO ESTADO: Controla se estamos editando
  const [editingTxId, setEditingTxId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    id_exchange_goal: "",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.id_exchange_goal) {
      showModal('error', 'Atenção', 'Selecione um planejamento (destino) para vincular este aporte.');
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        id_exchange_goal: formData.id_exchange_goal,
        description: formData.description,
        amount_brl: Number(formData.amount_brl),
        exchange_rate: Number(formData.exchange_rate),
        amount_foreign: Number(formData.amount_foreign),
        platform: formData.platform
      };

      if (editingTxId) {
        // Se tem um ID sendo editado, faz o PUT
        await updateTransaction(editingTxId, payload);
        showModal('success', 'Atualizado!', 'Aporte atualizado com sucesso.');
      } else {
        // Se não tem, faz o POST
        await createTransaction(payload);
        showModal('success', 'Aporte Registrado!', 'O valor foi adicionado com sucesso.');
      }
      
      resetForm();
      fetchMyTransactions();
      refreshData();
    } catch (error) {
      console.error("Erro ao salvar transação:", error);
      showModal('error', 'Erro', 'Não foi possível salvar a transação.');
    } finally {
      setIsLoading(false);
    }
  };

  // Prepara o formulário para edição
  const handleEditClick = (item: Transaction) => {
    setEditingTxId(item.id_transaction as string);
    setFormData({
      id_exchange_goal: item.id_exchange_goal,
      description: item.description,
      amount_brl: String(item.amount_brl),
      exchange_rate: String(item.exchange_rate),
      amount_foreign: String(item.amount_foreign),
      platform: item.platform
    });
    // Rola a tela para cima para o usuário ver o formulário
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

const handleDelete = (id: string) => {
    showModal('confirm', 'Excluir Transação?', 'Tem certeza que deseja apagar este registro? O valor será descontado da sua meta.',
      async () => {
        try {
          await deleteTransaction(id);
          fetchMyTransactions();
          refreshData();
          if (editingTxId === id) resetForm(); 
          
          // O SEGREDO ESTÁ AQUI: Disparamos o modal de sucesso após excluir!
          setTimeout(() => {
            showModal('success', 'Excluído!', 'O aporte foi apagado com sucesso.');
          }, 300);
          
        } catch (error) {
          console.error("Erro ao deletar transação:", error);
          
          // Disparamos o modal de erro caso a API falhe
          setTimeout(() => {
            showModal('error', 'Erro', 'Não foi possível excluir a transação.');
          }, 300);
        }
      }, 'Excluir Registro'
    );
  };

  const resetForm = () => {
    setEditingTxId(null);
    setFormData({
      id_exchange_goal: "",
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

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 max-w-5xl mx-auto">
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Câmbio e Aportes</h2>
        <p className="text-slate-500 mt-2 text-lg">Registre o dinheiro guardado e controle suas conversões de moeda.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLUNA ESQUERDA: Formulário de Registro */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${editingTxId ? 'from-amber-400 to-orange-500' : 'from-emerald-400 to-teal-500'}`}></div>
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 mt-2">
              <DollarSign className={editingTxId ? "text-amber-500" : "text-emerald-500"} /> 
              {editingTxId ? "Editando Aporte" : "Novo Aporte"}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* DROPDOWN CUSTOMIZADO: DESTINO */}
              <div className="space-y-2 relative">
                <label className="text-sm font-semibold text-slate-700">Qual o Planejamento?</label>
                <div 
                  onClick={() => setIsGoalOpen(!isGoalOpen)}
                  className="w-full h-12 px-4 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <span className={`text-sm ${formData.id_exchange_goal ? 'text-slate-800 font-semibold' : 'text-slate-500'}`}>
                    {formData.id_exchange_goal 
                      ? goals.find(g => g.id_exchange_goal === formData.id_exchange_goal)?.destination 
                      : "Selecione um destino..."}
                  </span>
                  <ChevronDown size={18} className={`text-slate-400 transition-transform duration-200 ${isGoalOpen ? 'rotate-180' : ''}`} />
                </div>
                
                {isGoalOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsGoalOpen(false)}></div>
                    <div className="absolute z-20 w-full mt-1 bg-white border border-slate-100 rounded-xl shadow-xl overflow-hidden py-2 animate-in fade-in slide-in-from-top-2">
                      {goals.length === 0 ? (
                        <p className="text-sm text-slate-500 p-4 text-center">Nenhuma meta criada.</p>
                      ) : (
                        goals.map(goal => (
                          <div 
                            key={goal.id_exchange_goal}
                            onClick={() => {
                              setFormData({...formData, id_exchange_goal: goal.id_exchange_goal as string});
                              setIsGoalOpen(false);
                            }}
                            className="px-4 py-3 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 cursor-pointer transition-colors"
                          >
                            {goal.destination} ({goal.target_currency})
                          </div>
                        ))
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* DROPDOWN CUSTOMIZADO: PLATAFORMA */}
              <div className="space-y-2 relative">
                <label className="text-sm font-semibold text-slate-700">Onde está o dinheiro?</label>
                <div 
                  onClick={() => setIsPlatformOpen(!isPlatformOpen)}
                  className="w-full h-12 px-4 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2 text-sm text-slate-800 font-semibold">
                    <span className="text-emerald-600">{getPlatformIcon(formData.platform)}</span>
                    {PLATFORMS.find(p => p.id === formData.platform)?.name}
                  </div>
                  <ChevronDown size={18} className={`text-slate-400 transition-transform duration-200 ${isPlatformOpen ? 'rotate-180' : ''}`} />
                </div>

                {isPlatformOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsPlatformOpen(false)}></div>
                    <div className="absolute z-20 w-full mt-1 bg-white border border-slate-100 rounded-xl shadow-xl overflow-hidden py-2 animate-in fade-in slide-in-from-top-2">
                      {PLATFORMS.map(platform => (
                        <div 
                          key={platform.id}
                          onClick={() => {
                            setFormData({...formData, platform: platform.id as PlatformType});
                            setIsPlatformOpen(false);
                          }}
                          className="px-4 py-3 flex items-center gap-3 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 cursor-pointer transition-colors"
                        >
                          <span className="text-slate-400 group-hover:text-emerald-500">{platform.icon}</span>
                          {platform.name}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Descrição</label>
                <Input value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Ex: Compra de Euros de Março" className="bg-slate-50 rounded-xl" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Valor Pago (R$)</label>
                  <Input type="number" value={formData.amount_brl} onChange={(e) => handleCalculationChange('amount_brl', e.target.value)} placeholder="Ex: 5000" step="0.01" min="0.01" className="bg-slate-50 rounded-xl" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Cotação do Dia</label>
                  <Input type="number" value={formData.exchange_rate} onChange={(e) => handleCalculationChange('exchange_rate', e.target.value)} placeholder="Ex: 5.45" step="0.01" min="0.01" className="bg-slate-50 rounded-xl" required />
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="text-sm font-semibold text-slate-700 flex justify-between">
                  Valor Convertido <span className="text-xs font-normal text-slate-400">(Auto-calculado)</span>
                </label>
                <Input type="number" value={formData.amount_foreign} onChange={(e) => setFormData({...formData, amount_foreign: e.target.value})} placeholder="0.00" step="0.01" className={`font-bold rounded-xl ${editingTxId ? 'bg-amber-50 border-amber-200 text-amber-800' : 'bg-emerald-50 border-emerald-200 text-emerald-800'}`} required />
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <Button type="submit" disabled={isLoading || goals.length === 0} className={`w-full h-12 font-bold shadow-md rounded-xl ${editingTxId ? 'bg-amber-600 hover:bg-amber-700' : 'bg-slate-900 hover:bg-slate-800'}`}>
                  {isLoading ? "Salvando..." : (editingTxId ? "Atualizar Aporte" : "Registrar Aporte")}
                </Button>
                {editingTxId && (
                  <Button type="button" onClick={resetForm} variant="outline" className="w-full h-12 font-bold rounded-xl">
                    Cancelar Edição
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* COLUNA DIREITA: Histórico */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden h-full flex flex-col min-h-[500px]">
            <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-800">Seus Aportes Recentes</h3>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto">
              {isFetching ? (
                <p className="text-center text-slate-400 mt-10">Carregando...</p>
              ) : transactions.length === 0 ? (
                <div className="text-center mt-16">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="text-slate-300 w-10 h-10" />
                  </div>
                  <p className="text-slate-600 font-semibold text-lg">Nenhuma transação registrada.</p>
                  <p className="text-sm text-slate-400 mt-2 max-w-sm mx-auto">Sua primeira compra de moeda aparecerá aqui. Selecione o destino e registre o valor pago.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {transactions.map(item => {
                    const goalName = goals.find(g => g.id_exchange_goal === item.id_exchange_goal)?.destination || "Meta Excluída";
                    const isEditingThis = editingTxId === item.id_transaction;
                    
                    return (
                      <div key={item.id_transaction} className={`flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl border transition-all group gap-4 ${isEditingThis ? 'border-amber-400 bg-amber-50/30 shadow-md' : 'border-slate-100 bg-white hover:border-emerald-100 hover:shadow-md'}`}>
                        
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl border flex items-center justify-center shadow-sm ${isEditingThis ? 'bg-amber-100 border-amber-200 text-amber-600' : 'bg-slate-50 border-slate-100 text-emerald-600'}`}>
                            {getPlatformIcon(item.platform)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 text-lg">{item.description}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">{item.platform}</span>
                              <span className="text-xs font-medium text-slate-400">Destino: {goalName}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between md:justify-end gap-6 md:border-l md:border-slate-100 md:pl-6 w-full md:w-auto">
                          <div className="text-right">
                            <p className="font-black text-xl text-emerald-600">
                              + {Number(item.amount_foreign).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </p>
                            <p className="text-xs font-medium text-slate-400 mt-1">
                              Pagou R$ {Number(item.amount_brl).toLocaleString('pt-BR')} (Cotação: {Number(item.exchange_rate).toFixed(2)})
                            </p>
                          </div>
                          
                          <div className="flex gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleEditClick(item)} className="text-slate-300 hover:text-amber-500 p-2 bg-white rounded-lg shadow-sm border border-slate-100 hover:border-amber-200 transition-all" title="Editar">
                              <Pencil size={18} />
                            </button>
                            <button onClick={() => handleDelete(item.id_transaction as string)} className="text-slate-300 hover:text-red-500 p-2 bg-white rounded-lg shadow-sm border border-slate-100 hover:border-red-200 transition-all" title="Excluir">
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