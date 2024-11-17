import { validationResult } from 'express-validator'
import logger from '../../util/config/loggerConfig.js'

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    logger.log('warning', 'Validation failed: ' + JSON.stringify(errors.array()))
    return res.status(400).json({ errors: errors.array()})
  }
  next()
}