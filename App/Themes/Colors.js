/*********************************

 File:       Colors.js
 Function:   Just the colors, they are doled out thru ThemeColors.js
 Copyright:  Bertco LLC
 Date:       2020-03-02
 Author:     mkahn

 **********************************/

const coolorsLight = {
    lightBlue: '#009bdeff',
    blue: '#016b91ff',
    red: '#ee6352ff',
    green: '#59cd90ff',
    yellow: '#fac05eff',
};

const colors = {
        danger: coolorsLight.red,
        faintGray: '#eeeeee',
        ultralightGray: '#dddddd',
        lightGray: '#999999',
        gray: '#666666',
        darkGray: '#464646',
        greyBrown: '#54494b',
        lightGreyBrown: '#e0e2db',
        mediumGreyBrown: '#a6a8a1',
        imageOverlay: 'rgba(0, 0, 0, 0.4)',
        pureRed: '#ff0000',
        wineRed: '#a22c29',
        oldWineRed: '#902923',
        beige: '#f5e693',
        sauterne: '#fff885',
        pink: '#c974b1',
        rose: '#c95c83',
        greenVine: '#295e29',
        white: '#ffffff',
        black: '#000000',
        nearBlack: '#202020',
        darkNavActive: '#ffd500',
        darkNavInactive: '#b08eb0',
        // greyscales
        grey0: '#393e42',
        grey1: '#43484d',
        grey2: '#5e6977',
        grey3: '#86939e',
        grey4: '#bdc6cf',
        grey5: '#e1e8ee',
        greyOutline: '#bbb',
        ...coolorsLight,
        faintBrand: '#9fdeff',
    }
;

export default colors;
