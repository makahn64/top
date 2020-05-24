/*********************************

 File:       AuthFlowModal.js
 Function:   Modal Shared by Login and Account Create
 Copyright:  AppDelegates LLC
 Date:       2020-03-09
 Author:     mkahn

 **********************************/

import React from 'react';
import {ActivityIndicator, Image, Text, View} from 'react-native';
import Images from '../../../Themes/Images';
import FullButton from '../../../Components/Buttons/FullButton';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import {useStyles} from '../../../Themes/ThemeManager';

const SHOW_ERROR_CODE = __DEV__ && true; // for debug only

const CREATE_ACCOUNT_ERR_MSG = 'We couldn\'t find an account for that email address. Perhaps you\'d like to create an account?';
const BAD_LOGIN_ERR_MSG = 'That seems to be the wrong password.';


const AuthFlowModal = props => {

    const {showModal, loginErrorCode, onPress, initialMessage} = props;
    const {appStyles: styles, theme} = useStyles();

    let modalText = initialMessage;

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

            case 'auth/email-already-in-use':
            case 'auth/account-exists-with-different-credential':
                modalText = 'Hmmm, looks like you may have logged in a different way in the past. Please try one of the other methods.';
                break;

            default:
                modalText = `Unknown code ${loginErrorCode}`;
        }
    }

    return (
        <Modal isVisible={showModal}>
            <View style={{flexBasis: '40%', backgroundColor: 'white', borderRadius: 10}}>
                <View style={{margin: 20, justifyContent: 'space-between', height: '90%'}}>
                    <View>
                        <Image source={Images.headerLight} style={{alignSelf: 'center'}}/>
                    </View>
                    <View>
                        {!loginErrorCode ?
                            <ActivityIndicator size="large" color={theme.primary}/> : null}
                        <Text style={styles.modalBodyText}>{modalText}</Text>
                        {SHOW_ERROR_CODE ?
                            <Text style={[styles.modalBodyText, {
                                color: 'red',
                                fontSize: 12,
                            }]}>{loginErrorCode}</Text> : null}
                    </View>
                    <View>
                        {loginErrorCode ?
                            <FullButton onPress={onPress} text="OK" fullWidth/> : null}
                    </View>
                </View>
            </View>
        </Modal>
    );
};

AuthFlowModal.propTypes = {
    showModal: PropTypes.bool,
    loginErrorCode: PropTypes.string,
    onPress: PropTypes.func,
    initialMessage: PropTypes.string
};

AuthFlowModal.defaultProps = {
    onPress: () => {
    },
};

export default AuthFlowModal;

