/*********************************

 File:       persisted.js
 Function:   Light persistence for theme, etc.
 Copyright:  Bertco LLC
 Date:       2020-05-22
 Author:     mkahn

 **********************************/

import {useState, useEffect} from 'react';
import Storage from '../../Services/Storage';
import XLogger from '../XLogger';

export const PERSISTED_SETTINGS = {
    themeMode: 'light',
};

export const usePersistedSettings = () => {
    const [settings, setSettings] = useState(PERSISTED_SETTINGS);
    useEffect(() => {
        async function load() {
            const themeMode = await Storage.getString('themeMode', 'light');
            setSettings({themeMode, loadComplete: true});
        }

        load();
    });

    const setThemeMode = mode => {
        Storage.setString('themeMode', mode)
            .then(() => {
                XLogger.log(`Theme set to ${mode}`);
                setSettings({...settings, themeMode: mode});
            })
            .catch(() => XLogger.logWarn('Error setting themeMode'));
    };

    const toggleThemeMode = state => {
        const newMode = settings.themeMode === 'light' ? 'dark' : 'light';
        setThemeMode(newMode);
    };

    return { settings, themeMode: settings.themeMode, setThemeMode, toggleThemeMode};
};
