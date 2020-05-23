import {StyleSheet} from 'react-native';
import Fonts from './Fonts';
import Metrics from './Metrics';

const getCellStyles = theme => StyleSheet.create({
    baseCell: {
        width: '100%',
        borderWidth: 1,
        borderColor: theme.cellBorder,
        borderRadius: Metrics.inputBorderRadius,
        flexDirection: 'row',
        marginBottom: 5,
        padding: 10,
    },
    burgerMenuCell: {
        width: '100%',
        borderWidth: 1,
        borderColor: theme.faint,
        flexDirection: 'row',
        minHeight: 50,
        paddingTop: 15
    },
    burgerMenuLabel: {
        ...Fonts.style.cellHeader,
        color: theme.normalText,
        marginLeft: 10,
        //marginHorizontal: Metrics.marginHorizontal,
        textAlign: 'left',
    },
    burgerMenuIcon: {
        marginRight: 10
    },
    cellHeader: {
        ...Fonts.style.cellHeader,
        color: theme.normalText,
        marginBottom: 1,
        //marginHorizontal: Metrics.marginHorizontal,
        textAlign: 'left',
    },
    cellSubHead: {
        ...Fonts.style.cellSubHead,
        color: theme.muted,
        marginBottom: 1,
        //marginHorizontal: Metrics.marginHorizontal,
        textAlign: 'left',
    },
    cellAddress: {
        ...Fonts.style.cellRegular,
        color: theme.muted,
        marginBottom: 5,
        //marginHorizontal: Metrics.marginHorizontal,
        textAlign: 'left',
    },
});

export default getCellStyles;
