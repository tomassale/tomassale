const { createTransport } = require('nodemailer')
const logger = require('./loggerConfig')

const transporter = createTransport({
  service: 'hotmail',
  port: 587,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD
  }
})

const sendEmailToAdmin = async (user) => {
  try{
    await transporter.sendMail({
      from: `Servidor Node ${user.email}`,
      to: process.env.NODEMAILER_EMAIL,
      subject: 'Mensaje Nuevo',
      text: `${user.number} - ${user.message}`,
    })
    logger.log('info', 'Email sent successfully')
  }catch(error){
    logger.log('error', 'Error sending email ' + error.message)
  }
}

module.exports = sendEmailToAdmin