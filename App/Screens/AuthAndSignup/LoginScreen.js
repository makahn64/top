/*********************************

 File:       LoginScreen.js
 Function:   Sign in with Social or Email/Pwd
 Copyright:  AppDelegates LLC
 Date:       2019-11-25
 Author:     mkahn

 **********************************/

import React, {useState} from 'react';
import {
    Text,
    TextInput,
    View,
    SafeAreaView,
    Platform,
    TouchableOpacity,
    Linking,
    KeyboardAvoidingView, Image, ActivityIndicator,
} from 'react-native';
import FullButton from '../../Components/Buttons/FullButton';
import {validateEmail} from '../../Services/Helpers';
import SocialSignIn from './Components/SocialSignIn';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useStyles} from '../../Themes/ThemeManager';
import {useLogin} from '../../Redux/State/AuthRedux';
import XLogger from '../../Services/XLogger';
import Modal from 'react-native-modal';
import Images from '../../Themes/Images';

const SHOW_ERROR_CODE = __DEV__ && true; // for debug only

const CREATE_ACCOUNT_ERR_MSG = 'We couldn\'t find an account for that email address. Perhaps you\'d like to create an account?';
const BAD_LOGIN_ERR_MSG = 'That seems to be the wrong password.';

const LoginScreen = props => {

    const navigation = useNavigation();
    const route = useRoute();
    const prepopEmail = route && route.params && route.params.prepopEmail;
    const {appStyles: styles, theme, Metrics} = useStyles();

    const {
        loginErrorCode,
        loginWithEmailAndPassword,
        clearLoginError,
    } = useLogin();

    const [email, setEmail] = useState(prepopEmail);
    const [pwd, setPwd] = useState('');
    const [showSocialButtons, setsShowSocialButtons] = useState(true);
    // Modal stuff, maybe go into it's own component
    const [showModal, setShowModal] = useState(false);
    const [showModalActivityIndicator, setShowModalActivityIndicator] = useState(false);

    let modalText = 'Logging In';

    if (loginErrorCode) {
        switch (loginErrorCode) {
            case 'auth/user-not-found':
                modalText = CREATE_ACCOUNT_ERR_MSG;
                break;

            case 'auth/facebook-usercancel':
                modalText = 'It looks like you canceled Facebook login.';
                break;

            case 'auth/facebook-notoken':
                modalText = 'Unable to authenticate with Facebook.\n[auth/notoken]';
                break;

            case 'auth/account-exists-with-different-credential':
                modalText = 'Hmmm, looks like you may have logged in a different way in the past. Please try one of the other methods.';
                break;

            case 'auth/wrong-password':
                modalText = `Hmmm, looks like that password didn't work, or you may have logged in a different way in the past.\n\n\Please try again.`;
                break;

            default:
                modalText = `Unknown code ${loginErrorCode}`;
        }
    }

    const goToCreateAccount = () => {
        navigation.navigate('SignupNameEmailScreen');
    };

    const goToForgotPassword = () => {
        navigation.navigate('ForgotPasswordScreen');
    };

    const signInWithEmailPassword = () => {
        XLogger.log('Sign in with Username/password pressed');
        setTimeout(() => {
            // This delay was here for testing, but I sort of like the effect so I am leaving it in :).
            loginWithEmailAndPassword(email, pwd);
        }, 1000);
        showLoginModal();
    };

    const handleSocialSignin = authenticator => {
        setShowModalActivityIndicator(true);
        setShowModal(true);
    };

    const showLoginModal = () => {
        setShowModalActivityIndicator(true);
        setShowModal(true);
    };

    const tryAgain = () => {
        setShowModal(false);
        clearLoginError();
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            style={{flex: 1}}
            enabled>
            <SafeAreaView style={styles.container}>
                <View style={styles.stack}>
                    <Text style={styles.titleText}>Please Sign In to Your Account</Text>
                    <View style={{marginTop: 20}}>
                        <Text style={{...styles.inputHelpText, color: theme.secondary}}>By signing in, you agree
                            to our
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
                    {showSocialButtons ?
                        <SocialSignIn style={{marginTop: 20}} onLoginAttempt={handleSocialSignin}/> : null}
                    {showSocialButtons ? <Text style={{...styles.inputHelpText, marginTop: 10}}>-or-</Text> : null}
                    {showSocialButtons ?
                        <FullButton onPress={() => setsShowSocialButtons(false)}
                                    text="Sign In with Email"
                                    style={{width: '90%', marginTop: 10}}/> :
                        null}
                    {!showSocialButtons ?
                        <View style={{margin: Metrics.marginHorizontal}}>
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
                            <TextInput
                                secureTextEntry
                                autoCapitalize="none"
                                autoComplete="none"
                                autoCorrect={false}
                                autoFocus={false}
                                onChangeText={setPwd}
                                placeholder="password"
                                returnKeyLabel="done"
                                returnKeyType="done"
                                style={[styles.textInput, {marginTop: 20, marginBottom: 30}]}
                                textContentType="emailAddress"
                                editable={true}
                                value={pwd}/>
                            <FullButton disabled={!validateEmail(email) || pwd.length < 8}
                                        onPress={signInWithEmailPassword}
                                        text="Sign In"
                                        fullWidth/>
                            <TouchableOpacity onPress={goToForgotPassword}
                                              style={{marginTop: 0, marginBottom: 10}}>
                                <Text style={{
                                    ...styles.inputHelpText,
                                    marginTop: 10,
                                    textDecorationLine: 'underline',
                                    margin: 0,
                                    fontWeight: 'bold',
                                }}>Forgot your password?</Text>
                            </TouchableOpacity>
                        </View> : null}

                    <Text style={{...styles.inputHelpText, marginTop: 20}}>Don't have an
                        account?</Text>
                    <View>
                        <TouchableOpacity onPress={goToCreateAccount}
                                          style={{marginTop: 5, marginBottom: 8}}>
                            <Text style={{
                                ...styles.inputHelpText,
                                textDecorationLine: 'underline',
                                margin: 0,
                                fontWeight: 'bold',
                            }}>Tap
                                here to join,</Text>
                        </TouchableOpacity>
                        <Text style={{...styles.inputHelpText, marginTop: 0}}> or simply sign in with</Text>
                        <TouchableOpacity onPress={() => setsShowSocialButtons(true)}
                                          style={{marginTop: 5, marginBottom: 8}}>
                            <Text style={{
                                ...styles.inputHelpText,
                                textDecorationLine: 'underline',
                                margin: 0,
                                fontWeight: 'bold',
                            }}>Google or Facebook.</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1}}/>
                </View>
            </SafeAreaView>
            <Modal isVisible={showModal}>
                <View style={{flexBasis: '40%', backgroundColor: 'white', borderRadius: 10}}>
                    <View style={{margin: 20, justifyContent: 'space-between', height: '90%'}}>
                        <View>
                            <Image source={Images.headerLight} style={{alignSelf: 'center'}}/>
                        </View>
                        <View>
                            {showModalActivityIndicator && !loginErrorCode ?
                                <ActivityIndicator size="large" color={theme.primary}/> : null}
                            <Text style={styles.modalBodyText}>{modalText}</Text>
                            {SHOW_ERROR_CODE ?
                                <Text style={[styles.modalBodyText, {color: 'red', fontSize: 12 }]}>{loginErrorCode}</Text> : null}

                        </View>
                        <View>
                            {loginErrorCode ?
                                <FullButton onPress={tryAgain} text="OK" fullWidth/> : null}
                        </View>
                    </View>
                </View>
            </Modal>
        </KeyboardAvoidingView>

    );

};

export default LoginScreen;

