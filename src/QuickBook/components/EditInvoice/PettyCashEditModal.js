import React, { useState, useEffect, useRef } from "react";
import { Formik, Form } from 'formik';
import CButton from "../../../components/ui/Button";
import AntdFormikSelect from "../../../components/ui/AntdFormikSelect";
import AntdInput from "../../../components/ui/AntdInput";
import AntdTextArea from "../../../components/ui/AntdTextArea";
import { DaysArr } from "../../../Constants";
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


const PettyCashEditModal = (props) => {

    const {handleCancelPettyCash ,selectedPettyCashObj} = props;
    const dispatch = useDispatch();
    const editFormikRef = useRef();

    const [pettyCashArr, setPettyCashArr] = useState([]);
    const [selectObjDetails, setSelectedObjDetails] = useState({
        showModal: false, selectedObj: {}
    })
    const [showLoader, setShowLoader] = useState(false);
    const {
        pettyCashBalance : pettyCash,
        pettyCashRemBal : remPettyCash,
      } = useSelector(state => state.quickbookStore.state);
    const [remPettybal, setRemPettybal] = useState(remPettyCash);
    const [eModal,setEModal] = useState({
        eMessage : "",show : false
    })
    let uniqueId = localStorage.getItem("uniqueId");

    useEffect(() => {
        setRemPettybal(remPettyCash);
    }, [remPettyCash])

    const handleSubmit = async (values) => {
        try {
            values.amount = Number(values.amount);
            values.key = uniqueId;
            console.log("VALUESIN EDIT",values)
            if(values.amount > remPettyCash) {
                setEModal({
                    eMessage : "Given amount should be less than or equal to the remaining pettycash balance",
                    show : true
                })
                return ;
            }
            setShowLoader(true);
            let response = await apiStorePettyCashInfo([values]);
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
                        if (values.petty_cash_details) {
                            let reasonStng = values.petty_cash_details;
                            values.petty_cash_details = reasonStng.charAt(0).toUpperCase() + reasonStng.slice(1);
                        }
                        return (
                            <Form>
                                <ParagraphTag label="Edit Details" />
                                <div className="grid grid-cols-2 px-4 py-2 gap-10">
                                    <AntdDatePicker
                                        labelText="Day"
                                        name="date"
                                        ph="--- Select Day ---"
                                        value = {values["date"]}
                                        handleChange = {(date,dateString) => setFieldValue("date",dateString)}
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
