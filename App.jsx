import React from 'react';
import { Provider } from 'react-redux';
import store, { persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import AppNavigator from './AppNavigator';



export default function App() {
  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <AppNavigator />
      </PersistGate>
    </Provider>
    
  );
}


