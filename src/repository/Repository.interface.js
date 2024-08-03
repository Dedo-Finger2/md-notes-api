import AbstractClassInstanceError from '../domain/errors/common/AbstractClassInstanceError.js'

export default class Repository {
  constructor() {
    if (this.constructor.name === Repository) {
      throw new AbstractClassInstanceError()
    }
  }

  getPathContent() {
    throw new Error('Method not implemeted')
  }

  getFileContent() {
    throw new Error('Method not implemeted')
  }
}
