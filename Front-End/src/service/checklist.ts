// src/service/checklist.ts
import { getRequest, postRequest, deleteRequest, putRequest } from "./api";

export interface ChecklistItem {
  id_checklist_item?: string;
  id_exchange_goal: string;
  title: string;
  status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED'; // Usando o seu padrão do Prisma!
  created_at?: string;
}

export const getChecklistItems = async () => {
  try {
    const response = await getRequest("/checklist-item");
    if (!response.ok) throw new Error("Erro ao buscar tarefas");
    return await response.json();
  } catch (error) {
    console.error("Erro no ChecklistService:", error);
    throw error;
  }
};

export const createChecklistItem = async (data: Omit<ChecklistItem, "id_checklist_item" | "created_at" | "is_completed">) => {
  try {
    const response = await postRequest("/checklist-item", data);
    if (!response.ok) throw new Error("Erro ao criar tarefa");
    return await response.json();
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    throw error;
  }
};

export const updateChecklistItem = async (id_checklist_item: string, data: Partial<ChecklistItem>) => {
  try {
    const response = await putRequest(`/checklist-item/${id_checklist_item}`, data);
    if (!response.ok) throw new Error("Erro ao atualizar tarefa");
    return await response.json();
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
    throw error;
  }
};

export const deleteChecklistItem = async (id_checklist_item: string) => {
  try {
    const response = await deleteRequest(`/checklist-item/${id_checklist_item}`);
    if (!response.ok) throw new Error("Erro ao deletar tarefa");
    return await response.json();
  } catch (error) {
    console.error("Erro ao deletar tarefa:", error);
    throw error;
  }
};