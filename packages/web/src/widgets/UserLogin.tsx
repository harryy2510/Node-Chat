import { useReHttp } from '@harryy/rehttp'
import React from 'react'
import Input from '../components/Input'
import Modal, { ModalProps } from '../components/Modal'
import { User } from '../types'

interface Props extends ModalProps {
    onLogin?: () => void
}
const UserLogin: React.FC<Props> = ({ onLogin, ...props }) => {
    const { execute } = useReHttp<User>(
        {
            url: '/login',
            method: 'POST'
        },
        { lazy: true }
    )
    const inputRef = React.useRef<HTMLInputElement>() as React.RefObject<HTMLInputElement>
    const [saving, setSaving] = React.useState(false)
    const handleSave = async () => {
        setSaving(true)
        try {
            await execute({
                body: {
                    name: inputRef.current?.value
                }
            })
            onLogin?.()
            setSaving(false)
        } catch (e) {
            alert(e?.message)
            setSaving(false)
        }
    }
    return (
        <Modal persist title="Login" saving={saving} onSave={handleSave} {...props}>
            <Input autoFocus ref={inputRef} placeholder="Enter your name" />
        </Modal>
    )
}

export default UserLogin
