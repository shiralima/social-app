import React, { FC, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import CommentsFeed from './CommentsFeed';
import { PostType } from '../interfaces/post.interface';
import { useFeedStore } from '../store/feed.store';

interface PostProps {
    post: PostType;
}

//todo jsdoc
const Post: FC<PostProps> = ({ post }) => {

    const { updatePostLike } = useFeedStore();

    const [isLikePress, setIsLikePress] = useState(false);

    const handleOnPressLike = () => {
        const changeLikeNum = isLikePress ? -1 : 1;
        updatePostLike(post.id, changeLikeNum);
        setIsLikePress(prev => !prev);
    };

    return (
        <View style={styles.postContainer}>
            <>
                <Text>
                    {post.author}
                </Text>
                <Text>
                    {post.createDate.toDateString()}
                </Text>
            </>
            <Text>
                {post.content}
            </Text>
            {post.imageUrl && (
                <Image
                    style={styles.image}
                    source={{ uri: post.imageUrl }}
                />
            )}
            <View style={styles.likeContainer}>
                <TouchableOpacity onPress={handleOnPressLike}>
                    <Image
                        style={[styles.likeIcon, isLikePress ? styles.isLikePress : styles.isLikeNotPress]}
                        source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/1/13/Facebook_like_thumb.png" }}
                    />
                </TouchableOpacity>
                <Text style={styles.likesAmount}>
                    {post.likes}
                </Text>
            </View>
            <CommentsFeed />
        </View>
    );
};

const styles = StyleSheet.create({
    postContainer: {
        margin: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        justifyContent: "center",
        paddingBottom: 15,
    },
    image: {
        width: "100%",
        height: 200,
        marginTop: 10,
        resizeMode: 'cover',
    },
    likeContainer: {
        flexDirection: 'row',
        alignItems: "center",
        marginTop: 10,
    },
    likeIcon: {
        width: 35,
        height: 30,
        marginStart: 5,
    },
    likesAmount: {
        marginStart: 5,
    },
    isLikePress: {
        backgroundColor: "blue"
    },
    isLikeNotPress: {
        backgroundColor: "gray"
    }
});

export default React.memo(Post);
