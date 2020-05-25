/*********************************

 File:       MyPostsScreen.js
 Function:   My posts list page
 Copyright:  Bertco LLC
 Date:       2020-05-23
 Author:     mkahn

 **********************************/

import React, {useContext, useRef, useState} from 'react';
import XLogger from '../../Services/XLogger';
import {useNavigation} from '@react-navigation/native';
import FilteredListView from '../../Components/Views/FilteredListView';
import {useBlogPosts} from '../../Services/Firebase/blogposts';
import PostCell from '../../Components/Cells/PostCell';
import PostFilterComponent from './PostFilterComponent';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {FlatList, View, Text, RefreshControl} from 'react-native';
import {Input, Item} from 'native-base';
import {useStyles} from '../../Themes/ThemeManager';
import AuthContext from '../../Hooks/AuthContext';
import Metrics from '../../Themes/Metrics';
import FullButton from '../../Components/Buttons/FullButton';
import postFilter from '../../Services/Filter/post-filter';
import * as Animatable from 'react-native-animatable';
import {Icon} from 'react-native-elements';

const MyPostsScreen = props => {

    const {appStyles: styles, theme} = useStyles();
    const {posts, loadLatestPosts, isLoading} = useBlogPosts();
    const navigation = useNavigation();
    const [search, setSearch] = useState('');
    const insets = useSafeAreaInsets();
    const {isLoggedIn, firebaseCreds} = useContext(AuthContext);
    const fab = useRef(null);
    const [showFab, setShowFab] = useState(false);

    const handleSearchChanged = t => {
        setSearch(t);
    };

    const handleLogin = () => {
        navigation.navigate('AUTH');
    };

    // const venueSearch = venue => fullVenueFilter(venue, search);
    // const filteredVenues = venues.filter(venueSearch);

    const renderCell = ({item}) => (<PostCell post={item} width={64} height={64}
                                              onPress={() => navigation.push('POST', {docId: item.docId})}
                                              showEmail={false}/>);

    if (!isLoggedIn) {
        return (
            <View style={[styles.insetContainer, {
                flex: 1,
                paddingTop: insets.top * 1.25,
                justifyContent: 'space-around',

            }]}>
                <View>
                    <Text style={[styles.titleText]}>PLEASE LOG IN</Text>
                    <Text
                        style={[styles.H3, {textAlign: 'center', marginTop: Metrics.marginVertical * 4, padding: 20}]}>You
                        must be logged in to post or manage your past posts.</Text>
                </View>
                <View style={{padding: Metrics.marginHorizontal * 2}}>
                    <FullButton onPress={handleLogin} text={'Log In'} fullWidth/>
                </View>
            </View>);
    }

    const email = firebaseCreds.email;
    const usersPosts = posts.filter(p => (p.authorEmail === email));

    const postSearch = post => postFilter(post, search);
    const filteredPosts = usersPosts.filter(postSearch);

    return (
        <View style={[styles.insetContainer, {paddingTop: insets.top * 1.25, height: '100%'}]}>
            <Text style={styles.H2}>Posts by {firebaseCreds.displayName}</Text>
            <Item style={{borderBottomColor: 'transparent'}}>
                <Input placeholder="Search"
                       onChangeText={handleSearchChanged}
                       value={search}
                       style={styles.fullWidthTextInput}/>
            </Item>
            {filteredPosts && filteredPosts.length ?
                <View>
                    <Text style={styles.postCountContainer}>Number of posts: {filteredPosts.length}</Text>
                    <FlatList data={filteredPosts}
                              renderItem={renderCell}
                              keyExtractor={p => p.docId}
                              refreshControl={
                                  <RefreshControl
                                      refreshing={isLoading}
                                      onRefresh={loadLatestPosts}
                                  />}
                    />
                </View> : <View>
                    <Text style={[styles.sectionText, {marginTop: Metrics.marginVertical * 3}]}>There are no posts in
                        the database.</Text>
                    <FullButton onPress={loadLatestPosts} text={'Reload'} outline/>
                </View>}
            <View style={{position: 'absolute', bottom: 10, right: 10}}
                             delay={500}
                             ref={fab}>
                <Icon
                    reverse
                    name={'pen'}
                    type={'material-community'}
                    color={theme.fab}
                    raised
                    onPress={() => {}}
                />
            </View>
        </View>);

};

export default MyPostsScreen;

