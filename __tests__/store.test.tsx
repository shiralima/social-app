import { faker } from '@faker-js/faker/.';

import { FeedStore } from '../src/store/feed.store';

import { NUM_LOADS_PER_PAGE } from '../src/consts/postsToLoad';
import { DEFAULT_COMMENTS_NUMBER, DEFAULT_POSTS_NUMBER } from '../src/consts/dataNumbers';

jest.useFakeTimers();


describe("FeedStore", () => {
    let store: FeedStore;

    beforeEach(() => {
        store = new FeedStore(DEFAULT_POSTS_NUMBER, DEFAULT_COMMENTS_NUMBER);
    });

    afterEach(() => {
        store.reset();
    });


    const fetchPostsForSpecificIndex = async () => {
        const randomStartIndex = faker.number.int({ min: 0, max: store.getStubsPost().length - 1 });
        const randomEndIndex = faker.number.int({ min: randomStartIndex + 1, max: store.getStubsPost().length });

        await store.fetchPosts(randomStartIndex, randomEndIndex);

        return randomEndIndex - randomStartIndex;
    }

    it("should store create fake post", async () => {
        expect(store.getStubsPost().length).toBe(DEFAULT_POSTS_NUMBER);
    });

    it("should store create fake comments", async () => {
        expect(store.getStubsComments().length).toBe(DEFAULT_COMMENTS_NUMBER);
    });


    it("should fetch posts from index to index", async () => {
        jest.runAllTimersAsync()

        const postsLength = await fetchPostsForSpecificIndex()

        expect(store.posts.length).toBe(postsLength);
    });

    it("should fetch comments info (first comment and amount) for posts", async () => {

        await fetchPostsForSpecificIndex();

        jest.runAllTimers();
        const postIds = store.posts.map(({ id }) => id);

        await store.fetchCommentsInfo(postIds);
        jest.runAllTimers();

        postIds.forEach(id => {
            const postCommentsInfo = store.postCommentsInfo.get(id);
            expect(postCommentsInfo).toBeDefined();

            const { count, comments } = postCommentsInfo;
            expect(comments.length).toBeLessThanOrEqual(1);
            expect(count).toBeGreaterThanOrEqual(0);
        });
    });



    it("should fetch comments", async () => {
        jest.runAllTimersAsync();
        const postIds = store.getStubsPost().map(post => post.id).slice(0, NUM_LOADS_PER_PAGE);
        await store.fetchCommentsInfo(postIds);

        postIds.forEach(id => {
            const postCommentsInfo = store.postCommentsInfo.get(id);
            expect(postCommentsInfo).toBeDefined();

            const { count, comments } = postCommentsInfo;
            expect(comments.length).toBeLessThanOrEqual(1); // The comments can be 1 of 0 if there is no comments for this post
            expect(count).toBeGreaterThanOrEqual(0);
        });
    });

    it('should fetch all comments for specific post id', async () => {
        const postId = store.getStubsPost()[0].id;
        await store.fetchAllComments(postId);
        jest.runAllTimers();

        const { comments, count } = store.postCommentsInfo.get(postId);

        expect(comments.length).toBe(count);
    });

    it('should update post like count', () => {
        // Get random post to update
        const randomPostIndex = faker.number.int({ min: 0, max: store.getStubsPost().length - 1 });
        const { id, likes } = store.getStubsPost()[randomPostIndex];
        store.posts = store.getStubsPost();
        const updatedPost = store.posts.find(({ id: postId }) => postId === id);

        // Check regular action 
        store.updatePostLike(id, 1);
        expect(updatedPost?.likes).toBe(likes + 1);

        store.updatePostLike(id, -1);
        expect(updatedPost?.likes).toBe(likes);

        // Check action that can be make but we don't use this like this
        const randomNumber = faker.number.int({ min: -1 });

        store.updatePostLike(id, randomNumber);
        expect(updatedPost?.likes).toBe(likes + randomNumber);
    });

    it('should clear store', () => {
        store.posts = store.getStubsPost();
        store.setLoadingPosts(true);
        store.setLoadingComments(true);

        store.reset(); // Check for reset action
        expect(store.posts.length).toBe(0);
        expect(store.loadingPosts).toBe(false);
        expect(store.loadingComments).toBe(false);
    });
});