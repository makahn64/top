/*********************************

 File:       SocialSignIn.js
 Function:   Pack -o- Buttons
 Copyright:  AppDelegates LLC
 Date:       2019-12-09
 Author:     mkahn

 **********************************/

import React from 'react';
import {View} from 'react-native';
import {SocialIcon} from 'react-native-elements';
import XLogger from '../../../Services/XLogger';
import {useLogin} from '../../../Redux/State/AuthRedux';
import PropTypes from 'prop-types';

const SocialSignIn = props => {

    const { loginWithGoogle, loginWithFacebook } = useLogin();
    const { onLoginAttempt } = props;

    const signInWithGoogle = async () => {
        XLogger.log('Sign in with Google pressed');
        onLoginAttempt('google');
        setTimeout(loginWithGoogle, 1000);
    };

    const signInWithFacebook = () => {
        XLogger.log('Sign in with Facebook pressed');
        onLoginAttempt('facebook');
        setTimeout(loginWithFacebook, 1000);
    };

    return (
        <View {...props}>
            <SocialIcon
                button
                raised={false}
                type="google"
                title={'Sign In With Google'.toUpperCase()}
                onPress={signInWithGoogle}
                style={{width: '90%', alignSelf: 'center', borderRadius: 10}}
            />
            <SocialIcon
                button
                raised={false}
                type="facebook"
                title={'Sign In With Facebook'.toUpperCase()}
                onPress={signInWithFacebook}
                style={{width: '90%', alignSelf: 'center', borderRadius: 10}}
            />
        </View>
    );
};

SocialSignIn.propTypes = {
    onLoginAttempt: PropTypes.func
};

SocialSignIn.defaultProps = {
    onLoginAttempt: ()=>{}
};

export default SocialSignIn;
