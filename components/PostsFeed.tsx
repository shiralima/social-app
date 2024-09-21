import React, { FC } from "react";
import { observer } from 'mobx-react-lite';
import { ActivityIndicator, FlatList } from 'react-native';

import { useFeedStore } from "../store/feed.store";
import { usePostsInfiniteScroll } from "../hooks/usePostsInfiniteScroll";

import Post from './Post';

/**
 * display posts feed with infinite scrolling
 * @returns {JSX.Element} rendered posts feed
 */
const PostsFeed: FC = () => {
    const { posts } = useFeedStore();
    const { loading, loadPosts } = usePostsInfiniteScroll();

    return (
        <FlatList
            data={posts}
            renderItem={({ item }) => <Post post={item} />}
            keyExtractor={({ id }) => id}
            onEndReached={loadPosts}
            ListFooterComponent={loading ? <ActivityIndicator size='large' color='red' /> : null}
        />
    );
};

export default observer(PostsFeed);
