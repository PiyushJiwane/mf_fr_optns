const winston = require('winston');
const path = require('path');

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

// Construct the path to the log file
const logPath = path.join(__dirname, '..', 'logs', 'combined.log');
// Construct the path to the log file
const errorLogPath = path.join(__dirname, '..', 'logs', 'error.log');

const combinedFile = new winston.transports.File({ filename: logPath });
const errorFile = new winston.transports.File({ filename: errorLogPath, level:'error' });

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: method : ${message.method} - message : ${message.msg}`;
});

const logger = createLogger({
    format: combine(
      label({ label: 'ToDo Project' }),
      timestamp(),
      myFormat
    ),
    transports: [combinedFile,errorFile]
  });

module.exports=logger