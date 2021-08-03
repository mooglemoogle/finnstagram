import React, { FC } from 'react';
import { store } from './redux';
import { Provider } from 'react-redux';
import { Feed } from './components/areas/feed';
import { PostEditor } from './components/areas/postEditor';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationStackParamList } from './navigationParams';

const Stack = createNativeStackNavigator<NavigationStackParamList>();

const App: FC = () => {

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Feed">
                    <Stack.Screen name="Feed" component={Feed} />
                    <Stack.Screen name="PostEditor" component={PostEditor}/>
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
};

export default App;
