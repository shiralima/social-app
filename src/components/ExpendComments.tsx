import React, { FC } from "react";
import { observer } from "mobx-react-lite";
import { View, Text, TouchableOpacity } from "react-native";

import { useFeedStore } from "@/store/feed.store";

import { expendCommentsStyle } from "@/styles";

interface ExpendCommentsProps {
    postId: string;
    isExpanded: boolean;
    handleExpend: () => void;
}

/** ExpendComments
 * 
 * The expend component with expend button and amount of the comments
 * @param postId - current post id 
 * @param isExpanded - boolean to detmante if the icon is expended or not, the state is mange by Post
 * @param handleExpend - function to toggle the expended state
 * @returns  {JSX.Element} rendered posts feed
 */
const ExpendComments: FC<ExpendCommentsProps> = observer(({ postId, isExpanded, handleExpend }) => {
    const { postCommentsInfo } = useFeedStore();
    const commentsInfo = postCommentsInfo.get(postId);

    const commentsAmount = commentsInfo?.count || 0;

    return commentsInfo ? (
        <View style={expendCommentsStyle.expendCommentsContainer}>
            <Text>{commentsAmount} comments </Text>

            {commentsAmount > 1 && (
                <TouchableOpacity onPress={handleExpend}>
                    <Text>{isExpanded ? "Collapse" : "Expand"}</Text>
                </TouchableOpacity>
            )}
        </View>
    ) : null
});

export default React.memo(ExpendComments);