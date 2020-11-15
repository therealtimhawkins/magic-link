require('dotenv').config({ path: '../.env' })

const config = {
  client: 'mysql',
  useNullAsDefault: true,
  connection: {
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASS,
    database: process.env.SQL_DB,
    port: Number(process.env.SQL_PORT)
  }
}

export default config
