import React, { useEffect,useState } from "react";
import { Formik, Form } from 'formik';
import CButton from "../../components/ui/Button";
import AntdFormikSelect from "../../components/ui/AntdFormikSelect";
import AntdDatePicker from "../../components/ui/AntdDatePicker";
import AntdInput from "../../components/ui/AntdInput";
import { BankDepositTypeValidations } from "../../Validations";
import { useDispatch,useSelector } from "react-redux";
import {
    setShowAddBookPage,
    setDataSavedModal
  } from '../store/stateSlice';
import ParagraphTag from "../../constants/PTag";
import { DaysArr } from "../../Constants";
import { apiGetDepositModeInfo, apiGetDepositTypeInfo,apiStoreBankDepositInfo } from "../../services/TransactionService";

const initialValues = {
    id : 0,
    date: null, //string
    type: null, //string
    deposit_mode: null, //string
    reason: '', //string
    amount: null, //number
    remaining_balance: null, //number
    advance_receipt_no: '', //string
};

const BankDepositModal = (props) => {
    const { showBankDeposit,onCancel } = props;
    const dispatch = useDispatch();
    const [depositList,setDepositList] = useState([]);
    const [depositModeList,setDepositModeList] = useState([]);
    const commOpeningBal = useSelector(state => state.quickbookStore.state.commonCashBanalce);
 

    useEffect(() => {
        getDepositTypeInfo();
        getDepositModeInfo();
    },[])

    const getDepositTypeInfo = async() => {
        try{
            let response = await apiGetDepositTypeInfo();
            setDepositList(response?.data || []);
        }catch(e){}
    }

    const getDepositModeInfo = async() => {
        try{
            let response = await apiGetDepositModeInfo();
            setDepositModeList(response?.data || []);
        }catch(e){}
    }
    
    if (!showBankDeposit) return null;

    const handleSubmit = async(values,setSubmitting) => {
        try{
            let newObj = JSON.parse(JSON.stringify(values));
            let depositMode = depositModeList.find((eachDoc)=> eachDoc.Id === newObj.deposit_mode);
            let depositType = depositList.find((eachDoc) => eachDoc.Id === newObj.type)
            newObj.deposit_mode = depositMode?.Type || "";
            newObj.type = depositType?.Type || "";
            newObj.amount = Number(newObj.amount);
            console.log("n",newObj);
            let response = await apiStoreBankDepositInfo([newObj]);
            setSubmitting(false);
            if(response.message){
                dispatch(setShowAddBookPage(false));
                onCancel();
                dispatch(setDataSavedModal(true));
                
            }

        }catch(e){

        }
       
    }

    const handleChangeType = (name,val,setFieldValue) => {
        setFieldValue(name,val);
        setFieldValue("date",null);
        setFieldValue("deposit_mode",null);
        setFieldValue("reason","");
        setFieldValue("amount",null);
        setFieldValue("remaining_balance",null);
        setFieldValue("advance_receipt_no","");
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={BankDepositTypeValidations}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                handleSubmit(values,setSubmitting);
            }}
            style={{ overflow: "auto" }}
        >
            {({ errors, touched, isSubmitting, setFieldValue, values }) => {
                if(values.amount){
                    values.remaining_balance =  commOpeningBal - Number(values.amount);
                }
                   
                return (
                    <Form>
                         <ParagraphTag  label = "Details"/>
                        <div className="grid grid-cols-1 gap-10 px-4 py-2 lg:grid-cols-3 md:grid-cols-2">
                            <AntdFormikSelect
                                labelText="Type"
                                name="type"
                                ph="Select Type"
                                handleChange={(name, selectedValue) => handleChangeType(name,selectedValue,setFieldValue)}
                                Arr={depositList}
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
                                values.type != null && [1,2].includes(values.type) &&
                                    <AntdInput
                                        text={"Amount"}
                                        value={'amount'}
                                        ph={"Enter Amount"}
                                        showPrefix={true}
                                        acceptOnlyNum = {true}
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
                                values.type != null && [1,2].includes(values.type) &&
                                    <AntdInput
                                        text="Remaing Balance"
                                        value='remaining_balance'
                                        ph="Enter Remaining Balance"
                                        showPrefix={true}
                                        acceptOnlyNum = {true}
                                        disableInput = {true}
                                    />
                            }
                            {
                                values.type != null && [3].includes(values.type) &&
                                <>
                                    <AntdInput
                                        text="Receipt Number"
                                        value = 'advance_receipt_no'
                                        ph= "Enter Receipt Number"
                                    />
                                    <AntdInput
                                        text= "Receipt Amount" 
                                        value= 'amount'
                                        ph="Enter Remaining Balance"
                                        showPrefix={true}
                                        acceptOnlyNum = {true}
                                    />
                                </>
                            }
                             
                            
                            {
                                values.type === 3 &&
                                <AntdInput
                                    text={"Reason"}
                                    value={'reason'}
                                    ph={"Enter Reason"}
                            />
                            }
                            
                        </div>
                        <div className="relative flex flex-row-reverse gap-10 mt-20 xl:absolute bottom-10 right-10">
                            <CButton btnType="submit" isLoading={isSubmitting}>
                                Save
                            </CButton>
                            <CButton onClick={() =>  dispatch(setShowAddBookPage(false))}type="cancel">
                                Cancel
                            </CButton>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default BankDepositModal;
