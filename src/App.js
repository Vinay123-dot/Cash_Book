
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store';
import './App.css';
import QuickBookPage from "../src/QuickBook";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QuickBookPage />
      </PersistGate>
    </Provider>

  );
}

export default App;
