import {Request, Response, Router} from 'express'
import { 
    CreateUserController, 
    UpdateUserController, 
    LoginUserController, 
    DeleteUserController, 
    GetUserController, 
    GetUserByIdController 
} from './controller/userController'
import { 
    CreateExchangeGoalController, 
    DeleteExchangeGoalController, 
    GetExchangeGoalByIdController, 
    UpdateExchangeGoalController,
    GetExchangeGoalController
} from './controller/exchangeGoalController'
import { authMiddleware } from './middleware/middlewareAuth'

const router = Router()

// User Routes
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

// Exchange Goal Routes
router.post('/exchange-goal', authMiddleware, async (req: Request, res: Response) =>
    new CreateExchangeGoalController().handle(req, res)
)
router.put('/exchange-goal/:id_exchange_goal', authMiddleware, async (req: Request, res: Response) => 
    new UpdateExchangeGoalController().handle(req, res)
)
router.get('/exchange-goal/:id_exchange_goal', authMiddleware, async (req: Request, res: Response) => 
    new GetExchangeGoalByIdController().handle(req, res)
)

router.get('/exchange-goal', authMiddleware, async (req: Request, res: Response) => 
    new GetExchangeGoalController().handle(req, res)
)

router.delete('/exchange-goal/:id_exchange_goal', authMiddleware, async (req: Request, res: Response) => 
    new DeleteExchangeGoalController().handle(req, res)
)

export default router