import fs from 'node:fs/promises'
import path from 'node:path'

/**
 * Logs any action done in the system in the logs folder
 * @param {string} action - The action that was made
 * @param {string} message - An message
 * @param {object} options - An object that can give access to some options
 * @param {boolean?} options.error - Is the action an error
 * @param {string?} options.errorType - What error is it
 */
async function log(action, message, options) {
    const currentDate = new Date().toLocaleDateString().replaceAll('/', '-')
    const actionType = options?.error ? 'error' : 'action'
    const stack = new Error().stack
    const stackLines = stack.split('\n')
    const [_, callerPath, lineNumber, characterRowNumber] = stackLines[2].split(':')
    const formattedLogFileContent = `[DATE]: ${new Date().toLocaleString()}\n[ACTION]: ${action}\n[TYPE]: ${actionType}\n[ERROR TYPE]: ${options?.errorType}\n[MESSAGE]: ${message}\n[FILE PATH]: file:${callerPath} at line ${lineNumber}:${characterRowNumber} \n\n------------------------------------------\n\n`
    await fs.writeFile(
        path.resolve('./', 'src', 'log', `${currentDate}.txt`),
        formattedLogFileContent,
        {
            flag: 'a+',
        },
    )
}

export default log
