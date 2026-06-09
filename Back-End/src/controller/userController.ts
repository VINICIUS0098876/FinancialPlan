import {Request, Response} from 'express'
import { AuthRequest} from '../middleware/middlewareAuth'
import {
    CreateUserService, 
    UpdateUserService, 
    LoginUserService, 
    DeleteUserService, 
    GetUserService, 
    GetUserByIdService
} from '../service/user'
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
  ERROR_CONFLICT,
} from "../utils/message";

export class CreateUserController{
    async handle(req: Request, res: Response){
        try{
            const {name, email, password} = req.body

            if(!name || !email || !password) {
                return res.status(400).json({ message: ERROR_REQUIRED_FIELDS.message });
            }

            const createUserService = new CreateUserService()

            const user = await createUserService.execute(name, email, password)

            return res.status(201).json({ message: SUCCESS_CREATED_ITEM.message, user });

        }catch(error: any){
            if (error.message === ERROR_REQUIRED_FIELDS.message || error.message === ERROR_INVALID_ID.message) {
                return res.status(400).json({ message: error.message });
            }
            if (error.message === ERROR_NOT_FOUND.message) {
                return res.status(404).json({ message: error.message });
            }
            if (error.message === ERROR_INVALID_CREDENTIALS.message) {
                return res.status(409).json({ message: ERROR_CONFLICT.message }); 
            }
            console.error('Error creating user:', error);
            return res.status(500).json({ message: ERROR_INTERNAL_SERVER.message });
        }
    }
}

export class UpdateUserController{
    async handle(req: AuthRequest, res: Response){
        try{
            const id_user = (req.params.id_user as string);
            const { name, email, password} = req.body

            if(!id_user){
                return res.status(400).json({ message: ERROR_INVALID_ID.message });
            }

            if(!name || !email || !password) {
                return res.status(400).json({ message: ERROR_REQUIRED_FIELDS.message });
            }

            if(!req.id_user || req.id_user !== id_user){
                return res.status(403).json({ message: ERROR_FORBIDDEN.message });
            }

            const updateUserService = new UpdateUserService()

            const user = await updateUserService.execute(id_user, { name, email, password})

            if(!user){
                return res.status(404).json({ message: ERROR_NOT_FOUND.message });
            }

            return res.status(200).json({ message: SUCCESS_UPDATED_ITEM.message, user });

        }catch(error: any){
            if (error.message === ERROR_REQUIRED_FIELDS.message || error.message === ERROR_INVALID_ID.message) {
                return res.status(400).json({ message: error.message });
            }
            if (error.message === ERROR_NOT_FOUND.message) {
                return res.status(404).json({ message: error.message });
            }
            console.error('Error updating user:', error);
            return res.status(500).json({ message: ERROR_INTERNAL_SERVER.message });
        }
    }
}

export class GetUserController{
    async handle(req: Request, res: Response){
        try{
            const getUserService = new GetUserService()

            const user = await getUserService.execute()

            if(user.length === 0){
                return res.status(404).json({ message: ERROR_NOT_FOUND.message });
            }

            return res.status(200).json(user);

        }catch(error: any){
            if (error.message === ERROR_NOT_FOUND.message) {
                return res.status(404).json({ message: error.message });
            }
            console.error('Error getting users:', error);
            return res.status(500).json({ message: ERROR_INTERNAL_SERVER.message });
        }
    }
}

export class GetUserByIdController{
    async handle(req: AuthRequest, res: Response){
        try{
            const id_user = (req.params.id_user as string);
            
            if(!id_user){
                return res.status(400).json({ message: ERROR_INVALID_ID.message });
            }

            const getUserByIdService = new GetUserByIdService()

            const user = await getUserByIdService.execute(id_user)

            if(!user){
                return res.status(404).json({ message: ERROR_NOT_FOUND.message });
            }

            return res.status(200).json(user);

        }catch(error: any){
            if (error.message === ERROR_NOT_FOUND.message) {
                return res.status(404).json({ message: error.message });
            }
            if (error.message === ERROR_INVALID_ID.message) {
                return res.status(400).json({ message: error.message });
            }
            console.error('Error getting user by ID:', error);
            return res.status(500).json({ message: ERROR_INTERNAL_SERVER.message });
    }
}
}

export class DeleteUserController{
    async handle(req: AuthRequest, res: Response){
        try{
            const id_user = (req.params.id_user as string);
            
            if(!id_user){
                return res.status(400).json({ message: ERROR_INVALID_ID.message });
            }

            if(!req.id_user || req.id_user !== id_user){
                return res.status(403).json({ message: ERROR_FORBIDDEN.message });
            }

            const deleteUserService = new DeleteUserService()

            const user = await deleteUserService.execute(id_user)

            if(!user){
                return res.status(404).json({ message: ERROR_NOT_FOUND.message });
             }

                return res.status(200).json({ message: SUCCESS_DELETED_ITEM.message, user });
        }catch(error){
            console.error('Error deleting user:', error);
            return res.status(500).json({ message: ERROR_INTERNAL_SERVER.message });
        }
    }
}

export class LoginUserController{
    async handle(req: Request, res: Response){
        try{
            const { email, password } = req.body

            if(!email || !password) {
                return res.status(400).json({ message: ERROR_REQUIRED_FIELDS.message });
            }

            const loginUserService = new LoginUserService()

            const user = await loginUserService.execute(email, password)

            if(!user){
                return res.status(401).json({ message: ERROR_INVALID_CREDENTIALS.message });
            }

            return res.status(200).json({ message: SUCCESS_LOGIN_ITEM.message, token: user.token });
        
        }catch(error: any){
            if (error.message === ERROR_REQUIRED_FIELDS.message) {
            return res.status(400).json({ message: error.message });
        }
        
        if (error.message === ERROR_INVALID_CREDENTIALS.message) {
            return res.status(401).json({ message: error.message });
        }
            console.error('Error logging in user:', error);
            return res.status(500).json({ message: ERROR_INTERNAL_SERVER.message });
        }
    }
}
