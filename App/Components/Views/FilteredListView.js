/*********************************

 File:       FilteredListView.js
 Function:
 Copyright:  Bertco LLC
 Date:       2020-01-08
 Author:     mkahn



 **********************************/

import React, {useEffect, useRef, useState} from 'react';
import {FlatList, View, Text, TouchableOpacity} from 'react-native';
import {Item, Input} from 'native-base';
import {Icon, Overlay} from 'react-native-elements';
import XLogger from '../../Services/XLogger';
import {useStyles} from '../../Themes/ThemeManager';
import * as Animatable from 'react-native-animatable';
import useFocusChangeCallbacks from '../../Hooks/useFocusChangeCallbacks';
import PropTypes from 'prop-types';
import IconWithShadow from '../Icons/IconWithShadow';


const FilteredListView = props => {

    const {appStyles: styles, theme} = useStyles();
    const fab = useRef(null);
    const [showFab, setShowFab] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const [search, setSearch] = useState('');
    const {
        renderItem, onSearchChanged, keyExtractor,
        fabIcon, fabColor, FilterSetupOverlay,
        data, fabIconType,
    } = props;


    XLogger.logSilly('FilteredList render');
    // Used for animations
    const screenFocused = () => {
        setShowFab(true);
        fab.current.bounceIn();
    };

    const screenBlurred = () => {
        // Hide them with opacity. Opacity allows useRef to find them, whereas conditional render would not.
        fab.current.fadeOut();
        setShowFab(false);
    };

    useFocusChangeCallbacks({onFocus: screenFocused, onBlur: screenBlurred});

    const handleSearchChanged = t => {
        setSearch(t);
        if (onSearchChanged) {
            onSearchChanged(t);
        }
    };

    return (
        <View style={{flex: 1}}>
            <View style={[styles.insetContainer]}>
                {onSearchChanged ? <Item style={{borderBottomColor: 'transparent'}}>
                    <Input placeholder="Search"
                           onChangeText={handleSearchChanged}
                           value={search}
                           style={styles.fullWidthTextInput}/>
                </Item> : null}
                <FlatList data={data}
                          renderItem={renderItem}
                          keyExtractor={keyExtractor}
                />

            </View>
            <Animatable.View style={{position: 'absolute', bottom: 10, right: 10, opacity: showFab ? 1 : 0}}
                             delay={500}
                             ref={fab}>
                <Icon
                    reverse
                    name={fabIcon}
                    type={fabIconType}
                    color={fabColor || theme.fab}
                    raised
                    onPress={() => setShowOverlay(true)}
                />
            </Animatable.View>
            <Overlay isVisible={showOverlay}
                     onBackdropPress={() => setShowOverlay(!showOverlay)}
                     overlayStyle={{padding: 0}}>
                <View style={{position: 'absolute', top: 5, right: 5, zIndex: 1000}}>
                    <TouchableOpacity onPress={() => setShowOverlay(!showOverlay)}>
                        <IconWithShadow color={theme.invertedText} name="close" size={15}/>
                    </TouchableOpacity>
                </View>
                <FilterSetupOverlay/>
            </Overlay>
        </View>
    );
};

export default FilteredListView;

FilteredListView.propTypes = {
    renderItem: PropTypes.func.isRequired,
    keyExtractor: PropTypes.func,
    fabColor: PropTypes.string,
    fabIcon: PropTypes.string,
    fabIconType: PropTypes.string,
    onSearchChanged: PropTypes.func,
    FilterSetupOverlay: PropTypes.elementType,
    data: PropTypes.array.isRequired,
};

FilteredListView.defaultProps = {
    fabIconType: 'material-community',
    fabIcon: 'filter',
    keyExtractor: v => v.id,
};


