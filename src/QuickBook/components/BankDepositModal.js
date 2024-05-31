import React, { useEffect,useState } from "react";
import { Formik, Form } from 'formik';
import CButton from "../../components/ui/Button";
import AntdFormikSelect from "../../components/ui/AntdFormikSelect";
import AntdInput from "../../components/ui/AntdInput";
import AntdTextArea from "../../components/ui/AntdTextArea";
import { BankDepositTypeValidations } from "../../Validations";
import { useDispatch,useSelector } from "react-redux";
import {
    setShowAddBookPage,
    setDataSavedModal
  } from '../store/stateSlice';
import ParagraphTag from "../../constants/PTag";
import { DaysArr } from "../../Constants";
import { 
    apiGetDepositModeInfo, 
    apiGetDepositTypeInfo,
    apiStoreBankDepositInfo
    } from "../../services/TransactionService";
import Loader from "../../components/shared/Loader";

const ShowTextBoxInPC = (label, value, ph) => (
    <AntdTextArea
        text={label}
        value={value}
        ph={ph}
    />
)

const initialValues = {
    id : 0,
    date: null, //string
    type: null, //string
    deposit_mode: null, //string
    reason: '', //string
    amount: null, //number
    remaining_balance: null, //number
    advance_receipt_no: '', //string
    bill_number : "",
    store_id : ""
};

const BankDepositModal = (props) => {
    const { showBankDeposit,onCancel } = props;
    const dispatch = useDispatch();
    const [depositList,setDepositList] = useState([]);
    const [depositModeList,setDepositModeList] = useState([]);
    // const commOpeningBal = useSelector(state => state.quickbookStore.state.commonCashBanalce);
    const remCommOpeningBal = useSelector(state => state.quickbookStore.state.remainingCommonBalance);
    const [startLoading,setStartLoading] = useState(false);
    let uniqueId = localStorage.getItem("uniqueId");
 

    useEffect(() => {
        fetchDepositInfo();
    },[])

    const fetchDepositInfo = async() => {
        try{
            const [depositTypeResponse,depositModeResponse] = await Promise.all([
                apiGetDepositTypeInfo(),
                apiGetDepositModeInfo()
            ])
            setDepositList(depositTypeResponse?.data || []);
            setDepositModeList(depositModeResponse?.data || []);
        }catch(e){

        }
    }
    
    if (!showBankDeposit) return null;

  
    const handleSubmit = async(values,setSubmitting) => {
        try{
            setStartLoading(true);
            let newObj = JSON.parse(JSON.stringify(values));
            newObj.amount = Number(newObj.amount);
            newObj.key = uniqueId;
            let response = await apiStoreBankDepositInfo([newObj]);
            setSubmitting(false);
            if(response.message){
                dispatch(setShowAddBookPage(false));
                onCancel();
                dispatch(setDataSavedModal(true));
                setStartLoading(false);
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
    const handleCancelBankDeposit = () => {
        dispatch(setShowAddBookPage(false));
        onCancel();
    }

    return (<>
        <Formik
            initialValues={initialValues}
            validationSchema={BankDepositTypeValidations}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                handleSubmit(values,setSubmitting);
            }}
            style={{ overflow: "auto",position:"relative" }}
        >
            {({ setFieldValue, values }) => {
                if(values.amount){
                    values.remaining_balance =  remCommOpeningBal - Number(values.amount);
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
                                    <AntdInput
                                        text="Bill Number"
                                        value = 'bill_number'
                                        ph= "Bill Number"
                                    />
                                    <AntdInput
                                        text= "Store Id" 
                                        value= 'store_id'
                                        ph="Enter Store Id"
                                    />
                                </>
                            }
                             
                            
                            {
                                values.type === 3 &&
                                ShowTextBoxInPC("Reason", 'reason', "Enter Reason")
                            }
                            
                        </div>
                            <div className="flex flex-row-reverse gap-10 px-4 py-2 lg:absolute right-5 bottom-5">
                            <CButton btnType = "submit">
                                Save
                            </CButton>
                            <CButton 
                                onClick={handleCancelBankDeposit}
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
            startLoading && <Loader showLoading = {true}/>
        }
        
       
        </>
    )
}

export default BankDepositModal;

