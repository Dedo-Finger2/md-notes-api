import HttpError from './HttpError.js'

export default class InternalServerError extends HttpError {
    message
    statusCode

    /**
     * @param {string} message
     */
    constructor(message = 'Internal Server Error.') {
        super(message)
        this.message = message
        this.statusCode = 500
    }
}
