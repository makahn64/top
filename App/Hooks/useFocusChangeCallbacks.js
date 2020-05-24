/*********************************

 File:       useFocusChangeCallbacks.jseCallbacks.js
 Function:   Monitors focused and blurred state
 Copyright:  Bertco
 Date:       2020-05-23
 Author:     mkahn

 **********************************/

import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

const useFocusChangeCallbacks = ({initialState = false, onFocus, onBlur}) => {

    const navigation = useNavigation();
    const [focused, setFocused] = useState(initialState);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setFocused(true);
            if (onFocus) {
                onFocus();
            }
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            setFocused(false);
            if (onBlur) {
                onBlur();
            }
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    return focused;

};

export default useFocusChangeCallbacks;
