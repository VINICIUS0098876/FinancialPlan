import prismaClient from '../conf/index'
import {
    ERROR_INTERNAL_SERVER_DB,
    ERROR_NOT_FOUND,
    ERROR_INVALID_ID,
    ERROR_REQUIRED_FIELDS,
} from "../utils/message"

interface BudgetItem {
    id_budget: string,
    id_user?: string,
    category: string,
    amount_limit: number
}

export class UpsertBudgetService{
    async execute(id_user: string, category: string, amount_limit: number){
        try{
            if (!id_user || !category || amount_limit === undefined) {
                throw new Error(ERROR_REQUIRED_FIELDS.message);
            }

            const upsertBudget = await prismaClient.budgets.upsert({
                where: {
                    id_user_category: {
                        id_user: id_user,
                        category: category
                    }
                },
                update: {
                    amount_limit: amount_limit
                },
                create: {
                    id_user: id_user,
                    category: category,
                    amount_limit: amount_limit
                }
            })

            return upsertBudget

        }catch(error: any){
            console.error("Error upserting budget item:", error);
            throw new Error(ERROR_INTERNAL_SERVER_DB.message);
        }
    }
}

export class GetBudgetService{
    async execute(id_user: string){
        try{
            

            const budget = await prismaClient.budgets.findMany({
                where: {
                    id_user: id_user
                }
            })


            return budget

        }catch(error: any){
            console.error("Error fetching budget items:", error);
            throw new Error(ERROR_INTERNAL_SERVER_DB.message);
        }
    }
}

export class DeleteBudgetService{
    async execute(id_budget: string){
        try{
            if (!id_budget) {
                throw new Error(ERROR_INVALID_ID.message);
            }

            const existingBudget = await prismaClient.budgets.findUnique({
                where: {
                    id_budget: id_budget
                }
            })

            if (!existingBudget) {
                throw new Error(ERROR_NOT_FOUND.message);
            }

            const deleteBaudget = await prismaClient.budgets.delete({
                where: {
                    id_budget: id_budget
                }
            })


            return deleteBaudget
            
        }catch(error: any){
            console.error("Error deleting budget item:", error);
            throw new Error(ERROR_INTERNAL_SERVER_DB.message);
        }
    }
}