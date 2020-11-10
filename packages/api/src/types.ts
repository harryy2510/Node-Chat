import { Express } from 'express'
import { IncomingMessage } from 'http'
import { Socket } from 'socket.io/dist/socket'

export interface User {
    id: string
    name: string
}

export interface Room {
    id: string
    name: string
}

export interface OutgoingMessage {
    id: string
    message: string
    sender: User
    type: 'message' | 'announcement'
    time: string
}

export interface ModifiedSocket extends Omit<Socket, 'request'> {
    request: IncomingMessage & {
        session: Express.Session
        user: User
        sessionID: string
    }
    roomId?: string
}
