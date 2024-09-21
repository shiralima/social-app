import { makeAutoObservable, runInAction } from "mobx";
import { createContext, useContext } from "react";
import { STUBS_POSTS, STUBS_COMMENTS } from "../consts/fakeData";
import { PostType } from "../interfaces/post.interface";
import { CommentType } from "../interfaces/comment.interface";

interface PostCommentsInfo {
    comments: CommentType[];
    count: number;
}

/**
 * store for managing the feed state (posts, comments)
 * 
 * 
 */

interface PostCommentsInfo {
    comments: CommentType[];
    count: number;
}
const NUM_LOADS_PER_PAGE = 3;

export class FeedStore {
    posts: PostType[] = [];
    postCommentsInfo: Map<string, PostCommentsInfo> = new Map();
    loadingComments: boolean = false;
    loadingPosts: boolean = false;
    hasNoMorePosts: boolean = false;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    // Fetch posts from specific index to another index for better performance, not fetching all posts at once.
    // Here we dont set the load becuse the loadingPost flag is for full post data, form this funciton 
    // And form fetchCommentsInfo funciton so we handle the load in the infinate load 
   async fetchPosts(startIndex: number, endIndex: number) {

    const newPosts = await new Promise<PostType[]>(resolve =>
        setTimeout(() => {
            resolve(STUBS_POSTS.slice(startIndex, endIndex));
        }, 1000)
    );

    runInAction(() => {
        this.posts = [...this.posts, ...newPosts];

        if (newPosts.length < NUM_LOADS_PER_PAGE) {
            this.hasNoMorePosts = false;
        }
    });
}
    // Fetch the count and the first comment for specified post IDs
    // In this function we do'nt set the loading comments to true beacuse this couse loader to render and
    // when we call to this function we also call to loading posts. this data is like anther data that related to 
    // the post and we dont want to display the post before it loaded
    async fetchCommentsInfo(postIds: string[]) {
        await new Promise<void>(resolve =>
            setTimeout(() => {
                runInAction(() => {
                    postIds.forEach(postId => {
                        const postComments = STUBS_COMMENTS.filter(({ postId: id }) => id === postId);
                        const count = postComments.length;
                        if (!count) return;

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
                    const postComments = STUBS_COMMENTS.filter(({ postId: id }) => id === postId);
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

    reset() {
        runInAction(() => {
            this.posts = [];
            this.postCommentsInfo.clear();
            this.loadingComments = false;
            this.loadingPosts = false;
            this.hasNoMorePosts = false;
        });
    }
}

const feedStore = new FeedStore();
const feedStoreContext = createContext(feedStore);
export const useFeedStore = (): FeedStore => useContext(feedStoreContext);