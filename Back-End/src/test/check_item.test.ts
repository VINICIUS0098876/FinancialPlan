import prismaClient from '../conf/index'
import{
    CreateCheckItemService,
    UpdateCheckItemService,
    DeleteCheckItemService,
    GetCheckItemByIdService,
    GetCheckItemService
} from '../service/check_item'
import {
    ERROR_INTERNAL_SERVER_DB,
    ERROR_NOT_FOUND,
    ERROR_INVALID_ID,
    ERROR_REQUIRED_FIELDS,
} from '../utils/message'

jest.mock('../conf/index', () => ({
    __esModule: true,
    default: {
        checklist_items: {
            create: jest.fn(),
            findUnique: jest.fn(),
            findMany: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
        exchange_goals: {
            findMany: jest.fn().mockResolvedValue([{ id_exchange_goal: "mock-id" }]),
            findUnique: jest.fn().mockResolvedValue(true),
        }
    },
}))

describe('CreateCheckItemService', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('Deve ser capaz de criar um novo item de checklist com sucesso!', async () => {
        (prismaClient.exchange_goals.findUnique as jest.Mock).mockResolvedValue({ id_exchange_goal: '12345-uuid' })

        const mockCheckItem = {
            id_checklist_item: '54321-uuid',
            id_exchange_goal: '12345-uuid',
            title: 'Comprar passagens aéreas',
            description: 'Pesquisar e comprar passagens para a viagem',
            status: 'PENDING',
            due_date: new Date('2024-12-31')
        };
        (prismaClient.checklist_items.create as jest.Mock).mockResolvedValue(mockCheckItem)

        const createCheckItemService = new CreateCheckItemService()

        const result = await createCheckItemService.execute({
            id_exchange_goal: '12345-uuid',
            title: 'Comprar passagens aéreas',
            description: 'Pesquisar e comprar passagens para a viagem',
            status: 'PENDING',
            due_date: new Date('2024-12-31')
        })

        expect(result).toEqual(mockCheckItem)
        expect(prismaClient.exchange_goals.findUnique).toHaveBeenCalledTimes(1)
        expect(prismaClient.checklist_items.create).toHaveBeenCalledTimes(1)

    })

    it('Deve lançar um erro se os campos obrigatórios não forem fornecidos', async () => {
        const createCheckItemService = new CreateCheckItemService()

        const result = createCheckItemService.execute({
            id_exchange_goal: '',
            title: '',
            description: 'Pesquisar e comprar passagens para a viagem',
            status: 'PENDING',
            due_date: new Date('2024-12-31')
        })

        await expect(result).rejects.toThrow(ERROR_REQUIRED_FIELDS.message)
        expect(prismaClient.exchange_goals.findUnique).not.toHaveBeenCalled()
        expect(prismaClient.checklist_items.create).not.toHaveBeenCalled()
    })

    it('Deve lançar um erro se o objetivo de câmbio associado não for encontrado', async () => {
        (prismaClient.exchange_goals.findUnique as jest.Mock).mockResolvedValue(null)

        const createCheckItemService = new CreateCheckItemService()

        const result = createCheckItemService.execute({
            id_exchange_goal: 'non-existent-goal-id',
            title: 'Comprar passagens aéreas',
            description: 'Pesquisar e comprar passagens para a viagem',
            status: 'PENDING',
            due_date: new Date('2024-12-31')
        })

        await expect(result).rejects.toThrow(ERROR_NOT_FOUND.message)
        expect(prismaClient.exchange_goals.findUnique).toHaveBeenCalledTimes(1)
        expect(prismaClient.checklist_items.create).not.toHaveBeenCalled()
    })

})

describe('UpdateChackItemService', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('Deve ser capaz de atualizar um item de checklist existente com sucesso!', async () => {
        (prismaClient.checklist_items.findUnique as jest.Mock).mockResolvedValue({
            id_checklist_item: '54321-uuid',
            id_exchange_goal: '12345-uuid',
            title: 'Comprar passagens aéreas',
            description: 'Pesquisar e comprar passagens para a viagem',
            status: 'PENDING',
            due_date: new Date('2024-12-31')
        })

        const updatedCheckItem = {
            id_checklist_item: '54321-uuid',
            id_exchange_goal: '12345-uuid',
            title: 'Comprar passagens aéreas - Atualizado',
            description: 'Pesquisar e comprar passagens para a viagem - Atualizado',
            status: 'COMPLETED',
            due_date: new Date('2024-12-25')
        };
        (prismaClient.checklist_items.update as jest.Mock).mockResolvedValue(updatedCheckItem)

        const updateCheckItemService = new UpdateCheckItemService()

        const result = await updateCheckItemService.execute('54321-uuid', {
            id_exchange_goal: '12345-uuid',
            title: 'Comprar passagens aéreas - Atualizado',
            description: 'Pesquisar e comprar passagens para a viagem - Atualizado',
            status: 'COMPLETED',
            due_date: new Date('2024-12-25')
        })

        expect(result).toEqual(updatedCheckItem)
        expect(prismaClient.checklist_items.findUnique).toHaveBeenCalledTimes(1)
        expect(prismaClient.checklist_items.update).toHaveBeenCalledTimes(1)
    })

    it('Deve lenaçar um erro se o item de chacklist não for encontrado', async () => {
        (prismaClient.checklist_items.findUnique as jest.Mock).mockResolvedValue(null)

        const updateCheckItemService = new UpdateCheckItemService()

        const result = updateCheckItemService.execute('non-existent-checklist-item-id', {
            id_exchange_goal: '12345-uuid',
            title: 'Comprar passagens aéreas - Atualizado',
            description: 'Pesquisar e comprar passagens para a viagem - Atualizado',
            status: 'COMPLETED',
            due_date: new Date('2024-12-25')
        })

        await expect(result).rejects.toThrow(ERROR_NOT_FOUND.message)
        expect(prismaClient.checklist_items.findUnique).toHaveBeenCalledTimes(1)
        expect(prismaClient.checklist_items.update).not.toHaveBeenCalled()
    })

    it('Deve lançar um erro se os campos obrigatórios não forem fornecidos', async () => {
        (prismaClient.checklist_items.findUnique as jest.Mock).mockResolvedValue({
            id_checklist_item: '54321-uuid',
            id_exchange_goal: '12345-uuid',
            title: 'Comprar passagens aéreas',
            description: 'Pesquisar e comprar passagens para a viagem',
            status: 'PENDING',
            due_date: new Date('2024-12-31')
        })

        const updateCheckItemService = new UpdateCheckItemService()

        const result = updateCheckItemService.execute('54321-uuid', {
            id_exchange_goal: '',
            title: '',
            description: 'Pesquisar e comprar passagens para a viagem - Atualizado',
            status: 'COMPLETED',
            due_date: new Date('2024-12-25')
        })

        await expect(result).rejects.toThrow(ERROR_REQUIRED_FIELDS.message)
        expect(prismaClient.checklist_items.findUnique).not.toHaveBeenCalled()
        expect(prismaClient.checklist_items.update).not.toHaveBeenCalled()
    })
})

describe('DeleteCheckItemService', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('Deve ser capaz de deletar um item de checklist existente com sucesso!', async () => {
        (prismaClient.checklist_items.findUnique as jest.Mock).mockResolvedValue({
            id_checklist_item: '54321-uuid',
            id_exchange_goal: '12345-uuid',
            title: 'Comprar passagens aéreas',
            description: 'Pesquisar e comprar passagens para a viagem',
            status: 'PENDING',
            due_date: new Date('2024-12-31')
        });

        (prismaClient.checklist_items.delete as jest.Mock).mockResolvedValue({
            id_checklist_item: '54321-uuid',
            id_exchange_goal: '12345-uuid',
            title: 'Comprar passagens aéreas',
            description: 'Pesquisar e comprar passagens para a viagem',
            status: 'PENDING',
            due_date: new Date('2024-12-31')
        });

        const deleteCheckItemService = new DeleteCheckItemService()

        const result = await deleteCheckItemService.execute('54321-uuid')

        expect(result).toHaveProperty('id_checklist_item')
        expect(prismaClient.checklist_items.findUnique).toHaveBeenCalledTimes(1)
        expect(prismaClient.checklist_items.delete).toHaveBeenCalledTimes(1)
    })

    it('Deve lançar um erro se o item de checklist não for encontrado', async () => {
        (prismaClient.checklist_items.findUnique as jest.Mock).mockResolvedValue(null)

        const deleteCheckItemService = new DeleteCheckItemService()

        const result = deleteCheckItemService.execute('non-existent-checklist-item-id')

        await expect(result).rejects.toThrow(ERROR_NOT_FOUND.message)
        expect(prismaClient.checklist_items.findUnique).toHaveBeenCalledTimes(1)
        expect(prismaClient.checklist_items.delete).not.toHaveBeenCalled()
    })
})

describe('GetCheckItemByIdService', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('Deve ser capaz de obter um itm de checklist por ID com sucsso!', async () => {
        (prismaClient.checklist_items.findUnique as jest.Mock).mockResolvedValue({
            id_checklist_item: '54321-uuid',
            id_exchange_goal: '12345-uuid',
            title: 'Comprar passagens aéreas',
            description: 'Pesquisar e comprar passagens para a viagem',
            status: 'PENDING',
            due_date: new Date('2024-12-31')
        });

        const getCheckItemByIdService = new GetCheckItemByIdService()

        const result = await getCheckItemByIdService.execute('54321-uuid')

        expect(result).toHaveProperty('id_checklist_item', '54321-uuid')
        expect(prismaClient.checklist_items.findUnique).toHaveBeenCalledTimes(1)
    })

    it('Deve lançar um erro se o item de checklist não for encontrado', async () => {
        (prismaClient.checklist_items.findUnique as jest.Mock).mockResolvedValue(null)

        const getCheckItemByIdService = new GetCheckItemByIdService()

        const result = getCheckItemByIdService.execute('non-existent-checklist-item-id')

        await expect(result).rejects.toThrow(ERROR_NOT_FOUND.message)
        expect(prismaClient.checklist_items.findUnique).toHaveBeenCalledTimes(1)
    })
})

describe('GetCheckItemService', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('Deve ser capaz de obter todos os itens de checklist com sucesso!', async () => {
        (prismaClient.checklist_items.findMany as jest.Mock).mockResolvedValue([
            {
                id_checklist_item: '54321-uuid',
                id_exchange_goal: '12345-uuid',
                title: 'Comprar passagens aéreas',
                description: 'Pesquisar e comprar passagens para a viagem',
                status: 'PENDING',
                due_date: new Date('2024-12-31')
            },
            {
                id_checklist_item: '65432-uuid',
                id_exchange_goal: '54321-uuid',
                title: 'Fazer reserva de hotel',
                description: 'Pesquisar e fazer reserva de hotel para a viagem',
                status: 'PENDING',
                due_date: new Date('2024-12-31')
            }
        ]);

        const getCheckItemService = new GetCheckItemService()

        const result = await getCheckItemService.execute("mocked-user-id")

        expect(result).toHaveLength(2)
        expect(prismaClient.checklist_items.findMany).toHaveBeenCalledTimes(1)
    })

    it('Deve lançar um erro se a lista de itens de checklist estiver vazia', async () => {
        (prismaClient.checklist_items.findMany as jest.Mock).mockResolvedValue([])

        const getCheckItemService = new GetCheckItemService()

        const result = await getCheckItemService.execute("mocked-user-id")

        expect(result).toEqual([])
        expect(prismaClient.checklist_items.findMany).toHaveBeenCalledTimes(1)
    })
})