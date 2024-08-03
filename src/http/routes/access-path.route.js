import { Router } from 'express'
import AccessPath from '../../domain/use-cases/AccessPath.use-case.js'
import AccessPathController from '../controllers/AccessPath.controller.js'

const useCase = new AccessPath()
const controller = new AccessPathController({
  accessPathUseCase: useCase,
})

const accessPathRoute = Router()

/**
 * @openapi
 * /users/repository/{path}/content:
 *   get:
 *     summary: Retrieve contents from a specific path in a GitHub repository
 *     description: This endpoint allows users to retrieve the contents from a specified path in a GitHub repository. If the `path` parameter is `:path`, the system will use the default path specified in the user's credentials. The user must be authenticated with valid credentials.
 *     parameters:
 *       - name: path
 *         in: path
 *         required: true
 *         description: The path in the repository from which to retrieve content. If set to `:path`, it will default to the path specified in the user's credentials.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response containing the contents of the specified path
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   path:
 *                     type: string
 *                     description: The path of the item in the repository.
 *                   type:
 *                     type: string
 *                     description: The type of the item (e.g., file, directory).
 *                   size:
 *                     type: integer
 *                     description: The size of the item in bytes.
 *                   name:
 *                     type: string
 *                     description: The name of the item.
 *                   sha:
 *                     type: string
 *                     description: The SHA hash of the item.
 *       400:
 *         description: Bad request due to validation error or invalid path
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message describing the validation issue.
 *       401:
 *         description: Unauthorized error due to invalid user credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating invalid credentials.
 *       404:
 *         description: Not found error if the path or repository does not exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating that the path or repository was not found.
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating an internal server error.
 *     security:
 *       - cookieAuth: []
 *     tags:
 *       - Dir Access
 *     components:
 *       securitySchemes:
 *         cookieAuth:
 *           type: apiKey
 *           in: cookie
 *           name: userCredentials
 */
accessPathRoute.get('/users/repository/:path/content', controller.handle.bind(controller))

export default accessPathRoute
