import React,{useRef} from "react";
import { useDispatch,useSelector } from "react-redux";
import { Formik } from "formik";
import PropTypes from "prop-types";
import { RequestBookIntialVal } from "IntialValues/reqBook";
import RequestBookValidations from "Validations/RequestBookValidations";
import { getCurrentDate } from "utils/dateFormatter";
import { apiSaveRequestBook } from "services/TransactionService";
import { setMainPageLoader } from "QuickBook/store/dataSlice";
import { setDataSavedModal } from "QuickBook/store/stateSlice";
import { setManageModal } from "views/RequestBook/store/stateSlice";
import DrawerSlide from "components/shared/Drawer";
import UpdateRequestBookForm from "./UpdateRequestBookForm";


const UpdateRequestBook = ({handleCancel,handleClickOk,reqObj}) => {

    const dispatch = useDispatch();
    const reqBookRef = useRef();
    let uniqueId = localStorage.getItem("uniqueId");
    const { 
      reqHistoryData 
    } = useSelector(state => state.requestBook.reqData);
    const manageLoader = (flag) => dispatch(setMainPageLoader(flag));

    const onSaveRequestBook = async (values) => {
      try {
          
          manageLoader(true);
          let newObj = JSON.parse(JSON.stringify(values));
          newObj.key = reqHistoryData.terminal_id;
          newObj.approved_on = getCurrentDate();
          newObj.request_id = newObj.request_id ? newObj.request_id : null;
          let response = await apiSaveRequestBook([newObj]);
          if(response.message){
            manageLoader(false);
            dispatch(setDataSavedModal(true));
            handleClickOk()
          }
          manageLoader(false);
      } catch (Err) {
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
      <DrawerSlide openDrawer={true} drawerWidth={"45%"} title={"Edit Request"}>
        <Formik
          innerRef={reqBookRef}
          initialValues={{
            ...RequestBookIntialVal,
            ...reqObj
          }}
          validationSchema={RequestBookValidations}
          onSubmit={(values, { setSubmitting }) => {
            onSaveRequestBook(values);
          }}
        >
          {() => {
            return (
              <UpdateRequestBookForm
                handleCancel={handleCancel}
              />
            );
          }}
        </Formik>
      </DrawerSlide>
    );
};

export default UpdateRequestBook;

UpdateRequestBook.propTypes = {
  handleCancel : PropTypes.func,
  handleClickOk : PropTypes.func,
  reqObj : PropTypes.object,
};