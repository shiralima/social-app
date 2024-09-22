import React, { FC, useCallback } from "react";
import { observer } from "mobx-react-lite";
import { FlatList, View, ActivityIndicator } from "react-native";

import Comment from "./Comment";
import { useFeedStore } from "@/store/feed.store";

import { commentsFeedStyle } from "@/styles";

type CommentsFeedProps = {
    postId: string;
    isExpanded: boolean;
    loadingComments: boolean;
};

/** CommentsFeed
 * 
 * The component that displays comments for a given post
 * @param postId - The id of the current post
 * @param isExpanded - Boolean indicating whether comments are expanded or not
 * @param loadingComments - Loading boolean for comments 
 * @returns {JSX.Element | null} Rendered comments or null if no comments
 */
const CommentsFeed: FC<CommentsFeedProps> = ({ postId, isExpanded, loadingComments }) => {
    const { postCommentsInfo } = useFeedStore();
    const commentsInfo = postCommentsInfo.get(postId);


    if (!commentsInfo || !commentsInfo.comments.length || commentsInfo.count === 0) {
        return null;
    }

    const renderItem = useCallback(({ item }) => {
        return <Comment comment={item} />
    }, []);

    const { comments } = commentsInfo;

    return (
        <View style={commentsFeedStyle.commentsFeedContainer}>
            {loadingComments
                ? <>
                    <ActivityIndicator />
                    {comments.length > 0 && <Comment comment={comments[0]} />}
                </>
                : isExpanded && commentsInfo.count > 1
                    ? <FlatList
                        data={comments}
                        renderItem={renderItem}
                        keyExtractor={({ id }) => id}
                    />
                    : <Comment comment={comments[0]} />
            }
        </View>
    );
};
export default observer(CommentsFeed);