/*********************************

 File:       DevSagas.js
 Function:   For dev testing
 Copyright:  Bertco LLC
 Date:       2020-05-22
 Author:     mkahn

 **********************************/

import XLogger from '../../Services/XLogger';
import Firebase from '../../Services/Firebase';
import {logOutOfFirebase} from './AuthSagas';

export function* devDestroyCurrentUser() {
    XLogger.logDebug('devDestroyCurrentUser: Heck yeah!');
    const {email} = yield Firebase.auth.getCurrentUser();
    if (!email) {
        throw Error('Not logged in, what the account should I delete?');
    }
    yield logOutOfFirebase({options: 'none'}); // keep it from crashing because the normal call has options
    //yield TLMFirebase.db.deleteAccount(email);
}
