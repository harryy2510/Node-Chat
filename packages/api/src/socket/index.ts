import { nanoid } from 'nanoid'
import { Server as HttpServer } from 'http'
import { Server } from 'socket.io'
import { ModifiedSocket, OutgoingMessage, Room } from '../types'
import { expressToSocketMiddleware, upsertEntity } from '../utils'
import { getSocketMiddlewares } from './socketMiddlewares'

const outgoingMessage = (socket: ModifiedSocket, options: Partial<OutgoingMessage>) => ({
    id: nanoid(),
    type: 'message',
    time: new Date().toISOString(),
    sender: socket.request.user,
    ...options
})

export const initialize = (httpServer: HttpServer, middlewares: any[] = [], rooms: Room[]) => {
    const io = new Server(httpServer, {
        serveClient: false
    })

    middlewares.forEach((middleware) => io.use(expressToSocketMiddleware(middleware)))
    getSocketMiddlewares().forEach((middleware) => io.use(middleware))

    io.on('connect', (socket: ModifiedSocket) => {
        const session = socket.request.session
        session.socketId = socket.id
        session.save(() => undefined)

        socket.on('get-rooms', () => socket.emit('rooms', rooms))

        socket.on('add-room', (room: Partial<Room>) => {
            upsertEntity(rooms, room)
            io.sockets.emit('rooms', rooms)
        })

        socket.on('join-room', async (roomId: string) => {
            // if new room is same as old one, do not proceed
            if (socket.roomId === roomId) return

            // if existing room is found, emit message of leaving and leave the room
            if (socket.roomId) {
                const message = outgoingMessage(socket, {
                    type: 'announcement',
                    message: `${socket.request.user.name} left the room`
                })
                io.sockets.in(socket.roomId).emit('message', message)
                socket.leave(socket.roomId)
            }

            // save current room id & join
            socket.roomId = roomId
            socket.join(roomId)
            socket.emit('joined-room', roomId)

            // emit to emit of joining
            const message = outgoingMessage(socket, {
                type: 'announcement',
                message: `${socket.request.user.name} joined the room`
            })
            io.sockets.in(roomId).emit('message', message)
        })

        socket.on('send-message', async ({ roomId, message }: { roomId: string; message: string }) => {
            io.sockets.in(roomId).emit('message', outgoingMessage(socket, { message }))
        })
    })
}
