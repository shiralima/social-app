import React, { FC } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFeedStore } from '../store/feed.store';

interface ExpendCommentsProps {
    postId: string;
    isExpend: boolean;
    handleExpend: () => void;
}

const ExpendComments: FC<ExpendCommentsProps> = ({ postId, isExpend, handleExpend }) => {
    const { postCommentsInfo } = useFeedStore();
    const commentsInfo = postCommentsInfo.get(postId);

    const commentsAmount = commentsInfo?.count || 0;

    //todo change expend to icon
    return (
        <View style={styles.expendCommentsContainer}>
            <Text>{commentsAmount}</Text>
            {commentsAmount > 1
                ? <TouchableOpacity onPress={handleExpend}>
                    <Text>{isExpend ? " collapse " : " expand "}</Text>
                </TouchableOpacity>
                : null
            }
        </View>
    );
};

const styles = StyleSheet.create({
    expendCommentsContainer: {
        flexDirection: 'row',
        marginHorizontal: 15
    },
});

export default React.memo(ExpendComments);