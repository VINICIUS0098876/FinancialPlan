import {CreateUserService, UpdateUserService, LoginUserService, DeleteUserService, GetUserService, GetUserByIdService} from '../service/user';
import {TokenJWT} from '../middleware/middlewareJWT';
import prismaClient from '../conf/index';
import bcrypt from 'bcryptjs';

// Aqui o jest irá vigiar o banco de dados sem tocar no banco de dados real;
jest.mock('../conf/index', () => {
    const mockPrisma = {
        users: {
            findUnique: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findMany: jest.fn()
        },
        exchange_goals: {
            findMany: jest.fn(),
             findUnique: jest.fn(),
             create: jest.fn(),
             update: jest.fn(),
            deleteMany: jest.fn()
        },
        transactions: {
            create: jest.fn(),
             update: jest.fn(),
             deleteMany: jest.fn(),
             findMany: jest.fn()
        },
        checklist_items: {
        create: jest.fn(),
        findUnique: jest.fn(),
        findMany: jest.fn(),
        update: jest.fn(),
        deleteMany: jest.fn(),
    },
    budgets: {
        create: jest.fn(),
        findUnique: jest.fn(),
        findMany: jest.fn(),
        deleteMany: jest.fn(),
        update: jest.fn(),
    }
};

    return {
        __esModule: true,
        default: {
            ...mockPrisma,
            // Ensina o Jest a executar a transação chamando o callback interno
            $transaction: jest.fn(async (callback) => await callback(mockPrisma))
        }
    };
});

describe('CreateUserService', () => {

    // Aqui o Jest limpa todos os mocks restantes para evitar conflito entre testes.
    beforeEach(() => {
        jest.clearAllMocks();
    })

it('Deve ser capaz de criar um novo usuário com sucesso!', async () => {

        // Aqui o jest irá verificar se já existe um usuario com o email fornecido.
        (prismaClient.users.findUnique as jest.Mock).mockResolvedValue(null)

        // Aqui o jest irá fazer uma simulação de resposta na criação do usuario.
        const mockCreateUser = {
            id_user: '12345-uuid',
            name: 'Vinicius Guimarães Roberto',
            email: 'vinicius@gmail.com',
            created_at: new Date()
        };
        (prismaClient.users.create as jest.Mock).mockResolvedValue(mockCreateUser)

        // Aqui estamos executando o service de User
        const createUserService = new CreateUserService()
        const result = await createUserService.execute('Vinicius Guimarães Roberto', 'vinicius@gmail.com', 'password123')

        // Aqui estamos verificando se o resulto foi o esperado.
        expect(result).toHaveProperty('id_user');
        expect(result?.email).toBe('vinicius@gmail.com');

        // Aqui estamo verificando se foi chamado o prismaClient pelo menos uma vez.
        expect(prismaClient.users.findUnique).toHaveBeenCalledTimes(1);
    })
    it('Não devemos criar um usuário com um e-mail ja existente', async () => {
    
        // Aqui estamos fingindo que ja existe um usuario com o email fornecido.
        (prismaClient.users.findUnique as jest.Mock).mockResolvedValue({
            id_user: '999-uuid',
            email: 'vinicius@gmail.com'
        })
    
        const createUserService = new CreateUserService()
    
        // Aqui estamos verificando se o service lance um Erro (throw new Error)
        await expect(createUserService.execute('Vinicius Guimarães Roberto', 'vinicius@gmail.com', 'password123')).rejects.toThrow('Credenciais de autenticação incorretas!!')
    })
});

describe('UpdateUserService', () => {

    it('Deve ser capaz de atualizar um usuário com sucesso!', async () => {
        (prismaClient.users.findUnique as jest.Mock).mockResolvedValue({
            id_user: '1'
        });

        (prismaClient.users.update as jest.Mock).mockResolvedValue({
            id_user: '1',
            name: 'Vinicius atualizado',
            email: 'vinicius.atualizado@gmail.com'
        });

        const updateUserService = new UpdateUserService();
        const result = await updateUserService.execute('1', {
            name: 'Vinicius atualizado',
            email: 'vinicius.atualizado@gmail.com',
            password: 'newpassword123'
        });

        expect(result?.name).toBe('Vinicius atualizado');

    });
});

describe('DeleteUserService', () => {
    it('Deve ser capaz de deletar um usuário com sucesso!', async () => {

        (prismaClient.exchange_goals.findMany as jest.Mock).mockResolvedValue([
            {id_exchange_goal: 'meta-12345-uuid',}
        ]);

        (prismaClient.users.delete as jest.Mock).mockResolvedValue({
            id_user: '1',
            name: 'Usuário Deletado',
            email: 'deletado@gmail.com'
        });

        const deleteUserService = new DeleteUserService();
        const result = await deleteUserService.execute('1');

        expect(result).toHaveProperty('id_user');
        
        expect(prismaClient.exchange_goals.findMany).toHaveBeenCalledTimes(1);
        expect(prismaClient.exchange_goals.deleteMany).toHaveBeenCalledTimes(1);
        expect(prismaClient.checklist_items.deleteMany).toHaveBeenCalledTimes(1);
        expect(prismaClient.transactions.deleteMany).toHaveBeenCalledTimes(1);
        expect(prismaClient.users.delete).toHaveBeenCalledTimes(1);
    });
});

describe('LoginUserService', () => {
    it('Deve ser capaz de realizar login com sucesso!', async () => {
        const fakePasswordHash = await bcrypt.hash('password123', 10);
        (prismaClient.users.findUnique as jest.Mock).mockResolvedValue({
            id_user: 'uuid-123',
            name: 'Vinicius Guimarães Roberto',
            email: 'vinicius@gmail.com',
            password: fakePasswordHash
        });

        jest.spyOn(TokenJWT, 'generateToken').mockReturnValue('fake-jwt-token');

        const loginUserService = new LoginUserService();
        const result = await loginUserService.execute('vinicius@gmail.com', 'password123');

        expect(result).toHaveProperty('token');
        expect(result?.user.email).toBe('vinicius@gmail.com');
    });

    it('Não deve fazer o login se as credenciais estiverem incorretas', async () => {
        const fakePasswordHash = await bcrypt.hash('password_incorrect', 10);
        (prismaClient.users.findUnique as jest.Mock).mockResolvedValue({
            id_user: 'uuid-123',
            password: fakePasswordHash
        });

        const loginService = new LoginUserService();

        await expect(loginService.execute('vinicius@gmail.com', 'password_incorrect12')).rejects.toThrow();
    });
});

describe('GetUserService', () => {
    it('Deve ser capaz de obter todos os usuários com sucesso!', async () => {
        (prismaClient.users.findMany as jest.Mock).mockResolvedValue([
            {id_user: '1', name: 'User 1', email: 'user1@gmail.com'},
            {id_user: '2', name: 'User 2', email: 'user2@gmail.com'}
        ]);

        const getUserService = new GetUserService();
        const result = await getUserService.execute();

        expect(result).toHaveLength(2);
        expect(prismaClient.users.findMany).toHaveBeenCalledTimes(1);
    });

    it('Deve lançar um erro se a lista de usuários estiver vazia!', async () => {
        (prismaClient.users.findMany as jest.Mock).mockResolvedValue([]);

        const getUserService = new GetUserService();

        await expect(getUserService.execute()).rejects.toThrow();
    });
});

describe('GetUserByIdService', () => {
    it('Deve ser capas de obter um usuário por ID com sucesso!', async () => {
        (prismaClient.users.findUnique as jest.Mock).mockResolvedValue({
            id_user: '1',
            name: 'User 1',
            email: 'user1@gmail.com'
        });

        const getUserByIdService = new GetUserByIdService();
        const result = await getUserByIdService.execute('1');

        expect(result).toHaveProperty('id_user', '1');
        expect(prismaClient.users.findUnique).toHaveBeenCalledTimes(1);
    });

    it('Deve lançar um erro se o usuário não for encontrado!', async () => {
        (prismaClient.users.findUnique as jest.Mock).mockResolvedValue(null);

        const getUserByIdService = new GetUserByIdService();

        await expect(getUserByIdService.execute('non-existent-id')).rejects.toThrow();
    });
});
