/*********************************

 File:       SettingsScreen.js
 Function:   Settings for the App
 Copyright:  Bertco LLC
 Date:       2020-05-24
 Author:     mkahn

 **********************************/

import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useStyles} from '../../Themes/ThemeManager';

const SettingsScreen = props => {

    const insets = useSafeAreaInsets();
    const { appStyles: styles } = useStyles();

    return (
        <View style={[styles.insetContainer, {paddingTop: insets.top*1.5}]}>
            <Text style={[styles.H2, {alignSelf: 'center'}]}>Settings</Text>
        </View>
    );
};

SettingsScreen.propTypes = {};

export default SettingsScreen;


