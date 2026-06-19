import {postRequest, getRequest, deleteRequest} from "./api"

export interface Budget{
    id_budget?: string;
    category: string;
    amount_limit: number;
    created_at?: string;
}

export const createBudget = async (data: Omit<Budget, "id_budget" | "created_at">) => {
    try{
        const response = await postRequest("/budget", data);
        if(!response.ok) throw new Error("Erro ao criar orçamento");
        return await response.json();
    }catch(error){
        console.error("Erro ao criar orçamento:", error);
        throw error;
    }
}

export const getBudgets = async () => {
    try {
        // Supondo que você tenha um getRequest configurado como o postRequest
        const response = await getRequest("/budget"); 
        if (!response.ok) throw new Error("Erro ao buscar orçamentos");
        return await response.json();
    } catch (error) {
        console.error("Erro ao buscar orçamentos:", error);
        return [];
    }
}

export const deleteBudget = async (id_budget: string) => {
    try{
        const response = await deleteRequest(`/budget/${id_budget}`);
        if (!response.ok) throw new Error("Erro ao excluir orçamento");
        return await response.json();
    } catch (error) {
        console.error("Erro ao excluir orçamento:", error);
        throw error;
    }
}