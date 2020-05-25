/*********************************

 File:       blogposts.js
 Function:   Firestore Logic for Blog Posts
 Copyright:  Bertco LLC
 Date:       2020-05-23
 Author:     mkahn

 **********************************/

import firestore from '@react-native-firebase/firestore';
import XLogger from '../XLogger';
import {useState, useEffect} from 'react';

const db = firestore();
const postsCollection = db.collection('posts');

const getPostsCollectionSnapshot = async () => {
    return await postsCollection.get();
};

const getAllPostsAsData = async () => {
    const allPosts = await getPostsCollectionSnapshot();
    return allPosts.docs.map(d => ({
        ...d.data(),
        docId: d.id,
    }));
};

export const getPost = async postId => {
    const snapshot = await postsCollection.doc(postId).get();
    return snapshot.data();
};

export default {getAllPostsAsData};

const comparePublished = (a, b) => (b.published.toDate().getTime() - a.published.toDate().getTime());

export const useBlogPosts = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const loadLatestPosts = async () => {
        setIsLoading(true);
        try {
            const _posts = await getAllPostsAsData();
            setPosts(_posts.sort(comparePublished));
        } catch (e) {
            XLogger.logDebug(`Error fetching posts! ${e.message}`);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loadLatestPosts();
    }, []);

    return {posts, loadLatestPosts, isLoading};
};





