import nodemailer from 'nodemailer'
import { MailAdapter, SendMailData } from '../mail-adapter'

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '4c71d505eb5639',
    pass: 'bdd97b2fa2c17e'
  }
})

export class NodemailerMailAdapter implements MailAdapter {
  async sendmail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Rafael Lima <rafaa99@gmail.com>',
      subject,
      html: body
    })
  }
}
