/*********************************

 File:       NoAccountScreen.js
 Function:   The user gets this screen if there is no login information
 Copyright:  AppDelegates LLC
 Date:       2019-12-89
 Author:     mkahn

 **********************************/

import React, {useEffect} from 'react';
import {Text, SafeAreaView, StyleSheet, View, ScrollView} from 'react-native';
import FullButton from '../../Components/Buttons/FullButton';
import {useNavigation} from '@react-navigation/native';
import {useStyles} from '../../Themes/ThemeManager';
import {useLogin} from '../../Redux/State/AuthRedux';
import XLogger from '../../Services/XLogger';
import KenBurnsImageBackground from '../../Components/Images/KenBurnsImageBackground';
import Images from '../../Themes/Images';

const images = [
    Images.intro1,
    Images.intro2,
    Images.intro3,
    Images.intro4,
    Images.intro5,
];

const localStyles = StyleSheet.create({
    // todo not used? confusing....remove if not used
    button: {
        marginVertical: 30,
        width: '67%',
    },
    image: {
        flex: 1,
        justifyContent: 'flex-end',
        minHeight: 220,
        width: '100%',
    },
});

const NoAccountScreen = props => {

    const navigation = useNavigation();
    const {appStyles: styles} = useStyles();
    const {clearLoginError} = useLogin();

    // MAK: this must get called before entry into the LoginScreen so it starts with a clean slate (and you don't get the popup)
    useEffect(() => {
        clearLoginError();
    }, []);

    return (
        <SafeAreaView style={styles.containerFull}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.titleText}>Sign In or Sign Up!</Text>
            <Text style={styles.sectionText}>Please sign in to your account, or create one if you are a first time
                user.{'\n\n'} Your account will let you use The Lotus Method on any of your devices!</Text>
            <KenBurnsImageBackground paused={false} sources={images} style={localStyles.image}/>
            <View style={{padding: 10}}>
                <FullButton onPress={() => navigation.navigate('LoginScreen')}
                            text="Sign In"
                            fullWidth/>
                {/*<Text style={{...styles.inputHelpText, marginTop: 20, marginBottom: 20}}>-or-</Text>*/}
                <FullButton onPress={() => navigation.navigate('CreateAccountScreen')}
                            text="Create Account"
                            fullWidth outline/>
            </View>
            </ScrollView>
        </SafeAreaView>
    );

};

export default NoAccountScreen;

