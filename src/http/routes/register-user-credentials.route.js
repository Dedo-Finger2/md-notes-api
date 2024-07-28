import { Router } from 'express'
import RegisterUserCredentialsController from './../controllers/RegisterUserCredentials.controller.js'
import RegisterUserCredentials from './../../domain/use-cases/RegisterUserCredentials.use-case.js'

const useCase = new RegisterUserCredentials()
const controller = new RegisterUserCredentialsController({
    registerUserCredentialsUseCase: useCase,
})

const registerUserCredentialsRoute = Router()

registerUserCredentialsRoute.post('/users/credentials', controller.handle.bind(controller))

export default registerUserCredentialsRoute
