export interface User {
    id: string
    name: string
}

export interface Room {
    id: string
    name: string
}

export interface IncomingMessage {
    id: string
    message: string
    sender: User
    type: 'message' | 'announcement'
    time: string
}
