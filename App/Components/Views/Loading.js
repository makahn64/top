/*********************************

 File:       Loading.js
 Function:   Full screen temp loader
 Copyright:  Bertco LLC
 Date:       2020-05-26
 Author:     mkahn

 **********************************/

import React from 'react';
import {View, ActivityIndicator, Text} from 'react-native';
import PropTypes from 'prop-types';
import {useStyles} from '../../Themes/ThemeManager';

const Loading = props => {

    const {appStyles: styles} = useStyles();
    const {message} = props;

    return (
        <View style={[styles.container, {justifyContent: 'space-around'}]}>
            <View>
                <ActivityIndicator size="large"/>
                {message ? <Text style={styles.titleText}>{message}</Text> : null}
            </View>
        </View>
    );
};

Loading.propTypes = {
    message: PropTypes.string,
};

export default Loading;


