import { check } from 'express-validator';

export const validateForm = [
  check('number')
    .notEmpty().withMessage('Number is required')
    .matches(/^\+\d{1,3} \d{1,4} \d{4}-\d{4}$/).withMessage('Number must be in the format "+XX XXXX-XXXX" or "+XXX XXXX-XXXX"'),
  check('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).withMessage('Invalid email format'),
  check('message')
    .notEmpty().withMessage('Message is required')
    .isLength({ max: 500 }).withMessage('Message must be at most 500 characters')
    .matches(/^[a-zA-Z0-9\s.,!?'"()\-áéíóúÁÉÍÓÚñÑ]*$/).withMessage('Invalid characters in message')
];
