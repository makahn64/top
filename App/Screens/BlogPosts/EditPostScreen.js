/*********************************

 File:       EditPostScreen.js
 Function:   Create/Edit Post
 Copyright:  Bertco LLC
 Date:       2020-05-25
 Author:     mkahn

 **********************************/


import React, {useState, useEffect, useReducer, useContext} from 'react';
import {View, Text, ScrollView, TextInput, ActivityIndicator} from 'react-native';
import {useStyles, useTheme} from '../../Themes/ThemeManager';
import ImageAddEdit from '../../Components/Media/ImageAddEdit';
import {useNavigation, useRoute} from '@react-navigation/core';
import Metrics from '../../Themes/Metrics';
import {Button} from 'react-native-elements';
import XLogger from '../../Services/XLogger';
import storage from '@react-native-firebase/storage';
import {getPost, savePost} from '../../Services/Firebase/blogposts';
import Loading from '../../Components/Views/Loading';
import AuthContext from '../../Hooks/AuthContext';
import {Toast} from 'native-base';
import PrettyWaitingModal from '../../Components/Modals/PrettyWaitingModal';
import { v4 as uuid } from 'uuid';


const INITIAL_EDIT_STATE = {
    author: '',
    authorEmail: '',
    published: '',
    title: '',
    body: '',
    image: '',
    newImage: null,
    isLoaded: false,
    docId: null,
    showDeleteModal: false,
    modalMessage: null,
};

const postReducer = (state, {payload, type}) => {
    XLogger.logSilly(`Reducer: ${type}`);
    switch (type) {
        case 'NEW_POST':
            return {...INITIAL_EDIT_STATE, isLoaded: true};
        case 'FETCHED_POST':
            return {...payload, isLoaded: true};
        case 'REQUEST_DELETE':
            return {...state, showDeleteModal: true};
        case 'SET_TITLE':
            return {...state, title: payload};
        case 'SET_BODY':
            return {...state, body: payload};
        case 'SET_IMAGE':
            return {...state, newImage: payload, image: null};
        case 'SET_ACTIVITY_MODAL':
            return {...state, modalMessage: payload};
        default:
            return state;
    }
};

const EditPostScreen = props => {

    const {appStyles: styles} = useStyles();
    const { theme } = useTheme();
    const [state, dispatch] = useReducer(postReducer, INITIAL_EDIT_STATE);
    const {firebaseCreds, isLoggedIn} = useContext(AuthContext);
    const navigation = useNavigation();
    const route = useRoute();
    const docId = route && route.params && route.params.docId;

    const {author, authorEmail, published, title, body,
        newImage, isLoaded, showDeleteModal, modalMessage, image} = state;

    navigation.setOptions({ headerTitle: (docId!=='new' ? 'Edit Post' : 'Create Post') });

    const loadPost = async postId => {
        try {
            const p = await getPost(postId);
            dispatch({type: 'FETCHED_POST', payload: p});
        } catch (e) {
            // todo should have popup here to let user know, maybe toast
            XLogger.logError(`Error fetching post ${postId}`);
        }
    };

    useEffect(() => {
            if (docId === 'new') {
                XLogger.log('New post');
                dispatch({type: 'NEW_POST'});
            } else if (docId) {
                loadPost(docId);
            }
        }, [docId],
    );


    const handleSave = async () => {
        XLogger.logDebug('should save');

        try {

            let imageName;

            // image is set null when a new image comes in from picker
            if (!image) {
                // new image, need to upload
                imageName = `${uuid()}.jpg`;
                XLogger.logSilly(`Uploading new image ${imageName}...`);
                dispatch(({type: 'SET_ACTIVITY_MODAL', payload: 'Uploading image...'}));
                const ref = storage().ref(imageName);
                await ref.putString(newImage.data, 'base64', {contentType: 'image/jpeg'});
            }

            const postPayload = {
                title, body,
                author: author || displayName,
                authorEmail: authorEmail || email,
                published: published || new Date(),
                image: imageName || image
            };

            dispatch(({type: 'SET_ACTIVITY_MODAL', payload: 'Saving post...'}));
            await savePost(postPayload, docId);
            Toast.show({text: 'Post Saved!', type: 'success'});
            dispatch(({type: 'SET_ACTIVITY_MODAL', payload: null}));
            navigation.popToTop();

        } catch (e) {
            // todo not the best error message :)
            Toast.show({text: 'Error saving post! Check your internet connection.', type: 'danger'});
        }

    };

    const handleImageChange = imageStruct => {
        //XLogger.log(imageStruct);
        dispatch({type: 'SET_IMAGE', payload: imageStruct});

    };

    const isValid = (title.length > 1) && (body.length > 5) && (image || newImage);

    if (!isLoggedIn){
        // situation where editing and logout
        navigation.popToTop();
        return null;
    }

    if (!isLoaded) {
        return (
            <Loading message="Loading Post"/>
        );
    }

    const {email, displayName} = firebaseCreds;


    return (
        <View>
            <ScrollView>
                <ImageAddEdit onImageChange={handleImageChange} imageName={image}/>
                <View style={[styles.insetContainer, {backgroundColor: theme.background}]}>
                    <Button title="SAVE" onPress={handleSave} disabled={!isValid}
                            style={{marginBottom: Metrics.marginVertical}}/>
                    <TextInput
                        autoCapitalize="words"
                        autoComplete="none"
                        autoCorrect={true}
                        autoFocus={false}
                        onChangeText={payload => dispatch({type: 'SET_TITLE', payload})}
                        placeholder="Title"
                        returnKeyLabel="next"
                        returnKeyType="next"
                        style={{...styles.fullWidthTextInput, marginTop: Metrics.marginVertical, color: theme.text}}
                        editable={true}
                        value={title}
                        placeholderTextColor={theme.muted}/>
                    <TextInput
                        autoCapitalize="sentences"
                        autoComplete="none"
                        autoCorrect={true}
                        autoFocus={false}
                        onChangeText={payload => dispatch({type: 'SET_BODY', payload})}
                        placeholder="Post Text"
                        returnKeyLabel="next"
                        returnKeyType="next"
                        style={{...styles.fullWidthTextInput, marginTop: Metrics.marginVertical, minHeight: 300, color: theme.text}}
                        editable={true}
                        value={body}
                        multiline={true}
                        numberOfLines={20}
                        placeholderTextColor={theme.muted}/>

                </View>
            </ScrollView>
            <PrettyWaitingModal showModal={!!modalMessage} message={modalMessage} showActivityIndicator={true}/>
        </View>

    );
};

EditPostScreen.propTypes = {};

export default EditPostScreen;


