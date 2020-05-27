/*********************************

 File:       AllPostsScreen.js
 Function:   Main landing page
 Copyright:  Bertco LLC
 Date:       2020-05-23
 Author:     mkahn

 **********************************/

import React, {useState, useEffect} from 'react';
import XLogger from '../../Services/XLogger';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useBlogPosts} from '../../Services/Firebase/blogposts';
import PostCell from '../../Components/Cells/PostCell';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FlatList, View, RefreshControl, Text} from 'react-native';
import {Input, Item} from 'native-base';
import {useStyles} from '../../Themes/ThemeManager';
import postFilter from '../../Services/Filter/post-filter';
import useFocusChangeCallbacks from '../../Hooks/useFocusChangeCallbacks';
import NoPosts from './Components/NoPosts';

const AllPostsScreen = props => {

    const {appStyles: styles} = useStyles();
    const {posts, isLoading, loadLatestPosts} = useBlogPosts();
    const navigation = useNavigation();
    const route = useRoute();
    const [search, setSearch] = useState('');
    const insets = useSafeAreaInsets();
    const focused = useFocusChangeCallbacks({onFocus: loadLatestPosts});

    useEffect(()=>{
        const inboundDocId = route && route.params && route.params.docId;
        if (inboundDocId){
            navigation.push('POST', { docId: inboundDocId});
        }
    }, [route]);

    const handleSearchChanged = t => {
        setSearch(t);
    };

    const renderCell = ({item}) => (<PostCell post={item} width={64} height={64}
                                              onPress={() => navigation.push('POST', {docId: item.docId})}
                                                showDocId={false}/>);

    const postSearch = post => postFilter(post, search);
    const filteredPosts = posts.filter(postSearch);

    const hasContent = posts && posts.length;

    return (
        <View style={[styles.insetContainer, {paddingTop: insets.top * 1.25}]}>
            {hasContent ?
                <>
                    <Item style={{borderBottomColor: 'transparent'}}>
                        <Input placeholder="Search"
                               onChangeText={handleSearchChanged}
                               value={search}
                               style={styles.fullWidthTextInput}/>
                    </Item>
                    <View>
                        <Text style={styles.postCountContainer}>Number of posts: {filteredPosts.length}</Text>
                        <FlatList data={filteredPosts}
                                  renderItem={renderCell}
                                  keyExtractor={p => `${p.docId}-${p.image}`}
                                  refreshControl={
                                      <RefreshControl
                                          refreshing={isLoading}
                                          onRefresh={loadLatestPosts}
                                      />}
                        />
                    </View>
                </> : <NoPosts onReload={loadLatestPosts}/>}
        </View>
    );
};

export default AllPostsScreen;

