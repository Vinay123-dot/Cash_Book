
import React, { useEffect, useState, memo } from "react";
import { Formik, Form } from 'formik';
import CButton from "../../components/ui/Button";
import { DaysArr, selectedValType } from "../../Constants";
import AntdFormikSelect from "../../components/ui/AntdFormikSelect";
import AntdInput from "../../components/ui/AntdInput";
import { useDispatch, useSelector } from "react-redux";
import {
    setShowAddBookPage,
    setDataSavedModal,
    setShowUploadInvoice
} from '../store/stateSlice';
import ParagraphTag from "../../constants/PTag";
import {
    apiGetCustomerTypeInfo,
    apiGetPaymentTypeInfo,
    apiGetUPITypeInfo,
    apiStorePaymentCollectionInfo,
    apiGetTerminal,
} from "../../services/TransactionService";
import Loader from "../../components/shared/Loader";
import { getTotalMoneyInDayBook } from "./CompConstants";
import ShowPaymentTypes from "./DayBookFiles/ShowPaymentTypes";
import BillAmountModal from "./DayBookFiles/BillAmountModal";
import { PaymentColIntialObj } from "../intialValuesFol";
import { PaymentCollectionValidations } from "../../Validations";
import CashTypes from "./DayBookFiles/CashTypes";

const showSelectBox = (label, name, ph, dynamicArray, setFieldValue) => (
    <AntdFormikSelect
        labelText={label}
        name={name}
        ph={ph}
        handleChange={(name, selectedValue) => setFieldValue(name, selectedValue)}
        Arr={dynamicArray}
    />
)

const PaymentCollectionModal = (props) => {

    const { showPaymentColModal, onCancel } = props;
    const dispatch = useDispatch();
    const [paymentListInfo, setPaymentListInfo] = useState([]);
    const [upiTypeInfo, setUpiTypeInfo] = useState([]);
    const [customerListInfo, setCustomerListInfo] = useState([]);
    const [showBillModal, setShowBillModal] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [validateModal, setValidateModal] = useState(true);
    let uniqueId = localStorage.getItem("uniqueId");

    useEffect(() => {
        fetchReqTypesInDayBook();
    }, []);

    const fetchReqTypesInDayBook = async () => {
        try {
            const [paymentArray, upiArray, customerArr] = await Promise.all([
                apiGetPaymentTypeInfo(),
                apiGetUPITypeInfo(), apiGetCustomerTypeInfo()
            ]);
            setPaymentListInfo(paymentArray?.data || []);
            setUpiTypeInfo(upiArray?.data || []);
            setCustomerListInfo(customerArr?.data || []);
        } catch (e) { }
    }

  

    if (!showPaymentColModal) return null;

    const convertTONumbers = (newObj) => {

        newObj.bill_value = Number(newObj.bill_value);
        newObj.cash_amount = Number(newObj.cash_amount);
        newObj.credit_card_amount = Number(newObj.credit_card_amount);
        newObj.debit_card_amount = Number(newObj.debit_card_amount);
        newObj.bank_cheque_amount = Number(newObj.bank_cheque_amount);
        newObj.online_bank_amount = Number(newObj.online_bank_amount);
        newObj.upi_amount = Number(newObj.upi_amount);
        return newObj;
    }


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
            console.log("cc",convertedObj);
            let response = await apiStorePaymentCollectionInfo([convertedObj]);
            if (response.message) {
                dispatch(setShowAddBookPage(false));
                onCancel();
                dispatch(setDataSavedModal(true));
                setValidateModal(true);
            }
            setShowLoader(false);
        } catch (e) {
            setShowLoader(false);
            setValidateModal(true);
        }
    }

    return (
        <>
            <Formik
                initialValues = {PaymentColIntialObj}
                validationSchema = {PaymentCollectionValidations}
                onSubmit={(values) => {
                    handleSubmit(values, validateModal)
                }}
                style={{ overflow: "auto" }}
            >
                {({ setFieldValue, values }) => {
                    console.log("VAL",values);
                    return (
                        <Form>
                            <ParagraphTag label="Details" />
                            <div className="grid grid-cols-1 gap-10 px-4 py-2 lg:grid-cols-3 md:grid-cols-2">
                                {
                                    showSelectBox("Day", "date", "--Select Day--", DaysArr, setFieldValue)
                                }
                                <AntdInput
                                    text="Bill Number"
                                    value='bill_no'
                                    ph="Enter Bill Number"
                                />
                                {
                                    showSelectBox("Party Type", "customer_type", "--Select PartyType--", customerListInfo, setFieldValue)
                                }
                                <AntdInput
                                    text="Amount"
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
                                setFieldValue = {setFieldValue}
                                valObj = {values}
                                paymentListInfo = {paymentListInfo}
                                upiTypeInfo = {upiTypeInfo}
                            />



                            <ShowPaymentTypes paymentValues={values} />
                            <BillAmountModal
                                billModal={showBillModal}
                                valuesObj={values}
                                isFromPaymentCol = {true}
                                handleSubmitBillModal={() => handleSubmit(values, false)}
                                handleCancelBillModal={() => { setShowBillModal(false); setValidateModal(true) }}
                            />


                            <div className="flex flex-row-reverse gap-10 px-4 xl:pt-24" style={{ marginBottom: 20 }}>
                                <CButton btnType="submit">
                                    Save
                                </CButton>
                                <CButton onClick={() => {
                                    onCancel();
                                    dispatch(setShowAddBookPage(false))
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
    )
}

export default memo(PaymentCollectionModal);





