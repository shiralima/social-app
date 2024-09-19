import React, { FC } from "react";
import { FlatList, StyleSheet } from 'react-native';

import Post from './Post';

import { data } from "../fakeData";


const Feed: FC = () => {
    return (
        <FlatList
            data={data}
            renderItem={({ item }) => <Post post={item} />}
            keyExtractor={({ id }) => id}
        />
    );
};

export default Feed;