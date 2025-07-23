process.loadEnvFile()
import { createTransport } from 'nodemailer'
import logger from '../log/loggerConfig.js'

const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD
  },
});

transporter.verify((error, success) => {
  if(error){ 
    logger.error('Error trying to verify SMTP')
    throw new Error('Error tying to verify SMTP: ', error)
  } else {
    console.log('Server ready to send email')
  }
});

const sendEmail = async (user) => {
  try{
    await transporter.sendMail({
      from: `Tomás Sale ${user.email}`, 
      to: process.env.NODEMAILER_EMAIL,
      subject: 'Contacto directo',
      text: `${user.email} \n${user.number} \n${user.message}`,
    })
    logger.info('Email sent')
  }catch(error){
    logger.error(error)
    throw new Error('Error sending email')
  }
}

export default sendEmail