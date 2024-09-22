import { makeAutoObservable, runInAction } from "mobx";
import { createContext, useContext } from "react";

import { PostType } from "../interfaces/post.interface";
import { CommentType } from "../interfaces/comment.interface";

import { DEFAULT_POSTS_NUMBER, DEFAULT_COMMENTS_NUMBER } from "../consts/dataNumbers";
import { NUM_LOADS_PER_PAGE } from "../consts/postsToLoad";
import { generatePosts } from "../utilities/generatePosts";
import { generateComments } from "../utilities/generateComments";

interface PostCommentsInfo {
    comments: CommentType[];
    count: number;
}

/**
 * Store for managing feed state (posts, comments).
 * 
 * This store simulates a database with stub data for posts and comments,
 * which is used to mimic fetching data from a server. 
 * The "database" is created at the store's initialization and serves as a
 * mock for testing and development.
 */
export class FeedStore {
    posts: PostType[] = [];
    postCommentsInfo: Map<string, PostCommentsInfo> = new Map();
    loadingComments: boolean = false;
    loadingPosts: boolean = false;
    hasMorePosts: boolean = true;

    // Those states are for simulate the data in DB
    protected stubsPost: PostType[] = [];
    protected stubsComments: CommentType[] = [];

    constructor(postsAmount: number = DEFAULT_POSTS_NUMBER, commentsAmount: number = DEFAULT_COMMENTS_NUMBER) {
        makeAutoObservable(this, {}, { autoBind: true });
        this.generateStubsData(postsAmount, commentsAmount)
    }

    private generateStubsData(postAmount: number, commentAmount: number) {
        const posts = generatePosts(postAmount);
        this.stubsPost = posts;
        const ids = posts.map(({ id }) => id);
        const comments = generateComments(ids, commentAmount);
        this.stubsComments = comments;
    }

    // Fetch posts from specified index range for better performance.
    // This method avoids fetching all posts at once, enhancing loading speed.
    async fetchPosts(startIndex: number, endIndex: number) {
        const newPosts = await new Promise<PostType[]>(resolve =>
            setTimeout(() => resolve(this.stubsPost.slice(startIndex, endIndex)), 1000)
        );

        runInAction(() => {
            this.posts = [...this.posts, ...newPosts];
            this.hasMorePosts = newPosts.length >= NUM_LOADS_PER_PAGE; // Check if there are more posts to load
        });
    }

    // Fetch comment count and first comment for specified post IDs
    async fetchCommentsInfo(postIds: string[]) {
        await new Promise<void>(resolve =>
            setTimeout(() => {
                runInAction(() => {
                    postIds.forEach(postId => {
                        const postComments = this.stubsComments.filter(({ postId: id }) => id === postId);
                        const count = postComments.length;
                        if (!count) this.postCommentsInfo.set(postId, { comments: [], count: 0 }); // Prevent bugs when there is no key 

                        const firstComment = [postComments[0]];
                        this.postCommentsInfo.set(postId, { comments: firstComment, count });
                    });
                });
                resolve();
            }, 1000)
        );
    }

    // Fetch all comments for a specific post ID
    async fetchAllComments(postId: string) {
        this.setLoadingComments(true);
        await new Promise<void>(resolve =>
            setTimeout(() => {
                runInAction(() => {
                    const postComments = this.stubsComments.filter(({ postId: id }) => id === postId);
                    const existingInfo = this.postCommentsInfo.get(postId);
                    if (existingInfo) {
                        existingInfo.comments = postComments;
                    } else {
                        this.postCommentsInfo.set(postId, { comments: postComments, count: postComments.length });
                    }
                    this.setLoadingComments(false);
                });
                resolve();
            }, 1000)
        );
    }

    // Update the like count for a specific post
    updatePostLike(postId: string, likeChange: number) {
        runInAction(() => {
            const post = this.posts.find(({ id }) => id === postId);
            if (post) {
                post.likes += likeChange;
            }
        });
    }

    setLoadingPosts = (isLoading: boolean) => {
        runInAction(() => {
            this.loadingPosts = isLoading;
        });
    }

    setLoadingComments = (isLoading: boolean) => {
        runInAction(() => {
            this.loadingComments = isLoading;
        });
    }

    //! Those functions are just for testing - do not use them
    getStubsPost = () => {
        return this.stubsPost;
    }

    getStubsComments = () => {
        return this.stubsComments;
    }


    reset() {
        runInAction(() => {
            this.posts = [];
            this.postCommentsInfo.clear();
            this.loadingComments = false;
            this.loadingPosts = false;
            this.hasMorePosts = true;
            this.stubsComments = [];
            this.stubsPost = [];
        });
    }
}

const feedStore = new FeedStore();
const feedStoreContext = createContext(feedStore);
export const useFeedStore = (): FeedStore => useContext(feedStoreContext);