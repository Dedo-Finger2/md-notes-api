import express from 'express'
import cookieParser from 'cookie-parser'

const app = express()

import registerUserCredentialsRoute from './http/routes/register-user-credentials.route.js'

export default function bootstrap() {
    app.use(express.json())
    app.use(cookieParser())
    app.use(registerUserCredentialsRoute)
    return app
}
