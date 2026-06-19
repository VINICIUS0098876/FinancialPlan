// src/pages/checklist.tsx
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import { ExchangeGoal } from "@/service/exchangeGoal";
import { createChecklistItem, getChecklistItems, updateChecklistItem, deleteChecklistItem, ChecklistItem } from "@/service/checklist";
import { Trash2, CheckCircle2, Circle, ListTodo, Plus, ChevronDown, Rocket } from "lucide-react";

interface ChecklistProps {
  goals: ExchangeGoal[];
  showModal: (type: 'success' | 'error' | 'confirm', title: string, message: string, onConfirm?: () => void, confirmText?: string) => void;
}

export default function Checklist({ goals, showModal }: ChecklistProps) {
  const { t } = useTranslation();
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
      showModal('error', t('messages.attention'), t('messages.select_destination_task'));
      return;
    }

    setIsLoading(true);
    try {
      await createChecklistItem({
        id_exchange_goal: formData.id_exchange_goal,
        title: formData.title,
      });
      setFormData({ ...formData, title: "" });
      fetchMyChecklist();
    } catch (error) {
        console.error("Erro ao criar tarefa:", error);
      showModal('error', t('messages.error'), t('messages.save_task_error'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleComplete = async (item: ChecklistItem) => {
    try {
      const newStatus = item.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED';
      // Atualiza o visual instantaneamente (Optimistic Update)
      setItems(items.map(i => i.id_checklist_item === item.id_checklist_item ? { ...i, status: newStatus } : i));
      
      await updateChecklistItem(item.id_checklist_item as string, {
        id_exchange_goal: item.id_exchange_goal,
        title: item.title,
        status: newStatus
      });
    } catch (error) {
        console.error("Erro ao atualizar status da tarefa:", error);
      fetchMyChecklist(); // Se der erro, desfaz a animação visual
      showModal('error', t('messages.error'), t('messages.update_task_error'));
    }
  };

  const handleDelete = (id: string) => {
    showModal('confirm', t('messages.delete_task_title'), t('messages.delete_task_confirm'),
      async () => {
        try {
          await deleteChecklistItem(id);
          fetchMyChecklist();
          setTimeout(() => showModal('success', t('messages.deleted'), t('messages.task_deleted_success')), 300);
        } catch (error) {
          console.error("Erro ao deletar tarefa:", error);
        }
      }, t('messages.delete_task_btn')
    );
  };

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
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">{t('checklist.title')}</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">{t('checklist.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLUNA ESQUERDA: Formulário */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 relative overflow-hidden transition-colors">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2 mt-2">
              <Plus className="text-emerald-500" /> {t('checklist.new_task')}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* DROPDOWN CUSTOMIZADO: DESTINO */}
              <div className="space-y-2 relative">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t('checklist.destination_label')}</label>
                <div 
                  onClick={() => setIsGoalOpen(!isGoalOpen)}
                  className="w-full h-12 px-4 flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <span className={`text-sm ${formData.id_exchange_goal ? 'text-slate-800 dark:text-slate-200 font-semibold' : 'text-slate-500 dark:text-slate-400'}`}>
                    {formData.id_exchange_goal 
                      ? goals.find(g => g.id_exchange_goal === formData.id_exchange_goal)?.destination 
                      : t('checklist.select_destination')}
                  </span>
                  <ChevronDown size={18} className={`text-slate-400 transition-transform duration-200 ${isGoalOpen ? 'rotate-180' : ''}`} />
                </div>
                
                {isGoalOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsGoalOpen(false)}></div>
                    <div className="absolute z-20 w-full mt-1 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden py-2 animate-in fade-in slide-in-from-top-2">
                      {goals.length === 0 ? (
                        <p className="text-sm text-slate-500 dark:text-slate-400 p-4 text-center">{t('checklist.no_goals')}</p>
                      ) : (
                        goals.map(goal => (
                          <div 
                            key={goal.id_exchange_goal}
                            onClick={() => {
                              setFormData({...formData, id_exchange_goal: goal.id_exchange_goal as string});
                              setIsGoalOpen(false);
                            }}
                            className="px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-700 dark:hover:text-emerald-400 cursor-pointer transition-colors"
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
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t('checklist.task_label')}</label>
                <Input value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder={t('checklist.task_placeholder')} className="bg-slate-50 dark:bg-slate-950 dark:border-slate-700 dark:text-white rounded-xl h-12 font-medium focus:bg-white dark:focus:bg-slate-800 transition-colors" required />
              </div>

              <Button type="submit" disabled={isLoading || goals.length === 0} className="w-full bg-emerald-600 hover:bg-emerald-700 h-12 mt-4 font-bold shadow-md shadow-emerald-600/20 rounded-xl text-white transition-all">
                {isLoading ? t('checklist.adding') : t('checklist.add_task')}
              </Button>
            </form>
          </div>
        </div>

        {/* COLUNA DIREITA: Listagem */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden h-full flex flex-col min-h-[500px] transition-colors">
            <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <ListTodo className="text-emerald-500" size={20}/> 
                {t('checklist.pending_tasks')}
              </h3>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto">
              {isFetching ? (
                <p className="text-center text-slate-400 mt-10">{t('checklist.loading')}</p>
              ) : Object.keys(groupedItems).length === 0 ? (
                <div className="text-center mt-16">
                  <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ListTodo className="text-emerald-300 dark:text-emerald-500 w-10 h-10" />
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 font-semibold text-lg">{t('checklist.empty_state')}</p>
                  <p className="text-sm text-slate-400 mt-2 max-w-sm mx-auto">{t('checklist.empty_desc')}</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {Object.values(groupedItems).map((group, idx) => {
                    const completedCount = group.items.filter(i => i.status === 'COMPLETED').length;
                    const totalCount = group.items.length;
                    const progress = (completedCount / totalCount) * 100;
                    const isAllDone = progress === 100;

                    return (
                      <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm transition-colors relative overflow-hidden">
                        
                        {/* Faixa lateral decorativa se tudo estiver completo */}
                        {isAllDone && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-500"></div>}

                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 border-b border-slate-100 dark:border-slate-800 pb-4 gap-4">
                          <div>
                            <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-1">DESTINO</p>
                            <h4 className="font-bold text-slate-800 dark:text-white text-xl flex items-center gap-2">
                              {group.goalName}
                              {isAllDone && <Rocket className="text-emerald-500" size={18} />}
                            </h4>
                          </div>
                          
                          <div className="w-full md:w-48 text-right space-y-1">
                             <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                <span className={isAllDone ? "text-emerald-600 font-bold" : ""}>{completedCount}</span> / {totalCount} {t('checklist.completed')}
                             </p>
                            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden shadow-inner">
                              <div className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-full rounded-full transition-all duration-700 ease-out" style={{ width: `${progress}%` }}></div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          {group.items.map(item => {
                            const isCompleted = item.status === 'COMPLETED';
                            return (
                              <div 
                                key={item.id_checklist_item} 
                                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all group ${isCompleted ? 'bg-slate-50 dark:bg-slate-950/50 border-slate-100 dark:border-slate-800/80 opacity-70' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-emerald-200 dark:hover:border-emerald-500/50 hover:shadow-sm'}`}
                              >
                                <div 
                                  className="flex items-center gap-3 flex-1 cursor-pointer"
                                  onClick={() => handleToggleComplete(item)}
                                >
                                  {isCompleted ? (
                                    <CheckCircle2 className="text-emerald-500 min-w-[20px]" size={20} />
                                  ) : (
                                    <Circle className="text-slate-300 dark:text-slate-500 group-hover:text-emerald-400 min-w-[20px] transition-colors" size={20} />
                                  )}
                                  <span className={`font-medium transition-all ${isCompleted ? 'line-through text-slate-500 dark:text-slate-400' : 'text-slate-700 dark:text-slate-200'}`}>
                                    {item.title}
                                  </span>
                                </div>

                                <button onClick={() => handleDelete(item.id_checklist_item as string)} className="text-slate-300 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity p-2 ml-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700 hover:border-red-200 dark:hover:border-red-800">
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            )
                          })}
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