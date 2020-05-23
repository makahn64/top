/*********************************

 File:       CreateStore.js
 Function:   Creates Store for the Current dev/prod mode
 Copyright:  AppDelegates LLC
 Date:       2020-03-05
 Author:     mkahn



 **********************************/

import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import configureReactotron from '../Config/ReactotronConfig';
import Reactotron from 'reactotron-react-native';


// TODO: DRY this out. There was an issue with production mode on a device and Reactotron being undefined...

export const createProductionStore = (rootReducer, rootSaga) => {

    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(rootReducer, {}, applyMiddleware(sagaMiddleware));

    // kick off root saga
    let sagasManager = sagaMiddleware.run(rootSaga);

    return {
        store,
        sagasManager,
        sagaMiddleware,
    };

};

export const createDebugStore = (rootReducer, rootSaga) => {
    /* ------------- Redux Configuration ------------- */

    const reactotron = configureReactotron({isDev: true});
    const sagaMonitor = reactotron.createSagaMonitor();
    const sagaMiddleware = createSagaMiddleware({sagaMonitor});
    //const reduxMiddleware = console.tron.createEnhancer();
    const reduxMiddleware = Reactotron.createEnhancer();

    const store = createStore(rootReducer, {},
        compose(reduxMiddleware, applyMiddleware(sagaMiddleware)));

    // kick off root saga
    let sagasManager = sagaMiddleware.run(rootSaga);

    return {
        store,
        sagasManager,
        sagaMiddleware,
    };
};
