import dotenv from 'dotenv'
dotenv.config()
import app from './config/server'

const port = process.env.PORT

app.listen(port, () => {
  console.log(`Magic link listening at http://localhost:${port}`)
})
