import { createTransport } from 'nodemailer'
import logger from './loggerConfig.js'
import  { google } from 'googleapis'
process.loadEnvFile()

const transporter = createTransport({
  service: 'hotmail',
  auth: {
    type: 'OAuth2',
    user: process.env.NODEMAILER_EMAIL,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
    //accessToken: accesToken
  },
});

transporter.verify((error, success) => {
  if (error) {
    logger.log('error', 'Error with the email transporter: ' + error.message);
  } else {
    logger.log('info', 'Email transporter is ready');
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
    throw new Error('Error sending email')
  }
}

export default sendEmailToAdmin