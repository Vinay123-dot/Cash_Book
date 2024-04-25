
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store';
import './App.css';
import QuickBookPage from "../src/QuickBook";
import EditMerchantPAge from "./EditMerchantPage";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QuickBookPage />
        {/* <EditMerchantPAge/> */}
      </PersistGate>
    </Provider>

  );
}

export default App;
