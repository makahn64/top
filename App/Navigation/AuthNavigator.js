/*********************************

 File:       AuthNavigator
 Function:   AuthAndSignup flow
 Copyright:  AppDelegates LLC
 Date:       2020-03-08
 Author:     mkahn

 **********************************/

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CreateAccountScreen from '../Screens/AuthAndSignup/CreateAccountScreen';
import ForgotPasswordScreen from '../Screens/AuthAndSignup/ForgotPasswordScreen';
import LoginScreen from '../Screens/AuthAndSignup/LoginScreen';
import SignupNameEmailScreen from '../Screens/AuthAndSignup/SignupNameEmailScreen';
import {useTheme} from '../Themes/ThemeManager';
import DebugConfig from '../Config/DebugConfig';

const AuthStack = createStackNavigator();

const AuthNavigator = props => {

    const { theme, themeMode } = useTheme();

    const screenOptions = {
        headerStyle: {
            backgroundColor: 'transparent',
        },
        headerTintColor: theme.primary,
        // This MUST be undefined (not null)
        //headerTitle:  DebugConfig.showStockHeader ? undefined : <LogoTitle/>,
        // If no space, the default component renders  the default 'Back'
        headerBackTitle: ' ',
        headerBackTitleTruncated: ' '
    };

    return (
        <AuthStack.Navigator screenOptions={screenOptions}>
            <AuthStack.Screen name={'LoginScreen'} component={LoginScreen}/>
            <AuthStack.Screen name={'ForgotPasswordScreen'} component={ForgotPasswordScreen}/>
            <AuthStack.Screen name={'CreateAccountScreen'} component={CreateAccountScreen}/>
            <AuthStack.Screen name={'SignupNameEmailScreen'} component={SignupNameEmailScreen}/>
        </AuthStack.Navigator>
    );
};


export default AuthNavigator;
