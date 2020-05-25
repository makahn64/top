/*********************************

 File:       ForgotPasswordScreen.js
 Function:   WHat it says...
 Copyright:  Bertco LLC
 Date:       2020-05-24
 Author:     mkahn

 **********************************/

import React, {useState} from 'react';
import {
    Text,
    TextInput,
    View,
    SafeAreaView,
    Alert,
    Platform,
    KeyboardAvoidingView,
} from 'react-native';
import FullButton from '../../Components/Buttons/FullButton';
import {validateEmail} from '../../Services/Helpers';
import Firebase from '../../Services/Firebase';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useStyles} from '../../Themes/ThemeManager';
import Metrics from '../../Themes/Metrics';

const ForgotPasswordScreen = props => {

    const navigation = useNavigation();
    const route = useRoute();
    const {appStyles: styles, theme} = useStyles();
    const prepopEmail = route.params && route.params.prepopEmail;
    const [email, setEmail] = useState(prepopEmail);
    const [requestDone, setRequestDone] = useState(false);
    const [inProgress, setInProgress] = useState(false);

    const requestNewPassword = async () => {
        setInProgress(true);
        await Firebase.auth.requestNewPassword(email);
        setRequestDone(true);
    };

    if (requestDone) {
        setTimeout(() => {
            Alert.alert(
                'All Set!',
                `Please check your email (${email}) for a password reset link.`,
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.navigate('MAINTABS'),
                    },
                ],
                {cancelable: false},
            );
        }, 750);
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            style={{flex: 1}}
            enabled>
            <SafeAreaView style={styles.container}>
                <View style={styles.insetContainer}>
                    <Text style={styles.titleText}>Reset Password</Text>
                    <Text style={styles.sectionText}>Please enter your email address and we'll send you a password reset
                        link.</Text>
                    <TextInput
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect={false}
                        autoFocus={false}
                        onChangeText={setEmail}
                        placeholder="email"
                        returnKeyLabel="next"
                        returnKeyType="next"
                        style={[styles.fullWidthTextInput, { marginHorizontal: Metrics.marginHorizontal*2 }]}
                        textContentType="emailAddress"
                        editable={true}
                        value={email}/>
                    <FullButton disabled={!validateEmail(email) || inProgress}
                                onPress={requestNewPassword}
                                text="Request New Password"
                                style={{width: '90%', marginTop: 10}}/>
                    <View style={{flex: 1}}/>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

export default ForgotPasswordScreen;

