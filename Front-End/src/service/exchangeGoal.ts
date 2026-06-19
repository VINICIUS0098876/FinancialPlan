// src/service/exchangeGoal.ts
import { getRequest, postRequest, deleteRequest, putRequest } from "./api"; 

// Ajustado para bater EXATAMENTE com o seu Prisma schema
export interface ExchangeGoal {
  id_exchange_goal?: string; // O seu banco usa esse nome para o ID da meta
  id_user?: string;
  destination: string;       // Antes era 'name'
  target_currency: string;   // Moeda alvo (ex: EUR, USD)
  amount_needed: number;     // Antes era 'target_amount'
  deadline: string;
}

export const getExchangeGoals = async () => {
  try {
    const response = await getRequest("/exchange-goal");
    if (!response.ok) throw new Error("Erro ao buscar metas");
    return await response.json();
  } catch (error) {
    console.error("Erro no ExchangeGoalService:", error);
    throw error;
  }
};

// Ajustado para receber os dados corretos
export const createExchangeGoal = async (goalData: { 
  destination: string; 
  target_currency: string; 
  amount_needed: number; 
  deadline: string 
}) => {
  try {
    const response = await postRequest("/exchange-goal", goalData);
    
    if (!response.ok) {
      const errorDetails = await response.json().catch(() => ({}));
      console.error("Detalhes da rejeição do Back-End:", errorDetails);
      throw new Error("Erro ao criar meta");
    }
    
    return await response.json();
  } catch (error) {
    console.error("Erro ao criar:", error);
    throw error;
  }
};

export const deleteExchangeGoal = async (id_exchange_goal: string) => {
  try {
    const response = await deleteRequest(`/exchange-goal/${id_exchange_goal}`);
    if (!response.ok) throw new Error("Erro ao deletar meta");
    return await response.json();
  } catch (error) {
    console.error("Erro ao deletar:", error);
    throw error;
  }
};

export const updateExchangeGoal = async (id_exchange_goal: string, goalData: { 
  id_user: string; // O seu controller exige o id_user no body para o PUT
  destination: string; 
  target_currency: string; 
  amount_needed: number; 
  deadline: string 
}) => {
  try {
    const response = await putRequest(`/exchange-goal/${id_exchange_goal}`, goalData);
    if (!response.ok) throw new Error("Erro ao atualizar meta");
    return await response.json();
  } catch (error) {
    console.error("Erro ao atualizar:", error);
    throw error;
  }
};

export const getExchangeRate = async () => {
  try{
    const response = await getRequest("/exchange-rate")

    if(!response.ok) throw new Error("Erro ao buscar taxa de câmbio");

    const data = await response.json();

    return data;

  }catch(error){
    console.error("Erro ao buscar taxa de câmbio:", error);
    throw error;
  }
}