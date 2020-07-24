import React, { FC, useEffect } from 'react';
import { View, StatusBar, ImageURISource, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from '../../../redux/currentUser';
import { fetchPosts, getPosts } from '../../../redux/posts';

import { Post } from '../../post/post';
import { Header } from '../../header/header';

export const Feed: FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCurrentUser());
        dispatch(fetchPosts());
    }, [dispatch]);

    const postMap = useSelector(getPosts);
    const posts = postMap ? Array.from(postMap.values()) : [];

    return (
        <View>
            <StatusBar barStyle={'dark-content'} backgroundColor={'#ffffff55'} translucent={true} />
            <Header />
            <ScrollView style={{ paddingTop: 90 }} showsVerticalScrollIndicator={false}>
                {posts.map(post => (
                    <Post key={post.id} {...post} />
                ))}
                <View style={{ height: 120 }} />
            </ScrollView>
        </View>
    );
};
