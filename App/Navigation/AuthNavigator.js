/*********************************

 File:       AuthNavigator
 Function:   AuthAndSignup flow
 Copyright:  Bertco LLC
 Date:       2020-05-26
 Author:     mkahn

 **********************************/

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CreateAccountScreen from '../Screens/AuthAndSignup/CreateAccountScreen';
import ForgotPasswordScreen from '../Screens/AuthAndSignup/ForgotPasswordScreen';
import LoginScreen from '../Screens/AuthAndSignup/LoginScreen';
import SignupNameEmailScreen from '../Screens/AuthAndSignup/SignupNameEmailScreen';
import {useTheme} from '../Themes/ThemeManager';
import {Button} from 'react-native-elements';
import {useNavigation} from '@react-navigation/core';
import Metrics from '../Themes/Metrics';

const AuthStack = createStackNavigator();


const AuthNavigator = props => {

    const { theme } = useTheme();
    const navigation = useNavigation();


    const screenOptions = {
        headerShown: true,
        headerStyle: {
            backgroundColor: 'transparent',
        },
        headerTintColor: theme.primary,
        // This MUST be undefined (not null)
        //headerTitle:  DebugConfig.showStockHeader ? undefined : <LogoTitle/>,
        // If no space, the default component renders  the default 'Back'
        headerBackTitle: ' ',
        headerBackTitleTruncated: ' ',
    };

    const landingOptions = {
        headerTitle: null,
        headerRight:  () => (
            <Button
                onPress={() => navigation.navigate("MAINTABS")}
                title="CANCEL"
                color={theme.danger}
                type={'clear'}
                titleStyle={{ fontSize: 12, color: theme.danger, marginRight: Metrics.marginHorizontal}}
            />
        ),
    }

    return (
        <AuthStack.Navigator screenOptions={screenOptions}>
            <AuthStack.Screen name={'LoginScreen'} component={LoginScreen} options={landingOptions}/>
            <AuthStack.Screen name={'ForgotPasswordScreen'} component={ForgotPasswordScreen} options={{headerTitle: null}}/>
            <AuthStack.Screen name={'CreateAccountScreen'} component={CreateAccountScreen} options={{headerTitle: null}}/>
            <AuthStack.Screen name={'SignupNameEmailScreen'} component={SignupNameEmailScreen} options={{headerTitle: null}}/>
        </AuthStack.Navigator>
    );
};


export default AuthNavigator;
