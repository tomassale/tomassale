import { createTransport } from 'nodemailer';
import { logger } from './logger';

const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

// Elimina CR/LF para evitar header/email injection en campos que se
// embeben en headers del mail (replyTo).
const stripCRLF = (s) => String(s).replace(/[\r\n]/g, ' ').trim();

export const sendEmail = async (user) => {
  try {
    const email = stripCRLF(user.email);
    const number = stripCRLF(user.number);

    await transporter.sendMail({
      from: `Tomás Sale <${process.env.NODEMAILER_EMAIL}>`,
      replyTo: email,
      to: process.env.NODEMAILER_EMAIL,
      subject: 'Contacto directo desde Web',
      text: `Email: ${email} \nTeléfono: ${number} \nMensaje: \n${user.message}`,
    });
    logger.info('Email sent successfully');
  } catch (error) {
    logger.error(`Error sending email: ${error.message}`);
    throw new Error('Error sending email');
  }
};