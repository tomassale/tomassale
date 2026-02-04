import { createTransport } from 'nodemailer';
import logger from './logger';

const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

const verifyTransporter = async () => {
  try {
    await transporter.verify();
    console.log('Server ready to send email');
    return true;
  } catch (error) {
    logger.error('Error trying to verify SMTP');
    return false;
  }
};

export const sendEmail = async (user) => {
  try {
    await transporter.sendMail({
      from: `Tomás Sale <${process.env.NODEMAILER_EMAIL}>`,
      replyTo: user.email,
      to: process.env.NODEMAILER_EMAIL,
      subject: 'Contacto directo desde Web',
      text: `Email: ${user.email} \nTeléfono: ${user.number} \nMensaje: \n${user.message}`,
    });
    logger.info('Email sent successfully');
  } catch (error) {
    logger.error(`Error sending email: ${error.message}`);
    throw new Error('Error sending email');
  }
};