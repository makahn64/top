/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootContainer from './App/Screens/RootContainer';
import {Provider} from 'react-redux';
import store from './App/Redux';
import {Root} from 'native-base';

const App: () => React$Node = () => {

    return (
        <Root>
            <Provider store={store}>
                <SafeAreaProvider>
                    {/*<StatusBar barStyle="dark-content"/>*/}
                    <RootContainer/>
                </SafeAreaProvider>
            </Provider>
        </Root>
    );
};


export default App;
