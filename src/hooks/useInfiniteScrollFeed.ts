import { useEffect, useState } from 'react';

import { useFeedStore } from '../store/feed.store';

import { NUM_LOADS_PER_PAGE } from '@/consts/postsToLoad';

/**
 * Custom hook for managing infinite scroll and dynamic loading of posts.
 * @returns loadMorePosts function.
 */
export const useInfiniteScrollFeed = () => {
    const { fetchPosts, fetchCommentsInfo, loadingPosts, hasMorePosts, setLoadingPosts, getStubsPost } = useFeedStore();
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        loadMorePosts();
    }, []);

    // Load posts and the first comment 
    const loadMorePosts = async () => {

        if (loadingPosts || !hasMorePosts) return;
        setLoadingPosts(true)

        const startIndex = currentPage * NUM_LOADS_PER_PAGE;
        const endIndex = (currentPage + 1) * NUM_LOADS_PER_PAGE;

        try {
            // Fetch the post according to the current page and the first comment for every post
            await fetchPosts(startIndex, endIndex);
            const newPostIds = getStubsPost().slice(startIndex, endIndex).map(({ id }) => id);
            await fetchCommentsInfo(newPostIds);
            setCurrentPage(prev => prev + 1); // Update page number
        } catch (err) {
            console.log('err:', err) // todo handle all errors
        }
        finally {
            setLoadingPosts(false);
        }
    };

    return { loadMorePosts };
};