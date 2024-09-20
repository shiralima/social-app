import React, { FC, useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View, Text } from 'react-native';

import { useFeedStore } from "../store/feed.store";

import Comment from './Comment';

// todo jsdoc
const CommentsFeed: FC = () => {

    const { comments, fetchComments } = useFeedStore();

    const [isExpend, setIsExpend] = useState(false);

    useEffect(() => {
        fetchComments(); //todo put here async to simulate the fetch ?
    }, [])

    const handleExpend = () => {
        setIsExpend(prev => !prev);
    }

    return (
        <View>
            <TouchableOpacity onPress={handleExpend}>
                <Text>expend comments</Text>
            </TouchableOpacity>
            {
                comments.length > 0
                    ? !isExpend
                        ? <Comment comment={comments[0]} />
                        : <FlatList
                            data={comments}
                            renderItem={({ item }) => <Comment comment={item} />}
                            keyExtractor={({ id }) => id}
                        />
                    : null
            }
        </View>
    );
};

export default CommentsFeed;