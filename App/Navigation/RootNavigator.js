/*********************************

 File:       RootNavigator.js
 Function:   Root of Nav Stacks
 Copyright:  Bertco LLC
 Date:       2020-05-22
 Author:     mkahn

 **********************************/

import React from 'react';
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

const RootTabs = createBottomTabNavigator();

const Tabs = props => {

    const {theme} = useTheme();

    const TAB_ICON_STYLE = focused => ({
        height: 25 * Metrics.deviceScaleFactor,
        width: 25 * Metrics.deviceScaleFactor,
        marginTop: 50 * Metrics.deviceScaleFactor,
        marginBottom: 10 * Metrics.deviceScaleFactor,
        //tintColor: focused ? null : '#ff0000',
        opacity: focused ? 1.0 : 0.5,
    });

    return (<RootTabs.Navigator
        tabBarOptions={{
            activeTintColor: theme.activeNavTint,
            inactiveTintColor: theme.inactiveNavTint,
            labelStyle: {fontSize: 10 * Metrics.deviceScaleFactor, marginTop: 30 * Metrics.deviceScaleFactor},
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
                tabBarLabel: 'Settings',
                tabBarIcon: ({focused}) => <Icon type="material-community" name="settings" color={theme.primary}
                                                 containerStyle={TAB_ICON_STYLE(focused)}/>,
            }}/>
    </RootTabs.Navigator>);
};

const RootNavigator = props => {

    const {theme, themeMode} = useTheme();
    XLogger.logSilly('rendering rootnav');



    return (
        <NavigationContainer theme={{dark: themeMode === 'dark', colors: theme}}>
            <Tabs/>
            {/*<RootStack.Navigator screenOptions={options} initialRouteName={'main'}>*/}
            {/*    <RootStack.Screen name="MAINTABS" component={Tabs} options={{headerShown: false}}/>*/}
            {/*</RootStack.Navigator>*/}
        </NavigationContainer>
    );
};

RootNavigator.propTypes = {
    theme: PropTypes.object,
};

export default RootNavigator;
