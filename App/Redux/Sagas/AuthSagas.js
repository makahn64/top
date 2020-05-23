/*********************************

 File:       AuthSagas.js
 Function:   Authentication Flow Sagas
 Copyright:  Bertco LLC
 Date:       2020-05-22
 Author:     mkahn

 **********************************/

import XLogger from '../../Services/XLogger';
import {call, put, putResolve} from 'redux-saga/effects';
import AuthActions from '../State/AuthRedux';
import Firebase from '../../Services/Firebase';

const MODULE_NAME = 'AuthSagas';

export function* signInEmailPwdSaga({type, email, password}) {
    try {
        XLogger.log(`${MODULE_NAME}/signInEmailPwd for ${email}`);
        const user = yield call(Firebase.auth.signInWithEmailPassword, email, password);
        XLogger.logDebug(`${MODULE_NAME}User logged in.`);
        yield putResolve(AuthActions.firebaseLoginSuccess(user));
    } catch (error) {
        XLogger.warn(`${MODULE_NAME}/signInViaGoogleSaga well shit: ${error.code}`);
        yield putResolve(AuthActions.firebaseLoginError(error));
    }
}

export function* signInViaGoogleSaga() {
    XLogger.log(`${MODULE_NAME}/signInViaGoogleSaga`);
    try {
        const user = yield call(Firebase.auth.signInWithGoogle);
        XLogger.logDebug(`${MODULE_NAME}User logged in.`);
        yield putResolve(AuthActions.firebaseLoginSuccess(user));
    } catch (error) {
        XLogger.warn(`${MODULE_NAME}/signInViaGoogleSaga well shit: ${error.code}`);
        yield putResolve(AuthActions.firebaseLoginError(error));
    }
}


/**
 * Creates a FirebaseAuth account by Email/Password
 * @param email
 * @param password
 * @param displayName
 * @returns {IterableIterator<*>}
 */
export function* createFirebaseAuthAccountByEmailSaga({email, password, displayName}) {
    XLogger.log(`${MODULE_NAME}/createFirebaseAuthAccountByEmailSaga`);
    try {
        const user = yield call(Firebase.auth.createFirebaseAuthAccountByEmailPassword, email, password, displayName);
        XLogger.logDebug(`${MODULE_NAME}User logged in.`);
    } catch (error) {
        XLogger.warn(`${MODULE_NAME}/createFirebaseAuthAccountByEmailSaga well shit: ${error.code}`);
        yield putResolve(AuthActions.firebaseLoginError(error));
    }
}


export function* logOutOfFirebase({options}) {
    XLogger.log(`${MODULE_NAME}/logOutOfFirebase`);
    try {
        // hang up on account
        //yield call(Firebase.db.detachAccountListener);
        yield call(Firebase.auth.signOut);
        yield put(AuthActions.firebaseLogoutComplete());
        yield put({ type: 'RESET_APP'});
    } catch (err) {
        yield put(AuthActions.firebaseLogoutError(err));
    }
}
