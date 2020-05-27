/*********************************

 File:       ListSkeleton
 Function:   Skeleton Screen for Post Lists
 Copyright:  Bertco LLC
 Date:       2020-05-27
 Author:     mkahn



 **********************************/

import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {useStyles} from '../../Themes/ThemeManager';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Metrics from '../../Themes/Metrics';
import _ from 'lodash';



const ListSkeleton = props => {

    const {appStyles: styles, theme} = useStyles();

    const renderCell = () => (
            <View style={{flexDirection: 'row', margin: Metrics.marginVertical, justifyContent: 'space-around'}}>
                <View style={{width: 64, height: 64}}/>
                <View style={{marginLeft: Metrics.marginHorizontal, flexDirection: 'column'}}>
                    <View style={{width: Metrics.screenWidth*0.6, height: 32, marginBottom: Metrics.marginVertical}}/>
                    <View style={{width: 200, height: 20}}/>
                </View>
            </View>
    );

    return (
        <View style={{marginTop: 60, justifyContent: 'center'}}>
            <SkeletonPlaceholder backgroundColor={theme.skeletonBackground} highlightColor={theme.skeletonHighlight}>
                <View style={{width: Metrics.screenWidth*0.95, height: 50,
                    marginBottom: Metrics.marginVertical, alignSelf: 'center'}}/>
                <View style={{width: Metrics.screenWidth*0.95, height: 30,
                    marginBottom: Metrics.marginVertical, alignSelf: 'center'}}/>
                {_.times(8, renderCell)}
            </SkeletonPlaceholder>
        </View>);
};

ListSkeleton.propTypes = {};

export default ListSkeleton;


