/*********************************

 File:       ThemeManager.js
 Function:   Wrapping Component to Provide Theme to entire app
 Copyright:  Bertco LLC
 Date:       2020-05-22
 Author:     mkahn

 https://medium.com/@rossbulat/theming-in-react-native-explained-ac40d0d2e15c

 **********************************/

import { getTheme } from '../Themes/ThemeColors';
import getAppStyles from './ApplicationStyles';
import getCellStyles from './CellStyles';
import Metrics from './Metrics';
import Fonts from './Fonts';
import {useThemeMode} from '../Services/Storage/persisted';
import XLogger from '../Services/XLogger';

export const useTheme = () => {
    // TODO implement theming in Firestore, if time
    const {themeMode} = useThemeMode();
    XLogger.log(`useTheme: ${themeMode}`);
    const theme = getTheme(themeMode);
    return {themeMode, theme, isDark: themeMode === 'dark'};
};

export const useStyles = () => {
    const { themeMode, theme, setThemeMode } = useTheme();
    const appStyles = getAppStyles(theme);
    const cellStyles = getCellStyles(theme);
    return { themeMode, theme, setThemeMode, appStyles, cellStyles, Metrics, Fonts };
};
