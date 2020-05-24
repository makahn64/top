/*********************************

 File:       NotAuthorizedByTLMScreen.js
 Function:
 Copyright:  AppDelegates LLC
 Date:       2020-03-08
 Author:     mkahn

 **********************************/

import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import FullButton from '../../Components/Buttons/FullButton';
import {useStyles} from '../../Themes/ThemeManager';
import {useAuth} from '../../Redux/State/AuthRedux';

const NotAuthorizedByTLMScreen = props => {

    const {appStyles: styles} = useStyles();
    const {logout} = useAuth();

    return (
        <SafeAreaView style={styles.container}>
            <View style={{padding: 20}}>
                <Text style={styles.titleText}>Not Authorized</Text>
                <Text style={styles.sectionText}>It looks like you're not a current client of The Lotus Method. Please
                    check
                    with The Lotus Method if this is in error.</Text>
                <FullButton
                    onPress={logout}
                    style={styles.button}
                    text="Try Again"/>
            </View>
        </SafeAreaView>
    );
};

export default NotAuthorizedByTLMScreen;
