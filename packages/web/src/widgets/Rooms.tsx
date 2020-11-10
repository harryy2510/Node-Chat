import React from 'react'
import styled from 'styled-components'
import Button from '../components/Button'
import Heading from '../components/Heading'
import useSocket from '../socket/useSocket'
import useSocketEvent from '../socket/useSocketEvent'
import { Room } from '../types'
import RoomAdd from './RoomAdd'

const RoomContainer = styled.div`
    overflow: hidden;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`

const RoomHeader = styled.div`
    height: 60px;
    width: 100%;
    padding: 16px;
    border-bottom: 1px solid #d9d9d9;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const RoomList = styled.div`
    width: 100%;
    flex: 1;
    overflow: auto;
`

const RoomItem = styled(Button)`
    width: 100%;
    border-bottom: 1px solid #d9d9d9;
    padding: 16px 24px;
`

const Rooms: React.FC = () => {
    const [open, setOpen] = React.useState(false)
    const [rooms, setRooms] = React.useState<Room[]>([])
    const [activeRoom, setActiveRoom] = React.useState('')

    useSocketEvent('rooms', setRooms)
    useSocketEvent('joined-room', setActiveRoom)

    const socket = useSocket()
    const joinRoom = (room: Room) => {
        if (activeRoom !== room.id) {
            socket.emit('join-room', room.id)
        }
    }
    React.useEffect(() => {
        socket.emit('get-rooms')
    }, [socket])
    return (
        <>
            {open && <RoomAdd onClose={() => setOpen(false)} />}
            <RoomContainer>
                <RoomHeader>
                    <Heading>Rooms</Heading>
                    <Button primary onClick={() => setOpen(true)}>
                        + New Room
                    </Button>
                </RoomHeader>
                <RoomList>
                    {rooms.map((room) => (
                        <RoomItem
                            className={activeRoom === room.id ? 'active' : ''}
                            onClick={() => joinRoom(room)}
                            key={room.id}
                        >
                            {room.name}
                        </RoomItem>
                    ))}
                </RoomList>
            </RoomContainer>
        </>
    )
}

export default Rooms
