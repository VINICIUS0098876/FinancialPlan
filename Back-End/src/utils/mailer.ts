import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

export const sendResetPasswordEmail = async (to: string, token: string, name: string) => {
    const resetLink = `http://localhost:5173/reset-password?token=${token}`

    const mailOptions = {
        from: `"FinancialPlan" <${process.env.EMAIL_USER}>`,
        to,
        subject: "Recuperação de Senha - FinancialPlan",

        html: `
      <div style="font-family: sans-serif; max-w: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #0f172a; margin: 0;">Financial<span style="color: #10b981;">Plan</span></h1>
        </div>
        <h2 style="color: #0f172a;">Olá, ${name.split(' ')[0]}!</h2>
        <p style="color: #475569; font-size: 16px;">Recebemos um pedido para redefinir a senha da sua conta no FinancialPlan.</p>
        <p style="color: #475569; font-size: 16px;">Clique no botão abaixo para criar uma nova senha de acesso seguro:</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" style="background-color: #10b981; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block;">Redefinir Minha Senha</a>
        </div>
        
        <p style="color: #64748b; font-size: 14px;">Se você não solicitou essa alteração, por favor, ignore e exclua este e-mail. O link expira em 1 hora.</p>
      </div>
    `,
    }

    await transporter.sendMail(mailOptions)
}