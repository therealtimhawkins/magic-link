import express from 'express'
import moment from 'moment'
import winston from '@/config/winston'
import { createLink, handleLogIn } from './token.service'
import * as schema from './token.joi'
import sendMail from '@/services/emails'

const router = express.Router()

router.get('/request', async (req: any, res, next) => {
  try {
    const { email } = await schema.create.validateAsync(req.query)
    const { browser } = req.useragent
    const { city } = req.ipInfo
    const link = await createLink(email)
    await sendMail({
      data: {
        link,
        appName: process.env.APP_NAME,
        appColour: process.env.APP_COLOUR,
        location: city,
        browser,
        time: moment().format('Do Mo YYYY, h:mm:ss a'),
        email
      },
      mailOptions: {
        template: 'link',
        emailTo: email,
        subject: process.env.APP_NAME + ' log in!'
      }
    })
    res.send({ success: true })
  } catch (err) {
    winston.debug({ err })
    next(err)
  }
})

router.post('/log-in', async (req, res, next) => {
  try {
    const { token, email } = await schema.logIn.validateAsync(req.query)
    const jwt = await handleLogIn(token, email)
    res.send({ jwt })
  } catch (err) {
    winston.debug({ err })
    next(err)
  }
})

export default router
