import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.SECRET_KEY
const EXPIRES_IN = '7h'

interface JwtPayloadWithUserId extends jwt.JwtPayload {
    id_user: string
}

export class TokenJWT {
    static generateToken(payload: { id_user: string }): string {
        return jwt.sign(payload, SECRET_KEY as string, { expiresIn: EXPIRES_IN })
    }

    static verifyTokenJWT(token: string): JwtPayloadWithUserId | null {
        try {
            const decoded = jwt.verify(token, SECRET_KEY as string) as JwtPayloadWithUserId

            if (decoded && typeof decoded === 'object' && 'id_user' in decoded) {
                return decoded
            }

            return null
        } catch (error) {
            console.error('Error verifying token:', error)
            return null
        }
    }
}