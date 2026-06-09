import  prismaClient  from "../conf/index";
import {
  ERROR_INTERNAL_SERVER_DB,
  ERROR_NOT_FOUND,
  ERROR_INVALID_ID,
  ERROR_REQUIRED_FIELDS,
} from "../utils/message"


interface ExchangeGoal{
    id_user: string,
    destination: string,
    target_currency: string,
    amount_needed: number,
    deadline: Date
}

export class CreateExchangeGoalService{
    async execute(id_user: string, destination: string, target_currency: string, amount_needed: number, deadline: Date){
        try{
            
            if(!id_user || !destination || !target_currency || !amount_needed || !deadline){
                throw new Error(ERROR_REQUIRED_FIELDS.message);
            }

            const exchangeGoal = prismaClient.exchange_goals.create({
                data: {
                    id_user,
                    destination,
                    target_currency,
                    amount_needed,
                    deadline
                }
            })

            return exchangeGoal

        }catch(error: any){
            if (error.message === ERROR_REQUIRED_FIELDS.message) {
                throw error;
            }
            console.error("Error creating exchange goal:", error);
            throw new Error(ERROR_INTERNAL_SERVER_DB.message);
        }
    }
}

export class UpdateExchangeGoalService{
    async execute(id_exchange_goal: string, { id_user,destination, target_currency, amount_needed, deadline }: ExchangeGoal){
        try{

            const findExchangeGoal = await prismaClient.exchange_goals.findUnique({
                where: {
                    id_exchange_goal
                }
            })

            if(!findExchangeGoal){
                throw new Error(ERROR_NOT_FOUND.message);
            }

            const exchangeGoal = await prismaClient.exchange_goals.update({
                where: { id_exchange_goal },
                data: {
                    id_user,
                    destination,
                    target_currency,
                    amount_needed,
                    deadline
                }
            })

            return exchangeGoal

        }catch(error: any){
            if (error.message === ERROR_NOT_FOUND.message) {
                throw error;
            }
            console.error("Error updating exchange goal:", error);
            throw new Error(ERROR_INTERNAL_SERVER_DB.message);
        }
    }
}

export class DeleteExchangeGoalService{
    async execute(id_exchange_goal: string){
        try{

            const findExchangeGoal = await prismaClient.exchange_goals.findUnique({
                where: {
                    id_exchange_goal
                }
            })

            if(!findExchangeGoal){
                throw new Error(ERROR_NOT_FOUND.message);
            }

            const exchangeGoal = await prismaClient.exchange_goals.delete({
                where: { id_exchange_goal }
            })

            return exchangeGoal

        }catch(error: any){
            if (error.message === ERROR_NOT_FOUND.message) {
                throw error;
            }
            console.error("Error deleting exchange goal:", error);
            throw new Error(ERROR_INTERNAL_SERVER_DB.message);
        }
    }
}

export class GetExchangeGoalService{
    async execute(){
        try{

            const exchangeGoal = await prismaClient.exchange_goals.findMany()

            if(exchangeGoal.length === 0){
                throw new Error(ERROR_NOT_FOUND.message);
            }

            return exchangeGoal

        }catch(error: any){
            if (error.message === ERROR_NOT_FOUND.message) {
                throw error;
            }
            console.error("Error fetching exchange goal:", error);
            throw new Error(ERROR_INTERNAL_SERVER_DB.message);
        }
    }
}

export class GetExchangeGoalByIdService{
    async execute(id_exchange_goal: string){
        try{

            if(!id_exchange_goal){
                throw new Error(ERROR_INVALID_ID.message);
            }

            const exchangeGoal = await prismaClient.exchange_goals.findUnique({
                where: { id_exchange_goal }
            })

                if(!exchangeGoal){
                    throw new Error(ERROR_NOT_FOUND.message);
                }

            return exchangeGoal

        }catch(error: any){
            if (error.message === ERROR_NOT_FOUND.message) {
                throw error;
            }
            console.error("Error fetching exchange goal by id:", error);
            throw new Error(ERROR_INTERNAL_SERVER_DB.message);
        }
    }
}