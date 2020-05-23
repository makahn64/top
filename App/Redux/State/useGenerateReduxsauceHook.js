/*********************************

 File:       useGenerateReduxsauceHook.js
 Function:   Helper to make quick hooks for a ReduxSauce file
 Copyright:  AppDelegates LLC
 Date:       2020-03-06
 Author:     mkahn

 This function generates a hook that returns all the action creators mapped to the root object and all the root state
 mapped to the root object. And that probably makes no sense...so.

 Imagine you have a Reduxsauce file with a bit of code like:

 const {Types, Creators} = createActions({
        setThemeMode: ['themeMode'],
        toggleThemeMode: null,
        }, {
        prefix: 'THEME/',
    });

 And a state shape like:

 export const INITIAL_STATE = Immutable({
        themeMode: 'light'
    });

 Usually, this hook is called from the Reduxsauce file (I put it at the bottom) like so:

 const baseHook = useGeneratedReduxsauceHook( rootKey, Creators);

 `rootKey` is the root in the full state object like 'profile' or 'auth'.

 `baseHook` now looks like: { setThemeMode: fn(), toggleThemeMode: fn(), themeMode };

 For some Reduxsauce hook files, this can be enough. Others may want to merge this with other selectors/dispatches, etc.

 **********************************/

import {useDispatch, useSelector} from 'react-redux';

const useGenerateReduxsauceHook = (rootKey, creators) => {
    const dispatch = useDispatch();
    const dispatchedActions = {};
    // the fancy ...args maps multi-arg calls correctly
    for (const action in creators) {
        dispatchedActions[action] = (...args) => dispatch(creators[action](...args));
    }
    const selectedState = useSelector(state => state[rootKey]);
    return {...dispatchedActions, ...selectedState};
};

export default useGenerateReduxsauceHook;
