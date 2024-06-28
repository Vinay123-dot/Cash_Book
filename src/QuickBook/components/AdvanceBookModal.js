import React, { useEffect, useState } from "react";
import { Formik, Form } from 'formik';
import CButton from "../../components/ui/Button";
import { DaysArr,selectedValType } from "../../Constants";
import AntdFormikSelect from "../../components/ui/AntdFormikSelect";
import AntdInput from "../../components/ui/AntdInput";
import { useDispatch } from "react-redux";
import {
    setShowAddBookPage,
    setDataSavedModal
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

    const { showAdvanceBook, onCancel } = props;
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

    if (!showAdvanceBook) return null;


    const handleSubmit = async (values,validateModal) => {
        try {
            setShowBillModal(false);
            let diffInAmount = Number(values.bill_value) - getTotalMoneyInDayBook(values);
            let modalFlag = validateModal && (diffInAmount > 10 || diffInAmount < -10);
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
                onCancel();
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
            style={{ overflow: "auto" }}
        >
            {({setFieldValue, values }) => {
                return (
                    <Form>
                        <ParagraphTag label="Details" />
                        <div className="grid grid-cols-1 gap-10 px-4 py-2 lg:grid-cols-3 md:grid-cols-2">
                             <AntdInput
                                text="Receipt Number"
                                value='receipt_no'
                                ph="Enter Receipt Number"
                            />
                              <AntdDatePicker
                                    labelText="Day"
                                    name="date"
                                    ph="--- Select Day ---"
                                    value = {values["date"]}
                                    isFromAdvance = {true}
                                    handleChange = {(date,dateString) => setFieldValue("date",dateString)}
                                />
                            {/* {
                                showSelectBox("Day", "date", "--Select Day--", DaysArr, setFieldValue)
                            } */}

                            {
                                showSelectBox("Customer Type", "customer_type", "--Select CustomerType--", customerListInfo, setFieldValue)
                            }
                            <AntdInput
                                text="Customer Name"
                                value='customer_name'
                                ph="Enter Customer Name"
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
                            handleCancelBillModal = {() =>{
                                setShowBillModal(false);
                                setValidateModal(true)
                            }}
                            handleSubmitBillModal = {() =>handleSubmit(values,false)}
                        />

                        <div className="flex flex-row-reverse gap-10 px-4 xl:pt-24" style={{ marginBottom: 20 }}>
                            <CButton btnType="submit">
                                Save
                            </CButton>
                            <CButton onClick={() => {
                                setEModal({
                                    eMessage : "",
                                    show : false
                                })
                                onCancel();
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





