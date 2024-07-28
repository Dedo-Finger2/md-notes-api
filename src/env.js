import 'dotenv/config'
import * as v from 'valibot'

const envSchema = v.object({
    PORT: v.pipe(v.string(), v.transform(Number)),
    USER_NAME: v.string(),
    REPOSITORY_NAME: v.string(),
    PERSONAL_TOKEN: v.string(),
    DEFAULT_PATH: v.string(),
})

const _env = v.safeParse(envSchema, process.env)

if (!_env.success) {
    throw new TypeError('Invalid .env variables.')
}

const env = _env.output

export default env
