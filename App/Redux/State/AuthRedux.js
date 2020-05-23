/*********************************

 File:       AuthRedux.js
 Function:   Authentication Redux
 Copyright:  Bertco LLC
 Date:       2020-05-22
 Author:     mkahn

 **********************************/

import {createReducer, createActions} from 'reduxsauce';
import {splitDisplayName, makePossessive} from '../../Services/Helpers';
import {useDispatch, useSelector} from 'react-redux';
import XLogger from '../../Services/XLogger';
import _ from 'lodash';

export const rootKey = 'auth';

const {Types, Creators} = createActions({
    firebaseSigninEmailPwd: ['email', 'password'],
    firebaseCreateEmailPwdAccount: ['email', 'password', 'displayName'],
    firebaseSigninGoogle: null,
    firebaseLogoutRequested: null,
    firebaseLoginSuccess: ['creds'],
    firebaseLoginError: ['error'],
    firebaseLogoutComplete: null,
    clearSignInError: null,
}, {
    prefix: 'Auth/',
});

export const AuthActionTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
    firebaseCreds: null,
    firebaseLoginError: null,
};

/* ------------- Selectors ------------- */
export const AuthSelectors = {
    selectFirebaseCreds: state => state.firebaseCreds || null,
    selectFirebaseUid: state => state.firebaseCreds && state.firebaseCreds.uid || null,
    selectLoginError: state => state.firebaseLoginError,
    selectIsLoggedIn: state => !!state.firebaseCreds,
    selectEmail: state => state.firebaseCreds && state.firebaseCreds.email || null,
    selectFirstName: state => splitDisplayName(AuthSelectors.selectDisplayName(state)).firstName,
    selectLastName: state => splitDisplayName(AuthSelectors.selectDisplayName(state)).lastName,
    selectDisplayName: state => state.firebaseCreds && state.firebaseCreds.displayName || null,
    selectPossessiveFirstName: state => makePossessive(AuthSelectors.selectFirstName(state)),
    selectLoginInfo: state => {
        const email = AuthSelectors.selectEmail(state);
        const provider = state.firebaseCreds && state.firebaseCreds.providerData;
        if (!email || !provider.length) {
            return {email: 'error', providerId: 'error'};
        }
        const providerId = provider[0].providerId;
        let providerString = 'Google';
        if (providerId.includes('password')) {
            providerString = 'email/password';
        } else if (providerId.includes('firebase')) {
            providerString = 'email/password';
        }

        return {email, providerId, providerString};
    },
};

/* ------------- Reducers ------------- */


export const firebaseLoginSuccess = (state, {creds, displayNameDefault}) => {

    // The creds object is complex with lots of extraneous stuff. If you stick it straight in Redux, bad stuff happens.
    return {
        firebaseLoginError: null,
        authResolved: true,
        hasFirebaseAuthAccount: true,
        firebaseCreds: {
            displayName: creds.displayName,
            email: creds.email,
            emailVerified: creds.emailVerified,
            isAnonymous: creds.isAnonymous,
            metadata: creds.metadata,
            phoneNumber: creds.phoneNumber,
            photoURL: creds.photoURL,
            providerData: creds.providerData,
            providerId: creds.providerId,
            uid: creds.uid,
        },
    }
};

// Intentionally not blowing away saved state, just updating error
export const firebaseLoginError = (state, {error}) => {
    XLogger.logSilly('Firebase login error being set in redux');
    XLogger.log(error);
    return {...state, firebaseLoginError: error, firebaseCreds: null};
};

export const firebaseLogoutComplete = state => INITIAL_STATE;

export const clearSigninError = state => {
    XLogger.log('Clearing signin errors in Auth redux');
    return {...state, firebaseLoginError: null};
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.FIREBASE_LOGIN_SUCCESS]: firebaseLoginSuccess,
    [Types.FIREBASE_LOGIN_ERROR]: firebaseLoginError,
    [Types.FIREBASE_LOGOUT_COMPLETE]: firebaseLogoutComplete,
});

export const useAuth = () => {
    const dispatch = useDispatch();
    const updateAuthState = authState => dispatch(Creators.firebaseAuthStateChanged(authState));
    const loginSuccess = (creds, displayNameDefault) => dispatch(Creators.firebaseLoginSuccess(creds, displayNameDefault));
    const loginError = error => dispatch(Creators.firebaseLoginError(error));

    // They have creds and are not anonymous
    const isAuthenticated = !!useSelector(state => state[rootKey].firebaseCreds && !state[rootKey].firebaseCreds.isAnonymous);
    const isAuthorizedByTLM = !!useSelector(state => state[rootKey].isAuthorizedByTLM);
    // dismisses boot screen (may be combined with something on the Firestore side)
    const isAuthResolved = useSelector(state => state[rootKey].authResolved);
    return {updateAuthState, isAuthorizedByTLM, isAuthenticated, loginError, loginSuccess, isAuthResolved};
};

export const useAuthAccountInfo = () => {
    const fullCreds = useSelector(state => state[rootKey].firebaseCreds);
    const email = fullCreds && fullCreds.email;
    const firstName = useSelector(state => AuthSelectors.selectFirstName(state[rootKey]));
    const possessiveFirstName = useSelector(state => AuthSelectors.selectPossessiveFirstName(state[rootKey]));
    const displayName = fullCreds && fullCreds.displayName;
    const photoUrl = fullCreds && fullCreds.photoURL;
    const providerName = fullCreds && fullCreds.providerData && fullCreds.providerData[0] && fullCreds.providerData[0].providerId || 'The Lotus Method';
    return {fullCreds, email, firstName, possessiveFirstName, displayName, photoUrl, providerName};
};


/**
 * Streamlined version of the above
 * @returns {{clearLoginError: *, loginInfo: *, loginError: *, loginErrorCode: *, logoutAndReset: *, loginWithEmailAndPassword: *}}
 */
export const useLogin = () => {
    const dispatch = useDispatch();
    const logout = () => dispatch(Creators.firebaseLogoutRequested());
    const loginInfo = useSelector(state => AuthSelectors.selectLoginInfo(state[rootKey]));
    const loginError = useSelector(state => AuthSelectors.selectLoginError(state[rootKey]));
    const loginWithEmailAndPassword = (email, password) => dispatch(Creators.firebaseSigninEmailPwd(email, password));
    const loginWithGoogle = () => dispatch(Creators.firebaseSigninGoogle());
    const createEmailPwdAccount = (email, password, displayName) => dispatch(Creators.firebaseCreateEmailPwdAccount(email, password, displayName));
    const clearLoginError = () => dispatch(Creators.clearSignInError());
    const loginErrorCode = useSelector(state => {
        const authError = AuthSelectors.selectLoginError(state[rootKey]);
        return _.get(authError, 'code', null);
    });

    return {
        loginWithEmailAndPassword,
        loginWithGoogle,
        clearLoginError,
        logout,
        loginError,
        loginInfo,
        loginErrorCode,
        createEmailPwdAccount,
    };
};



