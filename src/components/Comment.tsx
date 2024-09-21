import React, { FC } from "react";
import { View, Text, StyleSheet, Image } from 'react-native';

import { CommentType } from '../interfaces/comment.interface';

interface CommentProps {
    comment: CommentType
}

const Comment: FC<CommentProps> = ({ comment }) => {
    return (
        <View style={styles.commentContainer}>
            <View style={styles.commentHeader}>
                <Image
                    style={styles.profileIcon}
                    source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/user-male-circle.png' }}
                />
                <Text style={styles.author}>{comment.author}</Text>
            </View>
            <Text style={styles.content}>{comment.content}</Text>
        </View>
    );
};

// todo delete unused styles
const styles = StyleSheet.create({
    commentContainer: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        margin: 5,
        padding: 7,
        backgroundColor: "#ddd"
    },
    commentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    profileIcon: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginRight: 10,
    },
    author: {
        fontWeight: "bold",
    },
    content: {
        marginLeft: 30,  
    },
});

export default React.memo(Comment);
