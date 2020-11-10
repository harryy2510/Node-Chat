import React from 'react'
import { Socket } from 'socket.io-client/build/socket'

const SocketContext = React.createContext<Socket>(null as any)
export default SocketContext
