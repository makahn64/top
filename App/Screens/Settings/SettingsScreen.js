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
import Metrics from '../../Themes/Metrics';
import UserAvatar from 'react-native-user-avatar';
import auth from '@react-native-firebase/auth';
import SwitchRow from '../../Components/Switches/SwitchRow';
import {useThemeMode} from '../../Services/Storage/persisted';
import {Button} from 'react-native-elements';
import {useNavigation} from '@react-navigation/core';
import { Toast} from 'native-base';
import FeaturesConfig from '../../Config/FeaturesConfig';

const SettingsScreen = props => {

    const insets = useSafeAreaInsets();
    const {appStyles: styles, theme} = useStyles();
    const {isLoggedIn, firebaseCreds} = useContext(AuthContext);
    const {themeMode, setThemeMode} = useThemeMode();
    const navigation = useNavigation();

    const handleLogout = async () => {
        try {
            await auth().signOut();
            Toast.show({text: 'See u later!', type: 'success'});
            navigation.navigate('POSTS');
        } catch (e){
            Toast.show({text: 'There was an error logging out', type: 'danger'});
        }
    };

    const handleLogin = () => {
        navigation.navigate('AUTH');
    }

    return (
        <View style={[styles.insetContainer, {paddingTop: insets.top * 1.5}]}>
            <Text style={[styles.sectionText, {marginBottom: Metrics.marginVertical * 10}]}>Settings</Text>
            { FeaturesConfig.enableDarkMode ? <SwitchRow label={'Dark Mode'}
                       value={themeMode === 'dark'}
                       onValueChange={v => setThemeMode(v ? 'dark' : 'light')}/> : null }
            {isLoggedIn ? <View>
                <View style={{alignSelf: 'center', margin: 10}}>
                    <UserAvatar name={firebaseCreds.displayName} src={firebaseCreds.photoURL} size={50}/>
                </View>
                <Text style={[styles.H4, {color: theme.primary, marginBottom: 15, textAlign: 'center'}]}>
                    {firebaseCreds.email}
                </Text>
                <Button title={'LOGOUT'} onPress={handleLogout} style={{width: '50%', alignSelf:'center'}}/></View> :
            <View>
                <Text style={[styles.H4, {color: theme.primary, marginBottom: 15, textAlign: 'center'}]}>
                    You're not logged in. Log in or join to create posts.
                </Text>
                <Button title={'LOGIN'} onPress={handleLogin} style={{width: '50%', alignSelf:'center'}}/>
            </View>}

        </View>
    );
};

SettingsScreen.propTypes = {};

export default SettingsScreen;


