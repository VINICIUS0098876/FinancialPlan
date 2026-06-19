import {Request, Response, Router} from 'express'
import { 
    CreateUserController, 
    UpdateUserController, 
    LoginUserController, 
    DeleteUserController, 
    GetUserController, 
    GetUserByIdController,
    RequestPasswordResetController,
    ResetPasswordController
} from './controller/userController'
import { 
    CreateExchangeGoalController, 
    DeleteExchangeGoalController, 
    GetExchangeGoalByIdController, 
    UpdateExchangeGoalController,
    GetExchangeGoalController,
    GetExchangeRateController
} from './controller/exchangeGoalController'
import { 
    CreateTransactionController, 
    UpdateTransactionController,
    DeleteTransactionController,
    GetTransactionController,
    GetTransactionByIdController 
} from './controller/transactionController'
import { authMiddleware } from './middleware/middlewareAuth'
import { 
    CreateCheckItemController, 
    DeleteCheckItemController, 
    GetCheckItemByIdController, 
    GetCheckItemController, 
    UpdateCheckItemController 
} from './controller/checkItemController'
import{
    UpsertBudgetController,
    GetBudgetController,
    DeleteBudgetController
} from './controller/budgetController'

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

router.post('/user/forgot-password', async (req: Request, res: Response) => 
    new RequestPasswordResetController().handle(req, res)
);

router.post('/user/reset-password', async (req: Request, res: Response) => {
    return new ResetPasswordController().handle(req, res);
});

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

router.get('/exchange-rate', authMiddleware, async (req: Request, res: Response) => 
    new GetExchangeRateController().handle(req, res)
)

// Transaction Routes
router.post('/transaction', authMiddleware, async (req: Request, res: Response) =>
    new CreateTransactionController().handle(req, res)
)
router.put('/transaction/:id_transaction', authMiddleware, async (req: Request, res: Response) => 
    new UpdateTransactionController().handle(req, res)
)
router.get('/transaction/:id_transaction', authMiddleware, async (req: Request, res: Response) => 
    new GetTransactionByIdController().handle(req, res)
)

router.get('/transaction', authMiddleware, async (req: Request, res: Response) => 
    new GetTransactionController().handle(req, res)
)

router.delete('/transaction/:id_transaction', authMiddleware, async (req: Request, res: Response) => 
    new DeleteTransactionController().handle(req, res)
)


// Checklist Routes
router.post('/checklist-item', authMiddleware, async (req: Request, res: Response) =>
    new CreateCheckItemController().handle(req, res)
)
router.put('/checklist-item/:id_checklist_item', authMiddleware, async (req: Request, res: Response) => 
    new UpdateCheckItemController().handle(req, res)
)
router.get('/checklist-item/:id_checklist_item', authMiddleware, async (req: Request, res: Response) => 
    new GetCheckItemByIdController().handle(req, res)
)
router.get('/checklist-item', authMiddleware, async (req: Request, res: Response) => 
    new GetCheckItemController().handle(req, res)
)
router.delete('/checklist-item/:id_checklist_item', authMiddleware, async (req: Request, res: Response) => 
    new DeleteCheckItemController().handle(req, res)
)

// Budget Routes
router.post('/budget', authMiddleware, async (req: Request, res: Response) =>
    new UpsertBudgetController().handle(req, res)
)
router.get('/budget', authMiddleware, async (req: Request, res: Response) =>
    new GetBudgetController().handle(req, res)
)
router.delete('/budget/:id_budget', authMiddleware, async (req: Request, res: Response) =>
    new DeleteBudgetController().handle(req, res)
)

export default router