import React, { useState, useEffect, useRef } from "react";
import { Formik, Form } from 'formik';
import CButton from "../../../components/ui/Button";
import AntdFormikSelect from "../../../components/ui/AntdFormikSelect";
import AntdInput from "../../../components/ui/AntdInput";
import AntdTextArea from "../../../components/ui/AntdTextArea";
import { DaysArr } from "../../../Constants";
import { useDispatch, useSelector } from "react-redux";
import {
    setDataSavedModal,
} from '../../store/stateSlice';
import { BankDepositTypeValidations } from "../../../Validations";

import { apiStoreBankDepositInfo, apiStorePettyCashInfo, apiVerifyAdvancedBookReceipt } from "../../../services/TransactionService";
import Loader from "../../../components/shared/Loader";
import Modal from "../../../components/shared/Modal";
import ErrorModal from "../../../components/ui/ErrorModal";
import ParagraphTag from "../../../constants/PTag";


const ShowTextBoxInPC = (label, value, ph) => (
    <AntdTextArea
        text={label}
        value={value}
        ph={ph}
    />
)
const statusArr = ["Partially Refunded", "Invoiced", "ORDERCANCEL", ""];

const BankDepositEditModal = (props) => {

    
    const dispatch = useDispatch();
    const { handleCloseEditModal, editDayBookObj } = props;
    const [showLoader, setShowLoader] = useState(false);
    const {
        commonCashBanalce : bankBalance,
        remainingCommonBalance : remainingOpeningBal
      } = useSelector(state => state.quickbookStore.state);
    const {
        depositTypeList,
        depositModeList,
        allTerminalList,
    } = useSelector(state => state.quickbookStore.state);
    const [remBankbal, setRemBankbal] = useState(remainingOpeningBal);
    const [verifyBtnLdng, setVerifyBtnLdng] = useState(false);
    const [eModal, setEModal] = useState({
        eMessage: "", show: false
    })
    let uniqueId = localStorage.getItem("uniqueId");

    useEffect(() => {
        setRemBankbal(remainingOpeningBal);
    }, [remainingOpeningBal])

    const handleSubmit = async (values) => {
        try {
            values.amount = Number(values.amount);
            values.key = uniqueId;
            if(values.amount > remainingOpeningBal) {
                setEModal({
                    eMessage : "Given amount should be less than or equal to the remaining opening balance",
                    show : true
                })
                return ;
            }
            setShowLoader(true);
            let response = await apiStoreBankDepositInfo([values]);
            if (response.message) {
                handleCloseEditModal();
                dispatch(setDataSavedModal(true));
            }
            setShowLoader(false);
        } catch (e) {
            setShowLoader(false);
        }
    }

    const handleChangeType = (name, val, setFieldValue) => {
        setFieldValue(name, val);
        setFieldValue("date", null);
        setFieldValue("deposit_mode", null);
        setFieldValue("reason", "");
        setFieldValue("amount", null);
        setFieldValue("remaining_balance", null);
        setFieldValue("advance_receipt_no", "");
    }


    const handleVerifyAdvanceMoney = async (allVal, setFieldValue) => {
        const { advance_receipt_no } = allVal;
        try {
            if (!advance_receipt_no) return console.log("test")
            setVerifyBtnLdng(true);
            const data = {
                key: uniqueId,
                id: advance_receipt_no
            };
            let response = await apiVerifyAdvancedBookReceipt(data);
            if (response) {
                setEModal({
                    eMessage: statusArr.includes(response?.Status) ? "This receipt number is already used" : "",
                    show: statusArr.includes(response?.Status) ? true : false
                })
                setFieldValue("total_receipt_amount", response?.Bill_Value || 0);
                setFieldValue("amount", response?.Remaining_Balance || 0);
                setFieldValue("receipt_status", response?.Status || "");
                setVerifyBtnLdng(false);
            }


        } catch (Err) {
            console.log("ERR..", Err);
            setEModal({
                eMessage: Err?.response?.data?.detail || "Failed you to submit data.Please Check the details again",
                show: true
            })
            setVerifyBtnLdng(false);
        }

    }

    const onEModalCancel = () => {
        setEModal({
            show: false,
            eMessage: ""
        })
    }

    const getFilteredDepositTypeList = (list) => {
        let tempArr = JSON.parse(JSON.stringify(list));
        let splicedObj = (tempArr || []).splice(3,1);
        (tempArr || []).forEach((eachDoc) => {
            eachDoc.Type = eachDoc.Id === 3 ? eachDoc.Type+'/'+splicedObj?.[0].Type : eachDoc.Type;
        });
        return tempArr;
    }
    console.log("ee",editDayBookObj)
    return (
        <Modal openModal={true} ai={null} height={"90%"} width={"60%"}>
            <>
                <Formik
                    initialValues={editDayBookObj}
                    validationSchema={BankDepositTypeValidations}
                    // innerRef={editFormikRef}
                    onSubmit={(values, { setErrors, resetForm, setFieldError }) => {
                        handleSubmit(values, setErrors, resetForm, setFieldError);
                    }}
                    style={{ overflow: "auto", position: "relative" }}
                >
                    {({ setFieldValue, values }) => {
                        values.remaining_balance =  (remBankbal + Number(editDayBookObj.amount) || 0) - Number(values.amount);
                        
                        return (
                            <Form>
                                <ParagraphTag label="Edit Details" />
                                <div className="grid grid-cols-1 gap-10 px-4 py-2  md:grid-cols-2">
                                    <AntdFormikSelect
                                        labelText="Type"
                                        name="type"
                                        ph="Select Type"
                                        isDisabled = {true}
                                        handleChange={(name, selectedValue) => handleChangeType(name, selectedValue, setFieldValue)}
                                        Arr={getFilteredDepositTypeList(depositTypeList)}
                                    />
                                    {
                                        values.type != null &&
                                        <AntdFormikSelect
                                            labelText="Day"
                                            name="date"
                                            ph="--- Select Day ---"
                                            handleChange={(name, selectedValue) => setFieldValue(name, selectedValue)}
                                            Arr={DaysArr}
                                        />
                                    }
                                    {
                                        values.type != null && [1, 2].includes(values.type) &&
                                        <AntdInput
                                            text={"Amount"}
                                            value={'amount'}
                                            ph={"Enter Amount"}
                                            showPrefix={true}
                                            acceptOnlyNum={true}
                                        />

                                    }

                                    {
                                        values.type === 2 &&
                                        <AntdFormikSelect
                                            labelText="Deposit Mode"
                                            name="deposit_mode"
                                            ph="--- Select Deposit Mode---"
                                            handleChange={(name, selectedValue) => setFieldValue(name, selectedValue)}
                                            Arr={depositModeList}
                                        />
                                    }
                                    {
                                        values.type != null && [1, 2].includes(values.type) &&
                                        <AntdInput
                                            text="Remaing Balance"
                                            value='remaining_balance'
                                            ph="Enter Remaining Balance"
                                            showPrefix={true}
                                            acceptOnlyNum={true}
                                            disableInput={true}
                                        />
                                    }
                                    {
                                        values.type != null && [3].includes(values.type) &&
                                        <>
                                            <div className="flex">
                                                <AntdInput
                                                    text="Receipt Number"
                                                    value='advance_receipt_no'
                                                    ph="Enter Receipt Number"
                                                />
                                                <CButton
                                                    className="ml-5 mt-9"
                                                    style={{ width: 100, height: 32 }}
                                                    isLoading={verifyBtnLdng}
                                                    onClick={() => handleVerifyAdvanceMoney(values, setFieldValue)}
                                                >
                                                    Verify
                                                </CButton>
                                            </div>
                                            {
                                                !statusArr.includes(values.receipt_status) && <>

                                                    <AntdInput
                                                        text="Receipt Amount"
                                                        value='amount'
                                                        ph="Enter Remaining Balance"
                                                        showPrefix={true}
                                                        acceptOnlyNum={true}
                                                    />
                                                    <AntdInput
                                                        text="Bill Number"
                                                        value='bill_number'
                                                        ph="Bill Number"
                                                    />
                                                    <AntdFormikSelect
                                                        labelText="Store Id"
                                                        name="store_id"
                                                        ph="--- Select StoreId---"
                                                        handleChange={(name, selectedValue) => setFieldValue(name, selectedValue)}
                                                        Arr={allTerminalList}
                                                    />
                                                </>
                                            }

                                        </>
                                    }


                                    {
                                        values.type === 3 && !statusArr.includes(values.receipt_status) &&
                                        ShowTextBoxInPC("Reason", 'reason', "Enter Reason")
                                    }

                                </div>

                                <div className="absolute flex flex-row-reverse gap-10  bottom-5 right-5">
                                    <CButton btnType="submit">
                                        Save
                                    </CButton>
                                    <CButton
                                        onClick={() => handleCloseEditModal()}
                                        type="cancel"
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
        </Modal>
    )
}



export default BankDepositEditModal;
