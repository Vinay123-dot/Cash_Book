
import React, { useEffect, useState, memo } from "react";
import { Formik, Form } from 'formik';
import CButton from "../../components/ui/Button";
import { DaysArr } from "../../Constants";
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
    apiStorePaymentCollectionInfo,
} from "../../services/TransactionService";
import Loader from "../../components/shared/Loader";
import { convertTONumbers, getTotalMoneyInDayBook } from "./CompConstants";
import ShowPaymentTypes from "./DayBookFiles/ShowPaymentTypes";
import BillAmountModal from "./DayBookFiles/BillAmountModal";
import { PaymentColIntialObj } from "../intialValuesFol";
import { PaymentCollectionValidations } from "../../Validations";
import CashTypes from "./DayBookFiles/CashTypes";
import ErrorModal from "../../components/ui/ErrorModal";

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
    const [eModal,setEModal] = useState({
        eMessage : "",show : false
    })
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
            console.log("r",response)
            if (response.message) {
                dispatch(setShowAddBookPage(false));
                onCancel();
                dispatch(setDataSavedModal(true));
                setValidateModal(true);
                setEModal({
                    eMessage : "",
                    show : false
                })
            }
            setShowLoader(false);
        } catch (Err) {
            setShowLoader(false);
            setValidateModal(true);
            setEModal({
                eMessage : Err?.response?.data?.detail || "Failed you to submit data.Please Check the details again",
                show : true
            })
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
                                    showSelectBox("Customer Type", "customer_type", "--Select CustomerType--", customerListInfo, setFieldValue)
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
                                paymentListInfo = {removeFeilds(paymentListInfo)}
                                upiTypeInfo = {upiTypeInfo}
                                pLength = {5}
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
                                    setEModal({
                                        eMessage : "",
                                        show : false
                                    })
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
            { 
                eModal.show && <ErrorModal msg = {eModal.eMessage} handleCloseEModal={onEModalCancel}/>
            }

        </>
    )
}

export default memo(PaymentCollectionModal);





