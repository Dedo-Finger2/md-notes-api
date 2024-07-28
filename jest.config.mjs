/** @type {import('jest').Config} */
const config = {
    transform: {
        '^.+\\.(t|j)sx?$': '@swc/jest',
    },
    coverageProvider: 'v8',
}

export default config
