import prismaClient from "../conf/index"
import bcrypt from "bcryptjs"
import {TokenJWT} from "../middleware/middlewareJWT"
import {
  ERROR_REQUIRED_FIELDS,
  ERROR_INTERNAL_SERVER_DB,
  ERROR_NOT_FOUND,
  ERROR_INVALID_ID,
  ERROR_INVALID_CREDENTIALS,
} from "../utils/message";

interface User{
    name: string,
    email: string,
    password: string
}

export class CreateUserService{
    async execute(name: string, email: string, password: string){
        
            if(!name || !email || !password){
            throw new Error(ERROR_REQUIRED_FIELDS.message);
            }

            const alreadyExistUser = await prismaClient.users.findUnique({
                where: {
                    email: email
                }
            })

            if(alreadyExistUser){
                throw new Error(ERROR_INVALID_CREDENTIALS.message);
            }

            const passwordHash = await bcrypt.hash(password, 10)

            const user = await prismaClient.users.create({
                data: {
                    name,
                    email,
                    password: passwordHash
                }
            })

            return user
    }
}

export class UpdateUserService{
    async execute(id_user: string, { name, email, password }: User){
        try{
            if(!name || !email || !password){
                throw new Error(ERROR_REQUIRED_FIELDS.message);
            }

            if(!id_user){
                throw new Error(ERROR_INVALID_ID.message);
            }

            const FindUser = await prismaClient.users.findUnique({
                where: {
                    id_user: id_user
                }
            })

            if(!FindUser){
                console.log(ERROR_NOT_FOUND)
                return null
            }

            const passwordHash = await bcrypt.hash(password, 10)

            const user = await prismaClient.users.update({
                where: { id_user},
                data: {
                    name,
                    email,
                    password: passwordHash
                }
            })

            return user

        }catch(error){
            throw new Error(ERROR_INTERNAL_SERVER_DB.message);
        }
    }
}

export class DeleteUserService{
    async execute(id_user: string){
        try{
            if(!id_user){
                throw new Error(ERROR_INVALID_ID.message);
            }

            // Utilizamos $transaction para garantir que o usuario seja deletado independentemente se tiver algo relacionado ao usuario ou não.
        const user = await prismaClient.$transaction(async (tx) => {


            // Aqui eu estou fazendo um: select id_exchange_goal from exchange_goals where id_user = id_user.
            const userGoals = await tx.exchange_goals.findMany({
                where: { id_user: id_user },
                select: {id_exchange_goal: true}
            })

            // Aqui estou pegando os ids listados no select acima e colocando em um array.
            const goalIds = userGoals.map(goal => goal.id_exchange_goal)

            // Essa condição esta dizendo: Se tiver metas(goals) relacionadas a esse usuario, pode deletar as transactions e os checklist_items dele.
            if(goalIds.length > 0){
                await tx.transactions.deleteMany({
                    where: {
                        id_exchange_goal: {
                            in: goalIds // Aqui esta dizendo: delete from transactions where id_exchange_goal in (list of goalIds) ou seja, delete todas as transações relacionadas as metas(goals) do usuario.
                        }
                    }
                });
                await tx.checklist_items.deleteMany({
                    where: {
                        id_exchange_goal: {
                            in: goalIds // Aqui esta dizendo: delete from checklist_items where id_exchange_goal in (list of goalIds) ou seja, delete todas os itens de checklist relacionados as metas(goals) do usuario.
                        }
                    }
                });
            }
            
            await tx.exchange_goals.deleteMany({
                where: {
                    id_user: id_user
                }
            })

            const deletedUser = await tx.users.delete({
                where: {
                    id_user: id_user
                }
            })

            return deletedUser

        })

            return user

        }catch(error){
            console.error('Error deleting user:', error);
            throw new Error(ERROR_INTERNAL_SERVER_DB.message);
        }
    }
}

export class GetUserService{
    async execute(){
        try{
            const user = await prismaClient.users.findMany()

            if(user.length === 0){
                throw new Error(ERROR_NOT_FOUND.message);
            }

            return user

        }catch(error: any){
            if (error.message === ERROR_NOT_FOUND.message) {
                throw error;
            }
            console.error('Error fetching users:', error);
            throw new Error(ERROR_INTERNAL_SERVER_DB.message);
        }
    }
}

export class GetUserByIdService{
    async execute(id_user: string){
        try{
            if(!id_user){
                throw new Error(ERROR_INVALID_ID.message);
            }

            const user = await prismaClient.users.findUnique({
                where: { id_user: id_user }
            })

            if(!user){
                throw new Error(ERROR_NOT_FOUND.message);
            }

            return user

        }catch(error){
            throw new Error(ERROR_INTERNAL_SERVER_DB.message);
        }
    }
}

export class LoginUserService{
    async execute(email: string, password: string){
        try{
            if(!email || !password){
                throw new Error(ERROR_REQUIRED_FIELDS.message);
            }

            const user = await prismaClient.users.findUnique({
                where: { email: email }
            })

            if(!user){
                throw new Error(ERROR_INVALID_CREDENTIALS.message);
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if(!isPasswordValid){
                throw new Error(ERROR_INVALID_CREDENTIALS.message);
            }

            const token = TokenJWT.generateToken({id_user: user.id_user})

            return {
                user: {
                    name: user.name,
                    email: user.email
                },
                token
                }

            }catch(error: any){
                if (
            error.message === ERROR_INVALID_CREDENTIALS.message ||
            error.message === ERROR_REQUIRED_FIELDS.message
        ) {
            throw error;
        }
            throw new Error(ERROR_INTERNAL_SERVER_DB.message);
        }
    }
}
