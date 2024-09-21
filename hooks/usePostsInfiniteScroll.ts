import { useEffect, useState } from 'react';
import { useFeedStore } from '../store/feed.store';
import { postsData } from '../fakeData';

export const usePostsInfiniteScroll = () => {
    const { fetchPosts, fetchComments } = useFeedStore();
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);

    const NUM_LOUD_PER_PAGE = 5;

    const loadPosts = async () => {
        if (!loading) {
            setLoading(true);
            const startIndex = currentPage * NUM_LOUD_PER_PAGE;
            const endIndex = (currentPage + 1) * NUM_LOUD_PER_PAGE;
            fetchPosts(startIndex, endIndex);
            const newPostIds = postsData.slice(startIndex, endIndex).map(({ id }) => id);
            fetchComments(newPostIds)
            setCurrentPage(prev => prev++);
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPosts();
    }, []);

    return { loadPosts, loading }
}