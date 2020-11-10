import { useReHttp } from '@harryy/rehttp'
import React from 'react'
import styled from 'styled-components'
import useAuth from '../auth/useAuth'
import Button from '../components/Button'
import { User } from '../types'

const Header = styled.div`
    position: absolute;
    right: 16px;
    top: 16px;
    display: flex;
    align-items: center;

    & > *:not(:first-child) {
        margin-left: 8px;
    }
`

const LoggedInHeader: React.FC = () => {
    const { user, refetch } = useAuth()
    const { execute } = useReHttp<User>(
        {
            url: '/logout',
            method: 'POST'
        },
        { lazy: true }
    )
    const handleLogout = async () => {
        await execute()
        refetch()
    }
    return (
        <Header>
            <span>{user.name}</span>
            <Button onClick={handleLogout} outlined size="sm">
                Log Out
            </Button>
        </Header>
    )
}

export default LoggedInHeader
