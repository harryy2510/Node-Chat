import dotenv from 'dotenv'
import express from 'express'
import { createServer } from 'http'

import { initialize as initializeApi } from './api'
import { getCommonMiddlewares } from './commonMiddlewares'
import { initialize as initializeSocket } from './socket'
import { Room, User } from './types'

dotenv.config()

const app = express()
const server = createServer(app)
const port = process.env.PORT || 3001

const users: User[] = []
const rooms: Room[] = []

const commonMiddlewares = getCommonMiddlewares(users)

initializeApi(app, commonMiddlewares, users)
initializeSocket(server, commonMiddlewares, rooms)

server.listen(port, () => {
    console.log(`server running at port ${port}`)
})
