/*********************************

 File:       BootScreen.js
 Function:   Converted from TLM 1.0
 Copyright:  AppDelegates LLC
 Date:       2020-03-09
 Author:     mkahn

 **********************************/

import React from 'react';
import {ActivityIndicator, Image, ImageBackground, StyleSheet, View} from 'react-native';
import XLogger from '../../Services/XLogger';
import {useTheme} from '../../Themes/ThemeManager';
import Images from '../../Themes/Images';

const BootScreen = props => {

    XLogger.logDebug('BootScreen rendering');
    const {theme} = useTheme();

    const styles = StyleSheet.create({
        fillCenterContainer: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.secondary,
        },
        contentView: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center', // was
            // backgroundColor: 'blue'
        },
        logoView: {
            flex: 2,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'red'
        },
        logoImage: {
            width: 250,
            height: 250,
        },
        backgroundImage: {
            ...StyleSheet.absoluteFillObject,
        },
    });

    return (
        <View style={styles.fillCenterContainer}>
            <ImageBackground source={Images.splashBackground} resizeMode="stretch" style={styles.backgroundImage}/>
            <View style={styles.logoView}>
                <Image source={Images.splashTransparent} style={styles.logoImage}/>
            </View>
            <View style={styles.contentView}>
                <ActivityIndicator size="large" color={'white'} animating/>
            </View>
        </View>
    );

};

export default BootScreen;
