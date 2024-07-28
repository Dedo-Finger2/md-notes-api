import express from 'express'
import cookieParser from 'cookie-parser'

const app = express()

export default function bootstrap() {
    app.use(express.json())
    app.use(cookieParser())
    return app
}
