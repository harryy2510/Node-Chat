import React from 'react'
import useSocket from './useSocket'

const useSocketEvent = (event: string, callback: (...args: any[]) => void) => {
    const socket = useSocket()
    React.useEffect(() => {
        if (event) {
            socket.on(event, callback)
            return () => {
                socket.off(event, callback)
            }
        }
    }, [event])
    return socket
}

export default useSocketEvent
