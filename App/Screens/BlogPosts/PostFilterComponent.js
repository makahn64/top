/*********************************

 File:       PostFilterComponent.js
 Function:
 Copyright:  Bertco LLC
 Date:       2020-05-23
 Author:     mkahn



 **********************************/

import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import SwitchRow from '../../Components/Switches/SwitchRow';
import {useStyles} from '../../Themes/ThemeManager';
import Fonts from '../../Themes/Fonts';



const PostFilterComponent = props => {

    const {appStyles: styles, theme} = useStyles();
    const {onClose} = props;

    return (
        <View>
            <View style={{backgroundColor: theme.primary, minWidth: '100%', minHeight: 80, justifyContent: 'center'}}>
                <Text style={{...Fonts.style.h2, color: theme.invertedText, alignSelf: 'center', marginBottom: 0}}>Post
                    Filters</Text>
            </View>
            {/*<SwitchRow label={'Enable Post Filter'}*/}
            {/*           containerStyle={{marginTop: 10}}*/}
            {/*           value={isVenueFilterEnabled}*/}
            {/*           onValueChange={enableVenueFilter}/>*/}
            <ScrollView style={{maxHeight: '80%'}}>
            </ScrollView>
        </View>
    );
};

PostFilterComponent.propTypes = {
    onClose: PropTypes.func,
};

export default PostFilterComponent;


