import React ,{useEffect} from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store';
import './App.css';
import QuickBookPage from "../src/QuickBook";
import EditMerchantPAge from "./EditMerchantPage";

function App() {
  const searchParams = new URLSearchParams(window.location.search);
const userType = searchParams.get('mType');
const rawPersistData = searchParams.get('sessionData');

localStorage.setItem("mType",userType);
localStorage.setItem("whoami",rawPersistData);
localStorage.setItem("developer","vinay");



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