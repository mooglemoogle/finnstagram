import React, { FC } from 'react';
import { View, Image, Text, Dimensions } from 'react-native';
import styled from '@emotion/native';
import { Comment as CommentType } from '../../redux/posts/types';

export const Comment: FC<CommentType> = props => {
    return (
        <CommentBody>
            <Text style={{ maxWidth: '100%' }}>
                <Text style={{ fontWeight: 'bold' }}>{props.userId}</Text> {props.body}
            </Text>
        </CommentBody>
    );
};

const CommentBody = styled(View)`
    width: 100%;
    padding: 5px;
`;

Comment.displayName = 'Comment';
