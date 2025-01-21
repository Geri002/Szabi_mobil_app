import * as React from 'react';
import {Provider} from 'react-redux';
import {store} from './redux/index';
import {AuthProvider} from './context/AuthContext';

import AppContainer from './navigator';

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <AppContainer />
      </AuthProvider>
    </Provider>
  );
}
