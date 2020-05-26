/*********************************

 File:       NoPosts.js
 Function:   Shown when there are no posts
 Copyright:  Bertco LLC
 Date:       2020-05-26
 Author:     mkahn



 **********************************/

import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import Metrics from '../../../Themes/Metrics';
import {Button} from 'react-native-elements';
import {useStyles} from '../../../Themes/ThemeManager';

const NoPosts = props => {

    const {appStyles: styles} = useStyles();
    const { byYou } = props;

    const message = byYou ? 'There are no posts by you yet.\n\nClick on the pen icon below to write your first!' :
        'There are no posts in the database. ';

    return (
        <View>
            <Text style={[styles.mutedCenteredText, {marginTop: Metrics.marginVertical * 3}]}>{message}</Text>
            <Button onPress={props.onReload} title={'Reload'}
                    containerStyle={{width: '50%', alignSelf: 'center'}}
                    icon={{
                        name: 'refresh',
                        size: 20,
                        color: 'white',
                    }}/>
        </View>
    );
};

NoPosts.propTypes = {
    onReload: PropTypes.func.isRequired,
    byYou: PropTypes.bool,
};

export default NoPosts;


