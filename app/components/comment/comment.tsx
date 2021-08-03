import React, { FC } from 'react';
import { View, Image, Text, PixelRatio } from 'react-native';
import styled from '@emotion/native';
import {Comment as CommentType} from '../../redux/posts/types';

export const Comment: FC<Partial<CommentType>> = props => {

    return (
        <CommentBody>
            <Text style={{fontWeight: 'bold'}}>{props.displayName} <Text style={{fontWeight: 'normal'}}>{props.body}</Text></Text>
        </CommentBody>
    );
};

const CommentBody = styled(View)`
    width: 95%;
    padding-left: 5%;
    padding-bottom: 5;
`

Comment.displayName = 'Comment';
