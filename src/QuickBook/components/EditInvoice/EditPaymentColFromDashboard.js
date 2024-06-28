
import React, { useState, memo } from "react";
import { Formik, Form } from 'formik';
import CButton from "../../../components/ui/Button";
import { DaysArr } from "../../../Constants";
import AntdInput from "../../../components/ui/AntdInput";
import { useDispatch, useSelector } from "react-redux";
import {
    setDataSavedModal
} from '../../store/stateSlice';
import ParagraphTag from "../../../constants/PTag";
import {
    apiStorePaymentCollectionInfo,
} from "../../../services/TransactionService";
import Loader from "../../../components/shared/Loader";
import { getTotalMoneyInDayBook, convertTONumbers, verifyInputField } from "../CompConstants";
import ShowPaymentTypes from "../DayBookFiles/ShowPaymentTypes";
import BillAmountModal from "../DayBookFiles/BillAmountModal";
import { AdvanceBookValidations, PaymentCollectionValidations } from "../../../Validations";
import CashTypes from "../DayBookFiles/CashTypes";
import AdvanceBillDetails from "../DayBookFiles/AdvanceBillDetails";
import Modal from "../../../components/shared/Modal";
import { getToday } from "../../../utils/dateFormatter";
import AntdDaySelect from "../../../components/ui/AntdDaySelect";
import AntdFormikSelect from "../../../components/ui/AntdFormikSelect";
import AntdDatePicker from "../../../components/ui/AntdDatePicker";

const showSelectBox = (label, name, ph, dynamicArray, setFieldValue) => (
    <AntdFormikSelect
        labelText={label}
        name={name}
        ph={ph}
        handleChange={(name, selectedValue) => setFieldValue(name, selectedValue)}
        Arr={dynamicArray}
    />
)


const EditPaymentColFromDashboard = (props) => {

    const { editDayBookObj,
        handleCloseEditModal,
    } = props;
    const dispatch = useDispatch();
    const {
        paymentTypeInfo,
        upiTypeInfo,
        customerListInfo,
        salesType

    } = useSelector(state => state.quickbookStore.state);
    const [showBillModal, setShowBillModal] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [validateModal, setValidateModal] = useState(true);
    let uniqueId = localStorage.getItem("uniqueId");



    const handleSubmit = async (values, validateModal) => {
        try {
            setShowBillModal(false);
            let diffInAmount = Number(values.bill_value) - getTotalMoneyInDayBook(values);
            let modalFlag = validateModal && (diffInAmount != 0);
            if (modalFlag) {
                setShowBillModal(true);
                return;
            }
            setShowLoader(true);
            let newObj = JSON.parse(JSON.stringify(values));
            let convertedObj = convertTONumbers(newObj);

            convertedObj.key = uniqueId;
            let response = await apiStorePaymentCollectionInfo([convertedObj]);

            if (response.message) {
                handleCloseEditModal();
                setValidateModal(true);
                dispatch(setDataSavedModal(true));
            }
            setShowLoader(false);
        } catch (e) {
            setShowLoader(false);
            setValidateModal(true);
        }
    }

    const getCustomerList = (listArr, allObj) => {
        const { sales_type } = allObj;
        let cType;
        if (sales_type != 1) {
            cType = listArr.filter((eachDoc) => eachDoc.Id != 3);
        } else {
            cType = [...listArr];
        }
        return cType;

    }

    const removeFeilds = (pArr) => {
        let temp = [];
        temp = (pArr || []).filter((eachDoc)=> ![7,8].includes(eachDoc.Id));
        return temp;
    }

    return (
        <Modal openModal={true} height={"90%"} width={"90%"} ai={null}>
            <>
                <Formik
                    initialValues={editDayBookObj}
                    validationSchema={PaymentCollectionValidations}
                    onSubmit={(values, { setSubmitting }) => {
                        handleSubmit(values, validateModal)
                    }}

                >
                    {({ setFieldValue, values }) => {
                        return (
                            <Form style={{ overflow: "auto" }}>
                                <ParagraphTag label="Details" />
                                <div className="grid grid-cols-1 gap-10 px-4 py-2 lg:grid-cols-3 md:grid-cols-2">

                                    
                                     <AntdDatePicker
                                        labelText="Day"
                                        name="date"
                                        ph="--- Select Day ---"
                                        value = {values["date"]}
                                        handleChange = {(date,dateString) => setFieldValue("date",dateString)}
                                    />
                                    <AntdInput
                                        text="Bill Number"
                                        value='bill_no'
                                        ph="Enter Bill Number"
                                    />
                                    {
                                        showSelectBox("Customer Type", "customer_type", "--Select CustomerType--", customerListInfo, setFieldValue)
                                    }
                                    <AntdInput
                                        text="Collected Amount"
                                        value='bill_value'
                                        ph="Enter Amount"
                                        acceptOnlyNum={true}
                                        showPrefix={true}
                                    />
                                    <AntdInput
                                        text="Party Code"
                                        value='party_code'
                                        ph="Party Code"
                                    />
                                    <AntdInput
                                        text="Party Name"
                                        value='party_name'
                                        ph="Party name"
                                    />
                                </div>
                                <CashTypes
                                    valObj={values}
                                    paymentListInfo={removeFeilds(paymentTypeInfo)}
                                    upiTypeInfo={upiTypeInfo}
                                    isFromEditObj = {true}
                                />

                                <ShowPaymentTypes 
                                    paymentValues={values} 
                                    isFromAdvPayments = {false}
                                />
                                <BillAmountModal
                                    billModal={showBillModal}
                                    valuesObj={values}
                                    handleSubmitBillModal={() => handleSubmit(values, false)}
                                    handleCancelBillModal={() => { setShowBillModal(false); setValidateModal(true) }}
                                />


                                <div className="flex flex-row-reverse gap-10 px-4 xl:pt-24" style={{ marginBottom: 20 }}>
                                    <CButton btnType="submit">
                                        Save
                                    </CButton>
                                    <CButton onClick={() => {
                                        handleCloseEditModal();
                                        // dispatch(setShowAddBookPage(false))
                                    }} type="cancel"
                                    >
                                        Cancel
                                    </CButton>
                                </div>

                            </Form>
                        )
                    }}
                </Formik>
                <Loader showLoading={showLoader} />

            </>

        </Modal>
    )
}

export default EditPaymentColFromDashboard;

