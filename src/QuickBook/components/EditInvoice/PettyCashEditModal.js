import React, { useState, useEffect, useRef } from "react";
import { Formik, Form } from 'formik';
import CButton from "../../../components/ui/Button";
import AntdFormikSelect from "../../../components/ui/AntdFormikSelect";
import AntdInput from "../../../components/ui/AntdInput";
import AntdTextArea from "../../../components/ui/AntdTextArea";
import { DaysArr,getStatusOfCurrentDate } from "../../../Constants";
import { useDispatch, useSelector } from "react-redux";
import {
    setShowAddBookPage,
    setDataSavedModal,
} from '../../store/stateSlice';
import { PettyCashValidations } from "../../../Validations";
import ParagraphTag from "../../../constants/PTag";
import { apiStorePettyCashInfo } from "../../../services/TransactionService";
import Loader from "../../../components/shared/Loader";
import Modal from "../../../components/shared/Modal";
import ErrorModal from "../../../components/ui/ErrorModal";
import AntdDatePicker from "../../../components/ui/AntdDatePicker/AntdDatePicker";



const ShowTextBoxInPC = (label, value, ph) => (
    <AntdTextArea
        text={label}
        value={value}
        ph={ph}
    />
)


const PettyCashEditModal = (props) => {

    const dispatch = useDispatch();
    const {handleCancelPettyCash ,selectedPettyCashObj} = props;
    const [showLoader, setShowLoader] = useState(false);
    const [selectedDate,setSelectedDate] = useState(selectedPettyCashObj?.date || null);
    const {
        pettyCashBalance : pettyCash,
        pettyCashRemBal : remPettyCash,
      } = useSelector(state => state.quickbookStore.state);
    const {
        reasonsList,
    } = useSelector(state => state.quickbookStore.state);
    const [remPettybal, setRemPettybal] = useState(remPettyCash);
    const [eModal,setEModal] = useState({
        eMessage : "",show : false
    })
    let uniqueId = localStorage.getItem("uniqueId");

    useEffect(() => {
        let checkDateStatus = getStatusOfCurrentDate(selectedDate);
        let balanceTemp = (selectedDate === null || checkDateStatus ||selectedDate === "" ) ? remPettyCash : pettyCash;
        setRemPettybal(balanceTemp);
    }, [remPettyCash,pettyCash,selectedDate])

    const handleSubmit = async (values) => {
        try {
            values.amount = Number(values.amount);
            values.key = uniqueId;
            if(values.amount > remPettyCash) {
                setEModal({
                    eMessage : "Given amount should be less than or equal to the pettycash balance",
                    show : true
                })
                return ;
            }
            setShowLoader(true);

            let newTempObj = JSON.parse(JSON.stringify(values));
            let findObj = (reasonsList || []).find((eachDoc) => eachDoc.Id == values.petty_cash_details);
            newTempObj.petty_cash_details = findObj?.Type || ""; 

            let response = await apiStorePettyCashInfo([newTempObj]);
            if (response.message) {
                handleCancelPettyCash();
                dispatch(setDataSavedModal(true));
            }
            setShowLoader(false);
            setEModal({
                eMessage : "",
                show : false
            })
        } catch (e) {
            setEModal({
                eMessage : "",
                show : false
            })
            setShowLoader(false);
        }
    }
    
    const onEModalCancel = () => {
        setEModal({
            show : false,
            eMessage : ""
        })
    }
    return (
        <Modal openModal={true}  ai={null} height ={400}>
            <>
                <Formik
                    initialValues={selectedPettyCashObj}
                    validationSchema={PettyCashValidations}
                    // innerRef={editFormikRef}
                    onSubmit={(values, { setErrors, resetForm, setFieldError }) => {
                        handleSubmit(values, setErrors, resetForm, setFieldError);
                    }}
                    style={{ overflow: "auto", position: "relative" }}
                >
                    {({ setFieldValue, values }) => {
                        values.balance = (remPettybal + Number(selectedPettyCashObj.amount)) - Number(values.amount);
                        return (
                            <Form>
                                <ParagraphTag label="Edit Details" />
                                <div className="grid grid-cols-2 px-4 py-2 gap-10">
                                    <AntdDatePicker
                                        labelText="Day"
                                        name="date"
                                        ph="--- Select Day ---"
                                        value = {values["date"]}
                                        handleChange = {(date,dateString) => {
                                            setFieldValue("date",dateString);
                                            setSelectedDate(dateString);
                                        }}
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
                                    <AntdFormikSelect
                                        labelText="Reason"
                                        name="petty_cash_details"
                                        ph="Select Reason"
                                        handleChange={(name, selectedValue) => setFieldValue(name,selectedValue)}
                                        Arr={reasonsList}
                                    />
                                </div>

                                <div className="absolute flex flex-row-reverse gap-10  bottom-5 right-5">
                                    <CButton btnType="submit">
                                        Save
                                    </CButton>
                                    <CButton 
                                        onClick={() => handleCancelPettyCash()}
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
                    eModal.show && <ErrorModal msg = {eModal.eMessage} handleCloseEModal={onEModalCancel}  ai ="center"/>
                }
            </>
        </Modal>
    )
}



export default PettyCashEditModal;
