/*********************************

 File:       TransparentButton.js
 Function:
 Copyright:  Bertco LLC
 Date:       2020-05-24
 Author:     mkahn

 **********************************/

import React from 'react';
import {TouchableOpacity, Text, View, ViewPropTypes} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import {useStyles} from '../../Themes/ThemeManager';
import Metrics from '../../Themes/Metrics';

const TransparentButton = props => {

    const {disabled, icon, text, onPress, outline, style, linear, fullWidth} = props;
    const {theme, appStyles: styles} = useStyles();

    const TouchableComponent = disabled ? View : TouchableOpacity;
    const disabledStyles = disabled ? {borderColor: theme.ultramuted} : { borderColor: theme.faintBrand};

    // Size only
    const linearStyles = linear ? {flex: 1} : null;
    const subButtonStyles = fullWidth ? { marginHorizontal: Metrics.marginHorizontal, width: '100%'} : null;

    return (
        <TouchableComponent style={[styles.button, { backgroundColor: 'transparent', borderWidth: 2, padding: 5, marginRight: 0 }, disabledStyles, style, linearStyles, subButtonStyles]}
                            onPress={onPress}>
            <Text style={{...styles.buttonText, color: theme.ultramuted }}>{text && text.toUpperCase()}</Text>
            {icon ? (
                <Icon
                    color={outline ? theme.secondary : theme.inverted}
                    name={icon}
                    size={18}
                    style={styles.icon}/>
            ) : null}
        </TouchableComponent>
    );
};

TransparentButton.propTypes = {
    disabled: PropTypes.bool,
    icon: PropTypes.string,
    text: PropTypes.string,
    onPress: PropTypes.func,
    // for side-by-side buttons
    linear: PropTypes.bool,
    // Used in Profile screen drawers
    fullWidth: PropTypes.bool
};

export default TransparentButton;
