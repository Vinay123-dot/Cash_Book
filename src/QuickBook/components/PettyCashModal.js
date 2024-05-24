import React, { useState, useEffect, useRef } from "react";
import { Formik, Form } from 'formik';
import CButton from "../../components/ui/Button";
import AntdFormikSelect from "../../components/ui/AntdFormikSelect";
import AntdInput from "../../components/ui/AntdInput";
import AntdTextArea from "../../components/ui/AntdTextArea";
import { DaysArr } from "../../Constants";
import CustomizedTable from "../../components/ui/CustomizedTable";
import { useDispatch, useSelector } from "react-redux";
import {
    setShowAddBookPage,
    setDataSavedModal,
    setPettyCashBalance
} from '../store/stateSlice';
import Modal from "../../components/shared/Modal";
import { PettyCashValidations } from "../../Validations";
import ParagraphTag from "../../constants/PTag";
import { apiStorePettyCashInfo,apiGetPettyCashCommonBalance } from "../../services/TransactionService";
import Loader from "../../components/shared/Loader";

const initialValues = {
    id: 0,
    date: null,
    balance: '',
    amount: '',
    petty_cash_details: '',
};

const columns = [
    { id: "day", name: "Day" },
    { id: "amount", name: "Amount" },
    { id: "balance", name: "Remaining Amount" },
    { id: "petty_cash_details", name: "Reason" },
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

    const { showPettyCash, onCancel } = props;
    const dispatch = useDispatch();
    const editFormikRef = useRef();

    const [pettyCashArr, setPettyCashArr] = useState([]);
    const [selectObjDetails, setSelectedObjDetails] = useState({
        showModal: false, selectedObj: {}
    })
    const [showLoader,setShowLoader] = useState(false);
    
    let cashPetty = useSelector(state => state.quickbookStore.state.pettyCashBalance);
    const [remPettybal,setRemPettybal] = useState(cashPetty);
    let uniqueId = localStorage.getItem("uniqueId");

    useEffect(()=>{
        setRemPettybal(cashPetty);
    },[cashPetty])

    if (!showPettyCash) return null;

    const handleSubmit = async (values, setErrors, resetForm,setFieldError) => {

        const { date, balance, amount, petty_cash_details } = values;
        let isAllValuesPresent = date && balance && amount && petty_cash_details;
        values.amount = Number(values.amount);
        values.key = uniqueId;
        if(values.balance < 0){
            setFieldError("balance","Balance should not be lessthan 0");
            return ;
        }
        if (isAllValuesPresent) {
            setPettyCashArr((prev) => [...prev, values]);
            setErrors({});
            setTimeout(() => {
                resetForm();
                setRemPettybal(values.balance);
            }, 0);
        }

    }

    const handleSavePettyCash = async () => {
        if (pettyCashArr?.length <= 0) {
            return;
        }
        setShowLoader(true);
        let response = await apiStorePettyCashInfo(pettyCashArr);
        if (response.message) {
            getPettyCashCommBalance();
            setShowLoader(false);
            dispatch(setShowAddBookPage(false));
            onCancel();
            dispatch(setDataSavedModal(true));

        }
    }

    const getPettyCashCommBalance = async () => {
        try {
          let response = await apiGetPettyCashCommonBalance({ uniqueId });
          dispatch(setPettyCashBalance(response?.opening_balance));
        } catch (e) {
    
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

    return (<>
        <Formik
            initialValues={initialValues}
            validationSchema={PettyCashValidations}
            onSubmit={(values, { setErrors, resetForm,setFieldError }) => {
                handleSubmit(values, setErrors, resetForm,setFieldError);
            }}
            style={{ overflow: "auto" }}
        >
            {({ setFieldValue,values }) => {
                values.balance = remPettybal - Number(values.amount);
                if(values.petty_cash_details) {
                    let reasonStng = values.petty_cash_details;
                    values.petty_cash_details =  reasonStng.charAt(0).toUpperCase() + reasonStng.slice(1);
                }
                
                return (
                    <Form>
                        <ParagraphTag label = "Details"/>
                        <div className="grid grid-cols-1 gap-10 px-4 py-2 lg:grid-cols-3 md:grid-cols-2">
                            <AntdFormikSelect
                                labelText="Day"
                                name="date"
                                ph="--- Select Day ---"
                                handleChange={(name, selectedValue) => setFieldValue(name, selectedValue)}
                                Arr={DaysArr}
                            />
                            {
                                ShowInputBoxInPC("Amount", 'amount', "Enter Amount")
                            }
                            {
                                ShowInputBoxInPC("Remaing Amount", 'balance', "Enter Remaining Amount", true)
                            }
                            {
                                ShowTextBoxInPC("Reason", "petty_cash_details", "Enter Reason")
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
                handleEditClick={handleEditClick}
                handleDeleteClick={handleDeleteClick}
            />
        </div>

        <div className="relative flex flex-row-reverse gap-10  bottom-5 right-5">
            <CButton
                onClick={handleSavePettyCash}
                isDisabled={getButtonStatus(pettyCashArr)}>
                Save
            </CButton>
            <CButton onClick={() => {
                setPettyCashArr([]);
                onCancel();
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
    </>
    )
}

export default PettyCashModal;


{/* <Modal openModal={selectObjDetails.showModal}>
<Formik
    initialValues={selectObjDetails.selectedObj}
    validationSchema={PettyCashValidations}
    innerRef={editFormikRef}
    onSubmit={(values, { setSubmitting, resetForm }) => {
        handleEditDetails(values)
    }}
    style={{ overflow: "auto", position: "relative" }}
>
    {({ setFieldValue,values }) =>  {
        //  values.balance = values.balance - Number(values.amount);
         if(values.petty_cash_details) {
            let reasonStng = values.petty_cash_details;
            values.petty_cash_details =  reasonStng.charAt(0).toUpperCase() + reasonStng.slice(1);
        }
    return (
        <Form>
            <ParagraphTag label="Edit Details" />
            <div className="grid grid-cols-2 px-4 py-2 gap-10">
                <AntdFormikSelect
                    labelText="Type"
                    name="date"
                    ph="--- Select Day ---"
                    handleChange={(name, selectedValue) => setFieldValue(name, selectedValue)}
                    Arr={DaysArr}
                />
                <AntdInput
                    text="Amount"
                    value='amount'
                    ph="Enter Amount"
                    showPrefix={true}
                    acceptOnlyNum={true}
                />
                <AntdInput
                    text="Remaing Amount"
                    value='balance'
                    ph="Enter Remaining Amount"
                    showPrefix={true}
                    acceptOnlyNum={true}
                    disableInput={true}
                />
                {
                    ShowTextBoxInPC("Reason", "petty_cash_details", "Enter Reason")
                }
            </div>

            <div className="absolute flex flex-row-reverse gap-10  bottom-5 right-5">
                <CButton btnType="submit">
                    Save
                </CButton>
                <CButton onClick={handleCancelModInPC}
                    type="cancel"
                >
                    Cancel
                </CButton>
            </div>


        </Form>
)}}

</Formik>
</Modal> */}