import winston, { Logger } from "winston";

const logger: Logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

export async function logAsync(level: string, message: string) {
  return new Promise<void>((resolve, reject) => {
    logger.log(level as any, message, (err) => {
      if (err) {
        reject(err); // Reject the promise if there's an error
      } else {
        resolve(); // Resolve the promise when logging is successful
      }
    });
  });
}

