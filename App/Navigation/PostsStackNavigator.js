/*********************************

 File:       PostsStackNavigator.js
 Function:
 Copyright:  Bertco LLC
 Date:       2020-05-24
 Author:     mkahn

 **********************************/

import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import VerySimpleView from '../Screens/ZExperimental/VerySimpleView';
import {useTheme} from '../Themes/ThemeManager';
import {exp} from 'react-native-reanimated';
import AllPostsScreen from '../Screens/BlogPosts/AllPostsScreen';
import PostCell from '../Components/Cells/PostCell';
import PostDetailScreen from '../Screens/BlogPosts/PostDetailScreen';


const Stack = createStackNavigator();

const PostStackNavigator = props => {

    const { theme } = useTheme();

    const options = {
        headerShown: false,
        headerStyle: {
            backgroundColor: theme.surface,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
        },
    };

    return (
        <Stack.Navigator screenOptions={options} initialRouteName={'LIST'}>
            <Stack.Screen name="LIST" component={AllPostsScreen} options={{headerShown: false}}/>
            <Stack.Screen name="POST" component={PostDetailScreen} options={{headerShown: true}}/>
        </Stack.Navigator>
    );


};

export default PostStackNavigator;
