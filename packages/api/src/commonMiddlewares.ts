import session from 'express-session'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { User } from './types'
import { findEntity, upsertEntity } from './utils'

export const getCommonMiddlewares = (users: User[]) => {
    passport.serializeUser((user: User, cb) => cb(null, user.id))
    passport.deserializeUser((id: string, cb) => cb(null, findEntity(users, { id })?.entity))

    passport.use(
        new LocalStrategy({ passwordField: 'name', usernameField: 'name' }, (name, _, done) => {
            const user = users.find((user) => user.name === name)
            if (user) {
                done(null, user)
                return
            }

            const newUser = upsertEntity(users, { name })
            done(null, newUser)
        })
    )
    const sessionMiddleware = session({ secret: process.env.SECRET_KEY!, resave: false, saveUninitialized: false })
    const passportInitialize = passport.initialize()
    const passportSession = passport.session()
    return [sessionMiddleware, passportInitialize, passportSession]
}
