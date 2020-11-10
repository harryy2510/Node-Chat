import React from 'react'
import { io } from 'socket.io-client'
import { ManagerOptions } from 'socket.io-client/build/manager'
import { Socket, SocketOptions } from 'socket.io-client/build/socket'
import SocketContext from './SocketContext'

const SocketProvider: React.FC<Partial<ManagerOptions | SocketOptions>> = ({ children, ...options }) => {
    const [socket, setSocket] = React.useState<Socket | null>(null)
    React.useEffect(() => {
        const socket = io(process.env.REACT_APP_SOCKET_URL!, options)
        setSocket(socket)
        return () => {
            socket?.connected && socket.disconnect()
        }
    }, [])
    if (!socket) return null
    return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
}
SocketProvider.defaultProps = {
    transports: ['websocket']
}
export default SocketProvider
