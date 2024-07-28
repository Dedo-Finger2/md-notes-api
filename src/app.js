import express from 'express'

const app = express()

export default function bootstrap() {
    app.use(express.json())
    return app
}
