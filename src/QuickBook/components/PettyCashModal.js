import React, { useState } from "react";
import { Formik, Form } from 'formik';
import CButton from "../../components/ui/Button";
import AntdFormikSelect from "../../components/ui/AntdFormikSelect";
import AntdInput from "../../components/ui/AntdInput";
import { DaysArr } from "../../Constants";
import CustomizedTable from "../../components/ui/CustomizedTable";
import { useDispatch, useSelector } from "react-redux";
import {
    setShowAddBookPage
} from '../store/stateSlice';
import Modal from "../../components/shared/Modal";
import { PettyCashValidations } from "../../Validations";
import ParagraphTag from "../../constants/PTag";

const initialValues = {
    seelctedDay: null,
    remAmount: '',
    amount: '',
    reason: '',
};

const columns = [
    {id:"day",name:"Day"},
    {id:"amount",name:"Amount"},
    {id:"remAmount",name:"Remaining Amount"},
    {id:"reason",name:"Reason"},
    {id:"actions",name:"Actions"},
]


const PettyCashModal = (props) => {
    const dispatch = useDispatch();
    const { showPettyCash } = props;
    const [pettyCashArr, setPettyCashArr] = useState([]);
    const [hasClickedPCBtn, setHasClickedPCBtn] = useState(false);
    const [selectObjDetails,setSelectedObjDetails] = useState({
        showModal : false,selectedObj:{}
    })
  
    if (!showPettyCash) return null;

    const handleSubmit = (values) => {
        delete values["date"];
        console.log("v", values)
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
    
    return ( <>
        <Formik
            initialValues={initialValues}
            validationSchema={PettyCashValidations}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                console.log("isP",hasClickedPCBtn);
                !hasClickedPCBtn && handleSubmit(values);
            }}
            style={{ overflow: "auto" }}
        >
            {({ setFieldValue, values, resetForm}) => (
                <Form>
                    <ParagraphTag  label = "Details"/>
                    <div className="grid grid-cols-1 gap-10 px-4 py-2 lg:grid-cols-3 md:grid-cols-2">
                        <AntdFormikSelect
                            labelText="Type"
                            name="seelctedDay"
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
                            value='remAmount'
                            ph="Enter Remaining Amount"
                            showPrefix={true}
                            acceptOnlyNum = {true}
                        />

                        <AntdInput
                            text="Reason"
                            value='reason'
                            ph="Enter Reason"
                        />
                        <div className="flex flex-col w-full md:w-60 py-7">
                            <CButton btnType="submit" onClick={() => {
                                const {seelctedDay,remAmount,amount,reason} = values;
                                setHasClickedPCBtn(true);
                                if(seelctedDay && remAmount && amount && reason) {
                                    setPettyCashArr((prev) => [...prev, values]); 
                                    resetForm();
                                }
                            }}>
                                Add
                            </CButton>

                        </div>


                    </div>
                    <hr style={{ border: "5px solid #F4F6F9" }} />
                    <p className="font-roboto text-lg font-medium leading-6 tracking-wide text-left px-4 pt-2 px-4 pt-2" style={{ color: "#5A87B2" }}>
                        Details list
                    </p>
                    <CustomizedTable 
                        data = {pettyCashArr} 
                        columns = {columns}
                        handleEditClick = {handleEditClick}
                        handleDeleteClick = {handleDeleteClick}
                    />

                    <div className=" relative flex flex-row-reverse gap-10  bottom-5 right-10">
                        <CButton btnType="submit" >
                            Save
                        </CButton>
                        <CButton onClick={() => {
                                setHasClickedPCBtn(false);
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
        <Modal openModal = {selectObjDetails.showModal}>
        <Formik
            initialValues={selectObjDetails.selectedObj}
            validationSchema={PettyCashValidations}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                console.log("isP",hasClickedPCBtn);
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
                            name="seelctedDay"
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
                            value='remAmount'
                            ph="Enter Remaining Amount"
                            showPrefix={true}
                            acceptOnlyNum = {true}
                        />

                        <AntdInput
                            text="Reason"
                            value='reason'
                            ph="Enter Reason"
                        />
                    </div>

                    <div className=" absolute flex flex-row-reverse gap-10  bottom-5 right-5">
                        <CButton btnType="submit" >
                            Save
                        </CButton>
                        <CButton onClick={() => {
                                setHasClickedPCBtn(false);
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