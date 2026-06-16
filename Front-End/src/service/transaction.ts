// src/service/transaction.ts
import { getRequest, postRequest, deleteRequest, putRequest } from "./api";

export type PlatformType = 'WISE' | 'NOMAD' | 'CASH' | 'OTHER';

export interface Transaction {
  id_transaction?: string;
  id_exchange_goal: string;
  description: string;
  amount_brl: number;
  exchange_rate: number;
  amount_foreign: number;
  platform: PlatformType; // Usando o tipo criado acima
  created_at?: string;
}

export const getTransactions = async () => {
  try {
    const response = await getRequest("/transaction");
    if (!response.ok) throw new Error("Erro ao buscar transações");
    return await response.json();
  } catch (error) {
    console.error("Erro no TransactionService:", error);
    throw error;
  }
};

export const createTransaction = async (data: Omit<Transaction, "id_transaction" | "created_at">) => {
  try {
    const response = await postRequest("/transaction", data);
    if (!response.ok) throw new Error("Erro ao criar transação");
    return await response.json();
  } catch (error) {
    console.error("Erro ao criar transação:", error);
    throw error;
  }
};

export const updateTransaction = async (id_transaction: string, data: Omit<Transaction, "id_transaction" | "created_at">) => {
  try {
    const response = await putRequest(`/transaction/${id_transaction}`, data);
    if (!response.ok) throw new Error("Erro ao atualizar transação");
    return await response.json();
  } catch (error) {
    console.error("Erro ao atualizar transação:", error);
    throw error;
  }
};

export const deleteTransaction = async (id_transaction: string) => {
  try {
    const response = await deleteRequest(`/transaction/${id_transaction}`);
    if (!response.ok) throw new Error("Erro ao deletar transação");
    return await response.json();
  } catch (error) {
    console.error("Erro ao deletar transação:", error);
    throw error;
  }
};