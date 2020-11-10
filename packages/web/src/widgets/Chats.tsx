import React from 'react'
import { ChatFeed, Message } from '@harryy/react-chat-ui'
import styled from 'styled-components'
import useAuth from '../auth/useAuth'
import ChatBubble from '../components/ChatBubble'
import Heading from '../components/Heading'
import Textarea from '../components/Textarea'
import Button from '../components/Button'
import useSocket from '../socket/useSocket'
import useSocketEvent from '../socket/useSocketEvent'
import { IncomingMessage } from '../types'

const ChatContainer = styled.div`
    overflow: hidden;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`
const ChatHeader = styled.div`
    height: 60px;
    width: 100%;
    padding: 16px;
    border-bottom: 1px solid #d9d9d9;
`
const ChatList = styled.div`
    width: 100%;
    flex: 1;
    overflow: auto;
    padding: 16px;
`
const ChatInput = styled.div`
    width: 100%;
    padding: 16px;
    border-top: 1px solid #d9d9d9;
    position: relative;
`
const ChatSendButton = styled(Button)`
    position: absolute;
    right: 24px;
    bottom: 32px;
`
const EmptyState = styled.div`
    width: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 100;
    font-size: 18px;
    overflow: hidden;
`

const Chats: React.FC = () => {
    const { user } = useAuth()
    const textareaRef = React.useRef<HTMLTextAreaElement>() as React.RefObject<HTMLTextAreaElement>
    const [activeRoom, setActiveRoom] = React.useState('')
    const [messages, setMessages] = React.useState<Message[]>([])
    const socket = useSocket()

    useSocketEvent('joined-room', (roomId: string) => {
        setActiveRoom(roomId)
        setMessages([])
    })
    useSocketEvent('message', (arg: IncomingMessage) => {
        setMessages((existingMessages) => [
            ...existingMessages,
            new Message({
                id: arg.sender.id,
                senderName: arg.sender.name,
                message: arg.message,
                type: arg.type,
                isAuthor: arg.sender.id === user.id
            })
        ])
    })

    const handleSend = () => {
        const value = textareaRef.current?.value
        if (value) {
            socket.emit('send-message', { roomId: activeRoom, message: value })
            textareaRef.current!.value = ''
        }
    }

    const chatFeed = (
        <>
            <ChatList>
                <ChatFeed chatBubble={ChatBubble} messages={messages} showSenderName />
            </ChatList>
            <ChatInput>
                <Textarea ref={textareaRef} rows={2} />
                <ChatSendButton onClick={handleSend} primary>
                    Send
                </ChatSendButton>
            </ChatInput>
        </>
    )

    const emptyState = <EmptyState>Please join or create a room to continue</EmptyState>

    return (
        <ChatContainer>
            <ChatHeader>
                <Heading>Chat</Heading>
            </ChatHeader>
            {activeRoom ? chatFeed : emptyState}
        </ChatContainer>
    )
}

export default Chats
