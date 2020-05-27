/*********************************

 File:       UserAvatar.js
 Function:   Home brewed version of the broken NPM
 Copyright:  Bertco LLC
 Date:       2020-05-27
 Author:     mkahn



 **********************************/

import React from 'react';
import {View, Text, Image} from 'react-native';
import PropTypes from 'prop-types';
import {useTheme} from '../../Themes/ThemeManager';

const BASE_SIZE = 100;

const UserAvatar = props => {

    const { photoURL, displayName} = props;
    const { theme } = useTheme();

    if (photoURL){
        return (
            <Image
                source={{ uri: photoURL }}
                style={{width: BASE_SIZE, height: BASE_SIZE, borderRadius: BASE_SIZE/ 2}}
            />
        );
    }

    const initials = displayName.split(' ').map(word=>word[0]).join('');

    return (
        <View style={{borderRadius: BASE_SIZE/2, backgroundColor: theme.primary, padding: BASE_SIZE/4, width: BASE_SIZE, height: BASE_SIZE, justifyContent: 'center'}}>
            <Text style={{color: 'white', alignSelf: 'center', fontSize: 30, fontWeight: 'bold'}}>{initials}</Text>
        </View>
    );
};

UserAvatar.propTypes = {
    displayName: PropTypes.string,
    photoURL: PropTypes.string
};

export default UserAvatar;


