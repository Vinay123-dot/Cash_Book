import React,{useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
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
import EditRequestBookForm from "./EditRequestBookForm";
import Modal from "components/shared/Modal";


const EditRequestBook = ({handleCancel,handleClickOk,reqObj}) => {

    const dispatch = useDispatch();
    const reqBookRef = useRef();
    let uniqueId = localStorage.getItem("uniqueId");
    const { cashbookData } = useSelector(state => state.quickbookStore.data);
    const { bookTypeList } = useSelector((state) => state.quickbookStore.state);


    const manageLoader = (flag) => dispatch(setMainPageLoader(flag));

    const onSaveRequestBook = async (values) => {
      try {
          
          manageLoader(true);
          let newObj = JSON.parse(JSON.stringify(values));
          newObj.key = uniqueId;
          newObj.book_type = newObj.book_name;
          newObj.requested_on = getCurrentDate();
          newObj.request_id = `${reqObj.Id}`
          delete newObj.book_name;
          let response = await apiSaveRequestBook([newObj]);
          if(response.message){
            manageLoader(false);
            dispatch(setDataSavedModal(true));
            handleClickOk()
            // reqBookRef?.current?.resetForm();
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

  const getBookName = (id) => {
    let findObj = bookTypeList.find((item) => item.Id === id);
    return findObj?.Type || "";
  }
    return (
      <DrawerSlide openDrawer={true} drawerWidth={"45%"} title={"Edit Request"}>
      {/* <Modal openModal={true} height={250} width={400} jc="center" bStyle="dashed"> */}

 
        <Formik
          innerRef={reqBookRef}
          initialValues={{
            ...RequestBookIntialVal,
            request_date: reqObj.Date,
            book_type: cashbookData.book_type,
            book_name : getBookName(cashbookData.book_type)
          }}
          validationSchema={RequestBookValidations}
          onSubmit={(values, { setSubmitting }) => {
            onSaveRequestBook(values);
          }}
        >
          {() => {
            return (
              <EditRequestBookForm
                handleCancel={handleCancel}
                reqObj={reqObj}
              />
            );
          }}
        </Formik>
      </DrawerSlide>
      // </Modal>
    );
};

export default EditRequestBook;

EditRequestBook.propTypes = {
  handleCancel : PropTypes.func,
  handleClickOk : PropTypes.func,
  reqObj : PropTypes.object,
};