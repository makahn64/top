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
import WrappedCheckbox from '../../Components/Inputs/WrappedCheckbox';
import _ from 'lodash';
import TLMFirebase from '../../Services/Firebase';
import {useLogin} from '../../Redux/State/AuthRedux';
import {useNavigation} from '@react-navigation/native';
import XLogger from '../../Services/XLogger';
import {useStyles} from '../../Themes/ThemeManager';
import AuthFlowModal from './Components/AuthFlowModal';

const FNAMES = ['Alyson', 'Bambi', 'Cheri', 'Dani', 'Eunice', 'Franny', 'Gigi', 'Hildie', 'Imogine', 'Jill', 'Krissy', 'Latoya', 'Mimi', 'Nona', 'Olivia', 'Penny', 'Qunice', 'Rachel'];
const LNAMES = ['McTest', 'Testen', 'Testenberg', 'O\'Testy', 'Testenbaum', 'Testin', 'MacTestor', 'Nothinbuttest', 'Testime', 'Devhead', 'Codeman', 'Debuggance'];
const DOMAINS = ['test', 'testallday', 'testallnight', 'teststuff'];
const EXT = ['.com', '.co', '.org', '.biz'];

// Save me typing when testing this screeen
const PREPOP_FOR_DEV = true && __DEV__;
const INITIAL_FNAME = PREPOP_FOR_DEV ? _.sample(FNAMES) : '';
const INITIAL_LNAME = PREPOP_FOR_DEV ? _.sample(LNAMES) : '';
const INITIAL_EMAIL = PREPOP_FOR_DEV ? `${INITIAL_FNAME}.${INITIAL_LNAME}@${_.sample(DOMAINS)}${_.sample(EXT)}` : '';
const INITIAL_PASSWORD = PREPOP_FOR_DEV ? 'pa$$word1234' : '';

const SignupNameEmailScreen = props => {

    const {clearLoginError, createEmailPwdAccount, loginErrorCode} = useLogin();
    const navigation = useNavigation();
    const {appStyles: styles, theme} = useStyles();

    const [hasAcked, setHasAcked] = useState(__DEV__);
    const [email, setEmail] = useState(INITIAL_EMAIL);
    const [password, setPassword] = useState(INITIAL_PASSWORD);
    const [firstName, setFirstName] = useState(INITIAL_FNAME);
    const [lastName, setLastName] = useState(INITIAL_LNAME);
    const [showModal, setShowModal] = useState(false);

    const makeAccount = async () => {
        setShowModal(true);
        setTimeout(()=>{
            createEmailPwdAccount(email, password, `${firstName} ${lastName}`);
        }, 1500);
    };

    const goToLogin = () => {
        XLogger.log('User requested login instead');
        setShowModal(false);
        clearLoginError(); // clear it before hopping over or you get another Alert
        navigation.navigate('LoginScreen', {prepopEmail: email});
    };

    const tryAnotherEmail = () => {
        XLogger.log('User requested try again, clearing FB login error');
        setShowModal(false);
        TLMFirebase.anal.setUser(null);
        clearLoginError();
    };

    return (
        <KeyboardAwareScrollView>
            <SafeAreaView style={styles.container}>
                <View style={styles.stack}>
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
                            <WrappedCheckbox checked={hasAcked} onPress={() => setHasAcked(!hasAcked)}>
                                <Text style={styles.tcsText}>By checking the box, you agree to our
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
                            </WrappedCheckbox>
                            <View style={{marginTop: 30}}>
                                <FullButton onPress={makeAccount}
                                            fullWidth
                                            text='Create Account'
                                            disabled={!firstName || !lastName || !validateEmail(email) || password.length < 8 || !hasAcked}/>
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
