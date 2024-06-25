import React ,{useEffect} from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store';
import './App.css';
import QuickBookPage from "../src/QuickBook";
import { apiCreateSession } from './services/TransactionService';

function App() {
  const searchParams = new URLSearchParams(window.location.search);
  const userType = searchParams.get('mType');
  const rawPersistData = searchParams.get('sessionData');
  const uniqueId = searchParams.get('uniqueId') ||  "0000000000053575"; 
  const merchantId = searchParams.get('mId') || "0000000000053575" ; 
  // "0000000000053575"; sanbbox
  // "0000000000002085" ; web

  localStorage.setItem("mType",userType);
  localStorage.setItem("whoami",rawPersistData);
  localStorage.setItem("uniqueId",uniqueId);
  localStorage.setItem("mId",merchantId);

  useEffect(() => {
    AddCreateSession();
  },[])

  const AddCreateSession = async() => {
    try{
      let data = {id : uniqueId,type: userType}
      let response = await apiCreateSession(data);
    }catch(e){

    }
  }


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QuickBookPage />
      </PersistGate>
    </Provider>

  );
}

export default App;