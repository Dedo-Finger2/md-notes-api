export default class AbstractClassInstanceError extends Error {
    constructor() {
        const message = 'Cannot create an instance of an abstract class.'
        super(message)
        this.name = this.constructor.name
        this.message = message
    }
}
