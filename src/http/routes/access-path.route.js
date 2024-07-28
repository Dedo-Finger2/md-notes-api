import { Router } from 'express'
import AccessPath from '../../domain/use-cases/AccessPath.use-case.js'
import AccessPathController from '../controllers/AccessPath.controller.js'

const useCase = new AccessPath()
const controller = new AccessPathController({
    accessPathUseCase: useCase,
})

const accessPathRoute = Router()

accessPathRoute.get('/users/repository/:path/content', controller.handle.bind(controller))

export default accessPathRoute
