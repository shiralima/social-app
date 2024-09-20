import { makeAutoObservable } from "mobx";

import { createContext, useContext } from "react";
import { postsData, commentsData } from "../fakeData";

import { PostType } from "../interfaces/post.interface";
import { CommentType } from "../interfaces/comment.interface";

export class FeedStore {
    post: PostType[] = [];
    comments: CommentType[] = [];

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    fetchPosts() {
        setTimeout(() => {
            this.post = postsData;
        }, 1000);
    }

    fetchComments() {
        setTimeout(() => {
            this.comments = commentsData; 
        }, 1000);
    }

    updatePostLike(postId: string, changeLikeNum: number) {
        const post = this.post.find(({ id }) => id === postId);
        if (post) {
            post.likes += changeLikeNum;
        }
    }

    reset() {
        this.post = [];
        this.comments = [];
    }
}

const feedStore = new FeedStore();
const feedStoreContext = createContext(feedStore);
export const useFeedStore = (): FeedStore => useContext(feedStoreContext);