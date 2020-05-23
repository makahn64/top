import {combineReducers} from 'redux';
import {createDebugStore, createProductionStore} from './CreateStore';
import rootSaga from './Sagas/';
import DebugConfig from '../Config/DebugConfig';
import XLogger from '../Services/XLogger';

/* ------------- Assemble The Reducers ------------- */
export const reducerMap = {
    auth: require('./State/AuthRedux').reducer,
    ui: require('./State/UIRedux').reducer,
};

export const reducers = combineReducers(reducerMap);

export const resettableReducer = (state, action) => {
    if (action.type === 'RESET_APP') {
        // zero out state. This forces each reducer to sub in the default state if the reducer is written using the
        // usual pattern with a default state. See: https://alligator.io/redux/reset-state-redux/
        state = undefined;
    }
    return reducers(state, action);
};

function createStore() {

    XLogger.logDebug(`index/createStore...`);
    const createProperStore = __DEV__ ? createDebugStore : createProductionStore;
    let {store, sagasManager, sagaMiddleware} = createProperStore(resettableReducer, rootSaga);

    // FIXME: this is just broken https://www.nativescript.org/blog/deep-dive-into-hot-module-replacement-with-webpack-part-two-handling-updates
    // See WN-26
    // I think the accept(()=>) syntax applies to only modules imported by this module. Changes to ui pages are not affected.
    if (module.hot) {
        module.hot.accept(() => {
            console.error(`Hot redux reload not supported right now. Do a full reload instead cmd-R.`);

            // const nextRootReducer = require('./').reducers;
            // store.replaceReducer(nextRootReducer);
            //
            // const newYieldedSagas = require('../Sagas').default;
            // //console.log(`in hot patch`);
            // sagasManager.cancel();
            // sagasManager = sagaMiddleware.run(function*(){
            //     yield console.log('Eat a bag of shit');
            // });
            // while (sagasManager.status!=='DONE'){
            //     console.log(`Status: ${sagasManager.status}`);
            // }
            // sagasManager.toPromise().then(() => {
            //
            // });
        });
    }

    return store;
}

// create our store
const store = createStore();
export default store;

//helpers

const dispatch = msg => store.dispatch(msg);
export {dispatch};

