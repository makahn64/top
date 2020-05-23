import Metrics from './Metrics';

const type = {
    condensed: {
        bold: 'BarlowCondensed-Bold',
        demibold: 'BarlowCondensed-ExtraBold',
        black: 'BarlowCondensed-Black',
        extraLight: 'BarlowCondensed-ExtraLight',
        light: 'BarlowCondensed-Light',
        medium: 'BarlowCondensed-Medium',
        regular: 'BarlowCondensed-Regular',
        thin: 'BarlowCondensed-Thin',
    },
    bold: 'Barlow-Bold',
    demibold: 'Barlow-SemiBold',
    black: 'Barlow-Black',
    extraLight: 'Barlow-ExtraLight',
    light: 'Barlow-Light',
    medium: 'Barlow-Medium',
    regular: 'Barlow-Regular',
    thin: 'Barlow-Thin',
};

const size = {
    h1: 28 * Metrics.deviceScaleFactor,
    h2: 24 * Metrics.deviceScaleFactor,
    h3: 20 * Metrics.deviceScaleFactor,
    h4: 16 * Metrics.deviceScaleFactor,
    h5: 16 * Metrics.deviceScaleFactor,
    h6: 16 * Metrics.deviceScaleFactor,
    input: 20 * Metrics.deviceScaleFactor,
    regular: 16 * Metrics.deviceScaleFactor,
    medium: 14 * Metrics.deviceScaleFactor,
    small: 12 * Metrics.deviceScaleFactor,
    tiny: 8.5 * Metrics.deviceScaleFactor,
};

const style = {
    h1: {
        fontFamily: type.demibold,
        fontSize: size.h1,
        lineHeight: size.h1 + 5,
        marginBottom: Metrics.marginVertical,
    },
    h2: {
        fontFamily: type.demibold,
        fontSize: size.h2,
        lineHeight: size.h2,
        marginBottom: Metrics.marginVertical,
    },
    h3: {
        fontFamily: type.demibold,
        fontSize: size.h3,
        lineHeight: size.h3 + 2,
        marginBottom: Metrics.marginVertical,
    },
    h4: {
        fontFamily: type.demibold,
        fontSize: size.h4,
    },
    h5: {
        fontFamily: type.demibold,
        fontSize: size.h5,
    },
    h6: {
        fontFamily: type.demibold,
        fontSize: size.h6,
    },
    normal: {
        fontFamily: type.regular,
        fontSize: size.regular,
    },
    normalBold: {
        fontFamily: type.bold,
        fontSize: size.regular,
    },
    normalDemiBold: {
        fontFamily: type.demibold,
        fontSize: size.regular,
    },
    description: {
        fontFamily: type.regular,
        fontSize: size.medium,
    },
    cellRegular: {
        fontFamily: type.regular,
        fontSize: size.medium,
    },
    cellHeader: {
        fontFamily: type.demibold,
        fontSize: size.h6,
    },
    cellSubHead: {
        fontFamily: type.regular,
        fontSize: size.small,
    },
    collapsingNavHeader: {
        fontFamily: type.demibold,
        fontSize: size.h3,
    },
    badgeNormal: {
        fontFamily: type.bold,
        fontSize: 12,
    },
    badgeTiny: {
        fontFamily: type.demibold,
        fontSize: 10,
    },
};

export default {
    type,
    size,
    style,
};
