/*********************************

 File:       PostCell.js
 Function:   Product Cell for List Views
 Copyright:  Bertco LLC
 Date:       2020-05-23
 Author:     mkahn

 **********************************/

import React from 'react';
import PropTypes from 'prop-types';
import BaseCell from './BaseCell';
import { View } from 'react-native';
import { Text } from 'native-base';
import ImageWithSkeleton from '../Media/ImageWithSkeleton';
import { useStyles } from '../../Themes/ThemeManager';
import moment from 'moment';
import FirebaseImage from '../Media/FirebaseImage';
import {formatScreenDates} from '../../Services/Helpers';

const PostCell = props => {

    const { post, onPress, showEmail } = props;
    const { title, author, published, docId, authorEmail } = post;
    const { cellStyles: styles } = useStyles();

    // const stars = (avgReviews && avgReviews.overall) || 3; // everyone gets a prize
    // const numReviews = (avgReviews && avgReviews.outOf) || 0;
    const formattedPublishedDate = formatScreenDates(published);

    return (
        <BaseCell onPress={onPress}>
            <FirebaseImage mediaId={docId} style={{ width: 64, height: 64 }}/>
            <View style={{ flexDirection: 'column', marginLeft: 15, width: '100%' }}>
                <Text style={styles.cellHeader}>{title}</Text>
                <Text style={styles.cellSubHead}>By {author}</Text>
                <Text style={styles.cellSubMuted}>{formattedPublishedDate}</Text>
                { showEmail ? <Text style={styles.cellSubMuted}>{authorEmail}</Text> : null }
            </View>
        </BaseCell>
    );
};

PostCell.propTypes = {
    post: PropTypes.object,
    showEmail: PropTypes.bool,
};

export default PostCell;
