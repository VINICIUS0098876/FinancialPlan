import prismaClient from '../conf/index'
import { 
    CreateTransactionService,
    UpdateTransactionService,
    GetTransactionByIdService,
    DeleteTransactionService,
    GetTransactionService
} from '../service/transaction'
import { ERROR_NOT_FOUND, ERROR_REQUIRED_FIELDS } from '../utils/message';

jest.mock('../conf/index', () => ({
    __esModule: true,
    default: {
        transactions: {
            findUnique: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findMany: jest.fn()
        },
    exchange_goals: {
            findMany: jest.fn().mockResolvedValue([{ id_exchange_goal: "mock-id" }]),
            findUnique: jest.fn().mockResolvedValue(true),
        }
    }
}))

describe('CreateTransactionService', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('Deve ser capaz de criar uma nova transação com sucesso!', async () => {
        (prismaClient.exchange_goals.findUnique as jest.Mock).mockResolvedValue({id_exchange_goal: '12345-uuid'});

        const mockTransaction = {
            id_transaction: '12345-uuid',
            id_exchange_goal: '12345-uuid',
            description: 'Compra de moeda estrangeira para viagem',
            amount_brl: 500,
            exchange_rate: 6.10,
            amount_foreign: 81.96,
            platform: 'WISE',
            created_at: new Date(),
        };
        (prismaClient.transactions.create as jest.Mock).mockResolvedValue(mockTransaction);

        const createTransactionService = new CreateTransactionService()

        const result = await createTransactionService.execute({
            id_exchange_goal: '12345-uuid',
            description: 'Compra de moeda estrangeira para viagem',
            amount_brl: 500,
            exchange_rate: 6.10,
            amount_foreign: 81.96,
            platform: 'WISE'
        });

        expect(result).toEqual(mockTransaction)
        expect(prismaClient.exchange_goals.findUnique).toHaveBeenCalledTimes(1)
        expect(prismaClient.transactions.create).toHaveBeenCalledTimes(1)
    });

    it('Não deve ser capaz de criar uma transação sem campos obrigatórios', async () => {

        const createTransactionService = new CreateTransactionService()

        const result = createTransactionService.execute({
            id_exchange_goal: '12345-uuid',
            description: 'Depósito falho',
            amount_brl: undefined as any,
            exchange_rate: undefined as any,
            amount_foreign: undefined as any,
            platform: 'WISE'
         });

         await expect(result).rejects.toThrow(ERROR_REQUIRED_FIELDS.message)

         expect(prismaClient.exchange_goals.findUnique).not.toHaveBeenCalled()
         expect(prismaClient.transactions.create).not.toHaveBeenCalled()
    
    })

    it('Não deve ser capaz de criar uma transação para uma meta de câmbio inexistente', async () => {
        (prismaClient.exchange_goals.findUnique as jest.Mock).mockResolvedValue(null);

        const createTransactionService = new CreateTransactionService()

        const result = createTransactionService.execute({
            id_exchange_goal: 'non-existent-goal-id',
            description: 'Compra de moeda estrangeira para viagem',
            amount_brl: 500,
            exchange_rate: 6.10,
            amount_foreign: 81.96,
            platform: 'WISE'
        });

        await expect(result).rejects.toThrow(ERROR_NOT_FOUND.message)

        expect(prismaClient.exchange_goals.findUnique).toHaveBeenCalledTimes(1)
        expect(prismaClient.transactions.create).not.toHaveBeenCalled()
    })
})

describe('UpdateTransactionService', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('Deve ser capaz de atualizar uma transação existente com secesso!', async () => {

        (prismaClient.transactions.findUnique as jest.Mock).mockResolvedValue({
            id_transaction: '12345-uuid',
            id_exchange_goal: '12345-uuid',
            description: 'Compra de moeda estrangeira para viagem',
            amount_brl: 500,
            exchange_rate: 6.10,
            amount_foreign: 81.96,
            platform: 'WISE',
            created_at: new Date(),
        });

        (prismaClient.exchange_goals.findUnique as jest.Mock).mockResolvedValue({id_exchange_goal: '12345-uuid'});

        const updatedTransaction = {
            id_transaction: '12345-uuid',
            id_exchange_goal: '12345-uuid',
            description: 'Compra de moeda estrangeira para viagem - Atualizado',
            amount_brl: 600,
            exchange_rate: 6.20,
            amount_foreign: 96.77,
            platform: 'WISE',
            created_at: new Date()
        };

        (prismaClient.transactions.update as jest.Mock).mockResolvedValue(updatedTransaction);

        const updateTransactionService = new UpdateTransactionService()
        
        const result = await updateTransactionService.execute('12345-uuid', {
            id_exchange_goal: '12345-uuid',
            description: 'Compra de moeda estrangeira para viagem - Atualizado',
            amount_brl: 600,
            exchange_rate: 6.20,
            amount_foreign: 96.77,
            platform: 'WISE'
        });

        expect(result).toEqual(updatedTransaction)
        expect(prismaClient.transactions.findUnique).toHaveBeenCalledTimes(1)
        expect(prismaClient.exchange_goals.findUnique).toHaveBeenCalledTimes(1)
        expect(prismaClient.transactions.update).toHaveBeenCalledTimes(1)
    })

    it('Não deve ser capaz de atualizar uma transação que não existe', async () => {
        (prismaClient.transactions.findUnique as jest.Mock).mockResolvedValue(null);

        const updateTransactionService = new UpdateTransactionService()

        const result = updateTransactionService.execute('non-existent-transaction-id', {
            id_exchange_goal: '12345-uuid',
            description: 'Compra de moeda estrangeira para viagem - Atualizado',
            amount_brl: 600,
            exchange_rate: 6.20,
            amount_foreign: 96.77,
            platform: 'WISE'
        });

        await expect(result).rejects.toThrow(ERROR_NOT_FOUND.message)

        expect(prismaClient.transactions.findUnique).toHaveBeenCalledTimes(1)
        expect(prismaClient.transactions.update).not.toHaveBeenCalled()
    })
})

describe('DeleteTransactionService', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('Deve ser capaz de deletar uma transação existente com sucesso!', async () => {
        (prismaClient.transactions.findUnique as jest.Mock).mockResolvedValue({
            id_transaction: '12345-uuid',
            id_exchange_goal: '12345-uuid',
            description: 'Compra de moeda estrangeira para viagem',
            amount_brl: 500,
            exchange_rate: 6.10,
            amount_foreign: 81.96,
            platform: 'WISE',
            created_at: new Date(),
        });

        (prismaClient.transactions.delete as jest.Mock).mockResolvedValue({
            id_transaction: '12345-uuid',
            id_exchange_goal: '12345-uuid',
            description: 'Compra de moeda estrangeira para viagem',
            amount_brl: 500,
            exchange_rate: 6.10,
            amount_foreign: 81.96,
            platform: 'WISE',
            created_at: new Date(),
        });

        const deleteTransactionService = new DeleteTransactionService()

        const result = await deleteTransactionService.execute('12345-uuid')

        expect(result).toHaveProperty('id_transaction', '12345-uuid')
        expect(prismaClient.transactions.findUnique).toHaveBeenCalledTimes(1)
        expect(prismaClient.transactions.delete).toHaveBeenCalledTimes(1)
    })

    it('Não deve ser capaz de deletar uma transação que não existe!', async () => {
        (prismaClient.transactions.findUnique as jest.Mock).mockResolvedValue(null)

        const deleteTransactionService = new DeleteTransactionService()

        const result = deleteTransactionService.execute('non-existent-transaction-id')

        await expect(result).rejects.toThrow(ERROR_NOT_FOUND.message)
        expect(prismaClient.transactions.findUnique).toHaveBeenCalledTimes(1)
        expect(prismaClient.transactions.delete).not.toHaveBeenCalled()
    })
})

describe('GetTransactionService', () => {
    beforeEach(() => {
        jest.clearAllMocks()
     })

    it('Deve ser capaz de obter todas as transações com sucesso!', async () => {
        (prismaClient.transactions.findMany as jest.Mock).mockResolvedValue([
            {
                id_transaction: '12345-uuid',
                id_exchange_goal: '12345-uuid'
            },
            {
                id_transaction: '67890-uuid',
                id_exchange_goal: '12345-uuid'
            }
        ]);

        const getTransactionService = new GetTransactionService()

        const result = await getTransactionService.execute("mocked-user-id")

        expect(result).toHaveLength(2)

        expect(prismaClient.transactions.findMany).toHaveBeenCalledTimes(1)
    })

    it('Deve lançar um erro caso não houver transações cadastradas!', async () => {
        (prismaClient.transactions.findMany as jest.Mock).mockResolvedValue([]);

        const getTransactionService = new GetTransactionService()

        const result = await getTransactionService.execute("mocked-user-id")

        expect(result).toEqual([])
        expect(prismaClient.transactions.findMany).toHaveBeenCalledTimes(1)
    })
})

describe('GetTransactionByIdService', () => {
    beforeEach(() => {
        jest.clearAllMocks()
     })

     it('Deve ser capaz de obter uma transação por ID com sucesso!', async () => {
        (prismaClient.transactions.findUnique as jest.Mock).mockResolvedValue({
            id_transaction: '12345-uuid',
            id_exchange_goal: '12345-uuid',
            description: 'Compra de moeda estrangeira para viagem',
            amount_brl: 500,
            exchange_rate: 6.10,
            amount_foreign: 81.96,
            platform: 'WISE',
            created_at: new Date()
        });

        const getTransactionByIdService = new GetTransactionByIdService()

        const result = await getTransactionByIdService.execute('12345-uuid')

        expect(result).toHaveProperty('id_transaction', '12345-uuid')
        expect(prismaClient.transactions.findUnique).toHaveBeenCalledTimes(1)
     })

     it('Deve lançar um erro caso a transação não seja encontrada!', async () => {
        (prismaClient.transactions.findUnique as jest.Mock).mockResolvedValue(null);

        const getTransactionByIdService = new GetTransactionByIdService()

        const result = getTransactionByIdService.execute('non-existent-transaction-id')

        await expect(result).rejects.toThrow(ERROR_NOT_FOUND.message)

        expect(prismaClient.transactions.findUnique).toHaveBeenCalledTimes(1)
     })
})

