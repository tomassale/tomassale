import { logger } from './logger';

const regexEmail = /^[\w.-]+@([\w-]+\.)+[\w-]{2,}$/;
const regexPhone = /^\+?[\d\s-]{10,20}$/;

const MAX_EMAIL = 254;
const MAX_NUMBER = 20;
const MAX_MESSAGE = 500;

export default function validateContactForm(data) {
  const { email, number, message } = data ?? {};

  if (
    typeof email !== 'string' ||
    typeof number !== 'string' ||
    typeof message !== 'string'
  ) {
    logger.warn('Validation fail: invalid types');
    return { isValid: false, error: 'Formato de datos inválido' };
  }

  if (!email.trim() || !number.trim() || !message.trim()) {
    logger.warn('Validation fail: missing fields');
    return { isValid: false, error: 'Faltan campos obligatorios' };
  }

  if (
    email.length > MAX_EMAIL ||
    number.length > MAX_NUMBER ||
    message.length > MAX_MESSAGE
  ) {
    logger.warn('Validation fail: field too long');
    return { isValid: false, error: 'Uno de los campos excede el largo permitido' };
  }

  if (!regexEmail.test(email) || !regexPhone.test(number)) {
    logger.warn('Validation fail: invalid format');
    return { isValid: false, error: 'Formato de datos inválido o caracteres no permitidos' };
  }

  // Devolvemos un objeto saneado (solo los campos esperados) para que el
  // resto del flujo no reciba propiedades extra del body crudo.
  return { isValid: true, data: { email, number, message } };
}
