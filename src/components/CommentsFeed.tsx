import React, { FC } from "react";
import { FlatList, View, StyleSheet, ActivityIndicator } from 'react-native';
import { useFeedStore } from "../store/feed.store";
import { observer } from "mobx-react-lite";

import Comment from './Comment';

type PropsCommentsFeed = {
    postId: string;
    isExpend: boolean;
};

const CommentsFeed: FC<PropsCommentsFeed> = ({ postId, isExpend }) => {
    const { postCommentsInfo, loadingComments, loadingPosts } = useFeedStore();
    const commentsInfo = postCommentsInfo.get(postId);

    if (!loadingPosts && commentsInfo) {
        const comments = commentsInfo.comments

        return (
            <View style={styles.commentsFeedContainer}>
                {isExpend
                    ? loadingComments
                        ?
                        <>
                            <Comment comment={comments[0]} />
                            <ActivityIndicator />
                        </>
                        : <FlatList
                            data={comments}
                            renderItem={({ item }) => <Comment comment={item} />}
                            keyExtractor={({ id }) => id}
                        />
                    : <Comment comment={comments[0]} />
                }
            </View>
        )
    } else return (<></>)
};

const styles = StyleSheet.create({
    commentsFeedContainer: {
        marginTop: 10,
    },
    expandIcon: {
        width: 20,
        height: 20,
        alignSelf: "flex-end",
    },
});

export default observer(CommentsFeed);