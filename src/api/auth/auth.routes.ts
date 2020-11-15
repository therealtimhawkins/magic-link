import express from 'express'
import winston from '@/config/winston'
import * as schema from './auth.joi'
import { verify } from '@/services/jwt'

const router = express.Router()

router.get('/verify', async (req: any, res, next) => {
  try {
    const { jwt } = await schema.verify.validateAsync(req.query)
    const verified = await verify(jwt)
    res.send({ verified })
  } catch (err) {
    winston.debug({ err })
    next(err)
  }
})

export default router
