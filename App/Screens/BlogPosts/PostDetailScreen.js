/*********************************

 File:       PostDetailScreen.js
 Function:
 Copyright:  Bertco LLC
 Date:       2020-05-23
 Author:     mkahn

 **********************************/

import React, {useReducer, useEffect} from 'react';
import {View, Text, ScrollView, Share} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/core';
import {getPost, deletePost} from '../../Services/Firebase/blogposts';
import FirebaseImage from '../../Components/Media/FirebaseImage';
import Metrics from '../../Themes/Metrics';
import {useStyles} from '../../Themes/ThemeManager';
import {formatScreenDates} from '../../Services/Helpers';
import {Button} from 'react-native-elements';
import OKCancelModal from '../../Components/Modals/OKCancelModal';
import XLogger from '../../Services/XLogger';
import {Toast} from 'native-base';
import PostSkeleton from '../../Components/Skeletons/PostSkeleton';
import ListSkeleton from '../../Components/Skeletons/ListSkeleton';

const EDIT_ICON = {
    name: 'pen',
    type: 'material-community',
    size: 20,
    color: 'white',
};

const DEL_ICON = {...EDIT_ICON, name: 'trash-can'};

const INITIAL_STATE = {
    post: null,
    loading: true,
    loadError: null,
    showDeleteModal: false,
};

const reducer = (state, {type, payload}) => {
    switch (type) {
        case 'LOADING':
            return {...INITIAL_STATE, loading: true};
        case 'LOAD_COMPLETE':
            return {...state, loading: false, post: payload};
        case 'LOAD_FAILED':
            return {...state, loading: false, post: null, loadError: payload};
        case 'SHOW_DELETE_MODAL':
            return {...state, showDeleteModal: payload};
        case 'SHOW_BADLINK_MODAL':
            return {...state, showBadLinkModal: payload};
        default:
            return state;
    }
};


const PostDetailScreen = props => {

    const route = useRoute();
    const {appStyles: styles, theme} = useStyles();
    const docId = route && route.params && route.params.docId;
    const showControls = route && route.params && route.params.showControls;
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    const navigation = useNavigation();

    const {post, loading, loadError, showDeleteModal} = state;

    XLogger.log(`DocId is ${docId}`);

    useEffect(() => {
        async function load() {
            try {
                dispatch({type: 'LOADING'});
                const p = await getPost(docId);
                if (p) {
                    dispatch({type: 'LOAD_COMPLETE', payload: p});
                } else {
                    dispatch({type: 'LOAD_FAILED', payload: 'No such post'});
                }
            } catch (e) {
                dispatch({type: 'LOAD_FAILED', payload: e});
            }
        }
        if (docId){
            load();
        }
    }, [docId]);

    const headerOptions = {
        headerTitle: null,
        headerRight: () => (
            <Button
                onPress={handleShare}
                color={theme.primary}
                type={'clear'}
                titleStyle={{fontSize: 12, color: theme.danger, marginRight: Metrics.marginHorizontal}}
                icon={{
                    name: 'share',
                    type: 'material-community',
                    size: 24,
                    color: theme.primary,
                }}
            />
        ),
    };

    navigation.setOptions(headerOptions);


    const handleShare = async () => {
        try {
            const result = Share.share({
                message: `Check out this post from Toptal Blogster tlb://post/${docId}`,
            });
            if (result.action === Share.sharedAction) {
                Toast.show({text: 'Post shared!', type: 'success'});
            }
        } catch (e) {
            Toast.show({text: 'Error sharing post!', type: 'error'});
        }
    };

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
        } finally {
            dispatch({type: 'SHOW_DELETE_MODAL', payload: false});
        }
    };

    if (loading || loadError) {
        return (
            <View>
                <PostSkeleton/>
                <OKCancelModal onOK={() => navigation.goBack()}
                               showModal={loadError}
                               okButtonColor={theme.primary}
                               message={'There was a problem loading that post. It may have been deleted. Sorry!'}
                               hideCancel={true}
                               okButtonText={'OK'}/>
            </View>);
    }

    return (
        <View>
            <ScrollView>
                <FirebaseImage mediaId={post.image}
                               style={{width: Metrics.screenWidth, minHeight: Metrics.screenHeight / 3.5}}/>
                <View style={styles.insetContainer}>
                    {showControls ? <View style={{flexDirection: 'row', marginBottom: Metrics.marginVertical}}>
                        <Button onPress={handleEdit} containerStyle={{flex: 1, margin: 2}}
                                icon={EDIT_ICON}/>
                        <Button onPress={() => dispatch({type: 'SHOW_DELETE_MODAL', payload: true})}
                                containerStyle={{flex: 1, margin: 2}}
                                buttonStyle={{backgroundColor: theme.danger}}
                                icon={DEL_ICON}/>
                    </View> : null}
                    <Text style={styles.H1}>{post.title}</Text>
                    <Text style={styles.H3}>By {post.author}</Text>
                    <Text style={[styles.H5, {color: theme.muted}]}>{formatScreenDates(post.published)}</Text>
                    <Text style={[styles.normalText, {marginTop: Metrics.marginVertical * 2}]}>{post.body}</Text>
                </View>
            </ScrollView>
            <OKCancelModal onCancel={() => dispatch({type: 'SHOW_DELETE_MODAL', payload: false})}
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


