/*********************************

 File:       ThemeColors.js
 Function:   Implementation of Dark/Light Color Schemes
 Copyright:  Bertco LLC
 Date:       2020-03-02
 Author:     mkahn

 See https://medium.com/@rossbulat/theming-in-react-native-explained-ac40d0d2e15c

 **********************************/

import Colors from './Colors';

export const ThemeColors = {
    // First, the colors needed by react-navigation's built in theming support
    // Primary is the "brand color"
    primary: {
        dark: Colors.wineRed,
        light: Colors.wineRed,
    },
    background: {
        dark: Colors.nearBlack,
        light: Colors.white,
    },
    text: {
        dark: Colors.white,
        light: Colors.black,
    },
    // MAK: for the 0.62 and conversion to new themeing methodology
    // This is used on detail screens where there is a secondary tab bar for things like info, map, reviews, etc.
    secondaryTabIndicatorColor: {
        dark: Colors.sauterne,
        light: Colors.oldWineRed,
    },
    secondaryTabIconColor: {
        dark: Colors.sauterne,
        light: Colors.oldWineRed,
    },
    // Also used for headers and tab bars
    card: {
        dark: Colors.nearBlack,
        light: Colors.white,
    },
    // Borders around headers, tab bars
    border: {
        dark: Colors.darkGray,
        light: Colors.lightGray,
    },
    // The rest of these are for Winex-specific elements
    secondary: {
        dark: Colors.wineRed,
        light: Colors.wineRed,
    },
    link: {
        dark: Colors.pink,
        light: Colors.oldWineRed,
    },
    muted: {
        dark: Colors.lightGray,
        light: Colors.lightGray,
    },
    normalText: {
        dark: Colors.grey4,
        light: Colors.grey1,
    },
    mutedText: {
        dark: Colors.white,
        light: Colors.gray,
    },
    invertedText: {
        dark: Colors.black,
        light: Colors.white,
    },
    surface: {
        dark: Colors.nearBlack,
        light: Colors.white,
    },
    // These will need some renaming, I think
    activeNavTint: {
        dark: Colors.sauterne,
        light: Colors.oldWineRed,
    },
    inactiveNavTint: {
        dark: Colors.darkNavInactive,
        light: Colors.grey3,
    },
    featureTags: {
        dark: Colors.sauterne,
        light: Colors.lightPurple,
    },
    cellBorder: {
        dark: Colors.darkGray,
        light: Colors.mediumGreyBrown,
    },
    mapButtons: {
        dark: Colors.greenVine,
        light: Colors.greenVine,
    },
    backIcon: {
        dark: Colors.sauterne,
        light: Colors.sauterne,
    },
    toastSurface: {
        dark: Colors.gray,
        light: Colors.gray,
    },
    toastText: {
        dark: Colors.white,
        light: Colors.white,
    },
    fab: {
        dark: Colors.sauterne,
        light: Colors.rose,
    },
    faint: {
        dark: '#a0a0a0',
        light: '#f0f0f0',
    },
    skeletonBackground: {
        dark: '#42494e',
        light: '#E1E9EE',
    },
    skeletonHighlight: {
        dark: '#646b70',
        light: '#F2F8FC',
    },
    headerText: {
        dark: Colors.white,
        light: Colors.black,
    },
};

export const getTheme = mode => {
    let Theme = {};
    // eslint-disable-next-line no-unused-vars
    for (const key in ThemeColors) {
        Theme[key] = ThemeColors[key][mode];
    }
    return Theme;
};
