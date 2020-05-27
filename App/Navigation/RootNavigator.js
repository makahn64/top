/*********************************

 File:       RootNavigator.js
 Function:   Root of Nav Stacks
 Copyright:  Bertco LLC
 Date:       2020-05-22
 Author:     mkahn

 **********************************/

import React, {useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from '../Themes/ThemeManager';
import Metrics from '../Themes/Metrics';
import XLogger from '../Services/XLogger';
import VerySimpleView from '../Screens/ZExperimental/VerySimpleView';
import {Icon} from 'react-native-elements';
import AllPostsScreen from '../Screens/BlogPosts/AllPostsScreen';
import PostStackNavigator from './PostsStackNavigator';
import MyPostsStackNavigator from './MyPostsStackNavigator';
import SettingsScreen from '../Screens/Settings/SettingsScreen';
import BootScreen from '../Screens/Boot/BootScreen';
import {createStackNavigator} from '@react-navigation/stack';
import AuthNavigator from './AuthNavigator';
import AuthContext from '../Hooks/AuthContext';
import {Linking, Text} from 'react-native';
import {useNavigation} from '@react-navigation/core';


const RootTabs = createBottomTabNavigator();
const RootStack = createStackNavigator();

const linking = {
    prefixes: ['tlb://'],
    config: {
        MAINTABS: {
            screens: {
                POSTS: {
                    screens: {
                        POST: 'post/:docId',
                    },
                },
            },
        },
    },
};

const Tabs = props => {

    const {theme} = useTheme();

    const TAB_ICON_STYLE = focused => ({
        height: 40 * Metrics.deviceScaleFactor,
        width: 40 * Metrics.deviceScaleFactor,
        marginTop: 50 * Metrics.deviceScaleFactor,
        marginBottom: 5 * Metrics.deviceScaleFactor,
        //tintColor: focused ? null : '#ff0000',
        opacity: focused ? 1.0 : 0.5,
    });

    return (<RootTabs.Navigator
        tabBarOptions={{
            activeTintColor: theme.activeNavTint,
            inactiveTintColor: theme.inactiveNavTint,
            labelStyle: {fontSize: 10 * Metrics.deviceScaleFactor, marginTop: 20 * Metrics.deviceScaleFactor, marginBottom: 5},
        }}
        initialRouteName={'POSTS'}>
        <RootTabs.Screen
            name={'POSTS'}
            component={PostStackNavigator}
            options={{
                tabBarLabel: 'Posts',
                tabBarIcon: ({focused}) => <Icon type="material-community" name="message-bulleted" color={theme.primary}
                                                 containerStyle={TAB_ICON_STYLE(focused)}/>,
            }}/>
        <RootTabs.Screen
            name={'MY_POSTS'}
            component={MyPostsStackNavigator}
            options={{
                tabBarLabel: 'My Posts',
                tabBarIcon: ({focused}) => <Icon type="material-community" name="account-box-multiple"
                                                 color={theme.primary}
                                                 containerStyle={TAB_ICON_STYLE(focused)}/>,
            }}/>
        <RootTabs.Screen
            name={'SETTINGS'}
            component={SettingsScreen}
            options={{
                tabBarLabel: 'Account',
                tabBarIcon: ({focused}) => <Icon type="material-community" name="settings" color={theme.primary}
                                                 containerStyle={TAB_ICON_STYLE(focused)}/>,
            }}/>
    </RootTabs.Navigator>);
};

const RootNavigator = props => {

    const {theme, themeMode} = useTheme();
    const {isLoggedIn, firebaseCreds} = useContext(AuthContext);
    XLogger.logSilly(`rendering rootnav loggedIn -> ${isLoggedIn}`);

    const options = {
        headerShown: false,
        headerStyle: {
            backgroundColor: theme.surface,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
        },
    };


    return (
        <NavigationContainer theme={{dark: themeMode === 'dark', colors: theme}} linking={linking}>
            <RootStack.Navigator screenOptions={options} initialRouteName={'MAINTABS'}>
                <RootStack.Screen name="MAINTABS" component={Tabs} options={{headerShown: false}}/>
                <RootStack.Screen name="AUTH" component={AuthNavigator}/>
            </RootStack.Navigator>
        </NavigationContainer>
    );
};

RootNavigator.propTypes = {
    theme: PropTypes.object,
};

export default RootNavigator;
