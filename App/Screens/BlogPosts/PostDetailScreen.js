/*********************************

 File:       PostDetailScreen.js
 Function:
 Copyright:  Bertco LLC
 Date:       2020-05-23
 Author:     mkahn

 **********************************/

import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {useRoute} from '@react-navigation/core';
import {getPost} from '../../Services/Firebase/blogposts';
import FirebaseImage from '../../Components/Media/FirebaseImage';
import Metrics from '../../Themes/Metrics';
import {useStyles} from '../../Themes/ThemeManager';
import {formatScreenDates} from '../../Services/Helpers';

const PostDetailScreen = props => {

    const route = useRoute();
    const {appStyles: styles, theme} = useStyles();
    const docId = route && route.params && route.params.docId;
    const [post, setPost] = useState(null);

    useEffect(() => {
        async function load() {
            const p = await getPost(docId);
            setPost(p);
        }

        load();
    }, []);

    return (
        <View>
            {post ? <ScrollView>
                <FirebaseImage mediaId={docId} style={{width: Metrics.screenWidth, height: 200}}/>
                <View style={styles.insetContainer}>
                    <Text style={styles.H1}>{post.title}</Text>
                    <Text style={styles.H3}>By {post.author}</Text>
                    <Text style={[styles.H5, { color: theme.muted}]}>{formatScreenDates(post.published)}</Text>
                    <Text style={[styles.normalText, {marginTop: Metrics.marginVertical*2}]}>{post.body}</Text>
                </View>
            </ScrollView> : <Text>Loading...</Text>}

        </View>
    );
};

PostDetailScreen.propTypes = {};

export default PostDetailScreen;


