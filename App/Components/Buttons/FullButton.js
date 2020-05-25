/*********************************

 File:       FullButton.js
 Function:   Implements a variety of button styles
 Copyright:  Bertco
 Date:       2020-05-24
 Author:     mkahn

 **********************************/


import React from 'react';
import {TouchableOpacity, Text, View, ViewPropTypes} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import {useStyles} from '../../Themes/ThemeManager';
import Metrics from '../../Themes/Metrics';

const FullButton = props => {

    const {disabled, icon, text, onPress, outline, style, linear, fullWidth, danger} = props;
    const {theme, appStyles: styles} = useStyles();

    const TouchableComponent = disabled ? View : TouchableOpacity;
    const disabledStyles = disabled ? {backgroundColor: theme.ultramuted} : null;
    const linearStyles = linear ? {flex: 1, marginLeft: 0, marginRight: Metrics.marginHorizontal} : null;
    const subButtonStyles = fullWidth ? {marginHorizontal: Metrics.marginHorizontal, width: '100%'} : null;
    const dangerStyles = danger ? {backgroundColor: theme.danger} : null;

    return (
        <TouchableComponent style={[outline ? styles.outlineButton : styles.button, disabledStyles,
            style, linearStyles, subButtonStyles, dangerStyles]}
                            onPress={onPress}>
            <Text style={outline ? styles.outlineButtonText : styles.buttonText}>{text && text.toUpperCase()}</Text>
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

FullButton.propTypes = {
    disabled: PropTypes.bool,
    icon: PropTypes.string,
    text: PropTypes.string,
    onPress: PropTypes.func,
    outline: PropTypes.bool,
    style: ViewPropTypes.style,
    // for side-by-side buttons
    linear: PropTypes.bool,
    // Used everywhere
    fullWidth: PropTypes.bool,
    // pink solid (actually, whatever theme.danger is)
    danger: PropTypes.bool,
};

export default FullButton;
