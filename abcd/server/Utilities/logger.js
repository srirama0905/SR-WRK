/**
* Configurations of logger.
*/
const { createLogger, transports, format } = require('winston');
const winstonRotator = require('winston-daily-rotate-file');

// Logger configuration
const dailyRotateFileTransport = (filename, level) => new transports.DailyRotateFile({
    level: level,
    filename: `${filename}%DATE%.log`,
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '1g',
    maxFiles: '14d',
    format: format.combine(format.timestamp(), format.json())
})
function successlog(filename) {
    return new createLogger({
        // change level if in dev environment versus production
        level: 'info',
        maxsize: '500m',
        format: format.combine(format.timestamp(), format.json()),
        transports: [
            dailyRotateFileTransport(filename,"info")
        ]
    });
}

const errorlog = function (filename) {
    return createLogger({
        // change level if in dev environment versus production
        level: 'error',
        maxsize: '500m',
        format: format.combine(format.timestamp(), format.json()),
        transports: [
            dailyRotateFileTransport(filename,"error")
        ]
    });
}
const consolelog = function () {
    return createLogger({
        level: 'error',
        format: format.combine(format.timestamp(), format.json()),
        transports: [
            new transports.Console({
                level: 'error',
                format: format.combine(format.timestamp(), format.json())
            }),
       ]
    })
}

const crdbAppLogs = (LogType, Msg) => {
    if (process.env.CRDB_NODE_ENV == 'production') {
        switch (LogType) {
            case "error":
                errorlog(process.env.ERROR_FILE).error(Msg);
                break;
            case "info":
                successlog(process.env.INFO_FILE).info(Msg);
                break;
        }
    }
    else {
        consolelog().error(Msg);
    }
}
module.exports = {
    crdbAppLogs: crdbAppLogs
};
