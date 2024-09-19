import React, { FC } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { PostType } from '../types/interfaces/post.interface';

interface PostProps {
    post: PostType
}

const Post: FC<PostProps> = ({ post }) => {
    return (
        <View style={styles.postContainer}>
            <Text>{post.title}</Text>
            <Image
                style={styles.image}
                source={{ uri: "https://picsum.photos/100" }}
            />
            <TouchableOpacity style={styles.likeImage}>
                <Image
                    style={styles.likeImage}
                    source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/1/13/Facebook_like_thumb.png" }}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    postContainer: {
        margin: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        justifyContent: "center",
    },
    image: {
        width: 100,
        height: 100,
        marginTop: 10,
    },
    likeImage: {
        width: 35,
        height: 30,
        marginTop: 10,
        marginBottom: 15
    }
});

export default React.memo(Post);