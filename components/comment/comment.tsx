import React, { FC } from 'react';
import { View, Image, Text, Dimensions } from 'react-native';
import styled from '@emotion/native';
import {Comment as CommentType} from '../../redux/posts/types';

export const Comment: FC<CommentType> = props => {
    // const windowWidth = Dimensions.get('window').width;

    // const imageDimensions = {
    //     x: 400,
    //     y: 400,
    // };
    // const ratio = windowWidth / imageDimensions.x;
    // const postHeight = ratio * imageDimensions.y;

    // const imageSource: ImageURISource = { uri: props.mediaItems[0].uri };

    return (
        <CommentBody>
            <Text>TEST COMMENT BEEP BOOP</Text>
        </CommentBody>
        // <PostBody>
        //     <PostHeader>
        //         <Text style={{ fontSize: 20 }}>Username</Text>
        //     </PostHeader>
        //     <PostImage source={imageSource} style={{ width: windowWidth, height: postHeight }} />
        //     <PostControls>
        //         <FontAwesomeIcon size={20} icon={farHeart} />
        //     </PostControls>
        // </PostBody>
    );
};

const CommentBody = styled(View)`
    width: 90%;
    padding-left: 10%
`

// const PostBody = styled(View)`
//     width: 100%;
//     display: flex;
//     flex-direction: column;
// `;

// const PostHeader = styled(View)`
//     width: 100%;
//     display: flex;
//     flex-direction: row;
//     padding: 10px 20px;
// `;

// const PostImage = styled(Image)``;

// const PostControls = styled(View)`
//     width: 100%;
//     display: flex;
//     flex-direction: row;
//     padding: 10px 20px;
// `;

Comment.displayName = 'Comment';
