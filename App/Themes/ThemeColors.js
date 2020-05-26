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
        dark: Colors.lightBlue,
        light: Colors.blue,
    },
    background: {
        dark: Colors.nearBlack,
        light: Colors.white,
    },
    text: {
        dark: Colors.grey5,
        light: Colors.grey0,
    },
    // Borders around headers, tab bars
    border: {
        dark: Colors.darkGray,
        light: Colors.lightGray,
    },
    secondary: {
        dark: Colors.blue,
        light: Colors.lightBlue,
    },
    link: {
        dark: Colors.pink,
        light: Colors.lightBlue,
    },
    muted: {
        dark: Colors.grey4,
        light: Colors.lightGray,
    },
    normalText: {
        dark: Colors.grey4,
        light: Colors.grey1,
    },
    mutedText: {
        dark: Colors.grey4,
        light: Colors.grey2,
    },
    ultramuted: {
        dark: Colors.ultralightGray,
        light: Colors.grey1,
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
        dark: Colors.grey4,
        light: Colors.blue,
    },
    inactiveNavTint: {
        dark: Colors.darkNavInactive,
        light: Colors.grey3,
    },
    cellBorder: {
        dark: Colors.darkGray,
        light: Colors.mediumGreyBrown,
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
        dark: Colors.rose,
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
    faintBrand: {
        dark: Colors.blue,
        light: Colors.faintBrand,
    },
    danger: {
        dark: Colors.red,
        light: Colors.red,
    },
    success: {
        dark: Colors.green,
        light: Colors.green,
    }
};

export const getTheme = mode => {
    let Theme = {};
    // eslint-disable-next-line no-unused-vars
    for (const key in ThemeColors) {
        Theme[key] = ThemeColors[key][mode];
    }
    return Theme;
};
