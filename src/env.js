import * as v from 'valibot'

const envSchema = v.object({
    PORT: v.pipe(v.string(), v.transform(Number)),
})

const _env = v.safeParse(envSchema, process.env)

if (!_env.success) {
    throw new TypeError('Invalid .env variables.')
}

const env = _env.output

export default env
