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

            const user = await prismaClient.users.delete({
                where: {
                    id_user: id_user
                }
            })

            return user

        }catch(error){
            throw new Error(ERROR_INTERNAL_SERVER_DB.message);
        }
    }
}

export class GetUserService{
    async execute(){
        try{
            const user = await prismaClient.users.findMany()

            return user

        }catch(error){
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

            console.log("Usuário encontrado:", user);

            if(!user){
                throw new Error(ERROR_INVALID_CREDENTIALS.message);
            }

            console.log("Senha digitada no Insomnia:", password);
console.log("Hash salvo no banco:", user.password);

            const isPasswordValid = await bcrypt.compare(password, user.password);
            console.log("Resultado da comparação:", isPasswordValid);

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

            }catch(error){
            console.error('Error during login:', error);
            throw new Error(ERROR_INTERNAL_SERVER_DB.message);
        }
    }
}
