import React, { FC, useEffect } from "react";
import { FlatList } from 'react-native';
import { observer } from 'mobx-react-lite';

import { useFeedStore } from "../store/feed.store";

import Post from './Post';

// todo jsdoc
const PostsFeed: FC = () => {

    const { post, fetchPosts } = useFeedStore();

    useEffect(() => {
        fetchPosts(); //todo put here async to simulate the fetch ?
    }, [])

    return (
        <FlatList
            data={post}
            renderItem={({ item }) => <Post post={item} />}
            keyExtractor={({ id }) => id}
        />
    );
};

export default observer(PostsFeed);