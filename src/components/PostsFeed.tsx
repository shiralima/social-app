import React, { FC, useCallback } from "react";
import { observer } from "mobx-react-lite";
import { ActivityIndicator, FlatList } from "react-native";

import Post from "./Post";

import { useFeedStore } from "@/store/feed.store";
import { useInfiniteScrollFeed } from "@/hooks/useInfiniteScrollFeed";


/** PostsFeed
 * 
 * Display posts feed with infinite scrolling 
 * @returns {JSX.Element} Rendered posts feed
 */
const PostsFeed: FC = () => {
    const { loadMorePosts } = useInfiniteScrollFeed();
    const { posts, loadingPosts, hasMorePosts } = useFeedStore();

    // Render loader if we reach the end of the list
    const renderItem = useCallback(({ item }) => {
        return <Post post={item} />
    }, []);

    const loaderComponent = useCallback(() => {
        return loadingPosts ? <ActivityIndicator size="large" /> : null;
    }, [loadingPosts]);

    return (
        <FlatList
            data={posts}
            windowSize={10}
            renderItem={renderItem}
            // Trigger loading more posts when user scrolls to 70% of the list 
            onEndReachedThreshold={0.7}
            keyExtractor={({ id }) => id}
            ListFooterComponent={loaderComponent}
            // If there are no more posts to load, do not trigger loading
            onEndReached={hasMorePosts ? loadMorePosts : undefined}
        />
    );
};

export default observer(PostsFeed);