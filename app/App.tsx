import React, { FC } from 'react';
import { store } from './redux';
import { Provider } from 'react-redux';
import { Feed } from './components/areas/feed';

const App: FC = () => {
    return (
        <Provider store={store}>
            <Feed />
        </Provider>
    );
};

export default App;
