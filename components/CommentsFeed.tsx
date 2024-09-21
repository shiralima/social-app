import React, { FC, useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View, Text } from 'react-native';

import Comment from './Comment';
import { useFeedStore } from "../store/feed.store";
import { observer } from "mobx-react-lite";

type PropsCommentsFeed = {
    postId: string;
};

// todo jsdoc
const CommentsFeed: FC<PropsCommentsFeed> = ({ postId }) => {

    const [isExpend, setIsExpend] = useState(false);

    const { postComments } = useFeedStore();

    const handleExpend = () => {
        setIsExpend(prev => !prev);
    }

    const comments = postComments[postId];
  
    return (
        <View>
            {comments?.length > 0 ?
                <>
                    <TouchableOpacity onPress={handleExpend}>
                        <Text>{isExpend ? "collapse" : "expand"}</Text>
                    </TouchableOpacity>

                    {isExpend
                        ? < FlatList
                            data={postComments[postId]}
                            renderItem={({ item }) => <Comment comment={item} />}
                            keyExtractor={({ id }) => id}
                        />
                        : null
                    }
                </>
                : null
            }
        </View>
    );
};

export default observer(CommentsFeed);
