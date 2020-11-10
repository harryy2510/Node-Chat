import { Express } from 'express'
import passport from 'passport'
import { User } from '../types'
import { findEntity } from '../utils'
import { getExpressMiddlewares } from './expressMiddlewares'

export const initialize = (app: Express, middlewares: any[] = [], users: User[]) => {
    ;[...getExpressMiddlewares(), ...middlewares].forEach((middleware) => app.use(middleware))

    app.get('/me', (req, res) => {
        res.json({
            isAuthenticated: Boolean(req.user),
            user: req.user
        })
    })
    app.post('/login', passport.authenticate('local'), (req, res) => {
        res.send()
    })

    app.post('/logout', (req, res) => {
        const userMeta = findEntity(users, { id: (req.user as User)?.id })
        if (userMeta) {
            users.splice(userMeta.index, 1)
        }
        req.logout()
        res.cookie('connect.sid', '', { expires: new Date() })
        res.send()
    })
}
