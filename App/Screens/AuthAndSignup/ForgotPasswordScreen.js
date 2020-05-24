/*********************************

 File:       ForgotPasswordScreen.js
 Function:   WHat it says...
 Copyright:  AppDelegates LLC
 Date:       2019-12-12
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
import TLMFirebase from '../../Services/Firebase';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useStyles} from '../../Themes/ThemeManager';

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
        await TLMFirebase.auth.requestNewPassword(email);
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
                        onPress: () => navigation.navigate({routeName: 'LoginScreen'}),
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
                <View style={styles.stack}>
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
                        style={{...styles.textInput, marginTop: 20}}
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

