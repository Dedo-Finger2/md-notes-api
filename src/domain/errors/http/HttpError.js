import AbstractClassInstanceError from '../common/AbstractClassInstanceError.js'

export default class HttpError {
  statusCode
  message

  /**
   * @param {string} message
   */
  constructor(message) {
    if (this.constructor === HttpError) {
      throw new AbstractClassInstanceError()
    }
    this.message = message
  }
}
