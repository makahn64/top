/*********************************

 File:       RootContainer.js
 Function:   Root Container
 Copyright:  Bertco LLC
 Date:       2020-05-22
 Author:     mkahn

 **********************************/

import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import RootNavigator from '../Navigation/RootNavigator';
import {useTheme} from '../Themes/ThemeManager';
import XLogger from '../Services/XLogger';
import DebugConfig from '../Config/DebugConfig';

const RootContainer = props => {

    const {theme} = useTheme();
    XLogger.logSilly('RootContainer render');

    useEffect(() => {


    }, []);

    return (
        <View style={{flex: 1, backgroundColor: theme.surface}}>
            {/*<WhiteStatusBar/>*/}
            <RootNavigator/>
        </View>
    );
};


export default RootContainer;
