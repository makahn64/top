/*********************************

 File:       SettingsScreen.js
 Function:   Settings for the App
 Copyright:  Bertco LLC
 Date:       2020-05-24
 Author:     mkahn

 **********************************/

import React, {useState, useEffect, useContext} from 'react';
import {View, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useStyles} from '../../Themes/ThemeManager';
import AuthContext from '../../Hooks/AuthContext';
import FullButton from '../../Components/Buttons/FullButton';
import Metrics from '../../Themes/Metrics';
import UserAvatar from 'react-native-user-avatar';
import auth from '@react-native-firebase/auth';
import SwitchRow from '../../Components/Switches/SwitchRow';
import {useThemeMode} from '../../Services/Storage/persisted';

const SettingsScreen = props => {

    const insets = useSafeAreaInsets();
    const {appStyles: styles, theme} = useStyles();
    const {isLoggedIn, firebaseCreds} = useContext(AuthContext);
    const {themeMode, setThemeMode} = useThemeMode();

    const handleLogout = async () => {
        await auth().signOut();
    };

    return (
        <View style={[styles.insetContainer, {paddingTop: insets.top * 1.5}]}>
            <Text style={[styles.H2, {alignSelf: 'center', marginBottom: Metrics.marginVertical * 10}]}>Settings</Text>
            <SwitchRow label={'Dark Mode'}
                       value={themeMode === 'dark'}
                       onValueChange={v => setThemeMode(v ? 'dark' : 'light')}/>
            {isLoggedIn ? <View>
                <View style={{alignSelf: 'center', margin: 10}}>
                    <UserAvatar name={firebaseCreds.displayName} src={firebaseCreds.photoURL} size={50}/>
                </View>
                <Text style={[styles.H4, {color: theme.primary, marginBottom: 5, textAlign: 'center'}]}>
                    {firebaseCreds.email}
                </Text>
                <FullButton text={'LOGOUT'} onPress={handleLogout} style={{width: '50%'}}/></View> : null}
        </View>
    );
};

SettingsScreen.propTypes = {};

export default SettingsScreen;


