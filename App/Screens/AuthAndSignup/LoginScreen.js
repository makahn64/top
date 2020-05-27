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
    KeyboardAvoidingView, Image, ActivityIndicator,
} from 'react-native';
import {Button} from 'react-native-elements';
import {validateEmail} from '../../Services/Helpers';
import {useNavigation} from '@react-navigation/native';
import {useStyles} from '../../Themes/ThemeManager';
import XLogger from '../../Services/XLogger';
import Modal from 'react-native-modal';
import Images from '../../Themes/Images';
import Authentication from '../../Services/Firebase/authentication';
import {SocialIcon} from 'react-native-elements';
import FullButton from '../../Components/Buttons/FullButton';

const SHOW_ERROR_CODE = __DEV__ && true; // for debug only

const CREATE_ACCOUNT_ERR_MSG = 'We couldn\'t find an account for that email address. Perhaps you\'d like to create an account?';
const BAD_LOGIN_ERR_MSG = 'That seems to be the wrong password.';

const LoginScreen = props => {

    const navigation = useNavigation();
    const {appStyles: styles, theme, Metrics} = useStyles();
    const [ loginErrorCode, setLoginErrorCode ] = useState(null);
    const [email, setEmail] = useState();
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

    const exit = () => {
        navigation.popToTop();
        navigation.navigate('MAINTABS', { screen: 'POSTS'});
    }

    const signInWithEmailPassword = async () => {
        XLogger.log('Sign in with Username/password pressed');
        showLoginModal();

        try {
            await Authentication.signInWithEmailPassword(email, pwd);
            exit();
        } catch (e) {
            XLogger.warn(e.message);
            setLoginErrorCode(e.code);
        }
    };

    const signInWithGoogle = async () => {
        XLogger.log('Sign in with Google pressed');
        try {
            await Authentication.signInWithGoogle();
            exit();
        } catch (e) {
            XLogger.warn(e.message);
            setLoginErrorCode(e.code);
        }
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
        setLoginErrorCode(null);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            style={{flex: 1}}
            enabled>
            <SafeAreaView style={styles.container}>
                <View style={styles.stack}>
                    <Text style={styles.titleText}>Please Sign In to Your Account</Text>
                    {showSocialButtons ?
                        <SocialIcon
                            button
                            raised={false}
                            type="google"
                            title={'Sign In With Google'.toUpperCase()}
                            onPress={signInWithGoogle}
                            style={{width: '90%', alignSelf: 'center', borderRadius: 10}}
                        /> : null}
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
                                style={{...styles.fullWidthTextInput, marginTop: 20, }}
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
                                style={[styles.fullWidthTextInput, {marginTop: 20, marginBottom: 30}]}
                                textContentType="emailAddress"
                                editable={true}
                                value={pwd}/>
                            <Button disabled={!validateEmail(email) || pwd.length < 8}
                                        onPress={signInWithEmailPassword}
                                        title="Sign In"
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
                            }}>Google.</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1}}/>
                </View>
            </SafeAreaView>
            <Modal isVisible={showModal}>
                <View style={{flexBasis: '60%', backgroundColor: 'white', borderRadius: 10}}>
                    <View style={{margin: 20, justifyContent: 'space-around', height: '90%'}}>
                        <View>
                            <Image source={Images.logoblue} style={{alignSelf: 'center', width: '80%', height: 100}} resizeMode={'contain'}/>
                        </View>
                        <View>
                            {showModalActivityIndicator && !loginErrorCode ?
                                <ActivityIndicator size="large" color={theme.primary}/> : null}
                            <Text style={styles.modalBodyText}>{modalText}</Text>
                            {SHOW_ERROR_CODE ?
                                <Text style={[styles.modalBodyText, {color: 'red', fontSize: 12, opacity: 0.5 }]}>{loginErrorCode}</Text> : null}

                        </View>
                        <View>
                            {loginErrorCode ?
                                <Button onPress={tryAgain} text="OK"/> : null}
                        </View>
                    </View>
                </View>
            </Modal>
        </KeyboardAvoidingView>

    );

};

export default LoginScreen;

