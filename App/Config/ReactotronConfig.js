import Reactotron, { networking } from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';
import { displayName as name, variant } from '../../app.json';
import CustomCommands from './ReactotronCustomCommands';
import XLogger from '../Services/XLogger';

// Note: removed fucked up monkey patching bullshit in favor of Xlogger
const configureReactotron = ({ isDev}) => {

    if (isDev) {

        console.log(`In DEV mode, configuring Reactotron`);
        const opts = { name: `${name} / ${variant}` };

        Reactotron
            .configure(opts)
            .useReactNative()
            // removed by MAK, Immutable seems to be more or less abandoned
            .use(reactotronRedux())
            .use(sagaPlugin())
            // the google bit gets rid of the constant firestore pings from Reactotron
            .use(networking({ ignoreContentTypes: /^(image|video)\/.*$/i, ignoreUrls: /\bgoogle\b/ }))
            .connect();

        if (CustomCommands) {
            CustomCommands.forEach(c => Reactotron.onCustomCommand(c));
        }

        // Let's clear Reactotron on every time we load the app
        Reactotron.clear();
        XLogger.setUseReactotron(true);

        return Reactotron;

    } else {

        console.log(`Not in DEV mode, turning off Reactoron logging.`);
        XLogger.setUseReactotron(false);
    }

};

export default configureReactotron;

