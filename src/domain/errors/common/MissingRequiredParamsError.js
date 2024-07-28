export default class MissingRequiredParamsError extends Error {
    /** @param {Array<string>} params */
    constructor(params = []) {
        const message = `The following required params are missing: ${params.join()}.`
        super(message)
        this.name = this.constructor.name
        this.message = message
    }
}
