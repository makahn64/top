/*********************************

 File:       TestSkeleton.js
 Function:   Test Line Gradient & Skeleton
 Copyright:  Bertco LLC
 Date:       2020-05-22
 Author:     mkahn



 **********************************/

import React from 'react';
import {View, Text} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Metrics from '../../Themes/Metrics';
import {useStyles} from '../../Themes/ThemeManager';

const TestSkeleton = props => {

    const { appStyles: styles, theme } = useStyles();

    return (
        <View style={{margin: 10}}>
            <Text style={styles.H2}>Test Skeleton</Text>
            <SkeletonPlaceholder backgroundColor={theme.skeletonBackground} highlightColor={theme.skeletonHighlight}>
                <SkeletonPlaceholder.Item width={Metrics.screenWidth*0.8} height={100} borderRadius={0}/>
                <SkeletonPlaceholder.Item marginLeft={Metrics.marginHorizontal} width={Metrics.screenWidth * 0.6}
                                          height={30} marginTop={10}/>
                <SkeletonPlaceholder.Item marginLeft={Metrics.marginHorizontal} width={Metrics.screenWidth * 0.4}
                                          height={20} marginTop={10}/>
                <SkeletonPlaceholder.Item marginLeft={Metrics.marginHorizontal} width={Metrics.screenWidth * 0.7}
                                          height={80} marginTop={30}/>
            </SkeletonPlaceholder>
        </View>);
};


export default TestSkeleton;
