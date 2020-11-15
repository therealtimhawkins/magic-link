import fs from 'fs'
const template = require('es6-template-strings')
import mail from './config/mailgun'

interface Mail {
  mailOptions: MailOptions
  data: object
}

interface MailOptions {
  template: string
  emailTo: string
  subject: string
}

const sendMail = async (event: Mail) => {
  const html = fs.readFileSync(
    `${__dirname}/templates/${event.mailOptions.template}/content.html`,
    'utf8'
  )
  const htmlWithData = template(html, event.data)
  const from = process.env.MAIL_FROM

  const mailOptions = {
    from,
    to: event.mailOptions.emailTo,
    subject: event.mailOptions.subject,
    html: htmlWithData
  }

  return mail.sendMail(mailOptions)
}

export default sendMail
