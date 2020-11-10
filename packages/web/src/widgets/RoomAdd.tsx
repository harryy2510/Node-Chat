import React from 'react'
import Input from '../components/Input'
import Modal, { ModalProps } from '../components/Modal'
import useSocket from '../socket/useSocket'

const RoomAdd: React.FC<ModalProps> = (props) => {
    const inputRef = React.useRef<HTMLInputElement>() as React.RefObject<HTMLInputElement>
    const [saving, setSaving] = React.useState(false)
    const socket = useSocket()
    const handleSave = async () => {
        setSaving(true)
        socket.emit('add-room', { name: inputRef.current?.value })
        props.onClose?.()
    }
    return (
        <Modal title="New room" saving={saving} onSave={handleSave} {...props}>
            <Input autoFocus ref={inputRef} placeholder="Enter room name" />
        </Modal>
    )
}

export default RoomAdd
