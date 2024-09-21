import React, { FC } from "react";
import { observer } from "mobx-react-lite";
import { ActivityIndicator, FlatList } from "react-native";

import { useFeedStore } from "../store/feed.store";
import { useInfiniteScrollFeed } from "../hooks/useInfiniteScrollFeed";

import Post from "./Post";

/**
 * display posts feed with infinite scrolling
 * @returns {JSX.Element} rendered posts feed
 */
const PostsFeed: FC = () => {
    const { posts, loadingPosts, hasNoMorePosts } = useFeedStore();
    const { loadFullPostsData } = useInfiniteScrollFeed();

    return (
        <FlatList
            data={posts}
            onEndReachedThreshold={0.7}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => <Post post={item} />}
            onEndReached={hasNoMorePosts ? undefined : loadFullPostsData}
            ListFooterComponent={loadingPosts ? <ActivityIndicator size="large" /> : null}
        />
    );
};

export default observer(PostsFeed);