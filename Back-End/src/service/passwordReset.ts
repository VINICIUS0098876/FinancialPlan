import prismaClient from "../conf/index";
import crypto from "crypto";
import {hash} from "bcryptjs";
import {sendResetPasswordEmail} from "../utils/mailer";
import { ERROR_REQUIRED_FIELDS, ERROR_INTERNAL_SERVER_DB } from "../utils/message";

export class RequestPasswordResetService{
    async execute(email: string){
        try{
 if(!email){
            throw new Error(ERROR_REQUIRED_FIELDS.message)
        }

        const user = await prismaClient.users.findUnique({
            where: {
                email: email
            }
        })

        if(!user){
            return { message: "Se o e-mail estiver correto, você receberá um link para redefinir sua senha." }
        }

        const resetToken = crypto.randomBytes(32).toString("hex");

        const tokenExpiration = new Date();
        tokenExpiration.setHours(tokenExpiration.getHours() + 1);

        await prismaClient.users.update({
            where: {
                email: email
            },
            data: {
                reset_token: resetToken,
                reset_token_expires: tokenExpiration
            }
        })

        await sendResetPasswordEmail(email, resetToken, user.name);

        return { message: "Se o e-mail estiver correto, você receberá um link para redefinir sua senha." }

    }catch (error: any) {
      if (error.message === ERROR_REQUIRED_FIELDS.message) throw error;
      console.error("Erro ao solicitar reset de senha:", error);
      throw new Error(ERROR_INTERNAL_SERVER_DB.message);
    }
       
}
}

export class ResetPasswordService{
    async handle(token: string, newPassword: string){
        try{
            if(!token || !newPassword){
                throw new Error(ERROR_REQUIRED_FIELDS.message)
            }

            const user = await prismaClient.users.findFirst({
                where: {
                    reset_token: token,
                    reset_token_expires: {
                        gt: new Date()
                    }
                }
            })

            if(!user){
                throw new Error("Token inválido ou expirado.")
            }

            const passwordHash = await hash(newPassword, 10);

            await prismaClient.users.update({
                where: {
                    id_user: user.id_user
                },
                data: {
                    password: passwordHash,
                    reset_token: null,
                    reset_token_expires: null
                }
            })

            return { message: "Senha redefinida com sucesso." }

        }catch (error: any) {
            console.error("Erro ao redefinir senha:", error);
            throw new Error(ERROR_INTERNAL_SERVER_DB.message);
        }
    }
}