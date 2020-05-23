/*********************************

 File:       ApplicationStyles.js
 Function:   Generates commonly used styles based on current theme
 Copyright:  Bertco LLC
 Date:       2020-05-22
 Author:     mkahn

 **********************************/

import {StyleSheet} from 'react-native';
import Fonts from './Fonts';
import Metrics from './Metrics';
import Colors from './Colors';

const getAppStyles = theme => {
    return StyleSheet.create({
        container: {
            flex: 1,
            margin: 0,
            backgroundColor: theme.surface,
        },
        insetContainer: {
            padding: Metrics.containerMargin,
        },
        H1: {
            ...Fonts.style.h1,
            color: theme.headerText,
        },
        H2: {
            ...Fonts.style.h2,
            color: theme.headerText,
        },
        H3: {
            ...Fonts.style.h3,
            color: theme.headerText,
        },
        H4: {
            ...Fonts.style.h4,
            color: theme.headerText,
        },
        H5: {
            ...Fonts.style.h5,
            color: theme.headerText,
        },
        H6: {
            ...Fonts.style.h6,
            color: theme.headerText,
        },
        fullWidthTextInput: {
            borderWidth: 1,
            borderRadius: Metrics.inputBorderRadius,
            borderColor: theme.cellBorder,
            color: theme.normalText,
            marginBottom: Metrics.marginVertical,
        },
        baseCell: {
            width: '100%',
            borderWidth: 1,
            borderColor: theme.cellBorder,
            borderRadius: Metrics.inputBorderRadius,
            flexDirection: 'row',
            marginBottom: 5,
            padding: 10,
        },
        cellHeader: {
            ...Fonts.style.cellHeader,
            color: theme.normalText,
            marginBottom: 1,
            marginHorizontal: Metrics.marginHorizontal,
            textAlign: 'left',
        },
        cellAddress: {
            ...Fonts.style.cellRegular,
            color: theme.muted,
            marginBottom: 5,
            marginHorizontal: Metrics.marginHorizontal,
            textAlign: 'left',
        },
        detailsContainer: {
            ...StyleSheet.absoluteFillObject,
            flex: 1,
            backgroundColor: theme.surface,
            //borderWidth: 1,
            //borderColor: 'orange'
        },
        innerPaddedContainer: {
            flex: 1,
            margin: Metrics.containerMargin,
        },
        fillCenterContainer: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'red',
        },
        backgroundImage: {
            ...StyleSheet.absoluteFillObject,
        },
        titleText: {
            ...Fonts.style.h1,
            color: theme.muted,
            marginBottom: 30,
            marginTop: 30,
            marginHorizontal: Metrics.marginHorizontal,
            textAlign: 'center',
        },
        sectionText: {
            ...Fonts.style.h2,
            color: theme.muted,
            marginBottom: 30,
            marginHorizontal: Metrics.marginHorizontal,
            textAlign: 'center',
        },
        heading: {
            ...Fonts.style.h3,
            color: theme.muted,
        },
        subHead: {
            ...Fonts.style.h4,
            color: theme.muted,
        },
        normalText: {
            ...Fonts.style.normal,
            color: theme.muted,
            marginBottom: 20,
            //marginHorizontal: Metrics.marginHorizontal,
        },
        inputHelpText: {
            ...Fonts.style.small,
            color: theme.muted,
            marginTop: 0,
            marginHorizontal: Metrics.marginHorizontal,
            textAlign: 'center',
        },
        footerText: {
            ...Fonts.style.h3,
            alignSelf: 'center',
            color: Colors.gray,
            marginHorizontal: Metrics.marginHorizontal,
            marginVertical: Metrics.marginVertical,
            textAlign: 'center',
        },
        showMoreText: {
            ...Fonts.style.normal,
            color: theme.link,
            marginTop: 5, marginBottom: 10,
        },
        mapContainer: {
            ...StyleSheet.absoluteFillObject,
            height: 500,
            width: '100%',
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
        map: {
            ...StyleSheet.absoluteFillObject,
            zIndex: -1,
        },
        mapLabel: {
            backgroundColor: '#e0e0e0',
            borderRadius: 5,
            color: '#202020',
            padding: 10,
            flexDirection: 'row',
        },
        mapLabelTitle: {
            marginLeft: 5,
            marginTop: 2,
        },
        tabViewRootContainer: {
            padding: 10,
            backgroundColor: theme.surface,
        },
        navIcon: {
            fontSize: 40,
            color: 'pink',
            textShadowColor: 'rgba(0, 0, 0, 0.75)',
            textShadowOffset: {width: -1, height: 1},
            textShadowRadius: 5,
        },
        testBorder: {
            borderWidth: 2,
            borderColor: 'orange',
        },
        testBorderRed: {
            borderWidth: 2,
            borderColor: '#ff3566',
        },
        switchLabel: {
            ...Fonts.style.normal,
            color: theme.mutedText,
            marginTop: 5, marginBottom: 10,
        },
    });
};

export default getAppStyles;
