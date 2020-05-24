/*********************************

 File:       ImageWithSkeleton.js
 Function:   LOL better version of the other one that supports size.
 Copyright:  Bertco LLC
 Date:       2020-05-23
 Author:     mkahn

 **********************************/

import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Image, View, Text} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

// Google Cloud Storage URLs look like:
// https://storage.cloud.google.com/toptalblogster.appspot.com/3hPXYWYntF42OIFvi71I.jpg

const GBUCKET_BASE_URL = 'https://storage.cloud.google.com/toptalblogster.appspot.com/';

const ImageWithSkeleton = props => {

    const {mediaId, loadingSrc, style, fallback, ...imgProps} = props;
    const [loaded, setLoaded] = useState(false);
    // a little hacky since it assumes it will always be a JPEG, there's no link in the post
    // object itself, etc.
    const mediaUrl = `${GBUCKET_BASE_URL}${mediaId}.jpg`;

    const handleImageLoaded = () => {
        setLoaded(true);
    };

    const imageStyle = loaded ? style : {height: 2, width: 2, opacity: 0};

    const source = mediaId ? {uri: mediaUrl} : fallback;

    return (
        <View>
            {!loaded ? <SkeletonPlaceholder>
                <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
                    <SkeletonPlaceholder.Item width={style.width} height={style.height} borderRadius={2}/>
                </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder> : null}
            <Image
                style={imageStyle}
                source={source}
                onLoad={handleImageLoaded}/>
        </View>
    );
};

ImageWithSkeleton.propTypes = {
    mediaId: PropTypes.string,
    loadingSrc: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    ...Image.propTypes,
};

export default ImageWithSkeleton;
