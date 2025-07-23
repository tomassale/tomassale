import winston from 'winston'

const filterOnly = (level) =>
  winston.format((info) => {
    return info.level === level ? info : false;
  })

const logger = winston.createLogger({
  level:'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.File({filename: 'src/log/logs/info.log', format: filterOnly('info')()}),
    new winston.transports.File({filename: 'src/log/logs/warn.log', format: filterOnly('warn')()}),
    new winston.transports.File({filename: 'src/log/logs/error.log', format: filterOnly('error')()})
  ]
})

export default logger