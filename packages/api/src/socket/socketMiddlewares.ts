import { ExtendedError } from 'socket.io/dist/namespace'
import { Socket } from 'socket.io/dist/socket'
import { ModifiedSocket } from '../types'

export const getSocketMiddlewares = () => {
    const authMiddleware = (socket: Socket, next: (err?: ExtendedError) => void) => {
        if (((socket as unknown) as ModifiedSocket).request.user) {
            next()
        } else {
            next(new Error('unauthorized'))
        }
    }
    return [authMiddleware]
}
