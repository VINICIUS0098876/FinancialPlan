import {Request, Response} from 'express';
import {
    UpsertBudgetService,
    GetBudgetService,
    DeleteBudgetService
} from '../service/budget';
import {
    ERROR_REQUIRED_FIELDS,
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER,
    SUCCESS_CREATED_ITEM,
    SUCCESS_UPDATED_ITEM,
    SUCCESS_DELETED_ITEM
} from "../utils/message";
import {AuthRequest} from "../middleware/middlewareAuth";

export class UpsertBudgetController {
    async handle(req: AuthRequest, res: Response) {
        try{
            const id_user = req.id_user as string
            const {category, amount_limit} = req.body

            if(!category || amount_limit === undefined){
                return res.status(400).json({ message: ERROR_REQUIRED_FIELDS.message });
            }

            const upsertBudgetService = new UpsertBudgetService()

            const budget = await upsertBudgetService.execute(id_user, category, amount_limit)

            return res.status(200).json({ message: SUCCESS_UPDATED_ITEM.message, budget });

        }catch(error: any){
            if (error.message === ERROR_REQUIRED_FIELDS.message || error.message === ERROR_INVALID_ID.message) {
                return res.status(400).json({ message: error.message });
            }
            console.error('Error upserting budget item:', error);
            return res.status(500).json({ message: ERROR_INTERNAL_SERVER.message });
        }
    }
}

export class GetBudgetController {
    async handle(req: AuthRequest, res: Response) {
        try{    
            const id_user = req.id_user as string

            if(!id_user){
                return res.status(400).json({ message: ERROR_INVALID_ID.message });
            }

            const getBudgetService = new GetBudgetService()

            const budget = await getBudgetService.execute(id_user)

            return res.status(200).json({ budget });

        }catch(error: any){
            if (error.message === ERROR_INVALID_ID.message) {
                return res.status(400).json({ message: error.message });
            }
            console.error('Error fetching budget:', error);
            return res.status(500).json({ message: ERROR_INTERNAL_SERVER.message });
        }
    }
}

export class DeleteBudgetController {
    async handle(req: AuthRequest, res: Response) {
        try{
            const id_budget = req.params.id_budget as string

            if(!id_budget){
                return res.status(400).json({ message: ERROR_INVALID_ID.message });
                }

            const deleteBudgetService = new DeleteBudgetService()

            const budget = await deleteBudgetService.execute(id_budget)

            return res.status(200).json({ message: SUCCESS_DELETED_ITEM.message, budget });
            
        }catch(error: any){
            if (error.message === ERROR_INVALID_ID.message) {
                return res.status(400).json({ message: error.message });
            }
            console.error('Error deleting budget item:', error);
            return res.status(500).json({ message: ERROR_INTERNAL_SERVER.message });
        }
    }
}