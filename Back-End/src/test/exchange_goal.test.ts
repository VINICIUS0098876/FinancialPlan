import prismaClient from '../conf/index';
import {
    CreateExchangeGoalService, 
    UpdateExchangeGoalService, 
    DeleteExchangeGoalService, 
    GetExchangeGoalService, 
    GetExchangeGoalByIdService
} from '../service/exchange_goal';
import { ERROR_NOT_FOUND, ERROR_REQUIRED_FIELDS } from '../utils/message';

jest.mock('../conf/index', () => ({
    __esModule: true,
    default: {
        $transaction: jest.fn(async (callback) => await callback(require("../conf/index").default)),
        checklist_items: { deleteMany: jest.fn() },
        transactions: { deleteMany: jest.fn() },
        exchange_goals:{
            findUnique: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findMany: jest.fn()
        }
    }
}))

describe('CreateExchangeGoalService', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('Deve ser capaz de criar uma nova meta de câmbio com sucesso!', async () => {
        (prismaClient.exchange_goals.create as jest.Mock).mockResolvedValue({
            id_exchange_goal: '12345-uuid',
            id_user: '12345-uuid',
            destination: 'viagem para Europa',
            target_currency: 'EUR',
            amount_needed: 5000,
            deadline: new Date('2026-12-31')
        })

        const createExchangeGoalService = new CreateExchangeGoalService()

        const result = await createExchangeGoalService.execute('12345-uuid', 'viagem para Europa', 'EUR', 5000, new Date('2026-12-31'))

        expect(result).toHaveProperty('id_exchange_goal')
        expect(result?.destination).toBe('viagem para Europa')

        expect(prismaClient.exchange_goals.create).toHaveBeenCalledTimes(1)

    })

    it('Não deve ser capaz de criar uma meta de câmbio sem id_user', async () => {
        const createExchangeGoalService = new CreateExchangeGoalService()

        const result = createExchangeGoalService.execute(
            '', 
            'viagem para Europa', 
            'EUR', 
            5000, 
            new Date('2026-12-31')
        )

        await expect(result).rejects.toThrow(ERROR_REQUIRED_FIELDS.message)

        expect(prismaClient.exchange_goals.create).not.toHaveBeenCalled()
    })

    it('Não deve ser capaz de criar uma meta de câmbio sem destination', async () => {
        const createExchangeGoalService = new CreateExchangeGoalService()

        const result = createExchangeGoalService.execute(
            '12345-uuid', 
            '', 
            'EUR', 
            5000, 
            new Date('2026-12-31')
        )

        await expect(result).rejects.toThrow(ERROR_REQUIRED_FIELDS.message)

        expect(prismaClient.exchange_goals.create).not.toHaveBeenCalled()
    })

    it('Não deve ser capaz de criar uma meta de câmbio sem amount_needed', async () => {
        const createExchangeGoalService = new CreateExchangeGoalService()

        const result = createExchangeGoalService.execute(
            '12345-uuid', 
            'viagem para Europa', 
            'EUR', 
            0, 
            new Date('2026-12-31')
        )

        await expect(result).rejects.toThrow(ERROR_REQUIRED_FIELDS.message)

        expect(prismaClient.exchange_goals.create).not.toHaveBeenCalled()
    })
})

describe('UpdateExchangeGoalService', () => {

    it('Deve ser capaz de atualizar uma meta de câmbio com sucesso', async () => {
        (prismaClient.exchange_goals.findUnique as jest.Mock).mockResolvedValue({
            id_exchange_goal: '12345-uuid'
        });

        (prismaClient.exchange_goals.update as jest.Mock).mockResolvedValue({
            id_exchange_goal: '12345-uuid',
            id_user: '12345-uuid',
            destination: 'viagem para Asia Atualizado',
            target_currency: 'DOLAR',
            amount_needed: 10000,
            deadline: new Date('2028-10-21')
        })

        const updateExchangeGoalService = new UpdateExchangeGoalService()
        
        const result = await updateExchangeGoalService.execute(
            '12345-uuid', 
            {
                id_user: '12345-uuid',
                destination: 'viagem para Asia Atualizado',
                target_currency: 'DOLAR',
                amount_needed: 10000,
                deadline: new Date('2028-10-21')
            }
        )
        
        expect(result?.destination).toBe('viagem para Asia Atualizado')

        expect(prismaClient.exchange_goals.update).toHaveBeenCalledTimes(1)
    })

    it('Não deve ser capaz de atualizar uma meta de câmbio que não existe', async () => {
        (prismaClient.exchange_goals.findUnique as jest.Mock).mockResolvedValue(null)

        const updateExchangeGoalService = new UpdateExchangeGoalService()

        const result = updateExchangeGoalService.execute(
            '12345-uuid', 
            {
                id_user: '12345-uuid',
                destination: 'viagem para Asia Atualizado',
                target_currency: 'DOLAR',
                amount_needed: 10000,
                deadline: new Date('2028-10-21')
            }
        )

        await expect(result).rejects.toThrow(ERROR_NOT_FOUND.message)

        expect(prismaClient.exchange_goals.update).not.toHaveBeenCalled()
    })
})

describe('DeleteExchangeGoalService', () => {
    
    it('Deve ser capaz de deletar uma meta de câmbio com sucesso!', async () => {
    
        (prismaClient.exchange_goals.findUnique as jest.Mock).mockResolvedValue({
            id_exchange_goal: '12345-uuid'
        });

        (prismaClient.exchange_goals.delete as jest.Mock).mockResolvedValue({
            id_exchange_goal: '12345-uuid',
            destination: 'viagem Deletada'
        });

        const deleteExchangeGoalService = new DeleteExchangeGoalService()

        const result = await deleteExchangeGoalService.execute('12345-uuid')

        expect(result).toHaveProperty('id_exchange_goal')
        expect(prismaClient.exchange_goals.delete).toHaveBeenCalledTimes(1)
    })

    it('Não deve ser capaz de deletar uma meta de câmbio que não existe!', async () => {
        (prismaClient.exchange_goals.findUnique as jest.Mock).mockResolvedValue(null)

        const deleteExchangeGoalService = new DeleteExchangeGoalService()

        const result = deleteExchangeGoalService.execute('12345-uuid')

        await expect(result).rejects.toThrow(ERROR_NOT_FOUND.message)

        expect(prismaClient.exchange_goals.delete).not.toHaveBeenCalled()
    })
})

describe('GetExchangeGoalService', () => {

    it('Deve ser capaz de listar todas as metas de câmbio com sucesso!', async () => {
        (prismaClient.exchange_goals.findMany as jest.Mock).mockResolvedValue([
            { id_exchange_goal: '12345-uuid', destination: 'viagem para Europa' },
            { id_exchange_goal: '67890-uuid', destination: 'viagem para Asia' }
        ])

        const getExchangeGoalService = new GetExchangeGoalService()

        const result = await getExchangeGoalService.execute("mocked-user-id")

        expect(result).toHaveLength(2)

        expect(prismaClient.exchange_goals.findMany).toHaveBeenCalledTimes(1)
    })

    it('Deve lançar um erro se não houver metas de câmbio cadastradas!', async () => {
        (prismaClient.exchange_goals.findMany as jest.Mock).mockResolvedValue([])

        const getExchangeGoalService = new GetExchangeGoalService()

        const result = await getExchangeGoalService.execute("mocked-user-id")

        
        expect(result).toEqual([])
        expect(prismaClient.exchange_goals.findMany).toHaveBeenCalledTimes(1)
    })
})

describe('GetExchangeGoalByIdService', () => {

    it('Deve ser capaz de obter uma meta de câmbio por ID com sucesso!', async () => {
        (prismaClient.exchange_goals.findUnique as jest.Mock).mockResolvedValue({
            id_exchange_goal: '12345-uuid',
            destination: 'viagem para Europa'
        })

        const getExchangeGoalByIdService = new GetExchangeGoalByIdService()
        
        const result = await getExchangeGoalByIdService.execute('12345-uuid')

        expect(result).toHaveProperty('id_exchange_goal', '12345-uuid')

        expect(prismaClient.exchange_goals.findUnique).toHaveBeenCalledTimes(1)
    })

    it('Deve lançar um erro se a meta de câmbio não for encontrada!', async () => {
        (prismaClient.exchange_goals.findUnique as jest.Mock).mockResolvedValue(null)

        const getExchangeGoalByIdService = new GetExchangeGoalByIdService()

        const result = getExchangeGoalByIdService.execute('12345-uuid')

        await expect(result).rejects.toThrow(ERROR_NOT_FOUND.message)

        expect(prismaClient.exchange_goals.findUnique).toHaveBeenCalledTimes(1)
    })
})