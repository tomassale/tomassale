import winston from 'winston';
import path from 'path';

const filterOnly = (level) =>
  winston.format((info) => {
    return info.level === level ? info : false;
  });

const logDir = path.join(process.cwd(), 'logs');

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/info.log', format: filterOnly('info')() }),
    new winston.transports.File({ filename: 'logs/warn.log', format: filterOnly('warn')() }),
    new winston.transports.File({ filename: 'logs/error.log', format: filterOnly('error')() }),
    new winston.transports.Console()
  ],
});

export default logger;