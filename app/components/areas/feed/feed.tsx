import React, { FC, useEffect, useLayoutEffect, useCallback } from 'react';
import { View, StatusBar, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Avatar } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { FeedNavigationProps } from '../../../navigationParams';
import { fetchCurrentUser } from '../../../redux/currentUser';
import { fetchPosts, getPosts } from '../../../redux/posts';

import { Post } from '../../post/post';
// import { Header } from '../../header/header';

export const Feed: FC<FeedNavigationProps> = ({navigation}) => {
    const dispatch = useDispatch();

    const handleOpenCameraRoll = useCallback(() => {
        navigation.push('PostEditor');
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Finnstagram',
            headerTranslucent: true,
            headerBlurEffect: 'systemUltraThinMaterial',
            // headerLargeTitle: true,
            headerLeft: () => (<Button 
                icon={<FontAwesomeIcon size={25} icon={faPlus} />}
                type={'clear'}
                onPress={handleOpenCameraRoll}
            />),
            headerRight: () => (<Avatar
                rounded
                size={'small'}
                title="U1"
                overlayContainerStyle={{backgroundColor: 'cornflowerblue'}}
            />),
        });
    }, [navigation]);

    useEffect(() => {
        dispatch(fetchCurrentUser());
        dispatch(fetchPosts());
    }, [dispatch]);

    const postMap = useSelector(getPosts);
    const posts = postMap ? Array.from(postMap.values()) : [];

    return (
        <View style={{height: '100%'}}>
            {/* <StatusBar barStyle={'dark-content'} backgroundColor={'#ffffff55'} translucent={true} /> */}
            <ScrollView showsVerticalScrollIndicator={false} style={{paddingTop: 90, minHeight: '100%'}}>
                {posts.map(post => (
                    <Post key={post._id} {...post} />
                ))}
                <View style={{ height: 200 }} />
            </ScrollView>
        </View>
    );
};
