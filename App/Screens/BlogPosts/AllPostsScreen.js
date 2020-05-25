/*********************************

 File:       AllPostsScreen.js
 Function:   Main landing page
 Copyright:  Bertco LLC
 Date:       2020-05-23
 Author:     mkahn

 **********************************/

import React, {useState} from 'react';
import XLogger from '../../Services/XLogger';
import {useNavigation} from '@react-navigation/native';
import {useBlogPosts} from '../../Services/Firebase/blogposts';
import PostCell from '../../Components/Cells/PostCell';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FlatList, View, RefreshControl, Text} from 'react-native';
import {Input, Item} from 'native-base';
import {useStyles} from '../../Themes/ThemeManager';
import Metrics from '../../Themes/Metrics';
import FullButton from '../../Components/Buttons/FullButton';
import postFilter from '../../Services/Filter/post-filter';

const AllPostsScreen = props => {

    const {appStyles: styles, theme} = useStyles();
    const {posts, isLoading, loadLatestPosts} = useBlogPosts();
    const navigation = useNavigation();
    const [search, setSearch] = useState('');
    const insets = useSafeAreaInsets();

    const handleSearchChanged = t => {
        setSearch(t);
    };

    // const venueSearch = venue => fullVenueFilter(venue, search);
    // const filteredVenues = venues.filter(venueSearch);

    const renderCell = ({item}) => (<PostCell post={item} width={64} height={64}
                                              onPress={() => navigation.push('POST', {docId: item.docId})}/>);

    const postSearch = post => postFilter(post, search);
    const filteredPosts = posts.filter(postSearch);

    return (
        <View style={[styles.insetContainer, {paddingTop: insets.top * 1.25}]}>
            <Item style={{borderBottomColor: 'transparent'}}>
                <Input placeholder="Search"
                       onChangeText={handleSearchChanged}
                       value={search}
                       style={styles.fullWidthTextInput}/>
            </Item>
            {posts && posts.length ?
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

        </View>
    );
};

export default AllPostsScreen;

