/*********************************

 File:       authentication.js
 Function:   Firebase Auth Functions
 Copyright:  Bertco LLC
 Date:       2020-05-22
 Author:     mkahn

 **********************************/

import {firebase} from '@react-native-firebase/auth';
import {makePossessive, splitDisplayName} from '../Helpers';
import AsyncStorage from '@react-native-community/async-storage';
import XLogger from '../XLogger';
import {FirebaseAuthError} from './customFirebaseErrors';
import * as GoogleSignin from '@react-native-community/google-signin';


const signInWithEmailPassword = async (email, password) => {
    XLogger.log('firebaseAuth[service]/signInWithEmailAndPassword');
    try {
        const firebaseUserCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        return (firebaseUserCredential && firebaseUserCredential.user) ? firebaseUserCredential.user : null;
    } catch (e) {
        throw new FirebaseAuthError(e);
    }
};

const signInWithGoogle = async () => {
    XLogger.log(`firebaseAuth[service]/signInWithGoogle`);
    GoogleSignin.configure({
        scopes: ['profile'],
        webClientId: '421726478990-6vf08pnu49lue5dj4etevfn03k4u9riv.apps.googleusercontent.com',
    });
    const {accessToken, idToken} = await GoogleSignin.signIn();
    const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
    const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
    return (firebaseUserCredential && firebaseUserCredential.user) ? firebaseUserCredential.user : null;
};

const createFirebaseAuthAccountByEmailPassword = async (email, password, displayName) => {
    // hack fixup for races (see above)
    const authAccount = await firebase.auth().createUserWithEmailAndPassword(email, password);
    XLogger.logDebug(`createFirebaseAuthAccountByEmailPassword setting display name to ${displayName}`);
    await authAccount.user.updateProfile({displayName: displayName});
    //todo This isn't working right, so sledgehammer time
    await AsyncStorage.setItem('displayName', displayName);
    XLogger.logDebug(`displayName should be set, let's check.`);
    const dn = firebase.auth().currentUser.displayName;
    XLogger.logDebug(`from the auth object: ${dn}`);
    return authAccount;
};

const requestNewPassword = async email => firebase.auth().sendPasswordResetEmail(email);

export const useFirebaseAuth = () => {
    //XLogger.logDebug(`useFirebaseAuth`)
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
        const {email, displayName, photoURL: photoUrl, uid} = currentUser;
        const {firstName, lastName} = splitDisplayName(displayName);
        const possessiveFirstName = makePossessive(firstName);
        const providerName = currentUser.providerData && currentUser.providerData[0] && currentUser.providerData[0].providerId || 'The Lotus Method';
        return {
            currentUser,
            email,
            displayName,
            photoUrl,
            firstName,
            lastName,
            possessiveFirstName,
            providerName,
            isLoggedIn: true,
            uid,
        };
    } else {
        return {isLoggedIn: false};
    }
};

export default {
    signInWithEmailPassword,
    signInWithGoogle,
    createFirebaseAuthAccountByEmailPassword,
    requestNewPassword
}
