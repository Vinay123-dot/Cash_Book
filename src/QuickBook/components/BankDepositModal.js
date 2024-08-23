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
import { DaysArr,getStatusOfCurrentDate } from "../../Constants";
import { 
    apiGetDepositModeInfo, 
    apiGetDepositTypeInfo,
    apiStoreBankDepositInfo,
    apiVerifyAdvancedBookReceipt,
    apiGetReturnType
    } from "../../services/TransactionService";
import Loader from "../../components/shared/Loader";
import ErrorModal from "../../components/ui/ErrorModal";
import AntdDatePicker from "../../components/ui/AntdDatePicker/AntdDatePicker";

const ShowTextBoxInPC = (label, value, ph) => (
    <AntdTextArea
        text={label}
        value={value}
        ph={ph}
    />
)
const checkArr = ["",null];
const statusArr = ["Partially Refunded","Invoiced","ORDERCANCEL",""];
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
    store_id : null,
    total_receipt_amount : null,
    receipt_status : "",
    receipt_type_id : null,
    person_name : "",
    person_mobile : "",
    return_number : "" //only for return order
};


const BankDepositModal = (props) => {
    const { showBankDeposit,onCancel } = props;
    const dispatch = useDispatch();
    const [depositList,setDepositList] = useState([]);
    const [depositModeList,setDepositModeList] = useState([]);
    const [returnType,setReturnType] = useState([]);
    const commOpeningBal = useSelector(state => state.quickbookStore.state.commonCashBanalce);
    const remCommOpeningBal = useSelector(state => state.quickbookStore.state.remainingCommonBalance);
    const allTerminals = useSelector(state => state.quickbookStore.state.allTerminalList);
    const [startLoading,setStartLoading] = useState(false);
    const [verifyBtnLdng,setVerifyBtnLdng] = useState(false);
    const [eModal,setEModal] = useState({
        eMessage : "",show : false
    })
    const [selectedDate,setSelectedDate] = useState(null);
    const [selectedType,setSelectedType] = useState(null);
    // const [remOpenBal, setRemOpenBal] = useState(remCommOpeningBal);
    let uniqueId = localStorage.getItem("uniqueId");

    // useEffect(() => {
    //     let checkDateStatus = getStatusOfCurrentDate(selectedDate);
    //     let balanceTemp = (checkArr.includes(selectedDate)|| checkDateStatus ) && selectedType !== 2 ? remCommOpeningBal : commOpeningBal;
    //     setRemOpenBal(balanceTemp);
    // }, [commOpeningBal,remCommOpeningBal,selectedDate,selectedType])
 

    useEffect(() => {
        fetchDepositInfo();
        fetchRerturnType();
    },[])

    const fetchDepositInfo = async() => {
        try{
            const [depositTypeResponse,depositModeResponse] = await Promise.all([
                apiGetDepositTypeInfo(),
                apiGetDepositModeInfo(),
            ])
            let newArr = [...depositTypeResponse?.data];
            let splicedObj = (newArr || []).splice(3,1);
            (newArr || []).forEach((eachDoc) => {
                eachDoc.Type = eachDoc.Id === 3 ? eachDoc.Type+'/'+splicedObj?.[0].Type :eachDoc.Type;
                
            });
            setDepositList(newArr);
            setDepositModeList(depositModeResponse?.data || []);
        }catch(e){

        }
    }

    const fetchRerturnType = async() => {
        try{
            const response = await apiGetReturnType();
            setReturnType(response?.data || []);
        }catch(e){

        }
    }
   
    if (!showBankDeposit) return null;

  
    const handleSubmit = async(values,setSubmitting) => {
        try{
            setStartLoading(true);
            let newObj = JSON.parse(JSON.stringify(values));
            newObj.amount = Number(newObj.amount);
            newObj.total_receipt_amount = Number(newObj.total_receipt_amount);

            if(newObj.amount > remCommOpeningBal) {
                setEModal({
                    eMessage : "Given amount should be less than or equal to the remaining opening balance",
                    show : true
                })
                setStartLoading(false);
                return ;
            }
           

            let isDateFlag = getStatusOfCurrentDate(newObj.date);
            let isCondFlag = (newObj.type == 1 && !isDateFlag) ||newObj.type == 2 || (newObj.type == 3 && !isDateFlag);
          
            if(isCondFlag && newObj.amount > commOpeningBal) {
                    
                    setEModal({
                        eMessage : `Given amount should be less than or equal to the opening balance . ${newObj.type ==2 ?"":"As you selected previous date."}`,
                        show : true
                    })
                    setStartLoading(false);
                    return ;
                }
            
            
            
            if(newObj.total_receipt_amount > 0){
                newObj.type = (newObj.amount === newObj.total_receipt_amount) ? 3 : 4;
            }
            if(newObj.store_id) {
                let dummyObj = (allTerminals || []).find((eachDoc) => eachDoc.Id === newObj.store_id);
                newObj.store_id = dummyObj.Terminal || newObj.store_id
            }
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
        setSelectedType(val);
        setFieldValue(name,val);
        setFieldValue("date",null);
        setFieldValue("deposit_mode",null);
        setFieldValue("reason","");
        setFieldValue("amount",null);
        setFieldValue("remaining_balance",null);
        setFieldValue("advance_receipt_no","");
        setFieldValue("receipt_type_id",null);
    }
    const handleCancelBankDeposit = () => {
        dispatch(setShowAddBookPage(false));
        setVerifyBtnLdng(false);
        onCancel();
    }

    const handleVerifyAdvanceMoney = async(allVal,setFieldValue) => {
        const {advance_receipt_no} = allVal;
        try {
            if(!advance_receipt_no) return console.log("test")
                setVerifyBtnLdng(true);
                const data = {
                    key : uniqueId,
                    id : advance_receipt_no
                };
            let response = await apiVerifyAdvancedBookReceipt(data);
            
            if(response){
                setEModal({
                    eMessage : statusArr.includes(response?.Status) ? "This receipt number is already used" : "",
                    show : statusArr.includes(response?.Status) ?true :false
                })
                setFieldValue("total_receipt_amount",response?.Bill_Value || 0);
                setFieldValue("amount",response?.Remaining_Balance || 0);
                setFieldValue("receipt_status",response?.Status || "");
                setVerifyBtnLdng(false);
            }
           
            
        }catch(Err){
            setEModal({
                eMessage : Err?.response?.data?.detail || "Failed you to submit data.Please Check the details again",
                show : true
            })
            setFieldValue("total_receipt_amount", 0);
            setFieldValue("amount",0);
            setFieldValue("receipt_status", "");
            setVerifyBtnLdng(false);
        }
        
    }

    const onEModalCancel = () => {
        setEModal({
            show : false,
            eMessage : ""
        })
    }

    return (<>
        <Formik
            initialValues={initialValues}
            validationSchema={BankDepositTypeValidations}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                handleSubmit(values,setSubmitting);
            }}
            // style={{ overflow: "auto",position:"relative" }}
        >
            {({ setFieldValue, values }) => {
                    values.remaining_balance =  remCommOpeningBal - (Number(values.amount) || 0);
               
                return (
                    <Form className="h-full">
                        <div className="h-[80%]">
                         <ParagraphTag  label = "Details"/>
                        <div className="grid grid-cols-1 gap-4 px-4 pb-2 lg:grid-cols-3 md:grid-cols-2">
                            <AntdFormikSelect
                                labelText="Type"
                                name="type"
                                ph="Select Type"
                                handleChange={(name, selectedValue) => handleChangeType(name,selectedValue,setFieldValue)}
                                Arr={depositList}
                            />
                            {
                                values.type != null && 
                                <AntdDatePicker
                                    labelText="Day"
                                    name="date"
                                    ph="--- Select Day ---"
                                    value={values["date"]}
                                    handleChange={(date, dateString) => {
                                        setFieldValue("date", dateString);
                                        setSelectedDate(dateString);
                                    }}
                                        
                                />
                                
                            }
                            {
                                values.type != null && [1,2,5].includes(values.type) &&
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
                                values.type != null && values.type === 3 && 
                                <AntdFormikSelect
                                    labelText="Receipt Type"
                                    name="receipt_type_id"
                                    ph="--- Select Receipt Type---"
                                    handleChange={(name, selectedValue) => setFieldValue(name, selectedValue)}
                                    Arr={returnType}
                                />
                            }
                            {
                                values.type != null && [3].includes(values.type)  && values.receipt_type_id === 1 && 
                                <div className="flex">
                                        <AntdInput
                                            text = "Receipt Number"
                                            value = 'advance_receipt_no'
                                            ph= "Enter Receipt Number"
                                        />
                                        <CButton
                                            className = "ml-5 mt-10"
                                            style = {{width : 100,height : 32}}
                                            isLoading = {verifyBtnLdng}
                                            onClick = {() => handleVerifyAdvanceMoney(values,setFieldValue)}
                                        >
                                            Verify
                                        </CButton>
                                    </div>
                            }
                            
                           
                             
                            
                            {
                                values.type === 3 && values.receipt_type_id !== null &&
                                (values.receipt_type_id === 2 || !statusArr.includes(values.receipt_status)) &&
                                <>
                                 <AntdInput
                                        text= {values.receipt_type_id === 2? "Return Amount":"Receipt Amount" }
                                        value= 'amount'
                                        ph="Enter Remaining Balance"
                                        showPrefix={true}
                                        acceptOnlyNum = {true}
                                        disableInput = {values.receipt_type_id === 1}
                                        
                                    />
                                    <AntdInput
                                        text="Bill Number"
                                        value = 'bill_number'
                                        ph= "Bill Number"
                                    />
                                    <AntdFormikSelect
                                        labelText="Store Id"
                                        name="store_id"
                                        ph="--- Select Store Id---"
                                        handleChange={(name, selectedValue) => setFieldValue(name, selectedValue)}
                                        Arr={allTerminals}
                                    />
                                    
                                    <AntdInput // Newly added not there in api
                                        text="Return Number"
                                        value = 'return_number'
                                        ph= "Return Number"
                                    />
                                    {
                                        ShowTextBoxInPC("Reason", 'reason', "Enter Reason")
                                    }
                                </>
                            }
                            {
                                values.type === 5 &&
                                <>
                                    <AntdInput
                                        text="Person Name"
                                        value = 'person_name'
                                        ph= "Person Name"
                                    />
                                    <AntdInput
                                        text="Mobile Number"
                                        value = 'person_mobile'
                                        ph= "Mobile Number"
                                        acceptOnlyNum={true}
                                        maxLen = {10}
                                        forMobileNum = {true}
                                    />
                                    {
                                        ShowTextBoxInPC("Reason", 'reason', "Enter Reason")
                                    }
                                </>
                            }
                            
                        </div>
                        </div>
                            <div className="flex flex-row-reverse items-center gap-10 px-4 h-[20%]">
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
        { 
            eModal.show && <ErrorModal msg = {eModal.eMessage} handleCloseEModal={onEModalCancel}  ai ="center"/>
        }
        
       
        </>
    )
}

export default BankDepositModal;

