import serverlessExpress from 'aws-serverless-express'
import app from './config/server'
const server = serverlessExpress.createServer(app)

exports.handler = (event: any, context: any) => {
  serverlessExpress.proxy(server, event, context)
}
