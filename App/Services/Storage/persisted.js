/*********************************

 File:       persisted.js
 Function:   Light persistence for theme, etc.
 Copyright:  Bertco LLC
 Date:       2020-05-22
 Author:     mkahn

 **********************************/

import {useEffect, useState} from 'react';
import Storage from '../../Services/Storage';
import XLogger from '../XLogger';

export const PERSISTED_SETTINGS = {
    themeMode: '???',
};

class PersistenceLayer {
    constructor(initialValues, key = '@@persisted') {
        this.data = initialValues;
        Storage.getObject(key, initialValues)
            .then(data => {
                XLogger.logSilly('Persistence layer has fetched on boot');
                XLogger.logSilly(data);
                this.data = data;
            })
            .catch(XLogger.logError);

        this.listeners = {};
        this.key = key;
    }

    _updateListeners(key) {
        const listeners = this.listeners[key] || [];
        for (let l of listeners) {
            l({key, value: this.data[key]});
        }
    }

    set(key, value) {
        this.data[key] = value;
        Storage.setObject(this.key, this.data)
            .then(() => {
                XLogger.logSilly(`Persisted ${key}`);
                this._updateListeners(key);
            })
            .catch(err => XLogger.error(err));
    }

    get(key){
        return this.data[key];
    }

    subscribe(key, fn) {
        this.listeners[key] = this.listeners[key] || [];
        this.listeners[key].push(fn);
        return () => this._unsubscribe(key, fn);
    }

    _unsubscribe(key, fn) {
        const listeners = this.listeners[key];
        if (listeners && listeners.length) {
            for (let i = listeners.length; i > 0; i--) {
                if (listeners[i] === fn) {
                    listeners.splice(i, 1);
                    break;
                }
            }
        }
    }
}

const plSingleton = new PersistenceLayer(PERSISTED_SETTINGS);

export default plSingleton;

export const useThemeMode = () => {
    const [themeMode, setTM] = useState('light');
    useEffect(() => {

        return plSingleton.subscribe('themeMode', ({key, value}) => {
            XLogger.logDebug(`useThemeMode received a theme change to ${value}`);
            setTM(value);
        });

    }, []);

    const setThemeMode = mode => {
        plSingleton.set('themeMode', mode);
    };

    return {themeMode, setThemeMode};
};
