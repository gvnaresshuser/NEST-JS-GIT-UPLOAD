import * as winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { combine, timestamp, printf } = winston.format;
//pnpm exec eslint src/common/logger/winston.config.ts --fix

/* const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
}); */

const logFormat = printf((info) => {
  return `${String(info.timestamp)} [${String(info.level)}]: ${String(info.message)}`;
});

const onlyWarn = winston.format((info) => {
  return info.level === 'warn' ? info : false;
});

export const logger = winston.createLogger({
  level: 'debug',
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
  transports: [
    new winston.transports.Console(),

    new DailyRotateFile({
      dirname: 'logs',
      filename: 'combined-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '5m',
      maxFiles: '7d',
    }),

    new DailyRotateFile({
      dirname: 'logs',
      filename: 'error-%DATE%.log',
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      maxSize: '5m',
      maxFiles: '14d',
    }),
    //---------------------- WARN AND DEBUG ------------------------------
   /*  new DailyRotateFile({
      dirname: 'logs',
      filename: 'warn-%DATE%.log',
      level: 'warn',
      datePattern: 'YYYY-MM-DD',
      maxSize: '5m',
      maxFiles: '7d',
    }), */
    //---------------------- ONLY WARNINGS IN WARN LOG FILE --------------------------
    new DailyRotateFile({
      dirname: 'logs', // ✅ also add this (you missed it)
      filename: 'warn-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '5m',
      maxFiles: '7d',
      format: combine(
        onlyWarn(),   // ✅ CALL IT
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logFormat,
      ),
    }),
    //---------------------- ONLY WARNINGS IN WARN LOG FILE --------------------------
    new DailyRotateFile({
      dirname: 'logs',
      filename: 'debug-%DATE%.log',
      level: 'debug',
      datePattern: 'YYYY-MM-DD',
      maxSize: '5m',
      maxFiles: '7d',
    }),
    //-----------------------------------------------
  ],
});
//-------------------------------------------------------------------

/* import * as winston from 'winston';
import 'winston-daily-rotate-file';

const logDir = 'logs';

const { combine, timestamp, printf, colorize, errors, json } = winston.format;

const logFormat = printf(({ level, message, timestamp, context, stack }) => {
    return `${timestamp} [${level}] ${context || 'App'}: ${stack || message}`;
});

export const winstonConfig = {
    level: 'debug', // capture all levels
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        errors({ stack: true }),
        json()
    ),
    transports: [
        // 🔹 Console
        new winston.transports.Console({
            format: combine(
                colorize(),
                timestamp({ format: 'HH:mm:ss' }),
                logFormat
            ),
        }),

        // 🔹 All logs
        new winston.transports.DailyRotateFile({
            dirname: logDir,
            filename: 'combined-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxSize: '5m',
            maxFiles: '7d',
        }),

        // 🔹 Error logs only
        new winston.transports.DailyRotateFile({
            dirname: logDir,
            filename: 'error-%DATE%.log',
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            maxSize: '5m',
            maxFiles: '14d',
        }),
    ],
}; 
*/
