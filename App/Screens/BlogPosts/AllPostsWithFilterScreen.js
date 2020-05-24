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
import FilteredListView from '../../Components/Views/FilteredListView';
import {useBlogPosts} from '../../Services/Firebase/blogposts';
import PostCell from '../../Components/Cells/PostCell';
import PostFilterComponent from './PostFilterComponent';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';

const VenueListScreen = props => {

    const posts = useBlogPosts();
    const navigation = useNavigation();
    const [search, setSearch] = useState('');


    XLogger.log('Venue List render');

    const searchChanged = t => {
        setSearch(t);
    };

    // const venueSearch = venue => fullVenueFilter(venue, search);
    // const filteredVenues = venues.filter(venueSearch);

    const renderCell = ({item}) => (<PostCell post={item} width={64} height={64}
                                              onPress={() => navigation.navigate('PostDetails', {id: item.id})}/>);

    return (
            <FilteredListView renderItem={renderCell}
                              data={posts}
                              onSearchChanged={searchChanged}
                              FilterSetupOverlay={() => (<PostFilterComponent/>)}/>
    );
};

export default VenueListScreen;

