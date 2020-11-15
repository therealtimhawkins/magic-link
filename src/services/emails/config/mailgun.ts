import nodemailer from 'nodemailer'
import mailgun from 'nodemailer-mailgun-transport'

declare const process: {
  env: {
    MAILGUN_SECRET: string
    MAILGUN_DOMAIN: string
  }
}

const mailgunOptions = {
  auth: {
    api_key: process.env.MAILGUN_SECRET,
    domain: process.env.MAILGUN_DOMAIN
  }
}

export default nodemailer.createTransport(mailgun(mailgunOptions))
