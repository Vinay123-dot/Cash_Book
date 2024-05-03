import React, { useState,useEffect,useRef } from "react";
import { Formik, Form } from 'formik';
import CButton from "../../components/ui/Button";
import AntdFormikSelect from "../../components/ui/AntdFormikSelect";
import AntdInput from "../../components/ui/AntdInput";
import { DaysArr } from "../../Constants";
import CustomizedTable from "../../components/ui/CustomizedTable";
import { useDispatch, useSelector } from "react-redux";
import {
    setShowAddBookPage,
    setDataSavedModal
} from '../store/stateSlice';
import Modal from "../../components/shared/Modal";
import { PettyCashValidations } from "../../Validations";
import ParagraphTag from "../../constants/PTag";
import { apiStorePettyCashInfo } from "../../services/TransactionService";

const initialValues = {
    id : 0,
    date: null,
    balance: '',
    amount: '',
    petty_cash_details: '',
};

const columns = [
    {id:"day",name:"Day"},
    {id:"amount",name:"Amount"},
    {id:"balance",name:"Remaining Amount"},
    {id:"petty_cash_details",name:"Reason"},
    {id:"actions",name:"Actions"},
];

const ShowInputBoxInPC = (label,value,ph,disableInput = false,isShowPrefix = true,showOnlyNumbers = true) => (
    <AntdInput
        text = {label}
        value = {value}
        ph = {ph}
        disableInput = {disableInput}
        showPrefix={isShowPrefix}
        acceptOnlyNum={showOnlyNumbers}
    />
)

const PettyCashModal = (props) => {

    const { showPettyCash,onCancel } = props;
    const dispatch = useDispatch();
    const editFormikRef = useRef();
    
    const [pettyCashArr, setPettyCashArr] = useState([]);
    const [selectObjDetails,setSelectedObjDetails] = useState({
        showModal : false,selectedObj:{}
    })
    const pettyCash = useSelector(state => state.quickbookStore.state.pettyCashBalance);

    if (!showPettyCash) return null;

    const handleSubmit = async(values,setErrors,resetForm) => {
        console.log("INHANDLESUBMT");
        const {date,balance,amount,petty_cash_details} = values;
        let isAllValuesPresent = date && balance && amount && petty_cash_details ;
        values.amount = Number(values.amount);
        if(isAllValuesPresent) {
            setPettyCashArr((prev) => [...prev, values]); 
            setErrors({});
            setTimeout(() => {
                console.log("TestTImeout")
                resetForm();
            }, 0);
         }
      
    }

    const handleSavePettyCash = async() => {
        if(pettyCashArr?.length <= 0) {
            console.log("NO PETTYCASH");
            return ;
        }
        let response = await apiStorePettyCashInfo(pettyCashArr);
        if(response.message){
            dispatch(setShowAddBookPage(false));
            onCancel();
            dispatch(setDataSavedModal(true));
            
        }
    }
   
    const handleEditClick = (key,obj) => {
        obj.key = key;
        setSelectedObjDetails({
            showModal :true,
            selectedObj: obj
        })
    }

    const handleDeleteClick = (key) => {
        pettyCashArr.splice(key,1);
        setPettyCashArr(pettyCashArr);
    }

    const handleEditDetails = (val) => {
        console.log("v",val)
        setSelectedObjDetails({
            showModal :false,
            selectedObj: val
        })
        pettyCashArr[val.key] = val;
        setPettyCashArr(pettyCashArr);
    }

    const getButtonStatus = (pArr) => pArr.length <= 0 ? true : false;

    return ( <>
        <Formik
            initialValues={initialValues}
            validationSchema={PettyCashValidations}
            onSubmit={(values, { setSubmitting,setErrors,resetForm }) => {
                console.log("IN OnSumbit")
                handleSubmit(values,setErrors,resetForm);
            }}
            style={{ overflow: "auto" }}
        >
            {({ setFieldValue, values,errors,setErrors}) => {
                // console.log("erros",errors);
                values.balance = pettyCash - Number(values.amount)
                return(
                <Form>
                    <ParagraphTag  label = "Details"/>
                    <div className="grid grid-cols-1 gap-10 px-4 py-2 lg:grid-cols-3 md:grid-cols-2">
                        <AntdFormikSelect
                            labelText="Day"
                            name="date"
                            ph="--- Select Day ---"
                            handleChange={(name, selectedValue) => setFieldValue(name, selectedValue)}
                            Arr={DaysArr}
                        />
                        {
                            ShowInputBoxInPC("Amount",'amount',"Enter Amount")
                        }
                        {
                            ShowInputBoxInPC("Remaing Amount",'balance',"Enter Remaining Amount",true)
                        }
                        {
                            ShowInputBoxInPC("Reason","petty_cash_details","Enter Reason",false,false,false)
                        }
                        <div className="flex flex-col w-full md:w-60 py-7">
                            <CButton btnType="submit">
                                Add
                            </CButton>
                        </div>
                    </div>
                   

                </Form>
                
            )}}
        </Formik>
        <hr style={{ border: "5px solid #F4F6F9" }} />
                    <ParagraphTag  label ="Details list"/>
                    <div className="mb-10">
                    <CustomizedTable 
                        data = {pettyCashArr} 
                        columns = {columns}
                        handleEditClick = {handleEditClick}
                        handleDeleteClick = {handleDeleteClick}
                    />
                    </div>
                 
                       <div className=" relative flex flex-row-reverse gap-10  bottom-5 right-10">
                        <CButton 
                            onClick ={handleSavePettyCash} 
                            isDisabled={getButtonStatus(pettyCashArr)}>
                            Save
                        </CButton>
                        <CButton onClick={() => {
                                setPettyCashArr([]);
                                onCancel();
                                dispatch(setShowAddBookPage(false))}
                            } 
                            type="cancel"
                        >
                            Cancel
                        </CButton>
                    </div>
        

     
        <Modal openModal = {selectObjDetails.showModal}>
        <Formik
            initialValues={selectObjDetails.selectedObj}
            validationSchema={PettyCashValidations}
            innerRef={editFormikRef}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                handleEditDetails(values)
            }}
            style={{ overflow: "auto",position:"relative" }}
        >
            {({setFieldValue}) => (
                <Form>
                    <ParagraphTag  label = "Edit Details"/>
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
                            acceptOnlyNum = {true}
                        />
                        <AntdInput
                            text=" Remaing Amount"
                            value='balance'
                            ph="Enter Remaining Amount"
                            showPrefix={true}
                            acceptOnlyNum = {true}
                        />

                        <AntdInput
                            text="Reason"
                            value='petty_cash_details'
                            ph="Enter Reason"
                        />
                    </div>

                    <div className=" absolute flex flex-row-reverse gap-10  bottom-5 right-5">
                        <CButton btnType="submit" onClick = {() => console.log("CAncel")}>
                            Save
                        </CButton>
                        <CButton onClick={() => {
                                dispatch(setShowAddBookPage(false))}
                            } 
                            type="cancel"
                        >
                            Cancel
                        </CButton>
                    </div>

                </Form>
            )}

        </Formik>
        </Modal>
        </>
    )
}

export default PettyCashModal;