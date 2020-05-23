/*********************************

 File:       customFirebaseErrors.js
 Function:   Creates a useful error from FBase errors
 Copyright:  Bertco LLC
 Date:       2020-05-22
 Author:     mkahn

 **********************************/


export class FirebaseAuthError extends Error {
    constructor(nativeFirebaseError) {
        super(nativeFirebaseError.message);
        this.name = 'FirebaseAuthError';
        this.code = nativeFirebaseError.code;
        this.userInfo = nativeFirebaseError.userInfo;
    }
};
