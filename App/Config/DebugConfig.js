import XLogger from '../Services/XLogger';

XLogger.setLogLevel(__DEV__ ? 'silly' : 'warn');

export default {
    useFixtures: false,
    ezLogin: false,
    yellowBox: __DEV__,
    useReactotron: false,
    useMocks: false,
};
