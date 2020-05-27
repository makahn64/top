/*********************************

 File:       MyPostsStackNavigator.js
 Function:
 Copyright:  Bertco LLC
 Date:       2020-05-24
 Author:     mkahn

 **********************************/

import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import VerySimpleView from '../Screens/ZExperimental/VerySimpleView';
import {useTheme} from '../Themes/ThemeManager';
import PostDetailScreen from '../Screens/BlogPosts/PostDetailScreen';
import MyPostsScreen from '../Screens/BlogPosts/MyPostsScreen';
import EditPostScreen from '../Screens/BlogPosts/EditPostScreen';


const Stack = createStackNavigator();

const MyPostsStackNavigator = props => {

    const { theme } = useTheme();

    const options = {
        headerShown: false,
        headerStyle: {
            backgroundColor: '#f0f0f0',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
        },
        headerBackTitle: null
    };

    return (
        <Stack.Navigator screenOptions={options} initialRouteName={'MY POSTS'}>
            <Stack.Screen name="MY POSTS" component={MyPostsScreen} options={{headerShown: false}}/>
            <Stack.Screen name="MYPOST" component={PostDetailScreen} options={{headerShown: true, headerTitle: ''}}/>
            <Stack.Screen name={'EDITPOST'} component={EditPostScreen} options={{headerShown: true, headerTitle: 'Post Edit'}}/>
        </Stack.Navigator>
    );


};

export default MyPostsStackNavigator;
