import {Request, Response, Router} from 'express'
import { 
    CreateUserController, 
    UpdateUserController, 
    LoginUserController, 
    DeleteUserController, 
    GetUserController, 
    GetUserByIdController 
} from './controller/userController'
import { authMiddleware } from './middleware/middlewareAuth'

const router = Router()

router.post('/user', async (req: Request, res: Response) => 
    new CreateUserController().handle(req, res)
)
router.put('/user/:id_user', authMiddleware, async (req: Request, res: Response) => 
    new UpdateUserController().handle(req, res)
)
router.delete('/user/:id_user', authMiddleware, async (req: Request, res: Response) => 
    new DeleteUserController().handle(req, res)
)
router.get('/user', async (req: Request, res: Response) => 
    new GetUserController().handle(req, res)
)
router.get('/user/:id_user', authMiddleware, async (req: Request, res: Response) => 
    new GetUserByIdController().handle(req, res)
)
router.post('/user/login', async (req: Request, res: Response) => 
    new LoginUserController().handle(req, res)
)

export default router