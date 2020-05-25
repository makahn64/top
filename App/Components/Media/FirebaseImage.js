/*********************************

 File:       FirebaseImage.js
 Function:   LOL better version of the other one that supports size.
 Copyright:  Bertco LLC
 Date:       2020-05-23
 Author:     mkahn

 **********************************/

import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Image, View, Text} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import XLogger from '../../Services/XLogger';
import storage from '@react-native-firebase/storage';
import Images from '../../Themes/Images';


// Google Cloud Storage URLs look like:
// https://storage.cloud.google.com/toptalblogster.appspot.com/3hPXYWYntF42OIFvi71I.jpg

const GBUCKET_BASE_URL = 'https://storage.cloud.google.com/toptalblogster.appspot.com/';

const FirebaseImage = props => {

    const {mediaId, loadingSrc, style, fallback, ...imgProps} = props;
    const [loaded, setLoaded] = useState(false);
    const [downloadUrl, setDownloadUrl ] = useState(null);

    useEffect(()=>{
        async function load() {
            const filename = `${mediaId}.jpg`;
            const uri = await storage()
                .ref(filename)
                .getDownloadURL();
            setDownloadUrl({ uri });
        }

        load();

    },[])

    const handleImageLoaded = () => {
        setLoaded(true);
    };

    const handleImageError = () => {
        setDownloadUrl(Images.placeholderBanner);
    }

    return (
        <Image
            style={[style, { borderWidth: loaded ? 0 : 10, borderColor: '#e1e1e1'}]}
            source={downloadUrl}
            onLoad={handleImageLoaded}
        onError={handleImageError}/>
    );
};

FirebaseImage.propTypes = {
    mediaId: PropTypes.string,
    loadingSrc: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    ...Image.propTypes,
};

export default FirebaseImage;
