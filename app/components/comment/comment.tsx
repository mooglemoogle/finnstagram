import React, { FC } from 'react';
import { View, Image, Text, Dimensions } from 'react-native';
import styled from '@emotion/native';
import {Comment as CommentType} from '../../redux/posts/types';

export const Comment: FC<CommentType> = props => {

    return (
        <CommentBody>
            <Text style={{fontWeight: 'bold'}}>{props.userId} <Text>{props.body}</Text></Text>
        </CommentBody>
    );
};

const CommentBody = styled(View)`
    width: 95%;
    padding-left: 15%;
    padding-bottom: 1%
`

Comment.displayName = 'Comment';
