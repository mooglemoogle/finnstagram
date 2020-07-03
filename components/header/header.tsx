import React, { FC } from "react";
import { View, Text } from "react-native";
import { BlurView } from "expo-blur";
import styled from "@emotion/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export const Header: FC = () => {
  return (
    <HeaderBody top={getStatusBarHeight(true)}>
      <PlusButton>
        <FontAwesomeIcon size={25} icon={faPlus} />
      </PlusButton>
      <Title>
        <Text style={{ fontSize: 30, textAlign: "center" }}>Finnstagram</Text>
      </Title>
      <Avi></Avi>
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
  elevation: 100;
`;

const PlusButton = styled(View)`
  width: 20%;
  display: flex;
  justify-content: center;
  padding-left: 20;
`;

const Title = styled(View)`
  width: 60%;
  display: flex;
  justify-content: center;
`;

const Avi = styled(View)`
  width: 20%;
  display: flex;
  justify-content: center;
`;

Header.displayName = "Header";
