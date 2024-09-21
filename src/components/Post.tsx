import React, { FC, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import CommentsFeed from './CommentsFeed';
import { PostType } from '../interfaces/post.interface';
import { observer } from 'mobx-react-lite';
import { useFeedStore } from '../store/feed.store';
import ExpendComments from './ExpendComments';

interface PostProps {
    post: PostType;
}

const Post: FC<PostProps> = observer(({ post }) => {
    const { updatePostLike, fetchAllComments, postCommentsInfo, loadingComments, loadingPosts } = useFeedStore();
    const [isExpend, setIsExpend] = useState(false);
    const [isLikePress, setIsLikePress] = useState(false);

    const handleOnPressLike = () => {
        const changeLikeNum = isLikePress ? -1 : 1;
        updatePostLike(post.id, changeLikeNum);
        setIsLikePress(prev => !prev);
    };

    const handleExpandComments = () => {
        // If become expended and we did'nt fetch all the comments yet 
        // todo find better way to do it or put as const
        if (!isExpend && postCommentsInfo.get(post.id)?.comments.length === 1 && postCommentsInfo.get(post.id)?.count > 1) {
            fetchAllComments(post.id);
        }
        setIsExpend(prev => !prev);
    };

    return (
        <View style={styles.postContainer}>
            <View style={styles.postHeader}>
                <Text>{post.author}</Text>
                <Text>{post.createDate.toDateString()}</Text>
            </View>
            <Text style={styles.postContent}>{post.content}</Text>
            {post.imageUrl && (
                <Image style={styles.image} source={{ uri: post.imageUrl }} />
            )}
            <View style={styles.interactionsContainer}>
                <View style={styles.likeAndExpendBtn}>
                    <View style={styles.likeContainer}>
                        <TouchableOpacity onPress={handleOnPressLike}>
                            <Image
                                style={[styles.likeIcon, isLikePress ? styles.isLikePress : styles.isLikeNotPress]}
                                source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/1/13/Facebook_like_thumb.png" }}
                            />
                        </TouchableOpacity>
                        <Text style={styles.likesAmount}>{post.likes}</Text>
                    </View>
                    {loadingPosts
                        ? null
                        : <ExpendComments isExpend={isExpend} postId={post.id} handleExpend={handleExpandComments} />
                    }
                </View>
                {loadingComments
                    ? <ActivityIndicator />
                    : <CommentsFeed postId={post.id} isExpend={isExpend} />
                }
            </View>
        </View>
    );
});

// todo delete & marge unused/duplicate style
const styles = StyleSheet.create({
    postContainer: {
        borderBottomWidth: 10,
        borderColor: "#ddd",
        paddingBottom: 15,
    },
    postHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15
    },
    postContent: {
        marginHorizontal: 15,
        fontSize: 20
    },
    image: {
        width: "100%",
        height: 200,
        marginTop: 10,
        resizeMode: 'cover',
    },
    interactionsContainer: {
        marginTop: 10,
        marginHorizontal: 15
    },
    likeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    likeIcon: {
        width: 35,
        height: 30,
    },
    likesAmount: {
        marginStart: 10,
    },
    isLikePress: {
        tintColor: "blue"
    },
    isLikeNotPress: {
        tintColor: "gray"
    },
    likeAndExpendBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    }
});

export default React.memo(Post);