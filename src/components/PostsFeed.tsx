import React, { FC } from "react";
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

    return (
        <FlatList
            data={posts}
            // Trigger loading more posts when user scrolls to 70% of the list 
            onEndReachedThreshold={0.7}
            keyExtractor={({ id }) => String(id)}
            renderItem={({ item }) => <Post post={item} />}
            // If there are no more posts to load, do not trigger loading
            onEndReached={hasMorePosts ? loadMorePosts : undefined}
            // Render loader if we reach the end of the list
            ListFooterComponent={loadingPosts ? <ActivityIndicator size="large" /> : null}
        />
    );
};

export default observer(PostsFeed);