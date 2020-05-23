import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
const screenWidth = width < height ? width : height;
const screenHeight = width < height ? height : width;
export const isTablet = screenWidth >= 600;
const isTinyPhone = screenWidth <= 320;

let margin = 8;
let deviceScaleFactor = 1;
if (isTablet) {
    margin *= 2;
    deviceScaleFactor = 2;
} else if (isTinyPhone) {
    margin *= 0.75;
    deviceScaleFactor = 0.75;
}

// Used via Metrics.baseMargin
const metrics = {
    marginHorizontal: margin,
    marginVertical: margin,
    containerMargin: margin,
    deviceScaleFactor,
    screenWidth,
    screenHeight,
    icons: {
        ittybitty: 12,
        tiny: 15,
        small: 20,
        medium: 24,
        large: 45,
        xl: 50,
    },
    images: {
        small: 20,
        medium: 40,
        large: 60,
        logo: 200,
    },
    inputBorderRadius: 5,
    smBorderRadius: 5,
    lgBorderRadius: 10,
    collapseMarginBottom: 20,
};

export default metrics;
