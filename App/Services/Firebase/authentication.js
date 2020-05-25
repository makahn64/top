/*********************************

 File:       authentication.js
 Function:   Firebase Auth Functions
 Copyright:  Bertco LLC
 Date:       2020-05-22
 Author:     mkahn

 **********************************/

import auth from '@react-native-firebase/auth';
import XLogger from '../XLogger';
import {FirebaseAuthError} from './customFirebaseErrors';
import { GoogleSignin } from '@react-native-community/google-signin';


const signInWithEmailPassword = async (email, password) => {
    XLogger.log('firebaseAuth[service]/signInWithEmailAndPassword');
    try {
        const firebaseUserCredential = await auth().signInWithEmailAndPassword(email, password);
        return firebaseUserCredential && firebaseUserCredential.user;
    } catch (e) {
        throw new FirebaseAuthError(e);
    }
};

const signInWithGoogle = async () => {
    XLogger.log('firebaseAuth[service]/signInWithGoogle');
    GoogleSignin.configure({
        scopes: ['profile'],
        webClientId: '207873848038-0ofijq19677sda4rqfqmb00qnvt8nj62.apps.googleusercontent.com',
    });
    const { idToken } = await GoogleSignin.signIn();
    const credential = auth.GoogleAuthProvider.credential(idToken);
    const firebaseUserCredential = await auth().signInWithCredential(credential);
    return firebaseUserCredential && firebaseUserCredential.user;
};

const createFirebaseAuthAccountByEmailPassword = async (email, password, displayName) => {
    const authAccount = await auth().createUserWithEmailAndPassword(email, password);
    XLogger.logDebug(`createFirebaseAuthAccountByEmailPassword setting display name to ${displayName}`);
    await authAccount.user.updateProfile({displayName: displayName});
    return authAccount;
};

const requestNewPassword = async email => auth().sendPasswordResetEmail(email);

export default {
    signInWithEmailPassword,
    signInWithGoogle,
    createFirebaseAuthAccountByEmailPassword,
    requestNewPassword,
}
