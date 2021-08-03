import React, { FC, useCallback, useState } from 'react';
import { View, Text, PixelRatio } from 'react-native';
import { Button, Avatar } from 'react-native-elements'
import { BlurView } from 'expo-blur';
import styled from '@emotion/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { FeedNavigationProps } from '../../navigationParams';

export const Header: FC = () => {
    const { navigation } = useNavigation<FeedNavigationProps>();
    const handleOpenCameraRoll = useCallback(() => {
        navigation.push('PostEditor');
        
    }, []);
    return (
        <HeaderBody top={getStatusBarHeight(true)} tint={'default'} intensity={75}>
            <PlusButton 
                icon={<FontAwesomeIcon size={25} icon={faPlus} />}
                type={'clear'}
                onPress={handleOpenCameraRoll}
            />
            <Title>
                <Text style={{ fontSize: 30, textAlign: 'center' }}>Finnstagram</Text>
            </Title>
            <Avatar rounded size={'small'} title="U1" containerStyle={{flex: 0, marginRight: 20}} overlayContainerStyle={{backgroundColor: 'cornflowerblue'}} />
        </HeaderBody>
    );
};

const HeaderBody = styled(BlurView)<{ top: number }>`
    position: absolute;
    top: 0;
    padding-top: 40;
    width: 100%;
    height: 90;
    display: flex;
    flex-direction: row;
    align-items: center;
    z-index: 100;
    elevation: 1;
`;

const PlusButton = styled(Button)`
    flex-grow: 0;
    padding-left: 20;
`;

const Title = styled(View)`
    width: 60%;
    flex-grow: 1;
    text-align: center;
`;

Header.displayName = 'Header';
