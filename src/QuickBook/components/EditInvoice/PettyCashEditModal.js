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

const initialValues = {
    id: 0,
    date: null,
    balance: '',
    amount: '',
    petty_cash_details: '',
};


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

    const { showEditPettyCash, onCancel } = props;
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

    const handleSubmit = async (values, setErrors, resetForm, setFieldError) => {

        const { date, balance, amount, petty_cash_details } = values;
        let isAllValuesPresent = date && balance && amount && petty_cash_details;
        values.amount = Number(values.amount);
        values.key = uniqueId;
        if (values.balance < 0) {
            setFieldError("balance", "Balance should not be lessthan 0");
            return;
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
            setShowLoader(false);
            dispatch(setShowAddBookPage(false));
            onCancel();
            dispatch(setDataSavedModal(true));

        }
    }

    const getButtonStatus = (pArr) => pArr.length <= 0 ? true : false;
    return (
        <Modal openModal={true} height={"90%"} width={"100%"} ai={null}>
            <>

                <Formik
                    initialValues={initialValues}
                    validationSchema={PettyCashValidations}
                    onSubmit={(values, { setErrors, resetForm, setFieldError }) => {
                        handleSubmit(values, setErrors, resetForm, setFieldError);
                    }}
                    style={{ overflow: "auto" }}
                >
                    {({ setFieldValue, values }) => {
                        values.balance = remPettybal - Number(values.amount);
                        if (values.petty_cash_details) {
                            let reasonStng = values.petty_cash_details;
                            values.petty_cash_details = reasonStng.charAt(0).toUpperCase() + reasonStng.slice(1);
                        }

                        return (
                            <Form>
                                <ParagraphTag label="Details" />
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
                    showLoader && <Loader showLoading={true} />
                }
            </>
        </Modal>
    )
}

export default PettyCashEditModal;
