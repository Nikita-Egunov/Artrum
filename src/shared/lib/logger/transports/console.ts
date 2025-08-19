import { transports, format } from 'winston';

export const consoleTransport = new transports.Console({
  format: format.combine(
    format.colorize(),
    format.simple()
  )
});