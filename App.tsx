import React, { FC } from "react";
import {
  View,
  StatusBar,
  ImageURISource,
  ScrollView,
  Dimensions,
} from "react-native";

import { Post } from "./components/post/post";
import { Header } from "./components/header/header";

const App: FC = () => {
  const img: ImageURISource = {
    uri:
      "http://engagement.abysmalsoft.org.s3.amazonaws.com/Engagement%20Photo%203.jpg",
  };

  return (
    <View>
      <StatusBar barStyle={"dark-content"} backgroundColor={'#ffffff55'} translucent={true}/>
      <Header />
      <ScrollView
        style={{ paddingTop: 90}}
        showsVerticalScrollIndicator={false}
      >
        <Post image={img} />
        <Post image={img} />
        <Post image={img} />
        <Post image={img} />
        <Post image={img} />
        <View style={{ height: 120 }} />
      </ScrollView>
    </View>
  );
};

export default App;
