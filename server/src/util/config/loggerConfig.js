import winston from 'winston'

const logger = winston.createLogger({
  level:'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.File({filename: 'src/util/log/info.log', level: 'info'}),
    new winston.transports.File({filename: 'src/util/log/warn.log', level: 'warn'}),
    new winston.transports.File({filename: 'src/util/log/error.log', level: 'error'})
  ]
})

export default logger