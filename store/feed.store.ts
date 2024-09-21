import { action, makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";
import { postsData, commentsData } from "../fakeData";
import { PostType } from "../interfaces/post.interface";
import { CommentType } from "../interfaces/comment.interface";

/**
 * Store for managing the feed state (posts, comments)
 */
export class FeedStore {
    posts: PostType[] = [];
    postComments: Record<string, CommentType[]> = {};

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    //Fetch posts form specific index to other index for good resulats to not bring all the posts together
    fetchPosts(startIndex: number, endIndex: number) {
        setTimeout(() => {
            const newPosts = postsData.slice(startIndex, endIndex);
            this.posts = [...this.posts, ...newPosts];
        }, 3000);
    }


    // Fetch comments for specified post IDs
    fetchComments(displayPostIds: string[]) {
        setTimeout(() => {
            displayPostIds.forEach(id => {
                const currentPostsComments = commentsData.filter(({ postId }) => postId === id);
                this.postComments[id] = currentPostsComments;
            });
        }, 3000);
    }


    // Update the like count for a specific post
    // Get the post id and amount of like to change
    updatePostLike(postId: string, likeChange: number) {
        const post = this.posts.find(({ id }) => id === postId);
        if (post) {
            post.likes += likeChange;
        }
    }

    reset() {
        this.posts = [];
        this.postComments = {};
    }
}

const feedStore = new FeedStore();
const feedStoreContext = createContext(feedStore);
export const useFeedStore = (): FeedStore => useContext(feedStoreContext);