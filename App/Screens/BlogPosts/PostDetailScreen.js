/*********************************

 File:       PostDetailScreen.js
 Function:
 Copyright:  Bertco LLC
 Date:       2020-05-23
 Author:     mkahn

 **********************************/

import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/core';
import {getPost, deletePost} from '../../Services/Firebase/blogposts';
import FirebaseImage from '../../Components/Media/FirebaseImage';
import Metrics from '../../Themes/Metrics';
import {useStyles} from '../../Themes/ThemeManager';
import {formatScreenDates} from '../../Services/Helpers';
import {Button} from 'react-native-elements';
import OKCancelModal from '../../Components/Modals/OKCancelModal';
import XLogger from '../../Services/XLogger';
import {Toast} from "native-base";

const EDIT_ICON = {
    name: 'pen',
    type: 'material-community',
    size: 20,
    color: 'white',
};

const DEL_ICON = {...EDIT_ICON, name: 'trash-can'};

const PostDetailScreen = props => {

    const route = useRoute();
    const {appStyles: styles, theme} = useStyles();
    const docId = route && route.params && route.params.docId;
    const showControls = route && route.params && route.params.showControls;
    const [post, setPost] = useState(null);
    const navigation = useNavigation();
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        async function load() {
            const p = await getPost(docId);
            setPost(p);
        }

        load();
    }, []);

    const handleEdit = () => {
        navigation.push('EDITPOST', {docId});
    };

    const handleDelete = async () => {
        try {
            await deletePost(docId);
            Toast.show({text: 'Post Deleted!', type: 'success'});
            navigation.popToTop();
        } catch (e) {
            Toast.show({text: 'Error: post could not be deleted!', type: 'error'});
            navigation.popToTop();
        }
    };

    return (
        <View>
            {post ? <ScrollView>
                <FirebaseImage mediaId={post.image} style={{width: Metrics.screenWidth, height: 200}}/>
                <View style={styles.insetContainer}>
                    {showControls ? <View style={{flexDirection: 'row', marginBottom: Metrics.marginVertical}}>
                        <Button onPress={handleEdit} containerStyle={{flex: 1, margin: 2}}
                                icon={EDIT_ICON}/>
                        <Button onPress={()=>setShowDeleteModal(true)} containerStyle={{flex: 1, margin: 2}}
                                buttonStyle={{backgroundColor: theme.danger}}
                                icon={DEL_ICON}/>
                    </View> : null}
                    <Text style={styles.H1}>{post.title}</Text>
                    <Text style={styles.H3}>By {post.author}</Text>
                    <Text style={[styles.H5, {color: theme.muted}]}>{formatScreenDates(post.published)}</Text>
                    <Text style={[styles.normalText, {marginTop: Metrics.marginVertical * 2}]}>{post.body}</Text>
                </View>
            </ScrollView> : <Text>Loading...</Text>}
            <OKCancelModal onCancel={() => setShowDeleteModal(false)}
                           onOK={handleDelete}
                           showModal={showDeleteModal}
                           cancelButtonColor={theme.muted}
                           okButtonColor={theme.danger}
                           message={`Delete\n\n "${post && post.title}"?`}/>
        </View>
    );
};

PostDetailScreen.propTypes = {};

export default PostDetailScreen;


