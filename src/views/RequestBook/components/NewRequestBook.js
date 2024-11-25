import React,{useRef} from "react";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import NewReqBookForm from "./NewReqBookForm";
import { RequestBookIntialVal } from "IntialValues/reqBook";
import RequestBookValidations from "Validations/RequestBookValidations";
import { getCurrentDate } from "utils/dateFormatter";
import { apiSaveRequestBook } from "services/TransactionService";
import { setMainPageLoader } from "QuickBook/store/dataSlice";
import { setManageModal } from "../store/stateSlice";
import { setDataSavedModal } from "QuickBook/store/stateSlice";


const AddNewReqBook = () => {

    const dispatch = useDispatch();
    const reqBookRef = useRef();
    let uniqueId = localStorage.getItem("uniqueId");

    const manageLoader = (flag) => dispatch(setMainPageLoader(flag));

    const onSaveRequestBook = async (values) => {
      try {
          
          manageLoader(true);
          let newObj = JSON.parse(JSON.stringify(values));
          newObj.key = uniqueId;
          newObj.book_type = newObj.book_name;
          newObj.requested_on = getCurrentDate();
          delete newObj.book_name;
          let response = await apiSaveRequestBook([newObj]);
          if(response.message){
            manageLoader(false);
            dispatch(setDataSavedModal(true));
          }
          manageLoader(false);
      } catch (Err) {
        console.log("bb")
        dispatch(
          setManageModal({
            showErrModal: true,
            ErrModalMsg: "Failed you to submit data.Please Check the details again",
          })
        );
          manageLoader(false);
      }
  }
    return (
        <Formik
          innerRef={reqBookRef}
          initialValues={RequestBookIntialVal}
          validationSchema={RequestBookValidations}
          onSubmit={(values, { setSubmitting }) => {
            onSaveRequestBook(values);
          }}
        >
          {() => {
            return (
              <NewReqBookForm/>
            );
          }}
        </Formik>
      );
};

export default AddNewReqBook;