import {Request, Response, NextFunction} from 'express'
import {TokenJWT} from './middlewareJWT'

export interface AuthRequest extends Request{
    id_user?: string
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ message: 'Token not provided' })
    }

    const token = authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({ message: 'Invalid token' })
    }

    const decoded = TokenJWT.verifyTokenJWT(token)

    if (!decoded || !decoded.id_user) {
        return res.status(401).json({ message: 'Invalid token' })
    }

    req.id_user = decoded.id_user

    next()


}