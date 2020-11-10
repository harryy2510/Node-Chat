import React from 'react'
import { User } from '../types'

export interface AuthOptions {
    user: User
    refetch: () => void
}
const AuthContext = React.createContext<AuthOptions>(null as any)
export default AuthContext
