import winston, { createLogger, format } from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'

const transport = new DailyRotateFile({
  filename: './logs/api-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '30d',
})

const printFormat = format.printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`
})

const messageFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  printFormat,
  format.prettyPrint()
)
const logger = createLogger({
  format: messageFormat,
  transports: [transport],
})

export function initialize() {
  if (process.env.ENABLE_CONSOLE_LOGGING === 'true') {
    logger.add(
      new winston.transports.Console({
        format: messageFormat,
      })
    )
  }
}

export function log(message: any) {
  logger.info(message)
}

export function logError(message: any) {
  logger.error(message)
}
