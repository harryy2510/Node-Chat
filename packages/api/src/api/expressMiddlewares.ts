import bodyParser from 'body-parser'
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const isDev = process.env.NODE_ENV === 'development'

export const getExpressMiddlewares = () => {
    const staticMiddleware = express.static('../web/build')
    const corsMiddleware = isDev
        ? cors({
              origin: [process.env.APP_URL!],
              credentials: true
          })
        : undefined
    const cookieMiddleware = cookieParser()
    const bodyJsonMiddleware = bodyParser.json()
    const bodyUrlEncodeMiddleware = bodyParser.urlencoded({
        extended: true
    })
    return [staticMiddleware, corsMiddleware, cookieMiddleware, bodyJsonMiddleware, bodyUrlEncodeMiddleware].filter(
        Boolean
    )
}
