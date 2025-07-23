import { validationResult } from 'express-validator'
import logger from '../log/loggerConfig.js';

const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const regexPhone = /^\+?[\d\s-]{10,20}$/;
const regexSafe = /^[^'"\\;]*$/;


export const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    logger.warn('Validation fail')
    return res.status(400).json({ errors: errors.array()})
  }
  next()
}

export const regexValidation = (req, res, next) => {
  const { email, number, message } = req.body;
  if(!regexEmail.test(email) || !regexPhone.test(number) || !regexSafe.test(message) || message.includes('--')){
    logger.warn('Regex validation fail')
    return res.status(400).json({ error: 'Regex validation fail'})
  }
  next()
}