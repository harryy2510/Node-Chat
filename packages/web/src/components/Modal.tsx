import styled from 'styled-components'
import React from 'react'
import ReactDom from 'react-dom'
import Button from './Button'

const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`
const ModalBackdrop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    background-color: rgba(0, 0, 0, 0.5);
`

const ModalBody = styled.div`
    position: relative;
    z-index: 1;
    background-color: #fff;
    margin: 40px auto;
    width: 100%;
    border-radius: 4px;
    box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14),
        0px 9px 46px 8px rgba(0, 0, 0, 0.12);
    max-width: 400px;
`

const ModalHeader = styled.div`
    padding: 16px;
    position: relative;
`

const ModalContent = styled.div`
    padding: 8px 32px;
    position: relative;
`

const ModalActions = styled.div`
    position: relative;
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    > *:not(:first-child) {
        margin-left: 8px;
    }
`

const ModalTitle = styled.h4`
    font-size: 18px;
    font-weight: 400;
    margin: 0;
`

const ModalCloseButton = styled(Button)`
    position: absolute;
    right: 8px;
    top: 8px;
    padding: 0;
    border-radius: 20px;
    width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    font-size: 24px;
`

export interface ModalProps {
    persist?: boolean
    onClose?: () => void
    onSave?: () => void
    saving?: boolean
    className?: string
    title?: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ persist, saving, onSave, onClose, className, title, children }) => {
    const onEscKeyDown = React.useCallback(
        (event: KeyboardEvent) => {
            switch (event.key) {
                case 'Escape':
                    if (!persist) {
                        onClose?.()
                        event.stopPropagation()
                    }
                    break
                case 'Enter':
                    onSave?.()
                    event.stopPropagation()
                    break
            }
        },
        [onClose, onSave, persist]
    )
    React.useEffect(() => {
        window.addEventListener('keydown', onEscKeyDown)
        return () => window.removeEventListener('keydown', onEscKeyDown)
    }, [])

    return ReactDom.createPortal(
        <ModalContainer className={className} role="dialog">
            <ModalBody>
                <ModalHeader>
                    <ModalTitle>{title}</ModalTitle>
                    {!persist && <ModalCloseButton onClick={onClose}>×</ModalCloseButton>}
                </ModalHeader>
                <ModalContent>{children}</ModalContent>
                <ModalActions>
                    {!persist && (
                        <Button disabled={saving} onClick={onClose}>
                            Close
                        </Button>
                    )}
                    <Button disabled={saving} primary onClick={onSave}>
                        {saving ? 'Saving...' : 'Save'}
                    </Button>
                </ModalActions>
            </ModalBody>
            <ModalBackdrop {...(persist ? {} : { onMouseDown: onClose })} />
        </ModalContainer>,
        document.body
    )
}

export default Modal
