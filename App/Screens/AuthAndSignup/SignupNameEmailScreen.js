import React, {useState} from 'react';
import {
    Linking,
    Text,
    View, Alert, SafeAreaView,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FullButton from '../../Components/Buttons/FullButton';
import {validateEmail} from '../../Services/Helpers';
import InputNameEmail from './Components/InputNameEmail';
import TLMFirebase from '../../Services/Firebase';
import {useNavigation} from '@react-navigation/native';
import XLogger from '../../Services/XLogger';
import {useStyles} from '../../Themes/ThemeManager';
import AuthFlowModal from './Components/AuthFlowModal';
import Authentication from '../../Services/Firebase/authentication';


const SignupNameEmailScreen = props => {

    const navigation = useNavigation();
    const {appStyles: styles} = useStyles();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [ loginErrorCode, setLoginErrorCode ] = useState(null);

    const makeAccount = async () => {
        setShowModal(true);
        XLogger.log('Create Username/password pressed');

        try {
            await Authentication.createFirebaseAuthAccountByEmailPassword(email, password, `${firstName} ${lastName}`);
            setShowModal(false);
            navigation.popToTop();
            navigation.navigate('MAINTABS');
        } catch (e) {
            XLogger.warn(e.message);
            setLoginErrorCode(e.code);
        }
    };

    const goToLogin = () => {
        XLogger.log('User requested login instead');
        setShowModal(false);
        navigation.navigate('LoginScreen');
    };

    const tryAnotherEmail = () => {
        XLogger.log('User requested try again, clearing FB login error');
        setShowModal(false);
    };

    return (
        <KeyboardAwareScrollView>
            <SafeAreaView style={styles.container}>
                <View style={styles.insetContainer}>
                    <Text style={styles.titleText}>Create Email/Password Account</Text>
                    {/*<View style={{flex: 4, marginTop: 10}}>*/}
                        <View>
                            <InputNameEmail email={email}
                                            setEmail={setEmail}
                                            firstName={firstName}
                                            setFirstName={setFirstName}
                                            lastName={lastName}
                                            setLastName={setLastName}
                                            password={password}
                                            setPassword={setPassword}
                            />
                            <View style={{marginTop: 30}}>
                                <FullButton onPress={makeAccount}
                                            fullWidth
                                            text="Create Account"
                                            disabled={!firstName || !lastName || !validateEmail(email) || password.length < 8 }/>
                            </View>
                        </View>
                    {/*</View>*/}

                </View>
            </SafeAreaView>
            <AuthFlowModal loginErrorCode={loginErrorCode}
                           initialMessage={'Creating Account'}
                           onPress={() => setShowModal(false)}
                           showModal={showModal}/>
        </KeyboardAwareScrollView>
    );
};

export default SignupNameEmailScreen;
