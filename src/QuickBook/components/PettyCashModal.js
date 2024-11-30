import React, { useState, useEffect, useRef } from "react";
import { Formik, Form } from 'formik';
import CButton from "../../components/ui/Button";
import AntdFormikSelect from "../../components/ui/AntdFormikSelect";
import AntdInput from "../../components/ui/AntdInput";
import AntdTextArea from "../../components/ui/AntdTextArea";
import { getStatusOfCurrentDate,_getStatusOfCurrentDate } from "../../Constants";
import CustomizedTable from "../../components/ui/CustomizedTable";
import { useDispatch, useSelector } from "react-redux";
import {
    setShowAddBookPage,
    setDataSavedModal,
    setPettyCashRemainingBalance,
    setSelectedBookType,
} from '../store/stateSlice';
import Modal from "../../components/shared/Modal";
import { PettyCashValidations } from "../../Validations";
import ParagraphTag from "../../constants/PTag";
import { apiStorePettyCashInfo } from "../../services/TransactionService";
import Loader from "../../components/shared/Loader";
import AntdDatePicker from "../../components/ui/AntdDatePicker/AntdDatePicker";
import ErrorModal from "../../components/ui/ErrorModal";
import { setApprovedDates } from "views/RequestBook/store/dataSlice";
import useFetchReqBook from "views/RequestBook/components/useFetchReqBook";

const initialValues = {
    id: 0,
    date: null,
    balance: '',
    amount: '',
    petty_cash_details: null,
    petty_cash_extra_details : "",
};

const columns = [
    { id: "day", name: "Day" },
    { id: "amount", name: "Amount" },
    { id: "balance", name: "Remaining Amount" },
    { id: "petty_cash_details", name: "Reason" },
    { id: "petty_cash_extra_details", name: "Comment" },
    { id: "actions", name: "Actions" },
];

const ShowInputBoxInPC = (
    label, value, ph, disableInput = false, 
    isShowPrefix = true, showOnlyNumbers = true
) => (
    <AntdInput
        text={label}
        value={value}
        ph={ph}
        disableInput={disableInput}
        showPrefix={isShowPrefix}
        acceptOnlyNum={showOnlyNumbers}
    />
)

const ShowTextBoxInPC = (label, value, ph) => (
    <AntdTextArea
        text={label}
        value={value}
        ph={ph}
    />
)


const PettyCashModal = (props) => {

    const dispatch = useDispatch();
    const pettyCashRef = useRef();
    const { fetchRequestedDates } = useFetchReqBook();
    const [pettyCashArr, setPettyCashArr] = useState([]);
    const [selectObjDetails, setSelectedObjDetails] = useState({
        showModal: false, selectedObj: {}
    })
    const [selectedDate,setSelectedDate] = useState(null);
    const [showLoader,setShowLoader] = useState(false);
    let commonPettyCash = useSelector(state => state.quickbookStore.state.pettyCashBalance);
    let remPettyCash = useSelector(state => state.quickbookStore.state.pettyCashRemBal);
    const [remPettybal,setRemPettybal] = useState(remPettyCash);
    const {
        reasonsList,
    } = useSelector(state => state.quickbookStore.state);
    let uniqueId = localStorage.getItem("uniqueId");
    const [eModal,setEModal] = useState({
        eMessage : "",show : false
    })
    const [storedPettyCash,setStoredPettyCash] = useState(commonPettyCash || 0);

    useEffect(() => {
        getRequiredDates();
        
        return () => {
            dispatch(setApprovedDates([]));
        }
    }, []);

    const getRequiredDates = async() => {
        try{
           let response = await fetchRequestedDates({book_name : "Petty Cash"});
           dispatch(setApprovedDates(response || []));
        }catch(Err){

        }
    }

    const handleSubmit = async (values) => {

        const { date, balance, amount, petty_cash_details,petty_cash_extra_details } = values;
        let isAllValuesPresent = date  && amount && petty_cash_details && petty_cash_extra_details;
        values.amount = Number(values.amount);
        values.key = uniqueId;
        if(values.balance < 0){
            pettyCashRef.current.setFieldError("balance","Balance should not be lessthan 0");
            return ;
        }
        let isDateFlag = getStatusOfCurrentDate(values.date);
        if(!isDateFlag && values.amount > storedPettyCash) {
            setEModal({
                eMessage : `Given amount should be less than or equal to the pettycash opening balance. As you selected previous date. and your current pettycash balance is ${storedPettyCash}`,
                show : true
            })
            return ;
        }
        if(!isDateFlag){
            setStoredPettyCash(storedPettyCash - values.amount)
        }
        // if(values.amount > values.balance) {
        //     setFieldError("amount","Balance should not be morethan pettycash balance");
        //     return ;
        // }
        let newTempObj = JSON.parse(JSON.stringify(values));
        let findObj = (reasonsList || []).find((eachDoc) => eachDoc.Id == petty_cash_details);
        newTempObj.petty_cash_details = findObj?.Type || ""; 

        if (isAllValuesPresent) {
            setPettyCashArr((prev) => [...prev, newTempObj]);
            pettyCashRef.current?.setTouched({});
            pettyCashRef.current.setFieldValue("date",null);
            pettyCashRef.current.setFieldValue("balance","");
            pettyCashRef.current.setFieldValue("amount","");
            pettyCashRef.current.setFieldValue("petty_cash_extra_details","");
            pettyCashRef.current.setFieldValue("petty_cash_details",null);
            setRemPettybal(newTempObj.balance);
       
        }

    }

    const onEModalCancel = () => {
        setEModal({
            show : false,
            eMessage : ""
        })
    }

    const handleSavePettyCash = async () => {
        if (pettyCashArr?.length <= 0) {
            return;
        }
        setShowLoader(true);
        let response = await apiStorePettyCashInfo(pettyCashArr);
        if (response.message) {
            setShowLoader(false);
            dispatch(setShowAddBookPage(false));
            dispatch(setSelectedBookType(null));
            dispatch(setDataSavedModal(true));

        }
    }


    const handleEditClick = (key, obj) => {
        obj.key = key;
        setSelectedObjDetails({
            showModal: true,
            selectedObj: obj
        })
    }
   
    const handleDeleteClick = (key) => {

        let newPettyCashArr = [...pettyCashArr];
        let removedObj = newPettyCashArr.splice(key, 1);
        setRemPettybal(prevVal => prevVal + (removedObj?.[0].amount || 0));
        newPettyCashArr.forEach((eachItem,index) => {
            if(key <= index){
                eachItem.balance += removedObj?.[0].amount || 0;
            }
        });
        setPettyCashArr(JSON.parse(JSON.stringify(newPettyCashArr)));
    }
  
    // const handleEditDetails = (val) => {
    //     setSelectedObjDetails({
    //         showModal: false,
    //         selectedObj: val
    //     })
    //     let newTemp = JSON.parse(JSON.stringify(pettyCashArr));
    //     let newObj = JSON.parse(JSON.stringify(val));
    //     newObj.key = uniqueId;
    //     newObj.amount = Number(newObj.amount);
    //     newTemp[val.key] = newObj;
    //     setPettyCashArr(newTemp);
    //     setRemPettybal(newObj.balance);
    // }

    const getButtonStatus = (pArr) => pArr.length <= 0 ? true : false;
    const handleCancelModInPC = () => {
        setSelectedObjDetails({
            showModal: false,
            selectedObj: {}
        })
    }

    return (<div className="h-full">
        <div className="h-[80%] overflow-y-scroll">
        <Formik
            initialValues={initialValues}
            innerRef={pettyCashRef}
            validationSchema={PettyCashValidations}
            onSubmit={(values, { setErrors, resetForm,setFieldError,setFieldValue}) => {
                handleSubmit(values);
            }}
            // style={{ overflow: "auto" }}
        >
            {({ setFieldValue,values}) => {
                values.balance = remPettybal - Number(values.amount);
                return (
                    <Form >
                        
                        <ParagraphTag label = "Details"/>
                        <div className="grid grid-cols-1 gap-4 px-4 pb-2 lg:grid-cols-3 md:grid-cols-2">
                           
                            <AntdDatePicker
                            labelText="Day"
                            name="date"
                            ph="--- Select Day ---"
                            value = {values["date"]}
                            handleChange = {(date,dateString) => {setFieldValue("date",dateString);
                                setSelectedDate(dateString)
                            }}
                            />
                            {
                                ShowInputBoxInPC("Amount", 'amount', "Enter Amount")
                            }
                            {
                                ShowInputBoxInPC("Remaing Amount", 'balance', "Enter Remaining Amount", true)
                            }
                           
                            <AntdFormikSelect
                                labelText="Reason"
                                name="petty_cash_details"
                                ph="Select Reason"
                                handleChange={(name, selectedValue) => setFieldValue(name,selectedValue)}
                                Arr={reasonsList}
                            />
                            {
                                ShowTextBoxInPC("Comment","petty_cash_extra_details","Enter Comment")
                            }
                            
                            <div className="flex flex-col w-full md:w-60 py-7 mt-3">
                                <CButton btnType="submit">
                                    Add
                                </CButton>
                            </div>
                        </div>
                    </Form>
                )
            }}
        </Formik>
        <hr style={{ border: "5px solid #F4F6F9" }} />
        <ParagraphTag label="Details list" />
        <div className="mb-10">
            <CustomizedTable
                data={pettyCashArr}
                columns={columns}
                handleDeleteClick={handleDeleteClick}
            />
        </div>
        </div>
        <div className="flex flex-row-reverse items-center gap-10 px-4 h-[20%]">
            <CButton
                onClick={handleSavePettyCash}
                isDisabled={getButtonStatus(pettyCashArr)}>
                Save
            </CButton>
            <CButton onClick={() => {
                setPettyCashArr([]);
                dispatch(setSelectedBookType(null));
                dispatch(setShowAddBookPage(false))
            }
            }
                type="cancel"
            >
                Cancel
            </CButton>
        </div>
        {
            showLoader && <Loader showLoading = {true}/>
        }
         { 
            eModal.show && <ErrorModal msg = {eModal.eMessage} handleCloseEModal={onEModalCancel}  ai ="center"/>
        }
    </div>
    )
}

export default PettyCashModal;
