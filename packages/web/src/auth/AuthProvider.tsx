import { useReHttp } from '@harryy/rehttp'
import React from 'react'
import { User } from '../types'
import UserLogin from '../widgets/UserLogin'
import AuthContext from './AuthContext'

const AuthProvider: React.FC = ({ children }) => {
    const { loading, data, execute } = useReHttp<{ isAuthenticated: boolean; user?: User | null }>({ url: '/me' })
    if (loading) {
        return <>Loading...</>
    }
    if (data?.isAuthenticated) {
        return <AuthContext.Provider value={{ user: data.user!, refetch: execute }}>{children}</AuthContext.Provider>
    }
    return <UserLogin onLogin={execute} />
}
export default AuthProvider
