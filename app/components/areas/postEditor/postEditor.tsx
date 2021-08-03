import React, {FC, useLayoutEffect, useEffect, useState, useCallback} from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { Button, Input } from 'react-native-elements';
import * as ImagePicker from 'react-native-image-picker';
import { PostEditorNavigationProps } from '../../../navigationParams';
import Swiper from 'react-native-swiper';
import { BorderlessButton } from "react-native-gesture-handler";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { createPost } from "../../../redux/posts";

export const PostEditor: FC<PostEditorNavigationProps> = ({navigation}) => {
    const dispatch = useDispatch();
    const [photos, setPhotos] = useState<ImagePicker.Asset[] | undefined>([]);
    const [caption, setCaption] = useState<string>('');
    const savePost = useCallback(() => {
        dispatch(createPost({
            media: photos?.map((photo) => ({
                uri: photo.uri || ''
            })) || [],
            caption,
        }));
    }, [caption, photos, dispatch]);
    const addImages = useCallback(() => {
        ImagePicker.launchImageLibrary({ mediaType: 'photo', selectionLimit: 10}, (result) => {
            
            if (!result.didCancel) {
                setPhotos(result.assets);
            }
        });
    }, [setPhotos, photos]);
    useEffect(() => {
        const unsubscribe = navigation.addListener('transitionEnd', (e) => {
            if (!e.data.closing) {
                addImages();
            }
        });

        return unsubscribe;
    }, [addImages]);
    useLayoutEffect(() => {
        navigation.setOptions({
            presentation: 'formSheet',
            title: 'Create New Post',
            headerTitleStyle: {fontSize: 20},
            headerLeft: () => (
                <BorderlessButton onPress={() => navigation.goBack()}>
                    <Text style={{fontSize: 17, color: 'blue'}}>Cancel</Text>
                </BorderlessButton>
            ),
            headerRight: () => (
                <Button
                    disabled={photos && photos?.length === 10}
                    type={'clear'}
                    onPress={addImages}
                    icon={<FontAwesomeIcon color={(photos && photos?.length === 10) ? 'gray':'blue'} size={18} icon={faPlus} />}
                />
            )
        });
    }, [navigation, photos, addImages]);
    return (
        <ScrollView style={{height: '100%'}} contentContainerStyle={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
            {!photos || !photos.length && (
                <View style={{
                    width: '100%', 
                    height: 420, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    backgroundColor: 'rgba(.2, .2, .2, .1)'
                }}>
                    <Text style={{fontSize: 30}}>{'Add up to 10 images'}</Text>
                </View>
            )}
            {photos && photos.length > 0 && (
                <View style={{height: 420}}>
                    <Swiper style={{height: 400}} paginationStyle={{height: 20,bottom: -20}}>
                        {photos.map((item) => (
                            <View key={item.uri} style={{width: '100%', height: '100%'}}>
                                <Image style={{width: '100%', height: '100%'}} resizeMode={'contain'} source={{uri: item.uri}} />
                            </View>
                        ))}
                    </Swiper>
                </View>
            )}
            <Input
                containerStyle={{paddingTop: 30, paddingHorizontal: 20}}
                placeholder="Caption (optional)"
                leftIcon={{ type: 'font-awesome', name: 'comment' }}
                onChangeText={setCaption}
            />

            <Button style={{marginHorizontal: 20}} title={'Save Post'} onPress={savePost} />
        </ScrollView>
    )
}