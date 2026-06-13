import prismaClient from'../conf/index'
import {
    ERROR_INTERNAL_SERVER_DB,
    ERROR_NOT_FOUND,
    ERROR_INVALID_ID,
    ERROR_REQUIRED_FIELDS,
} from "../utils/message"

type status = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED'

interface CheckItem {
    id_exchange_goal: string,
    title: string,
    description?: string,
    status: status | null,
    due_date: Date | null
}

export class CreateCheckItemService{
    async execute({id_exchange_goal, title, description, status, due_date}: CheckItem){
        try{

            if(!id_exchange_goal || !title){
                throw new Error(ERROR_REQUIRED_FIELDS.message);
            }

            const findExchangeGoal = await prismaClient.exchange_goals.findUnique({
                where: {
                    id_exchange_goal
                }
            })

            if(!findExchangeGoal){
                throw new Error(ERROR_NOT_FOUND.message);
            }

            const formattedDueDate = due_date ? new Date(due_date) : undefined

            const checkItem = await prismaClient.checklist_items.create({
                data: {
                    id_exchange_goal,
                    title,
                    description,
                    status: status || 'PENDING',
                    due_date: formattedDueDate
                }
            })

            return checkItem

        }catch(error: any){
            if (error.message === ERROR_REQUIRED_FIELDS.message) {
                throw error;
            }

            if (error.message === ERROR_NOT_FOUND.message) {
                throw error;
            }

            console.error("Error creating check item:", error);
            throw new Error(ERROR_INTERNAL_SERVER_DB.message);
        }
    }
}

export class UpdateCheckItemService{
    async execute(id_checklist_item: string, { id_exchange_goal, title, description, status, due_date}: CheckItem){
        try{
            
            if(!id_exchange_goal || !title){
                throw new Error(ERROR_REQUIRED_FIELDS.message);
            }

            if (!id_checklist_item) {
                throw new Error(ERROR_INVALID_ID.message);
            }

            const findCheckItem = await prismaClient.checklist_items.findUnique({
                where: {
                    id_checklist_item
                }
            })

            if(!findCheckItem){
                throw new Error(ERROR_NOT_FOUND.message);
            }

            const formattedDueDate = due_date ? new Date(due_date) : undefined

            const updateCheckItem = await prismaClient.checklist_items.update({
                where: {
                    id_checklist_item
                },
                data: {
                    id_exchange_goal,
                    title,
                    description,
                    status,
                    due_date: formattedDueDate
                }
            })

            return updateCheckItem

        }catch(error: any){
            if (error.message === ERROR_NOT_FOUND.message) {
                throw error;
            }
            if (error.message === ERROR_INVALID_ID.message) {
                throw error;
            }
            if (error.message === ERROR_REQUIRED_FIELDS.message) {
                throw error;
            }
            console.error("Error updating check item:", error);
            throw new Error(ERROR_INTERNAL_SERVER_DB.message);
        }
    }
}

export class DeleteCheckItemService{
    async execute(id_checklist_item: string){
        try{

            if (!id_checklist_item) {
                throw new Error(ERROR_INVALID_ID.message);
            }

            const findCheckItem = await prismaClient.checklist_items.findUnique({
                where: {
                    id_checklist_item
                }
            })

            if(!findCheckItem){
                throw new Error(ERROR_NOT_FOUND.message);
            }

            const checkItem = await prismaClient.checklist_items.delete({
                where: {
                    id_checklist_item
                }
            })

            return checkItem

        }catch(error: any){
            if (error.message === ERROR_NOT_FOUND.message) {
                throw error;
            }
            if (error.message === ERROR_INVALID_ID.message) {
                throw error;
            }
            console.error("Error deleting check item:", error);
            throw new Error(ERROR_INTERNAL_SERVER_DB.message);
        }
    }
}

export class GetCheckItemService{
    async execute(){
        try{
            const checkItem = await prismaClient.checklist_items.findMany()

            if(checkItem.length === 0){
                 throw new Error(ERROR_NOT_FOUND.message);
            }

            return checkItem

        }catch(error: any){
            if (error.message === ERROR_NOT_FOUND.message) {
                throw error;
            }
            console.error("Error fetching check items:", error);
            throw new Error(ERROR_INTERNAL_SERVER_DB.message);
        }
    }
}

export class GetCheckItemByIdService{
    async execute(id_checklist_item: string){
        try{
            if (!id_checklist_item) {
                throw new Error(ERROR_INVALID_ID.message);
            }

            const checkItem = await prismaClient.checklist_items.findUnique({
                where: {
                    id_checklist_item
                }
            })

            if(!checkItem){
                throw new Error(ERROR_NOT_FOUND.message);
            }

            return checkItem

        }catch(error: any){
            if (error.message === ERROR_NOT_FOUND.message) {
                throw error;
            }
            if (error.message === ERROR_INVALID_ID.message) {
                throw error;
            }
            console.error("Error fetching check item by ID:", error);
            throw new Error(ERROR_INTERNAL_SERVER_DB.message);
        }
    }
}
