/*********************************

 File:       reactolog.js
 Function:   Does Reactotron logging
 Copyright:  Bertco LLC
 Date:       2020-02-14
 Author:     mkahn

 **********************************/

import Reactotron from 'reactotron-react-native';

export default {
    log: message => Reactotron.log(message),
    logImportant: message => Reactotron.logImportant(message),
    display: object => Reactotron.display(object),
};

// // TODO: Stubbed out for now
// export default {
//     log: message => {},
//     logImportant: message => {},
//     display: object =>{},
// };
