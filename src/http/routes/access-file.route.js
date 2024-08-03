import { Router } from 'express'
import AccessFile from '../../domain/use-cases/AccessFile.use-case.js'
import AccessFileController from '../controllers/AccessFile.controller.js'
import GithubRepository from '../../repository/implementation/Github.repository.js'

const repository = new GithubRepository()
const useCase = new AccessFile(repository)
const controller = new AccessFileController({
  accessFileUseCase: useCase,
})

const accessFileRoute = Router()

/**
 * @openapi
 * /users/repository/file/{path}/content:
 *   get:
 *     summary: Retrieve the content of a file from a GitHub repository
 *     description: This endpoint allows users to access the content of a file in a specified GitHub repository. The file must be a markdown file (`.md` extension). The user must be authenticated with valid credentials.
 *     parameters:
 *       - name: path
 *         in: path
 *         required: true
 *         description: The path of the file in the repository. Must be a markdown file (`.md`).
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response containing the file content
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: The name of the file without the `.md` extension.
 *                     extension:
 *                       type: string
 *                       description: The file extension (should be `md`).
 *                     path:
 *                       type: string
 *                       description: The path of the file in the repository.
 *                     size:
 *                       type: integer
 *                       description: The size of the file in bytes.
 *                     sha:
 *                       type: string
 *                       description: The SHA hash of the file.
 *                     content:
 *                       type: string
 *                       description: The content of the file, decoded from base64.
 *       400:
 *         description: Bad request due to invalid path or validation error
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
 *         description: Not found error if the file or path does not exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating that the file or path was not found.
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
 *       - File Access
 *     components:
 *       securitySchemes:
 *         cookieAuth:
 *           type: apiKey
 *           in: cookie
 *           name: userCredentials
 */
accessFileRoute.get('/users/repository/file/:path/content', controller.handle.bind(controller))

export default accessFileRoute
