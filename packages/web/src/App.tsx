import { ReHttpProvider, ReHttpProviderProps } from '@harryy/rehttp'
import React from 'react'
import Column from './components/Column'
import Container from './components/Container'
import Row from './components/Row'
import GlobalStyle from './GlobalStyle'
import SocketProvider from './socket/SocketProvider'
import AuthProvider from './auth/AuthProvider'
import Chats from './widgets/Chats'
import LoggedInHeader from './widgets/LoggedInHeader'
import Rooms from './widgets/Rooms'

const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
}
const transformRequest: ReHttpProviderProps['transformRequest'] = async (data) => ({
    ...data,
    body: data.body ? JSON.stringify(data.body) : undefined
})

const App: React.FC = () => {
    return (
        <>
            <GlobalStyle />
            <ReHttpProvider
                credentials="include"
                transformRequest={transformRequest}
                headers={headers}
                baseUrl={process.env.REACT_APP_API_URL}
            >
                <AuthProvider>
                    <SocketProvider>
                        <Container>
                            <Row>
                                <Column secondary flex={1}>
                                    <Rooms />
                                </Column>
                                <Column flex={4}>
                                    <LoggedInHeader />
                                    <Chats />
                                </Column>
                            </Row>
                        </Container>
                    </SocketProvider>
                </AuthProvider>
            </ReHttpProvider>
        </>
    )
}

export default App
