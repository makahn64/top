/*********************************

 File:       VerySimpleView.js
 Function:   Bare minimum view for testing navigation, etc.
 Copyright:  Bertco LLC
 Date:       2020-05-22
 Author:     mkahn

 **********************************/

import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';
import { useRoute } from '@react-navigation/native';
import {useStyles} from '../../Themes/ThemeManager';
import XLogger from '../../Services/XLogger';
import {Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import TestSkeleton from '../../Components/Skeletons/TestSkeleton';


const VerySimpleView = props => {

    const {text, viewStyles, textStyles, ...otherProps} = props;
    const { appStyles: styles, theme } = useStyles();
    const route = useRoute();
    XLogger.logSilly(route);

    return (
        <View style={[styles.container, styles.testBorder]}>
            <Text style={{fontSize: 24, alignSelf: 'center', color: 'red', marginTop: 300}}>TEST</Text>
            <Icon type="material-community" name="menu" color={theme.primary}/>
            <View>
                <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={lstyles.linearGradient}>
                    <Text style={lstyles.buttonText}>
                        Test of LinearGradient
                    </Text>
                </LinearGradient>
                <TestSkeleton/>
            </View>
        </View>
    );
};

VerySimpleView.propTypes = {
    text: PropTypes.string,
};

VerySimpleView.defaultProps = {
    text: 'Very Simple View',
};

export default VerySimpleView;

const lstyles = StyleSheet.create({
    linearGradient: {
        // flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
        margin: 40
        //minHeight: 50
    },
    buttonText: {
        fontSize: 18,
        //fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: 'white',
        backgroundColor: 'transparent',
    },
});
