import express from 'express'
import cookieParser from 'cookie-parser'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'

const app = express()

import registerUserCredentialsRoute from './http/routes/register-user-credentials.route.js'
import accessPathRoute from './http/routes/access-path.route.js'
import accessFileRoute from './http/routes/access-file.route.js'

export default function bootstrap() {
    const options = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'MD NOtes',
                description: 'API Documentation',
                version: '1.0.0',
            },
        },
        apis: ['./src/**/*.route.js'],
    }
    const swaggerConfig = swaggerJSDoc(options)
    app.use(express.json())
    app.use(cookieParser())
    app.use(registerUserCredentialsRoute)
    app.use(accessPathRoute)
    app.use(accessFileRoute)
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig))
    return app
}
