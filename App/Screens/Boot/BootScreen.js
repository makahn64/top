/*********************************

 File:       BootScreen.js
 Function:
 Copyright:  Bertco LLC
 Date:       2020-05-24
 Author:     mkahn

 **********************************/

import React from 'react';
import {ActivityIndicator, Image, ImageBackground, StyleSheet, View} from 'react-native';
import XLogger from '../../Services/XLogger';
import {useTheme} from '../../Themes/ThemeManager';
import Images from '../../Themes/Images';
import Metrics from '../../Themes/Metrics';

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
            width: Metrics.screenWidth*0.9,
            height: 250,
            resizeMode: 'contain',
        },
        backgroundImage: {
            ...StyleSheet.absoluteFillObject,
        },
    });

    return (
        <View style={styles.fillCenterContainer}>
            <ImageBackground source={Images.splash} resizeMode="stretch" style={styles.backgroundImage}/>
            <View style={styles.logoView}>
                <Image source={Images.logo} style={styles.logoImage}/>
            </View>
            <View style={styles.contentView}>
                <ActivityIndicator size="large" color={'white'} animating/>
            </View>
        </View>
    );

};

export default BootScreen;
