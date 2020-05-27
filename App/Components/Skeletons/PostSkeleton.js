/*********************************

 File:       PostSkeleton
 Function:   Skeleton Screen for Post Detail
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

const PostSkeleton = props => {

    const { appStyles: styles, theme } = useStyles();

    return (
        <View style={{margin: 0}}>
            <SkeletonPlaceholder backgroundColor={theme.skeletonBackground} highlightColor={theme.skeletonHighlight}>
                <SkeletonPlaceholder.Item width={Metrics.screenWidth} height={Metrics.screenHeight * 0.25} borderRadius={0}/>
                <SkeletonPlaceholder.Item marginLeft={Metrics.marginHorizontal} width={Metrics.screenWidth * 0.6}
                                          height={30} marginTop={10}/>
                <SkeletonPlaceholder.Item marginLeft={Metrics.marginHorizontal} width={Metrics.screenWidth * 0.4}
                                          height={20} marginTop={10}/>
                <SkeletonPlaceholder.Item marginLeft={Metrics.marginHorizontal}
                                          marginRight={Metrics.marginHorizontal}
                                          width={Metrics.screenWidth * 0.95}
                                          height={Metrics.screenHeight * 0.35} marginTop={30}/>
            </SkeletonPlaceholder>
        </View>);
};

PostSkeleton.propTypes = {};

export default PostSkeleton;


