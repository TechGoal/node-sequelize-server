const logger = require('logger').Logger;
class Logger {
    constructor() { }

    static log_info(...args) {
        logger.info(...args)
    }

    static log_error(...args) {
        logger.error(...args)
    }
}

module.exports = Logger;