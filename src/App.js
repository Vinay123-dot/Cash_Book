
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
           
            <QuickBookPage/>
          </PersistGate>
        </Provider>
        // <div class="px-6 py-4"> //testing css taiwind
        //     <span class="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#mountain</span>
        //     <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#sunset</span>
        //     <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">#nature</span>
        //   </div>
        // <div>
        //     <Iframe
        //       url="https://chat.openai.com/c/02001ff7-fa9f-480f-95f0-dff6ce01261d"
        //       width="100%"
        //       height="600px"
        //       id="myId"
        //       className="myClassname"
        //       display="initial"
        //       position="relative"
        //     />
        //   </div>
        // <div style={{display:"flex",justifyContent:"center",alignItems:'center',height:"100vh",width:"100vw"}}>
        // <div className = 'shadow-2xl shadow-purple-700 flex justify-center items-center' style={{color:'blue',width:200,height:200}}>
        //   text
        // </div>
        // <div className = "shadow-lg shadow-red-500 md:shadow-xl bg-red-800">bjhgljs</div>

        // </div>
       
    );
}

export default App;
