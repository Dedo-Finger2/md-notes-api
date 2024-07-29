import { Router } from 'express'
import AccessFile from '../../domain/use-cases/AccessFile.use-case.js'
import AccessFileController from '../controllers/AccessFile.controller.js'

const useCase = new AccessFile()
const controller = new AccessFileController({
    accessFileUseCase: useCase,
})

const accessFileRoute = Router()

accessFileRoute.get('/users/repository/file/:path/content', controller.handle.bind(controller))

export default accessFileRoute
