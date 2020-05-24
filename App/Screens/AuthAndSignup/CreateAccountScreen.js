/*********************************

 File:       CreateAccountScreen.js
 Function:
 Copyright:  AppDelegates LLC
 Date:       2020-03-08
 Author:     mkahn

 **********************************/

import React from 'react';
import {
    Linking,
    Text,
    View,
} from 'react-native';
import FullButton from '../../Components/Buttons/FullButton';
import SocialSignIn from './Components/SocialSignIn';
import {useNavigation} from '@react-navigation/native';
import {useStyles} from '../../Themes/ThemeManager';

const CreateAccountScreen = props => {

    const navigation = useNavigation();
    const {appStyles: styles, theme} = useStyles();

    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <Text style={styles.titleText}>Create Account</Text>
            <Text style={styles.sectionText}>You can create an account by logging in with your Google or Facebook
                accounts, or
                by creating an email/password account.</Text>
            <SocialSignIn/>
            <Text style={{...styles.inputHelpText, marginTop: 10}}>-or-</Text>
            <FullButton onPress={() => navigation.navigate('SignupNameEmailScreen')}
                        text="Create Email/Password Account"
                        style={{width: '90%', marginTop: 20}}/>

            <View style={{marginTop: 15}}>
                <Text style={{...styles.inputHelpText, color: theme.secondary}}>By signing in, you agree to our
                    <Text style={{...styles.link, color: theme.secondary, fontWeight: 'bold'}}
                          onPress={() => {
                              Linking.openURL('https://www.thelotusmethodsf.com/terms-and-conditions');
                          }}>
                        &nbsp;Terms of Use & Liability Waiver&nbsp;
                    </Text>
                    and
                    <Text style={{...styles.link, color: theme.secondary, fontWeight: 'bold'}}
                          onPress={() => {
                              Linking.openURL('https://www.thelotusmethodsf.com/privacy-policy');
                          }}>
                        &nbsp;Privacy Policy&nbsp;</Text>
                </Text>
            </View>
        </View>
    );
};

export default CreateAccountScreen;
