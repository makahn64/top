/*********************************

 File:       AuthContext.js
 Function:   Propagates Auth to all components
 Copyright:  Bertco LLC
 Date:       2020-05-24
 Author:     mkahn



 **********************************/

import React from 'react';

export const INITIAL_STATE = { firebaseCreds: null, isLoggedIn: false};

const AuthContext = React.createContext(INITIAL_STATE);

export default AuthContext;
