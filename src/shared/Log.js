import fs from 'node:fs/promises'
import path from 'node:path'

/** @abstract */
// eslint-disable-next-line no-unused-vars
class LogInput {
    /** @type {string} */
    action
    /** @type {string} */
    error
    /** @type {string} */
    message
}

class Log {
    constructor() {
        this.currentDate = new Date().toLocaleDateString().replaceAll('/', '-')
        this.fulDateTime = new Date().toLocaleString()
    }

    /** @param {LogInput} input */
    async unexpectedError(input) {
        this.setCaller()
        const content = `[DATE]: ${this.fulDateTime}\n[ACTION]: ${input.action}\n[TYPE]: UNEXPECTED_ERROR\n[ERROR]: ${input.error}\n[MESSAGE]: ${input.message}\n[FILE PATH]: ${this.callerPath} \n\n------------------------------------------\n\n`
        await this.writeFile({ content })
    }

    /** @param {LogInput} input */
    async expectedError(input) {
        this.setCaller()
        const content = `[DATE]: ${this.fulDateTime}\n[ACTION]: ${input.action}\n[TYPE]: EXPECTED_ERROR\n[ERROR]: ${input.error}\n[MESSAGE]: ${input.message}\n[FILE PATH]: ${this.callerPath} \n\n------------------------------------------\n\n`
        await this.writeFile({ content })
    }

    /** @param {LogInput} input */
    async action(input) {
        this.setCaller()
        const content = `[DATE]: ${this.fulDateTime}\n[ACTION]: ${input.action}\n[TYPE]: ACTION\n[MESSAGE]: ${input.message}\n[FILE PATH]: ${this.callerPath} \n\n------------------------------------------\n\n`
        await this.writeFile({ content })
    }

    /** @private @param {string} content */
    async writeFile({ content }) {
        await fs.writeFile(path.resolve('./', 'src', 'logs', `${this.currentDate}.txt`), content, {
            flag: 'a+',
        })
    }

    setCaller() {
        const callerPath = new Error().stack.split('\n')[3]
        this.callerPath = callerPath.trim()
    }
}

export default new Log()
