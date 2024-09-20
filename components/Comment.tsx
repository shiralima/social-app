import React, { FC } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import { CommentType } from '../interfaces/comment.interface';

interface CommentProps {
    comment: CommentType
}

// todo jsdoc
const Comment: FC<CommentProps> = ({ comment }) => {

    return (
        <View style={styles.commentContainer}>
            <Text>
                {comment.author}
            </Text>
            <Text>
                {comment.content}
            </Text>
        </View>
    );
};

//todo separate to styles folder
const styles = StyleSheet.create({
    commentContainer: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        justifyContent: "center",
    },
});

export default React.memo(Comment);