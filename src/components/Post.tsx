import React, { FC, useState } from "react";
import { observer } from "mobx-react-lite";
import { View, Text, Image, TouchableOpacity } from "react-native";

import CommentsFeed from "./CommentsFeed";
import ExpendComments from "./ExpendComments";

import { useFeedStore } from "@/store/feed.store";

import { PostType } from "@/interfaces";
import { FEEDBACK_LIKE_ICON } from '@/consts';

import { postStyle } from '@/styles';

interface PostProps {
    post: PostType;
}

/** Post component
 * 
 * The post component with all its data and comments info
 * @param post - Post object to render its data
 * @returns {JSX.Element} Rendered post component
 */
const Post: FC<PostProps> = observer(({ post }) => {
    const { updatePostLike, fetchAllComments, postCommentsInfo } = useFeedStore();

    const [isExpanded, setIsExpanded] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    const handlePressLike = () => {
        const changeLikeNum = isLiked ? -1 : 1;
        updatePostLike(post.id, changeLikeNum);
        setIsLiked(prev => !prev);
    };

    const handleExpandComments = () => {
        const { comments, count } = postCommentsInfo.get(post.id);

        // If expanded and we haven't fetched all the comments yet 
        if (!isExpanded && comments.length === 1 && count > 1) {
            fetchAllComments(post.id);
        }
        setIsExpanded(prev => !prev);
    };

    return (
        <View style={postStyle.postContainer}>
            <View style={postStyle.postHeader}>
                <Text>{post.author}</Text>
                <Text>{post.createDate.toDateString()}</Text>
            </View>
            
            <Text style={postStyle.postContent}>{post.content}</Text>
            
            {post.imageUrl && (
                <Image
                    style={postStyle.image}
                    source={{ uri: post.imageUrl }}
                />
            )}
            
            <View style={postStyle.interactionsContainer}>
                <View style={postStyle.likeAndExpendBtn}>
                    <View style={postStyle.likeContainer}>
                        <TouchableOpacity onPress={handlePressLike}>
                            <Image
                                style={[postStyle.likeIcon, isLiked ? postStyle.isLikePress : postStyle.isLikeNotPress]}
                                source={{ uri: FEEDBACK_LIKE_ICON }}
                            />
                        </TouchableOpacity>
                        <Text style={postStyle.likesAmount}>{post.likes}</Text>
                    </View>
                    
                    <ExpendComments isExpanded={isExpanded} postId={post.id} handleExpend={handleExpandComments} />
                </View>
                
                <CommentsFeed postId={post.id} isExpanded={isExpanded} />
            </View>
        </View>
    );
});

export default React.memo(Post);