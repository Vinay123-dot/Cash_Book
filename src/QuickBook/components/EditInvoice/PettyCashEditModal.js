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

    const { showEditPettyCash, handleCancelPettyCash ,selectedPettyCashObj} = props;
    const dispatch = useDispatch();
    const editFormikRef = useRef();

    const [pettyCashArr, setPettyCashArr] = useState([]);
    const [selectObjDetails, setSelectedObjDetails] = useState({
        showModal: false, selectedObj: {}
    })
    const [showLoader, setShowLoader] = useState(false);

    // let cashPetty = useSelector(state => state.quickbookStore.state.pettyCashBalance);
    let remPettyCash = useSelector(state => state.quickbookStore.state.pettyCashRemBal);
    const [remPettybal, setRemPettybal] = useState(remPettyCash);
    let uniqueId = localStorage.getItem("uniqueId");

    useEffect(() => {
        setRemPettybal(remPettyCash);
    }, [remPettyCash])

    if (!showEditPettyCash) return null;
   
    const handleSubmit = async (values) => {

        values.amount = Number(values.amount);
        values.key = uniqueId;
        console.log("VALUESIN EDIT",values)
        setShowLoader(true);
        let response = await apiStorePettyCashInfo([values]);
        if (response.message) {
            setShowLoader(false);
            handleCancelPettyCash();

        }

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
            // onCancel();
            dispatch(setDataSavedModal(true));

        }
    }

    
    return (
        <Modal openModal={true}  ai={null}>
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
            </>
        </Modal>
    )
}



export default PettyCashEditModal;
