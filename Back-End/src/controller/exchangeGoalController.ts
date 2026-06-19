import {Request, Response} from 'express'
import { AuthRequest} from '../middleware/middlewareAuth'
import {CreateExchangeGoalService, GetExchangeRateService ,UpdateExchangeGoalService, DeleteExchangeGoalService, GetExchangeGoalService, GetExchangeGoalByIdService} from '../service/exchange_goal'
import {
  ERROR_NOT_FOUND,
  ERROR_INTERNAL_SERVER,
  ERROR_INVALID_ID,
  ERROR_REQUIRED_FIELDS,
  ERROR_FORBIDDEN,
  SUCCESS_CREATED_ITEM,
  SUCCESS_DELETED_ITEM,
  SUCCESS_LOGIN_ITEM,
  SUCCESS_UPDATED_ITEM,
  ERROR_INVALID_CREDENTIALS,
} from "../utils/message";

export class CreateExchangeGoalController{
    async handle(req: AuthRequest, res: Response){
        try{
            const id_user = req.id_user as string

            const { destination, target_currency, amount_needed, deadline } = req.body

            if(!id_user || !destination || !target_currency || !amount_needed || !deadline){
                return res.status(400).json({ message: ERROR_REQUIRED_FIELDS.message });
            }

            const createExchangeGoalService = new CreateExchangeGoalService()

            const exchangeGoal = await createExchangeGoalService.execute(id_user, destination, target_currency, amount_needed, deadline)

            return res.status(201).json({ message: SUCCESS_CREATED_ITEM.message, exchangeGoal });

        }catch(error: any){
            if (error.message === ERROR_REQUIRED_FIELDS.message || error.message === ERROR_INVALID_ID.message) {
                return res.status(400).json({ message: error.message });
            }
            if (error.message === ERROR_NOT_FOUND.message) {
                return res.status(404).json({ message: error.message });
            }
        console.error('Error creating exchange goal:', error);
        return res.status(500).json({ message: ERROR_INTERNAL_SERVER.message });
    }
    }
}

export class UpdateExchangeGoalController{
    async handle(req: AuthRequest, res: Response){
        try{
            const id_exchange_goal = req.params.id_exchange_goal as string

            const { id_user, destination, target_currency, amount_needed, deadline } = req.body

            if(!id_exchange_goal){
                return res.status(400).json({ message: ERROR_INVALID_ID.message });
            }

            if(!id_user || !destination || !target_currency || !amount_needed || !deadline){
                return res.status(400).json({ message: ERROR_REQUIRED_FIELDS.message });
            }

            const updateExchangeGoalService = new UpdateExchangeGoalService()

            const exchangeGoal = await updateExchangeGoalService.execute(id_exchange_goal, { id_user, destination, target_currency, amount_needed, deadline })

            return res.status(200).json({ message: SUCCESS_UPDATED_ITEM.message, exchangeGoal });

        }catch(error: any){
            if (error.message === ERROR_REQUIRED_FIELDS.message || error.message === ERROR_INVALID_ID.message) {
                return res.status(400).json({ message: error.message });
            }
            if (error.message === ERROR_NOT_FOUND.message) {
                return res.status(404).json({ message: error.message });
            }
            console.error('Error updating exchange goal:', error);
            return res.status(500).json({ message: ERROR_INTERNAL_SERVER.message });
        }
    }
}

export class DeleteExchangeGoalController{
    async handle(req: AuthRequest, res: Response){
        try{
            const id_exchange_goal = req.params.id_exchange_goal as string

            if(!id_exchange_goal){
                return res.status(400).json({ message: ERROR_INVALID_ID.message });
            }

            const deleteExchangeGoalService = new DeleteExchangeGoalService()
            
            const exchangeGoal = await deleteExchangeGoalService.execute(id_exchange_goal)
            
            if(!exchangeGoal){
                return res.status(404).json({ message: ERROR_NOT_FOUND.message });
            }

            return res.status(200).json({ message: SUCCESS_DELETED_ITEM.message, exchangeGoal });

        }catch(error){
            console.error('Error deleting exchange goal:', error);
            return res.status(500).json({ message: ERROR_INTERNAL_SERVER.message });
        }
    }
}

export class GetExchangeGoalController{
    async handle(req: AuthRequest, res: Response){
        try{
            const id_user = req.id_user as string

            if(!id_user){
                return res.status(400).json({ message: ERROR_INVALID_ID.message });
            }

            const getExchangeGoalService = new GetExchangeGoalService()

            const exchangeGoals = await getExchangeGoalService.execute(id_user)

            return res.status(200).json(exchangeGoals);

        }catch(error: any){

            if (error.message === ERROR_NOT_FOUND.message) {
                return res.status(404).json({ message: error.message });
            }
            if (error.message === ERROR_INVALID_ID.message) {
                return res.status(400).json({ message: error.message });
            }

            console.error('Error getting exchange goals:', error);
            return res.status(500).json({ message: ERROR_INTERNAL_SERVER.message });
        }
    }
}

export class GetExchangeGoalByIdController{
    async handle(req: AuthRequest, res: Response){
        try{
            const id_exchange_goal = req.params.id_exchange_goal as string

            if(!id_exchange_goal){
                return res.status(400).json({ message: ERROR_INVALID_ID.message });
            }

            const getExchangeGoalByIdService = new GetExchangeGoalByIdService()

            const exchangeGoal = await getExchangeGoalByIdService.execute(id_exchange_goal)

            if(!exchangeGoal){
                return res.status(404).json({ message: ERROR_NOT_FOUND.message });
            }

            return res.status(200).json(exchangeGoal);

        }catch(error: any){

            if (error.message === ERROR_NOT_FOUND.message) {
                return res.status(404).json({ message: error.message });
            }
            if (error.message === ERROR_INVALID_ID.message) {
                return res.status(400).json({ message: error.message });
            }
            console.error('Error getting exchange goal by ID:', error);
            return res.status(500).json({ message: ERROR_INTERNAL_SERVER.message });
        }
    }
}

export class GetExchangeRateController{
    async handle(req: AuthRequest, res: Response){
        try{

            const getExchangeRateService = new GetExchangeRateService()

            const exchangeRate = await getExchangeRateService.execute()

            return res.status(200).json( exchangeRate );
            
        }catch(error: any){
            console.error('Error getting exchange rate:', error);
            return res.status(500).json({ message: ERROR_INTERNAL_SERVER.message });
        }
    }
}
