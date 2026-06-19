import prismaClient from '../conf/index'
import {
  ERROR_INTERNAL_SERVER_DB,
  ERROR_NOT_FOUND,
  ERROR_INVALID_ID,
  ERROR_REQUIRED_FIELDS,
} from "../utils/message"

interface Transaction{
    id_exchange_goal: string,
    category?: string,
    description: string,
    amount_brl: number,
    exchange_rate: number,
    amount_foreign: number,
    platform: 'WISE' | 'NOMAD' | 'CASH' | 'OTHER',
}

export class CreateTransactionService{
    async execute({id_exchange_goal, category, description, amount_brl, exchange_rate, amount_foreign, platform}: Transaction){
try{

        if(!id_exchange_goal || !description || amount_brl == null || exchange_rate == null || amount_foreign == null || !platform){
            throw new Error(ERROR_REQUIRED_FIELDS.message)
        }

    const exchangeGoalExists = await prismaClient.exchange_goals.findUnique({
        where: {
            id_exchange_goal
        }
    })

    if (!exchangeGoalExists) {
        throw new Error(ERROR_NOT_FOUND.message);
    }

            const transaction = await prismaClient.transactions.create({
                data: {
                    id_exchange_goal,
                    category,
                    description,
                    amount_brl,
                    exchange_rate,
                    amount_foreign,
                    platform
                }
            })

            return transaction

        }catch(error: any){
            if (error.message === ERROR_REQUIRED_FIELDS.message || error.message === ERROR_NOT_FOUND.message) {
            throw error;
        }
            console.error(error)
            throw new Error(ERROR_INTERNAL_SERVER_DB.message)
        }
    }
}

export class UpdateTransactionService{
    async execute(id_transaction: string, {id_exchange_goal, description, amount_brl, exchange_rate, amount_foreign, platform}: Transaction){
        try{
            const findTransaction = await prismaClient.transactions.findUnique({
                where: {
                    id_transaction
                }
            })

            if(!findTransaction){
                throw new Error(ERROR_NOT_FOUND.message);
            }

            const exchangeGoalExists = await prismaClient.exchange_goals.findUnique({
                where: {
                    id_exchange_goal
                }
            })

            if (!exchangeGoalExists) {
                throw new Error(ERROR_NOT_FOUND.message);
            }

            const updateTransaction = await prismaClient.transactions.update({
                where: {
                    id_transaction
                },
                data: {
                    id_exchange_goal,
                    description,
                    amount_brl,
                    exchange_rate,
                    amount_foreign,
                    platform
                }
            })

            return updateTransaction

        }catch(error: any){
                if (error.message === ERROR_NOT_FOUND.message) {
                    throw error;
                }
                console.error(error)
                throw new Error(ERROR_INTERNAL_SERVER_DB.message)
        }
    }
}

export class GetTransactionService{
    async execute(id_user: string){
        try{

            const userGoals = await prismaClient.exchange_goals.findMany({
                where: {
                    id_user
                }
            })

            const goalIds = userGoals.map(goal => goal.id_exchange_goal);


            const transaction = await prismaClient.transactions.findMany({
                where: {
                    id_exchange_goal: {
                        in: goalIds
                    }
                }
            })


            return transaction

        }catch(error: any){
            if (error.message === ERROR_NOT_FOUND.message) {
                throw error;
            }

            if (error.message === ERROR_INVALID_ID.message) {
                throw error;
            }
            console.error(error)
            throw new Error(ERROR_INTERNAL_SERVER_DB.message)
        }
    }
}

export class GetTransactionByIdService{
    async execute(id_transaction: string){
        try{
            const transaction = await prismaClient.transactions.findUnique({
                where: {
                    id_transaction
                }
            })

            if(!transaction){
                throw new Error(ERROR_NOT_FOUND.message);
            }

            return transaction

        }catch(error: any){
            if (error.message === ERROR_NOT_FOUND.message) {
                throw error;
            }
            if (error.message === ERROR_INVALID_ID.message) {
                throw error;
            }
            console.error(error)
            throw new Error(ERROR_INTERNAL_SERVER_DB.message)
        }
    }
}

export class DeleteTransactionService{
    async execute(id_transaction: string){
        try{
            const findTransaction = await prismaClient.transactions.findUnique({
                where: {
                    id_transaction
                }
            })

            if(!findTransaction){
                throw new Error(ERROR_NOT_FOUND.message);
            }

            const transaction = await prismaClient.transactions.delete({
                where: {
                    id_transaction
                }
            })

            return transaction

        }catch(error: any){
            if (error.message === ERROR_NOT_FOUND.message) {
                throw error;
            }
            console.error("Error deleting transaction:", error);
            throw new Error(ERROR_INTERNAL_SERVER_DB.message)
        }
    }
}

