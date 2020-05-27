/*********************************

 File:       MyPostsScreen.js
 Function:   My posts list page
 Copyright:  Bertco LLC
 Date:       2020-05-23
 Author:     mkahn

 This screen shares a lot with AllPostsScreen and should be refactored at some point.

 **********************************/

import React, {useContext, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useBlogPosts} from '../../Services/Firebase/blogposts';
import PostCell from '../../Components/Cells/PostCell';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FlatList, View, Text, RefreshControl} from 'react-native';
import {Input, Item} from 'native-base';
import {useStyles} from '../../Themes/ThemeManager';
import AuthContext from '../../Hooks/AuthContext';
import Metrics from '../../Themes/Metrics';
import {Button} from 'react-native-elements';
import postFilter from '../../Services/Filter/post-filter';
import {Icon} from 'react-native-elements';
import useFocusChangeCallbacks from '../../Hooks/useFocusChangeCallbacks';
import NoPosts from './Components/NoPosts';

const MyPostsScreen = props => {

    const {appStyles: styles, theme} = useStyles();
    const {posts, loadLatestPosts, isLoading} = useBlogPosts();
    const navigation = useNavigation();
    const [search, setSearch] = useState('');
    const insets = useSafeAreaInsets();
    const {isLoggedIn, firebaseCreds} = useContext(AuthContext);
    const fab = useRef(null);
    useFocusChangeCallbacks({onFocus: loadLatestPosts});


    const handleSearchChanged = t => {
        setSearch(t);
    };

    const handleLogin = () => {
        navigation.navigate('AUTH');
    };

    // const venueSearch = venue => fullVenueFilter(venue, search);
    // const filteredVenues = venues.filter(venueSearch);

    const renderCell = ({item}) => (<PostCell post={item} width={64} height={64}
                                              onPress={() => navigation.push('MYPOST', {
                                                  docId: item.docId,
                                                  showControls: true,
                                              })}/>);

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
                    <Button onPress={handleLogin} title={'Log In'}/>
                </View>
            </View>);
    }

    const email = firebaseCreds.email;
    const usersPosts = posts.filter(p => (p.authorEmail === email));

    const postSearch = post => postFilter(post, search);
    const filteredPosts = usersPosts.filter(postSearch);

    const hasContent = usersPosts && usersPosts.length;

    return (
        <View style={[styles.insetContainer, {paddingTop: insets.top * 1.25, height: '100%'}]}>
            <Text style={styles.sectionText}>Posts by {firebaseCreds.displayName}</Text>
            {hasContent ?
                <View>
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
                </View> : <NoPosts onReload={loadLatestPosts} byYou={true}/>}
            <View style={{position: 'absolute', bottom: 10, right: 10}}
                  delay={500}
                  ref={fab}>
                <Icon
                    reverse
                    name={'pen'}
                    type={'material-community'}
                    color={theme.fab}
                    raised
                    onPress={() => {
                        navigation.push('EDITPOST', {docId: 'new'});
                    }}
                />
            </View>
        </View>);

};

export default MyPostsScreen;

