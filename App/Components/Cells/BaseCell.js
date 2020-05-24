/*********************************

 File:       BaseCell.js
 Function:   Base of all cells
 Copyright:  Bertco LLC
 Date:       2020-05-23
 Author:     mkahn

 **********************************/

import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import { useStyles } from '../../Themes/ThemeManager';

const BaseCell = props => {
    const { onPress } = props;
    const { cellStyles: styles } = useStyles();

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.baseCell}>
                {props.children}
            </View>
        </TouchableOpacity>
    );
};

BaseCell.propTypes = {
    onPress: PropTypes.func,
};

export default BaseCell;
