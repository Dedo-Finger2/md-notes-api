import HttpError from './HttpError.js'

export default class InvalidResourceError extends HttpError {
    message
    statusCode

    /**
     * @param {string} message
     */
    constructor(message) {
        super(message)
        this.message = message
        this.statusCode = 400
    }
}
