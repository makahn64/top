/*********************************

 File:       InputNameEmail.js
 Function:
 Copyright:  Bertco LLC
 Date:       2020-05-25
 Author:     mkahn

 **********************************/

import React from 'react';
import PropTypes from 'prop-types';
import {
    TextInput,
    View,
} from 'react-native';
import {validateEmail} from '../../../Services/Helpers';
import {useStyles} from '../../../Themes/ThemeManager';

const InputNameEmail = props => {

    const {
        firstName, setFirstName,
        lastName, setLastName,
        email, setEmail,
        password, setPassword,
    } = props;

    const {theme, appStyles: styles} = useStyles();

    const emailError = email && !validateEmail(email);
    const emailInputStyle = [styles.fullWidthTextInput,
        emailError ? styles.errored : null];

    const passwordError = password && password.length < 8;
    const passwordInputStyle = [styles.fullWidthTextInput,
        passwordError ? styles.errored : null];

    return (
        <View style={styles.flex}>
            <TextInput
                autoCapitalize="words"
                autoComplete="name"
                autoCorrect={false}
                autoFocus={false}
                onChangeText={setFirstName}
                placeholder="first name"
                placeholderTextColor={theme.placeholderColor}
                returnKeyLabel="done"
                returnKeyType="done"
                style={styles.fullWidthTextInput}
                textContentType="givenName"
                value={firstName}/>
            <TextInput
                autoCapitalize="words"
                autoComplete="name"
                autoCorrect={false}
                autoFocus={false}
                onChangeText={setLastName}
                placeholder="last name"
                placeholderTextColor={theme.placeholderColor}
                returnKeyLabel="done"
                returnKeyType="done"
                style={styles.fullWidthTextInput}
                textContentType="givenName"
                value={lastName}/>
            <TextInput
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect={false}
                autoFocus={false}
                onChangeText={setEmail}
                placeholder="email"
                placeholderTextColor={theme.placeholderColor}
                returnKeyLabel="done"
                returnKeyType="done"
                style={emailInputStyle}
                textContentType="emailAddress"
                editable={true}
                value={email}/>
            {setPassword ?
                <TextInput
                    autoCapitalize="none"
                    autoComplete={false}
                    autoCorrect={false}
                    autoFocus={false}
                    onChangeText={setPassword}
                    placeholder="password (8+ characters)"
                    placeholderTextColor={theme.placeholderColor}
                    returnKeyLabel="done"
                    returnKeyType="done"
                    style={passwordInputStyle}
                    textContentType="password"
                    secureTextEntry={true}
                    editable={true}
                    value={password}/> : null}
        </View>
    );
};

InputNameEmail.propTypes = {
    email: PropTypes.string,
    setEmail: PropTypes.func,
    firstName: PropTypes.string,
    setFirstName: PropTypes.func,
    lastName: PropTypes.string,
    setLastName: PropTypes.func,
    password: PropTypes.string,
    setPassword: PropTypes.func,
};

export default InputNameEmail;

