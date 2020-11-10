import bodyParser from 'body-parser'
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

export const getExpressMiddlewares = () => {
    const staticMiddleware = express.static('../web/build')
    const corsMiddleware = cors({
        origin: [process.env.APP_URL!],
        credentials: true
    })
    const cookieMiddleware = cookieParser()
    const bodyJsonMiddleware = bodyParser.json()
    const bodyUrlEncodeMiddleware = bodyParser.urlencoded({
        extended: true
    })
    return [staticMiddleware, corsMiddleware, cookieMiddleware, bodyJsonMiddleware, bodyUrlEncodeMiddleware]
}
