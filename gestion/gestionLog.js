const winston = require('winston');
const moment = require('moment');

const config = require('../config.json')

const { createLogger, format, transports } = winston;
const { combine, timestamp, label, printf} = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${moment(timestamp).locale('fr').format('LLL')} [${label}] ${level}: ${message}`;
});

// Configuration des transports de winston pour enregistrer les journaux dans un fichier
const logger = createLogger({
    level: config.logging.level,
    levels: config.logging.customLevels.levels,
    format: combine(
        label({ label: 'express-server' }),
        timestamp(),
        myFormat
    ),
    transports: [
        new transports.File({ 
            filename: `${config.logging.logDirectory}/${config.logging.connect}`, 
            level: 'connect', 
            datePattern: config.logging.datePattern,
            zippedArchive: true 
        }),
        new transports.File({ 
            filename: `${config.logging.logDirectory}/${config.logging.errorFilename}`, 
            level: 'error', 
            datePattern: config.logging.datePattern,
            zippedArchive: true 
        }),
        new transports.File({ 
            filename: `${config.logging.logDirectory}/${config.logging.filename}`, 
            level: 'info',
            datePattern: config.logging.datePattern,
            zippedArchive: true 
        }),
    ]
});

logger.add(new transports.Console({
    format: combine(
        label({ label: 'express-server' }),
        timestamp(),
        myFormat,
    ),
    level: 'connect'
}));

module.exports = logger;