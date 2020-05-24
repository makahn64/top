/*********************************

 File:       MyPostsScreen.js
 Function:   My posts list page
 Copyright:  Bertco LLC
 Date:       2020-05-23
 Author:     mkahn

 **********************************/

import React, {useState} from 'react';
import XLogger from '../../Services/XLogger';
import {useNavigation} from '@react-navigation/native';
import FilteredListView from '../../Components/Views/FilteredListView';
import {useBlogPosts} from '../../Services/Firebase/blogposts';
import PostCell from '../../Components/Cells/PostCell';
import PostFilterComponent from './PostFilterComponent';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {FlatList, View} from 'react-native';
import {Input, Item} from 'native-base';
import {useStyles} from '../../Themes/ThemeManager';

const MyPostsScreen = props => {

    const { appStyles: styles } = useStyles();
    const posts = useBlogPosts();
    const navigation = useNavigation();
    const [search, setSearch] = useState('');
    const insets = useSafeAreaInsets()

    const handleSearchChanged = t => {
        setSearch(t);
    };

    // const venueSearch = venue => fullVenueFilter(venue, search);
    // const filteredVenues = venues.filter(venueSearch);

    const renderCell = ({item}) => (<PostCell post={item} width={64} height={64}
                                              onPress={() => navigation.push('POST', {docId: item.docId})}/>);

    return (
        <View style={[styles.insetContainer, {paddingTop: insets.top*1.25}]}>
            <Item style={{borderBottomColor: 'transparent'}}>
                <Input placeholder="Search"
                       onChangeText={handleSearchChanged}
                       value={search}
                       style={styles.fullWidthTextInput}/>
            </Item>
            <FlatList data={posts}
                      renderItem={renderCell}
                      keyExtractor={p=>p.id}
            />

        </View>
    );
};

export default MyPostsScreen;

