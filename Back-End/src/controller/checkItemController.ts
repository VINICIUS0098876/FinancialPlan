import {Request, Response} from "express";
import {
    CreateCheckItemService,
    UpdateCheckItemService,
    GetCheckItemService,
    GetCheckItemByIdService,
    DeleteCheckItemService
} from "../service/check_item";
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

export class CreateCheckItemController{
    async handle(req: AuthRequest, res: Response){
        try{
            const {id_exchange_goal, title, description, status, due_date} = req.body

            if(!id_exchange_goal || !title || !status || !due_date){
                return res.status(400).json({ message: ERROR_REQUIRED_FIELDS.message });
            }

            const createCheckItemService = new CreateCheckItemService()

            const checkItem = await createCheckItemService.execute({id_exchange_goal, title, description, status, due_date})

            return res.status(201).json({ message: SUCCESS_CREATED_ITEM.message, checkItem });

        }catch(error: any){
            if (error.message === ERROR_REQUIRED_FIELDS.message || error.message === ERROR_INVALID_ID.message) {
                return res.status(400).json({ message: error.message });
            }
            if (error.message === ERROR_NOT_FOUND.message) {
                return res.status(404).json({ message: error.message });
            }
            console.error('Error creating check item:', error);
            return res.status(500).json({ message: ERROR_INTERNAL_SERVER.message });
        }
    }
}

export class UpdateCheckItemController{
    async handle(req: AuthRequest, res: Response){
        try{
            const id_checklist_item = req.params.id_checklist_item as string

            const {id_exchange_goal, title, description, status, due_date} = req.body

            if(!id_checklist_item){
                return res.status(400).json({ message: ERROR_INVALID_ID.message });
            }

            if(!id_exchange_goal || !title || !status || !due_date){
                return res.status(400).json({ message: ERROR_REQUIRED_FIELDS.message });
            }

            const updateCheckItemService = new UpdateCheckItemService()

            const checkItem = await updateCheckItemService.execute(id_checklist_item, {id_exchange_goal, title, description, status, due_date})

            return res.status(200).json({ message: SUCCESS_UPDATED_ITEM.message, checkItem });

        }catch(error: any){
            if (error.message === ERROR_REQUIRED_FIELDS.message || error.message === ERROR_INVALID_ID.message) {
                return res.status(400).json({ message: error.message });
            }
            if (error.message === ERROR_NOT_FOUND.message) {
                return res.status(404).json({ message: error.message });
            }
            console.error('Error updating check item:', error);
            return res.status(500).json({ message: ERROR_INTERNAL_SERVER.message });
        }
    }
}

export class DeleteCheckItemController{
    async handle(req: AuthRequest, res: Response){
        try{
            const id_checklist_item = req.params.id_checklist_item as string

            if(!id_checklist_item){
                return res.status(400).json({ message: ERROR_INVALID_ID.message });
            }

            const deleteCheckItemService = new DeleteCheckItemService()

            const checkItem = await deleteCheckItemService.execute(id_checklist_item)

            if(!checkItem){
                return res.status(404).json({ message: ERROR_NOT_FOUND.message });
            }

            return res.status(200).json({ message: SUCCESS_DELETED_ITEM.message, checkItem });

        }catch(error: any){
            if (error.message === ERROR_INVALID_ID.message) {
                return res.status(400).json({ message: error.message });
            }
            if (error.message === ERROR_NOT_FOUND.message) {
                return res.status(404).json({ message: error.message });
            }
            console.error('Error deleting check item:', error);
            return res.status(500).json({ message: ERROR_INTERNAL_SERVER.message });
        }
    }
}

export class GetCheckItemController{
    async handle(req: AuthRequest, res: Response){
        try{
            const getCheckItemService = new GetCheckItemService()

            const checkItem = await getCheckItemService.execute()

            if(!checkItem || checkItem.length === 0){
                return res.status(404).json({ message: ERROR_NOT_FOUND.message });
            }

            return res.status(200).json(checkItem);

        }catch(error: any){
            if (error.message === ERROR_NOT_FOUND.message) {
                return res.status(404).json({ message: error.message });
            }
            console.error('Error getting check items:', error);
            return res.status(500).json({ message: ERROR_INTERNAL_SERVER.message });
        }
    }
}

export class GetCheckItemByIdController{
    async handle(req: AuthRequest, res: Response){
        try{
            const id_checklist_item = req.params.id_checklist_item as string

            if(!id_checklist_item){
                return res.status(400).json({ message: ERROR_INVALID_ID.message });
            }

            const getCheckItemByIdService = new GetCheckItemByIdService()

            const checkItem = await getCheckItemByIdService.execute(id_checklist_item)

            if(!checkItem){
                return res.status(404).json({ message: ERROR_NOT_FOUND.message });
            }

            return res.status(200).json(checkItem);

        }catch(error: any){
            if (error.message === ERROR_INVALID_ID.message) {
                return res.status(400).json({ message: error.message });
            }
            if (error.message === ERROR_NOT_FOUND.message) {
                return res.status(404).json({ message: error.message });
            }
            console.error('Error getting check item by id:', error);
            return res.status(500).json({ message: ERROR_INTERNAL_SERVER.message });
        }
    }
}