import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../store/stateSlice";
import { MERCHANT_ID } from "constants/app.constant";

const MERCHANT_INFO = {
    NEW_REQUEST: 0,
    HISTORY: 1,
};
  
const LIST_ITEMS = [
    { key: MERCHANT_INFO["NEW_REQUEST"], header: "Add NewRequest" },
    { key: MERCHANT_INFO["HISTORY"], header: "History" },
];
  
const Navbar = () => {

  const dispatch = useDispatch();
  const { activeTab } = useSelector(state => state.requestBook.reqState);
  const userType = localStorage.getItem("mType");

  const getFilteredItems = () => {
    if(userType === MERCHANT_ID){
      return LIST_ITEMS.filter((eachDoc) => eachDoc.key !== MERCHANT_INFO["NEW_REQUEST"]);
    }else{
      return LIST_ITEMS;
    }
  };

  return (
    <nav>
      <ul className="w-full bg-white sticky top-0 z-10 flex flex-col lg:flex-row cursor-pointer">
        {getFilteredItems().map((eachItem) => (
          <li
            className={`flex-1 py-2 text-base font-semibold flex items-center justify-center
            ${
              activeTab === eachItem.key
                ? "border-b-2 border-swinkpayBlue"
                : "border-b-2"
            }`}
            key={eachItem.key}
          >
            <button
              type="button"
              className={`w-full text-center cursor-pointer ${
                activeTab === eachItem.key
                  ? "text-swinkpayBlue"
                  : "text-gray-400"
              }`}
              onClick={() => dispatch(setActiveTab(eachItem.key))}
            >
              {eachItem.header}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
