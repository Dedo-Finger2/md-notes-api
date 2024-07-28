import { Router } from 'express'
import RegisterUserCredentialsController from './../controllers/RegisterUserCredentials.controller.js'
import RegisterUserCredentials from './../../domain/use-cases/RegisterUserCredentials.use-case.js'

const useCase = new RegisterUserCredentials()
const controller = new RegisterUserCredentialsController({
    registerUserCredentialsUseCase: useCase,
})

const registerUserCredentialsRoute = Router()

/**
 * @openapi
 * /users/credentials:
 *   post:
 *     summary: Register user credentials
 *     description: Registers user credentials for accessing a GitHub repository.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 example: "octocat"
 *               repositoryName:
 *                 type: string
 *                 example: "hello-world"
 *               personalToken:
 *                 type: string
 *                 example: "ghp_abcdefghijklmn1234567890"
 *               defaultPath:
 *                 type: string
 *                 example: "src"
 *     responses:
 *       201:
 *         description: User credentials registered successfully and a cookie has been set.
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: userCredentials=example; HttpOnly
 *       400:
 *         description: Invalid credentials or validation error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid credentials."
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error."
 */
registerUserCredentialsRoute.post('/users/credentials', controller.handle.bind(controller))

export default registerUserCredentialsRoute
