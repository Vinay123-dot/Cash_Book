import React, { useEffect, useState } from "react";
import { Formik, Form } from 'formik';
import CButton from "../../components/ui/Button";
import AntdFormikSelect from "../../components/ui/AntdFormikSelect";
import AntdInput from "../../components/ui/AntdInput";
import { useDispatch } from "react-redux";
import {
    setShowAddBookPage,
    setDataSavedModal,
    setSelectedBookType
} from '../store/stateSlice';
import ParagraphTag from "../../constants/PTag";
import {
    apiGetCustomerTypeInfo,
    apiGetPaymentTypeInfo,
    apiGetUPITypeInfo,
    apiStoreAdvancedBookInfo
} from "../../services/TransactionService";
import ShowPaymentTypes from "./DayBookFiles/ShowPaymentTypes";
import Loader from "../../components/shared/Loader";
import { convertTONumbers, getTotalMoneyInDayBook } from "./CompConstants";
import BillAmountModal from "./DayBookFiles/BillAmountModal";
import { AdvanceBookIntialObj } from "../intialValuesFol";
import CashTypes from "./DayBookFiles/CashTypes";
import { AdvanceBookValidations } from "../../Validations";
import ErrorModal from "../../components/ui/ErrorModal";
import AntdDatePicker from "../../components/ui/AntdDatePicker/AntdDatePicker";

const showSelectBox = (label, name, ph, dynamicArray, setFieldValue) => (
    <AntdFormikSelect
        labelText={label}
        name={name}
        ph={ph}
        handleChange={(name, selectedValue) => setFieldValue(name, selectedValue)}
        Arr={dynamicArray}
    />

)



const AdvanceBookModal = (props) => {


    const dispatch = useDispatch();
    const [clickCount, setClickCount] = useState([0]);
    const [paymentListInfo, setPaymentListInfo] = useState([]);
    const [upiTypeInfo, setUpiTypeInfo] = useState([]);
    const [customerListInfo, setCustomerListInfo] = useState([]);
    const [showBillModal, setShowBillModal] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [validateModal,setValidateModal] = useState(true);
    const [eModal,setEModal] = useState({
        eMessage : "",show : false
    })
    let uniqueId = localStorage.getItem("uniqueId");

    useEffect(() => {
        getPaymentTypeInfo();
        getUpiTypeInfo();
        getCustomerTypeInfo();
    }, [])

    const getPaymentTypeInfo = async () => {
        try {
            let response = await apiGetPaymentTypeInfo();
            setPaymentListInfo(response?.data || []);
        } catch (e) { }
    }

    const getUpiTypeInfo = async () => {
        try {
            let response = await apiGetUPITypeInfo();
            setUpiTypeInfo(response?.data || []);
        } catch (e) { }
    }

    const getCustomerTypeInfo = async () => {
        try {
            let response = await apiGetCustomerTypeInfo();
            setCustomerListInfo(response?.data || []);
        } catch (e) { }
    }



    const handleSubmit = async (values,validateModal) => {
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
            convertedObj.remaining_balance = convertedObj.bill_value;

            let response = await apiStoreAdvancedBookInfo([convertedObj]);
            if (response.status === 200) {
                setEModal({
                    eMessage : "",
                    show : false
                })
                dispatch(setShowAddBookPage(false));
                dispatch(setSelectedBookType(null));
                dispatch(setDataSavedModal(true));
                setValidateModal(true);

            }
            setShowLoader(false);
        } catch (Err) {
            setShowLoader(false);
            setEModal({
                eMessage : Err?.response?.data?.detail || "Failed you to submit data.Please Check the details again",
                show : true
            })
            setValidateModal(true);
        }
    }

    const removeFeilds = (pArr) => {
        let temp = [];
        temp = (pArr || []).filter((eachDoc)=> ![7,8].includes(eachDoc.Id));
        return temp;
    }

    const onEModalCancel = () => {
        setEModal({
            show : false,
            eMessage : ""
        })
    }
    return (<>
        <Formik
            initialValues = {AdvanceBookIntialObj}
            validationSchema = {AdvanceBookValidations}
            onSubmit={(values, { setSubmitting }) => {
                handleSubmit(values,validateModal)
            }}
        >
            {({setFieldValue, values }) => {
                return (
                    <Form className="h-full">
                        <div className="h-[80%] overflow-y-scroll">
                        <ParagraphTag label="Details" />
                        <div className="grid grid-cols-1 gap-4 px-4 pb-2 lg:grid-cols-3 md:grid-cols-2">
                             <AntdInput
                                text="Receipt Number"
                                value='receipt_no'
                                ph="Enter Receipt Number"
                                maxLen = {30}
                            />
                              <AntdDatePicker
                                    labelText="Day"
                                    name="date"
                                    ph="--- Select Day ---"
                                    value = {values["date"]}
                                    isFromAdvance = {true}
                                    handleChange = {(date,dateString) => setFieldValue("date",dateString)}
                                />

                            {
                                showSelectBox("Customer Type", "customer_type", "--Select Customer Type--", customerListInfo, setFieldValue)
                            }
                            <AntdInput
                                text="Customer Name"
                                value='customer_name'
                                ph="Enter Customer Name"
                                maxLen = {30}
                            />
                            <AntdInput
                                text="Customer Mobile Number"
                                value='phone_no'
                                ph="Enter Customer Mobile Number"
                                acceptOnlyNum={true}
                                maxLen = {10}
                                forMobileNum = {true}
                            />
                            <AntdInput
                                text="Advance Receipt Amount"
                                value='bill_value'
                                ph="Enter Amount"
                                acceptOnlyNum={true}
                                showPrefix={true}
                                maxLen = {15}
                            />
                        </div>

                        <CashTypes 
                            valObj = {values}
                            paymentListInfo = {removeFeilds(paymentListInfo)}
                            upiTypeInfo = {upiTypeInfo}
                            pLength = {5}
                        />

                        <ShowPaymentTypes 
                            paymentValues = {values}
                            isFromAdvPayments = {false}
                        />

                        <BillAmountModal 
                            billModal = {showBillModal} 
                            valuesObj = {values}
                            isFromPaymentCol = {true}
                            handleCancelBillModal = {() =>{
                                setShowBillModal(false);
                                setValidateModal(true)
                            }}
                            handleSubmitBillModal = {() =>handleSubmit(values,false)}
                        />
                        </div>
                        <div className="flex flex-row-reverse items-center gap-10 px-4 h-[20%]">
                            <CButton btnType="submit">
                                Save
                            </CButton>
                            <CButton onClick={() => {
                                setEModal({
                                    eMessage : "",
                                    show : false
                                })
                                dispatch(setSelectedBookType(null));
                                dispatch(setShowAddBookPage(false));
                                }} type="cancel"
                            >
                                Cancel
                            </CButton>
                        </div>

                    </Form>
                )
            }}


        </Formik>
        {
            showLoader && <Loader showLoading={true} />
        }
        { 
            eModal.show && <ErrorModal msg = {eModal.eMessage} handleCloseEModal={onEModalCancel}/>
        }
    </>
    )
}

export default AdvanceBookModal;





