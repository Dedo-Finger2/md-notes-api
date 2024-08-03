import bootstrap from './app.js'
import env from './env.js'

try {
  const app = bootstrap()
  app.listen(env.PORT)
} catch (err) {
  console.error(err)
  process.exit(1)
}
