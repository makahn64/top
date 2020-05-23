/*********************************

 File:       index.js
 Function:
 Copyright:  Bertco LLC
 Date:       2020-05-22
 Author:     mkahn

 Main saga dispatcher

 **********************************/


import {all, takeEvery} from 'redux-saga/effects';

import {AuthActionTypes} from '../State/AuthRedux';
import {
    signInEmailPwdSaga,
    signInViaGoogleSaga,
    createFirebaseAuthAccountByEmailSaga,
    logOutOfFirebase,
} from './AuthSagas';

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {

    yield all([
            // Client Account sagas
            takeEvery(AuthActionTypes.FIREBASE_LOGOUT_REQUESTED, logOutOfFirebase),
            takeEvery(AuthActionTypes.FIREBASE_CREATE_EMAIL_PWD_ACCOUNT, createFirebaseAuthAccountByEmailSaga),
            takeEvery(AuthActionTypes.FIREBASE_SIGNIN_GOOGLE, signInViaGoogleSaga),
            takeEvery(AuthActionTypes.FIREBASE_SIGNIN_EMAIL_PWD, signInEmailPwdSaga),

            // DEV Sagas
            //takeEvery('DESTROY_CURRENT_USER', devDestroyCurrentUser),

        ],
    );
}
