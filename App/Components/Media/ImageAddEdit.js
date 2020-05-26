/*********************************

 File:       ImageAddEdit
 Function:   Display current image (if one), display placeholder if not, allow replacement thru camera/roll
 Copyright:  Bertco LLC
 Date:
 Author:     mkahn

 **********************************/


import React, {useState, useEffect, useReducer} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import PropTypes from 'prop-types';
import {useTheme} from '../../Themes/ThemeManager';
import {Icon} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import XLogger from '../../Services/XLogger';
import Metrics from '../../Themes/Metrics';
import storage from '@react-native-firebase/storage';

const getStyles = theme => StyleSheet.create({
    container: {
        width: '100%',
        minHeight: 250,
        backgroundColor: theme.muted,
    },
    cameraIcon: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
});

const pickerOptions = {
    title: 'Select or Take Post Image',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

const INITIAL_STATE = {
    pickerResponse: null,
    imageSource: null,
    imageHasLoaded: false,
};

const iaeReducer = (state, {type, payload}) => {
    XLogger.logSilly(`ImageAddEdit reducer: ${type}`);
    switch (type) {
        case 'SET_IMAGE_SOURCE':
            return {...state, imageSource: payload};

        case 'SET_PICKER_RESPONSE':
            return {...state, pickerResponse: payload, imageSource: {uri: payload.uri}, imageHasLoaded: false};

        case 'IMAGE_LOADED':
            return {...state, imageHasLoaded: true};

        default:
            return state;
    }
};

const ImageAddEdit = props => {

    const {theme} = useTheme();
    const styles = getStyles(theme);
    const [state, dispatch] = useReducer(iaeReducer, INITIAL_STATE);
    const {imageName, onImageChange} = props;

    const {imageSource, imageHasLoaded} = state;

    useEffect(() => {

        async function load() {
            const uri = await storage()
                .ref(imageName)
                .getDownloadURL();
            dispatch({type: 'SET_IMAGE_SOURCE', payload: {uri}});
        }

        if (imageName) {
            load();
        }

    }, [imageName]);

    const handleImageChange = () => {
        ImagePicker.showImagePicker(pickerOptions, response => {
            XLogger.log('Response = ', response);

            if (response.didCancel) {
                XLogger.log('User cancelled image picker');
            } else if (response.error) {
                XLogger.log('ImagePicker Error: ', response.error);
            } else {
                dispatch({type: 'SET_PICKER_RESPONSE', payload: response});
                onImageChange(response);
            }
        });
    };

    return (
        <View style={styles.container}>
            {imageSource ? <Image source={imageSource} resizeMode={'cover'}
                                  style={{width: Metrics.screenWidth, height: 250}}
                                  onLoad={() => dispatch({type: 'IMAGE_LOADED'})}/> : null}
            <Icon name={'camera'} type={'material-community'} color={imageSource ? theme.danger : 'white'} size={50}
                  onPress={handleImageChange}
                  containerStyle={styles.cameraIcon}/>
            {imageHasLoaded ? null : <Text>Loading...</Text>}
        </View>
    );
};

ImageAddEdit.propTypes = {
    imageName: PropTypes.string,
    onImageChange: PropTypes.func,
};

ImageAddEdit.defaultProps = {
    onImageChange: () => {
    },
};

export default ImageAddEdit;


