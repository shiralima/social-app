import React, { FC } from "react";
import { View, Text, Image } from "react-native";

import { CommentType } from "@/interfaces";
import { USER_PROFILE_ICON } from "@/consts";

import { commentStyle } from "@/styles";

interface CommentProps {
    comment: CommentType
}

/** Comment
 * 
 * component component
 * @param comment - comment object to render its data
 * @returns {JSX.Element} Rendered component component
 */
const Comment: FC<CommentProps> = ({ comment }) => {
    return (
        <View style={commentStyle.commentContainer}>
            <View style={commentStyle.commentHeader}>
                <Image
                    style={commentStyle.profileIcon}
                    source={{ uri: USER_PROFILE_ICON }}
                />
                <Text style={commentStyle.author}>{comment.author}</Text>
            </View>
            <Text style={commentStyle.content}>{comment.content}</Text>
        </View>
    );
};

export default React.memo(Comment);