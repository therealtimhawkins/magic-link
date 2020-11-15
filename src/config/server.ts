import express from 'express'
import morgan from 'morgan'
import gzip from 'compression'
import helmet from 'helmet'
import useragent from 'express-useragent'
const expressip = require('express-ip')

import { handler } from '@/utils/errors'
import routes from '@/api'

const app = express()

app.use(morgan(process.env.LOG_LEVEL || 'combined'))
app.use(gzip())
app.use(helmet())
app.use(express.json())
app.use(useragent.express())
app.use(expressip().getIpInfoMiddleware)

app.use('/', routes)

app.use(handler)

export default app
