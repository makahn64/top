/*********************************

 File:       Implements a switch with label
 Function:
 Copyright:  Bertco LLC
 Date:
 Author:     mkahn



 **********************************/

import React, {useState, useEffect} from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {useStyles, useTheme} from '../../Themes/ThemeManager';

const localStyles = StyleSheet.create({
    switchHolder: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 10,
    },
});

export const SmallSwitch = props => {
    const {onValueChange, value} = props;
    const {theme, isDark} = useTheme();

    return (
        <Switch onValueChange={onValueChange}
                value={value}
                ios_backgroundColor={theme.muted}
                onTintColor={isDark ? theme.secondary : theme.primary}
                style={{transform: [{scaleX: 0.7}, {scaleY: 0.7}]}}/>
    );
};

const SwitchRow = props => {

    const {appStyles: styles, theme} = useStyles();
    const {onValueChange, value, label, containerStyle} = props;

    return (
        <View style={[localStyles.switchHolder, containerStyle]}>
            <Text style={styles.switchLabel}>{label}</Text>
            <SmallSwitch onValueChange={onValueChange}
                         value={value}/>
        </View>
    );
};

SwitchRow.propTypes = {
    onValueChange: PropTypes.func,
    label: PropTypes.string,
    value: PropTypes.bool,
    containerStyle: PropTypes.object
};

SwitchRow.defaultProps = {
    onValueChange: () => {
    },
    label: 'no label provided',
    value: false,
};

export default SwitchRow;


