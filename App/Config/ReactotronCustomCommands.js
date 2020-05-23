/*********************************

 File:       ReactotronCustomCommands.js
 Function:   Add custom commands here, they'll be installed in ReactotronConfig
 Copyright:  AppDelegates LLC
 Date:       2019-08-28
 Author:     mkahn



 **********************************/

import AuthActions from '../Redux/State/AuthRedux';
import UIActions from '../Redux/State/UIRedux';
import XLogger from '../Services/XLogger';
import {toggleThemeMode} from '../Services/Storage/persisted';

import _ from 'lodash';

const ToggleThemeMode = {
    command: 'Toggle Dark/Light',
    title: 'Toggle Dark/Light',
    description: 'Toggles between dark and light mode',
    handler: async () => {
        toggleThemeMode();
    },
};

const LogoutButton = {
    command: 'Logout',
    title: 'Logout',
    description: 'Logs the user out of Firebase',
    handler: () => {
        const dispatch = require('../Redux').dispatch;
        XLogger.logDebug('Signing out of Firebase via Redux');
        dispatch(AuthActions.firebaseLogoutRequested());
    },
};

const MakeEmailAccount = {
    command: 'eacct',
    title: 'Make Email Account',
    description: 'Makes an email account',
    handler: () => {
        const dispatch = require('../Redux').dispatch;
        XLogger.logDebug('Making email account on Firebase via Redux');
        const fname = _.sample(['Jenny', 'Jenn', 'Krissy', 'Leslie', 'Mandi', 'Nena', 'Olivia', 'Paige', 'Randi', 'Suzy', 'Talia', 'Ursula']);
        const lname = _.sample(['Adams', 'Bento', 'Cartman', 'Dillinger', 'Euphrates', 'Franklin', 'Georgin', 'Hanks', 'Islandster', 'Jackson', 'Kipper', 'Langomorph']);
        const email = `${fname}.${lname}@test.com`;
        dispatch(AuthActions.firebaseCreateEmailPwdAccount(email, 'password', `${fname} ${lname}`));
    },
};

const WipeUser = {
    command: 'wipeUser',
    title: 'Wipe User',
    description: `Deletes the current user's account document from Firestore and logs them out. It DOES NOT remove the login information in Firebase Auth.`,
    handler: () => {
        const dispatch = require('../Redux').dispatch;
        XLogger.logDebug('Wiping user Account and logging out via Rectotron');
        dispatch({type: 'DESTROY_CURRENT_USER'});
    },
};

const ResetStore = {
    command: 'ResetStore',
    title: 'ResetStore',
    description: 'Issues a reset app redux message, hopefully leaving app factory fresh.',
    handler: () => {
        const dispatch = require('../Redux').dispatch;
        XLogger.logDebug('Issuing RESET_APP');
        dispatch({type: 'RESET_APP'});
    },
};


const ShowLoader = {
    command: 'ShowLoader',
    title: 'Show Loader',
    description: 'Triggers the global loader screen via redux.',
    handler: async () => {
        const dispatch = require('../Redux').dispatch;
        XLogger.logDebug('Showing loader');
        dispatch(UIActions.showLoader('Loading'));
    },
};

const HideLoader = {
    command: 'Hide Loader',
    title: 'Hide Loader',
    description: 'Hides the global loader screen via redux.',
    handler: async () => {
        const dispatch = require('../Redux').dispatch;
        XLogger.logDebug('Hiding loader');
        dispatch(UIActions.hideLoader());
    },
};

const ShowInfo = {
    command: 'InfoPop',
    title: 'Info Popup',
    description: 'Issues an Info Popup',
    handler: () => {
        const dispatch = require('../Redux').dispatch;
        XLogger.logDebug('CustomCommand: issuing info popup');
        // This one should only fire once
        //dispatch(createRewardAction('TRIED_MOBILITY'));
        dispatch(UIActions.showInfoModal({
            header: 'Important Note!',
            message: 'Doctors have determined that sex causes pregnancy!',
            buttonLabel: 'Got It!',
        }));

    },
};

// Add/Remove commands by adding/removing from this array
const AVAILABLE_COMMANDS = [ToggleThemeMode, LogoutButton, MakeEmailAccount, ShowInfo]; //, ClearProfileComplete, ResetStore, LogoutButton, WipeUser, PersistToFirestore, ShowFlower, HideFlower, ShowLoader, HideLoader, ToggleThemeMode];
//const AVAILABLE_COMMANDS = []

export default AVAILABLE_COMMANDS;
