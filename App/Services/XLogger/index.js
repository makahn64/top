/*********************************

 File:       index.js
 Function:   Index for Xlogger
 Copyright:  Bertco LLC
 Date:       2020-02-14
 Author:     mkahn

 **********************************/

import Reactolog from './reactolog';

const LOGLEVELS = ['silent', 'error', 'warn', 'debug', 'info', 'verbose', 'silly'];
let useReactotron = false;
let logLevel = 'debug';
let useCorrespondingConsoleMethod = true;

const logIfLevelLegit = (message, bypassReactotron, level) => {
    if (LOGLEVELS.indexOf(logLevel) >= LOGLEVELS.indexOf((level))) {
        if (level === 'error' && useCorrespondingConsoleMethod) {
            // eslint-disable-next-line no-console
            console.error(message);
        } else if (level === 'warn' && useCorrespondingConsoleMethod) {
            // eslint-disable-next-line no-console
            console.warn(message);
        } else {
            // eslint-disable-next-line no-console
            console.log(message);
        }

        if (useReactotron && !bypassReactotron) {
            Reactolog.log(message);
        }
    }
};


const XLogger = {

    /**
     * Sets the logLevel, if it is in the list of legit ones above.
     * @param level
     */
    setLogLevel: level => {
        if (LOGLEVELS.indexOf(level) < 0) {
            throw new Error(`${level} is not a valid lof level: ${LOGLEVELS.join(',')}`);
        }
        logLevel = level;
    },

    /**
     * Enables/disables Reactotron logging
     * @param shouldUse
     */
    setUseReactotron: shouldUse => {
        useReactotron = !!shouldUse;
    },

    /**
     * Maps logWarn to console.warn, and logError to console.error
     * @param shouldUse
     */
    setUseCorrespondingConsoleMethod: shouldUse => {
        useCorrespondingConsoleMethod = !!shouldUse;
    },

    /**
     * Always log out, bypass log level unless silent.
     * @param message
     * @param bypassReactotron
     */
    log: (message, bypassReactotron) => {
        if (logLevel !== 'silent') {
            // eslint-disable-next-line no-console
            console.log(message);
            if (useReactotron && !bypassReactotron) {
                Reactolog.log(message);
            }
        }
    },

    logSilly: (message, bypassReactotron) => logIfLevelLegit(message, bypassReactotron, 'silly'),
    logVerbose: (message, bypassReactotron) => logIfLevelLegit(message, bypassReactotron, 'verbose'),
    logInfo: (message, bypassReactotron) => logIfLevelLegit(message, bypassReactotron, 'info'),
    logWarn: (message, bypassReactotron) => logIfLevelLegit(message, bypassReactotron, 'warn'),
    logError: (message, bypassReactotron) => logIfLevelLegit(message, bypassReactotron, 'error'),
    logDebug: (message, bypassReactotron) => logIfLevelLegit(message, bypassReactotron, 'debug'),

    // direct access, only if turned on.
    reactotron: {
        log: message => {
            if (useReactotron) {
                Reactolog.log(message);
            }
        },
        logImportant: message => {
            if (useReactotron) {
                Reactolog.log(message);
            }
        },
        display: object => {
            if (useReactotron) {
                Reactolog.display(object);
            }
        },
    },

    // synonyms
    silly: (message, bypassReactotron) => logIfLevelLegit(message, bypassReactotron, 'silly'),
    verbose: (message, bypassReactotron) => logIfLevelLegit(message, bypassReactotron, 'verbose'),
    info: (message, bypassReactotron) => logIfLevelLegit(message, bypassReactotron, 'info'),
    warn: (message, bypassReactotron) => logIfLevelLegit(message, bypassReactotron, 'warn'),
    error: (message, bypassReactotron) => logIfLevelLegit(message, bypassReactotron, 'error'),
    debug: (message, bypassReactotron) => logIfLevelLegit(message, bypassReactotron, 'debug'),

};

export default XLogger;
