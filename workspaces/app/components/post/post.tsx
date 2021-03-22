import React, { FC } from 'react';
import { View, Image, Text, ImageURISource, Dimensions } from 'react-native';
import styled from '@emotion/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { Post as PostType } from '../../redux/posts';

import { Comment } from '../comment/comment';

// export interface PostProps {
//     image: ImageSourcePropType;
// }

export const Post: FC<PostType> = props => {
    const windowWidth = Dimensions.get('window').width;

    const imageDimensions = {
        x: 400,
        y: 400,
    };
    const ratio = windowWidth / imageDimensions.x;
    const postHeight = ratio * imageDimensions.y;

    const imageSource: ImageURISource = { uri: props.mediaItems[0].uri };

    const comments = props.comments;

    return (
        <PostBody>
            <PostHeader>
                <Text style={{ fontSize: 20 }}>Username</Text>
            </PostHeader>
            <PostImage source={imageSource} style={{ width: windowWidth, height: postHeight }} />
            <PostControls>
                <FontAwesomeIcon size={20} icon={farHeart} />
            </PostControls>
            {comments.map(comment => (
                <Comment key={comment.id} {...comment} />
            ))}
        </PostBody>
    );
};

const PostBody = styled(View)`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const PostHeader = styled(View)`
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 10px 20px;
`;

const PostImage = styled(Image)``;

const PostControls = styled(View)`
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 10px 20px;
`;

Post.displayName = 'Post';
