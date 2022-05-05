import express from 'express'
import nodemailer from 'nodemailer'
import { prisma } from './prisma'

const app = express()
const PORT = 3333

app.use(express.json())

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '4c71d505eb5639',
    pass: 'bdd97b2fa2c17e'
  }
})

app.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body

  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot
    }
  })

  await transport.sendMail({
    from: 'Equipe Feedget <oi@feedget.com>',
    to: 'Rafael Lima <rafaa99@gmail.com>',
    subject: 'Novo feedback',
    html: [
      `<div style="font-family: sans-serif; font-size: 16px;color: #222">`,
      `<p>Tipo do feedback: ${type}</p>`,
      `<p>Comentário: ${comment}</p>`,
      `</div>`
    ].join('\n')
  })

  return res.status(201).json({ data: feedback })
})

app.listen(PORT, () =>
  console.log(`HTTP server running at http://localhost:${PORT}`)
)
