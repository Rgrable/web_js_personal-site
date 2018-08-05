const LOG_LEVELS = {
    NONE: 0,
    ERROR: 1,
    WARN: 2,
    LOG: 3,
    DEBUG: 4
};

const LOG_LEVEL = LOG_LEVELS.DEBUG;

const LogUtil = {
    error: (message) => {
        if (LOG_LEVEL >= LOG_LEVELS.ERROR) {
            console.log("ERR: " + message);
        }
    },
    warning: (message) => {
        if (LOG_LEVEL >= LOG_LEVELS.WARN) {
            console.log("WARN: " + message);
        }
    },
    log: (message) => {
        if (LOG_LEVEL >= LOG_LEVELS.LOG) {
            console.log("LOG: " + message);
        }
    },
    debug: (message) => {
        if (LOG_LEVEL >= LOG_LEVELS.DEBUG) {
            console.log("DEBUG: " + message);
        }
    }
};