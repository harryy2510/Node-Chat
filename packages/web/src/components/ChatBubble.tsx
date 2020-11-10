import * as React from 'react'
import styles from '@harryy/react-chat-ui/lib/ChatBubble/styles'
import ChatBubbleProps from '@harryy/react-chat-ui/lib/ChatBubble/interface'

const defaultBubbleStyles = {
    text: {
        fontSize: 'inherit',
        color: 'inherit'
    },
    chatbubble: {
        borderRadius: 40,
        padding: '6px 12px',
        backgroundColor: '#f4f4f8',
        color: '#000',
        fontSize: 15
    },
    userBubble: {
        borderRadius: 40,
        padding: '6px 12px',
        backgroundColor: '#007aff',
        color: '#fff',
        fontSize: 15
    },
    announcementBubble: {
        fontSize: 12,
        padding: '4px 12px'
    }
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message: { isAuthor, message, type } }) => {
    const { userBubble, chatbubble, text, announcementBubble } = defaultBubbleStyles
    const chatBubbleStyles: any =
        type === 'announcement'
            ? {
                  ...styles.chatbubble,
                  ...chatbubble,
                  ...announcementBubble
              }
            : isAuthor
            ? {
                  ...styles.chatbubble,
                  ...styles.chatbubbleOrientationNormal,
                  ...chatbubble,
                  ...userBubble
              }
            : {
                  ...styles.chatbubble,
                  ...styles.recipientChatbubble,
                  ...styles.recipientChatbubbleOrientationNormal,
                  ...userBubble,
                  ...chatbubble
              }
    return (
        <div
            style={{
                ...styles.chatbubbleWrapper
            }}
        >
            <div style={chatBubbleStyles}>
                <p style={{ ...(styles as any).p, ...text }}>{message}</p>
            </div>
        </div>
    )
}

export default ChatBubble
