// src/pages/checklist.tsx
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExchangeGoal } from "@/service/exchangeGoal";
import { createChecklistItem, getChecklistItems, updateChecklistItem, deleteChecklistItem, ChecklistItem } from "@/service/checklist";
import { Trash2, CheckCircle2, Circle, ListTodo, Plus, ChevronDown } from "lucide-react";

interface ChecklistProps {
  goals: ExchangeGoal[];
  showModal: (type: 'success' | 'error' | 'confirm', title: string, message: string, onConfirm?: () => void, confirmText?: string) => void;
}

export default function Checklist({ goals, showModal }: ChecklistProps) {
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const [isGoalOpen, setIsGoalOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    id_exchange_goal: "",
    title: ""
  });

  const fetchMyChecklist = useCallback(async () => {
    setIsFetching(true);
    try {
      const data = await getChecklistItems();
      setItems(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
      setItems([]);
    } finally {
      setIsFetching(false);
    }
  }, []);

useEffect(() => {
    const loadChecklist = async () => {
      await fetchMyChecklist();
    };
    loadChecklist();
  }, [fetchMyChecklist]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.id_exchange_goal) {
      showModal('error', 'Atenção', 'Selecione um destino para adicionar esta tarefa.');
      return;
    }

    setIsLoading(true);
    try {
      await createChecklistItem({
        id_exchange_goal: formData.id_exchange_goal,
        title: formData.title,
      });
      setFormData({ ...formData, title: "" }); // Limpa apenas o título, mantém o destino selecionado!
      fetchMyChecklist();
    } catch (error) {
        console.error("Erro ao criar tarefa:", error);
      showModal('error', 'Erro', 'Não foi possível salvar a tarefa.');
    } finally {
      setIsLoading(false);
    }
  };

 const handleToggleComplete = async (item: ChecklistItem) => {
    try {
      const newStatus = item.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED';
      
      // Atualiza visualmente
      setItems(items.map(i => i.id_checklist_item === item.id_checklist_item ? { ...i, status: newStatus } : i));
      
      // Salva no banco (enviando a estrutura completa que seu Back-End pede)
      await updateChecklistItem(item.id_checklist_item as string, {
        id_exchange_goal: item.id_exchange_goal,
        title: item.title,
        status: newStatus
      });
    } catch (error) {
        console.error("Erro ao atualizar status da tarefa:", error);
      fetchMyChecklist();
      showModal('error', 'Erro', 'Falha ao atualizar o status da tarefa.');
    }
  };

  const handleDelete = (id: string) => {
    showModal('confirm', 'Excluir Tarefa?', 'Tem certeza que deseja apagar esta tarefa do seu planejamento?',
      async () => {
        try {
          await deleteChecklistItem(id);
          fetchMyChecklist();
          setTimeout(() => showModal('success', 'Excluída!', 'A tarefa foi apagada.'), 300);
        } catch (error) {
          console.error("Erro ao deletar tarefa:", error);
        }
      }, 'Excluir Tarefa'
    );
  };

  // Agrupa as tarefas pelo ID da meta para renderizar blocos separados
  const groupedItems = goals.reduce((acc, goal) => {
    const goalItems = items.filter(item => item.id_exchange_goal === goal.id_exchange_goal);
    if (goalItems.length > 0) {
      acc[goal.id_exchange_goal as string] = {
        goalName: goal.destination,
        currency: goal.target_currency,
        items: goalItems
      };
    }
    return acc;
  }, {} as Record<string, { goalName: string, currency: string, items: ChecklistItem[] }>);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 max-w-5xl mx-auto">
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Checklist de Viagem</h2>
        <p className="text-slate-500 mt-2 text-lg">Organize suas pendências (vistos, passagens, malas) para cada destino.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLUNA ESQUERDA: Adicionar Tarefa */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 mt-2">
              <Plus className="text-blue-500" /> Nova Tarefa
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="space-y-2 relative">
                <label className="text-sm font-semibold text-slate-700">Para qual destino?</label>
                <div 
                  onClick={() => setIsGoalOpen(!isGoalOpen)}
                  className="w-full h-12 px-4 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <span className={`text-sm ${formData.id_exchange_goal ? 'text-slate-800 font-semibold' : 'text-slate-500'}`}>
                    {formData.id_exchange_goal 
                      ? goals.find(g => g.id_exchange_goal === formData.id_exchange_goal)?.destination 
                      : "Selecione..."}
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
                            className="px-4 py-3 text-sm font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors"
                          >
                            {goal.destination}
                          </div>
                        ))
                      )}
                    </div>
                  </>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">O que você precisa fazer?</label>
                <Input value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="Ex: Tirar passaporte" className="bg-slate-50 rounded-xl" required />
              </div>

              <Button type="submit" disabled={isLoading || goals.length === 0} className="w-full bg-slate-900 hover:bg-slate-800 h-12 mt-4 font-bold shadow-md rounded-xl">
                {isLoading ? "Adicionando..." : "Adicionar Tarefa"}
              </Button>
            </form>
          </div>
        </div>

        {/* COLUNA DIREITA: Listagem de Tarefas */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden h-full flex flex-col min-h-[500px]">
            <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-800">Suas Pendências</h3>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto bg-slate-50/30">
              {isFetching ? (
                <p className="text-center text-slate-400 mt-10">Carregando...</p>
              ) : Object.keys(groupedItems).length === 0 ? (
                <div className="text-center mt-16">
                  <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ListTodo className="text-blue-300 w-10 h-10" />
                  </div>
                  <p className="text-slate-600 font-semibold text-lg">Seu checklist está vazio.</p>
                  <p className="text-sm text-slate-400 mt-2 max-w-sm mx-auto">Adicione tarefas como emissão de visto, compra de passagem ou reserva de acomodação.</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {Object.values(groupedItems).map((group, idx) => {
                    const completedCount = group.items.filter(i => i.status === 'COMPLETED').length;
                    const totalCount = group.items.length;
                    const progress = (completedCount / totalCount) * 100;

                    return (
                      <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                        <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-3">
                          <div>
                            <h4 className="font-bold text-slate-800 text-lg">{group.goalName}</h4>
                            <p className="text-xs text-slate-400 font-medium">{completedCount} de {totalCount} concluídas</p>
                          </div>
                          <div className="w-24 bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-blue-500 h-full rounded-full transition-all" style={{ width: `${progress}%` }}></div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {group.items.map(item => (
                            <div key={item.id_checklist_item} className={`flex items-center justify-between p-3 rounded-xl border transition-all group ${item.status === 'COMPLETED' ? 'bg-slate-50 border-slate-100 opacity-60' : 'bg-white border-slate-200 hover:border-blue-200'}`}>
                              
                              <div 
                                className="flex items-center gap-3 flex-1 cursor-pointer"
                                onClick={() => handleToggleComplete(item)}
                              >
                                {item.status === 'COMPLETED' ? (
                                  <CheckCircle2 className="text-blue-500 min-w-[20px]" size={20} />
                                ) : (
                                  <Circle className="text-slate-300 group-hover:text-blue-400 min-w-[20px]" size={20} />
                                )}
                                <span className={`font-medium transition-all ${item.status === 'COMPLETED' ? 'line-through text-slate-500' : 'text-slate-700'}`}>
                                  {item.title}
                                </span>
                              </div>

                              <button onClick={() => handleDelete(item.id_checklist_item as string)} className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-2 ml-4">
                                <Trash2 size={18} />
                              </button>
                            </div>
                          ))}
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