import { logger } from './logger';

const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const regexPhone = /^\+?[\d\s-]{10,20}$/;
const regexSafe = /^[^\\;]*$/;

export default function validateContactForm(data){
  const { email, number, message } = data;

  if (!email || !number || !message) {
    logger.warn('Validation fail: Missing fields');
    return { isValid: false, error: 'Faltan campos obligatorios' };
  }

  if (
    !regexEmail.test(email) ||
    !regexPhone.test(number) ||
    !regexSafe.test(message) ||
    message.includes('--')
  ) {
    logger.warn(`Regex validation fail for email: ${email}`);
    return { isValid: false, error: 'Formato de datos inválido o caracteres no permitidos' };
  }

  return { isValid: true };
}