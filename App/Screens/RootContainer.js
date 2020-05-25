/*********************************

 File:       RootContainer.js
 Function:   Root Container
 Copyright:  Bertco LLC
 Date:       2020-05-22
 Author:     mkahn

 **********************************/

import React, {useEffect, useReducer} from 'react';
import {View, Text} from 'react-native';
import RootNavigator from '../Navigation/RootNavigator';
import {useTheme} from '../Themes/ThemeManager';
import XLogger from '../Services/XLogger';
import DebugConfig from '../Config/DebugConfig';
import AuthContext, {INITIAL_STATE as INITIAL_AUTH_STATE} from '../Hooks/AuthContext';
import auth from '@react-native-firebase/auth';


const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGGED_IN':
            return {firebaseCreds: action.payload, isLoggedIn: true};
        case 'LOGGED_OUT':
            return INITIAL_AUTH_STATE;
        default:
            return state;
    }
};

const RootContainer = props => {

    const {theme} = useTheme();
    const [state, dispatch] = useReducer(authReducer, INITIAL_AUTH_STATE);

    XLogger.logSilly('RootContainer render');

    useEffect(() => {

        return auth().onAuthStateChanged(user => {
            XLogger.logDebug(`Firebase Auth callback in RootContainer. User => ${user ? JSON.stringify(user) : 'NO USER'})`);
            if (user) {
                dispatch({type: 'LOGGED_IN', payload: user});
            } else {
                dispatch({type: 'LOGGED_OUT'});
            }
        });

    }, []);

    return (
        <View style={{flex: 1, backgroundColor: theme.surface}}>
            {/*<WhiteStatusBar/>*/}
            <AuthContext.Provider value={state}>
                <RootNavigator/>
            </AuthContext.Provider>
        </View>
    );
};


export default RootContainer;
