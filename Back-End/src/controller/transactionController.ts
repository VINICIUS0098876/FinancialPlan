import {Request, Response} from 'express'
import { 
    CreateTransactionService, 
    UpdateTransactionService, 
    GetTransactionService, 
    GetTransactionByIdService, 
    DeleteTransactionService
 } from '../service/transaction'
import { 
    ERROR_REQUIRED_FIELDS, 
    ERROR_INVALID_ID, 
    ERROR_NOT_FOUND, 
    ERROR_INTERNAL_SERVER, 
    SUCCESS_CREATED_ITEM, 
    SUCCESS_DELETED_ITEM, 
    SUCCESS_UPDATED_ITEM 
} from '../utils/message'
import { AuthRequest } from '../middleware/middlewareAuth';


 export class CreateTransactionController{
    async handle(req: Request, res: Response){
    try{
        const {id_exchange_goal, description, amount_brl, exchange_rate, amount_foreign, platform} = req.body

        if(!id_exchange_goal || !description || amount_brl == null || exchange_rate == null || amount_foreign == null || !platform){
            return res.status(400).json({ message: ERROR_REQUIRED_FIELDS.message });
        }

        const createTransactionService = new CreateTransactionService()

        const transaction = await createTransactionService.execute({id_exchange_goal, description, amount_brl, exchange_rate, amount_foreign, platform})

        return res.status(201).json({ message: SUCCESS_CREATED_ITEM.message, transaction });
        
    }catch(error: any){
        if (error.message === ERROR_REQUIRED_FIELDS.message || error.message === ERROR_INVALID_ID.message) {
                        return res.status(400).json({ message: error.message });
                    }
                    if (error.message === ERROR_NOT_FOUND.message) {
                        return res.status(404).json({ message: error.message });
                    }
                console.error('Error creating transaction:', error);
                return res.status(500).json({ message: ERROR_INTERNAL_SERVER.message });
    }
        
    }
 }

 export class UpdateTransactionController{
    async handle(req: AuthRequest, res: Response){
        try{
            const id_transaction = req.params.id_transaction as string

            const {id_exchange_goal, description, amount_brl, exchange_rate, amount_foreign, platform} = req.body

            if(!id_transaction){
                return res.status(400).json({ message: ERROR_INVALID_ID.message });
            }

            if(!id_exchange_goal || !description || amount_brl == null || exchange_rate == null || amount_foreign == null || !platform ){
                return res.status(400).json({ message: ERROR_REQUIRED_FIELDS.message });
            }

            const updateTransactionService = new UpdateTransactionService()

            const transaction = await updateTransactionService.execute(id_transaction, {id_exchange_goal, description, amount_brl, exchange_rate, amount_foreign, platform})

            return res.status(200).json({ message: SUCCESS_UPDATED_ITEM.message, transaction });

        }catch(error: any){
            if (error.message === ERROR_REQUIRED_FIELDS.message || error.message === ERROR_INVALID_ID.message) {
                return res.status(400).json({ message: error.message });
            }
            if (error.message === ERROR_NOT_FOUND.message) {
                return res.status(404).json({ message: error.message });
            }
            console.error('Error updating transaction:', error);
            return res.status(500).json({ message: ERROR_INTERNAL_SERVER.message });
        }
    }
 }

 export class DeleteTransactionController{
    async handle(req: AuthRequest, res: Response){
        try{
            const id_transaction = req.params.id_transaction as string

            if(!id_transaction){
                return res.status(400).json({ message: ERROR_INVALID_ID.message });
            }

            const deleteTransactionService = new DeleteTransactionService()

            const transaction = await deleteTransactionService.execute(id_transaction)

            if(!transaction){
                return res.status(404).json({ message: ERROR_NOT_FOUND.message });
            }

            return res.status(200).json({ message: SUCCESS_DELETED_ITEM.message, transaction });

        }catch(error: any){
            console.error('Error deleting transaction:', error);
            return res.status(500).json({ message: ERROR_INTERNAL_SERVER.message });
        }
    }
 }

 export class GetTransactionController{
    async handle(req: Request, res: Response){
        try{
            const getTransactionService = new GetTransactionService()

            const transaction = await getTransactionService.execute()

            if(!transaction || transaction.length === 0){
                return res.status(404).json({ message: ERROR_NOT_FOUND.message });
            }

            return res.status(200).json(transaction);

        }catch(error: any){
            if (error.message === ERROR_NOT_FOUND.message) {
                return res.status(404).json({ message: error.message });
            }
            if (error.message === ERROR_INVALID_ID.message) {
                return res.status(400).json({ message: error.message });
            }

            console.error('Error getting transactions:', error);
            return res.status(500).json({ message: ERROR_INTERNAL_SERVER.message });
        }
    }
 }

 export class GetTransactionByIdController{
    async handle(req: Request, res: Response){
        try{
            const id_transaction = req.params.id_transaction as string

            if(!id_transaction){
                return res.status(400).json({ message: ERROR_INVALID_ID.message });
            }

            const getTransactionByIdService = new GetTransactionByIdService()

            const transaction = await getTransactionByIdService.execute(id_transaction)

            if(!transaction){
                return res.status(404).json({ message: ERROR_NOT_FOUND.message });
            }

            return res.status(200).json(transaction)

        }catch(error: any){
             if (error.message === ERROR_NOT_FOUND.message) {
                return res.status(404).json({ message: error.message });
            }
            if (error.message === ERROR_INVALID_ID.message) {
                return res.status(400).json({ message: error.message });
            }
            console.error('Error getting transaction by ID:', error);
            return res.status(500).json({ message: ERROR_INTERNAL_SERVER.message });
        }
    }
 }