import HttpError from './HttpError.js'

export default class NotFoundError extends HttpError {
  message
  statusCode

  /**
   * @param {string} message
   */
  constructor(message) {
    super(message)
    this.message = message
    this.statusCode = 404
  }
}
