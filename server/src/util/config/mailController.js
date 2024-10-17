const { createTransport } = require('nodemailer')
const logger = require('./loggerConfig')

const transporter = createTransport({
  service: 'hotmail',
  auth: {
    user: "tomassale@hotmail.com",
    pass: "zeuscoco00"
  }
})

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
  }
}

module.exports = sendEmailToAdmin