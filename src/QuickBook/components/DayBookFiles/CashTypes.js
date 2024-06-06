import React,{useState} from "react";
import ParagraphTag from "../../../constants/PTag";
import CButton from "../../../components/ui/Button";
import PaymentSelect from "../../../components/ui/PaymentSelect/PaymentSelect";
import AntdFormikSelect from "../../../components/ui/AntdFormikSelect";
import AntdInput from "../../../components/ui/AntdInput";
import { useFormikContext } from 'formik';
import { AiOutlineDelete } from "react-icons/ai";
import { selectedValType } from "../../../Constants";
import { getTotalMoneyInDayBook } from "../CompConstants";

const UPI = "UPI";
const CASH = "Cash";
const BANK = "Bank";
const  CHEQUE = "Cheque";
const CREDITCARD = "Credit Card";
const DEBITCARD = "Debit Card";
const iconStyle = { 
    color: "red", 
    width: 20, 
    height: 20, 
    position: "absolute", 
    right: 10, 
    bottom: 10 ,
    cursor : "pointer"
};

const CashTypes = (props) => {
    
    const { valObj,paymentListInfo,upiTypeInfo } = props;
    const { setFieldValue } = useFormikContext();
    const [clickCount, setClickCount] = useState([0]);

    const handleButtonClick = () => {
        if (clickCount.length > 4) return;
        setFieldValue(`paymentType${clickCount.length}`,null);
        setClickCount(prevCount => [...prevCount, clickCount.length]);
    };

    const validatePaymentType = (value) => {
        let error;
        if (!value) {
            error = 'This field is required';
        }
        return error;
    }

    const validateUpiType = (value, allValues) => {
        const {
            paymentType0: P0, paymentType1: P1,
            paymentType2: P2, paymentType3: P3,
            paymentType4: P4, paymentType5: P5
        } = allValues;
        let paymentTypeArr = [P0, P1, P2, P3, P4, P5];
        let error = (paymentTypeArr.includes(UPI) && !value) ? 'This field is required' : null
        return error;

    }

    const validateInputField = (value, allValues, type) => {
        const {
            paymentType0: P0, paymentType1: P1,
            paymentType2: P2, paymentType3: P3,
            paymentType4: P4, paymentType5: P5
        } = allValues;
        let paymentTypeArr = [P0, P1, P2, P3, P4, P5];
        let err = (paymentTypeArr.includes(selectedValType[type]) && !value) ? 'This field is required' : null;
        return err;

    }

    const handleSetFieldData = (name, selectedValue) => setFieldValue(name, selectedValue);

    const showInputBox = (txt, val, placeHolder, func, values, validation = true, prefix = true, onlyNum = true) => {
        return (
            <AntdInput
                text={txt}
                value={val}
                ph={placeHolder}
                showPrefix={prefix}
                acceptOnlyNum={onlyNum}
                validation={validation}
                validateField={(value) => func(value, values, val)}
            />
        )
    }

    const validateReasonField = (value,allValues) => {
        let diffInAmount = Number(allValues.bill_value) - getTotalMoneyInDayBook(allValues);
        let err = (diffInAmount > 10 || diffInAmount < -10) && !value ? 'This field is required' : null;
        return err;
    }

    const handleRemoveFromList = (selectedItem,valObj) => {
        console.log("EachItem",selectedItem,);
        console.log("ValObj",valObj);
        setFieldValue(`paymentType${selectedItem}`,null);
        let selectedVal = valObj?.[`paymentType${selectedItem}`];
        if(selectedVal === UPI){
            setFieldValue("upi_amount",null);
            setFieldValue("upi_type",null);
        }
        if (selectedVal === CASH){
            setFieldValue("cash_amount",null);
        }
        if(selectedVal === BANK){
            setFieldValue("online_bank_amount",null);
            setFieldValue("online_bank_name","");
            setFieldValue("online_bank_trans_no","");
        }
        if(selectedVal === CHEQUE){
            setFieldValue("bank_cheque_amount",null);
            setFieldValue("bank_cheque_name","");
            setFieldValue("bank_cheque_no","");
        }
        if(selectedVal === CREDITCARD){
            setFieldValue("credit_card_amount",null)
        }
        if(selectedVal === DEBITCARD){
            setFieldValue("debit_card_amount",null)
        }

        let filteredCount = clickCount.filter(item => item !== selectedItem);
        setClickCount(JSON.parse(JSON.stringify(filteredCount)));
    }

    return (
        <>
            <hr style={{ border: "5px solid #F4F6F9" }} />

            <div className="flex items-center mt-5">

                <ParagraphTag label="Payment Details" />
                <CButton onClick={handleButtonClick}>Add</CButton>

            </div>

            {clickCount.map((eachItem, index) => (

                <div className="grid lg:grid-cols-3 grid-cols-1 gap-10 px-4 py-2 relative" key={index}>

                    <PaymentSelect
                        labelText = "Payment Type"
                        name = {`paymentType${eachItem}`}
                        ph = "--Select PaymentType--"
                        handleChange = {handleSetFieldData}
                        outputObj = {valObj}
                        Arr = {paymentListInfo}
                        validation = {true}
                        validateField = {validatePaymentType}
                        key = {index}
                    />
                    {/* {
                        index !== 0 &&
                        <AiOutlineDelete
                            key = {index}
                            style = {iconStyle}
                            onClick={() => handleRemoveFromList(eachItem, valObj)}
                            // onClick={() => console.log("TEMp")}
                        />
                    } */}

                    {
                        valObj[`paymentType${eachItem}`] === UPI &&
                        <>
                            <AntdFormikSelect
                                labelText = "UPI Type"
                                name = "upi_type"
                                ph = "--Select UPI Type--"
                                handleChange = {handleSetFieldData}
                                Arr = {upiTypeInfo}
                                validation = {true}
                                validateField = {(value) => validateUpiType(value, valObj)}
                            />
                            <div className="col-span-1 flex flex-row relative items-center">
                                {
                                    showInputBox("Enter Amount", 'upi_amount', "Amount", validateInputField, valObj)
                                }
                                {
                                    index !== 0 &&
                                    <AiOutlineDelete
                                        style = {iconStyle}
                                        onClick={() => handleRemoveFromList(eachItem,valObj)}
                                    />
                                }
                            </div>
                        </>

                    }
                   

                    {
                        valObj[`paymentType${eachItem}`] === CASH &&
                        <div className="col-span-2  flex flex-row relative items-center">
                            {
                                showInputBox("Enter Amount", 'cash_amount', "Amount", validateInputField, valObj)
                            }
                            {
                                index !== 0 &&
                                <AiOutlineDelete
                                    style={iconStyle}
                                    onClick={() => handleRemoveFromList(eachItem,valObj)}
                                />
                            }
                        </div>
                    }

                    {
                        valObj[`paymentType${eachItem}`] === BANK && 
                        <>
                            {
                                showInputBox("Enter Amount", 'online_bank_amount', "Amount", validateInputField, valObj)
                            }
                            {
                                showInputBox("UTR Number", 'online_bank_trans_no', "UTR Number", validateInputField, valObj, true, false, false)
                            }
                            <div className="col-span-3  flex flex-row relative items-center">
                                {
                                    showInputBox("Bank Name", "online_bank_name", "Bank Name", validateInputField, valObj, true, false, false)
                                }
                                {
                                    index !== 0 &&
                                    <AiOutlineDelete 
                                        style={iconStyle} 
                                        onClick={() => handleRemoveFromList(eachItem, valObj)} 
                                    />
                                }
                            </div>
                        </>
                       
                    }
                    {
                        valObj[`paymentType${eachItem}`] === CHEQUE &&
                        <>
                            {
                                showInputBox("Amount", "bank_cheque_amount", "Amount", validateInputField, valObj)
                            }
                            {
                                showInputBox("Cheque Number", "bank_cheque_no", "Cheque Number", validateInputField, valObj, true, false, false)
                            }
                            <div className="col-span-3  flex flex-row relative items-center">
                                {
                                    showInputBox("Bank", "bank_cheque_name", "Bank Name", validateInputField, valObj, true, false, false)
                                }
                                {
                                    index !== 0 &&
                                    <AiOutlineDelete
                                        style={iconStyle}
                                        onClick={() => handleRemoveFromList(eachItem,valObj)}
                                    />
                                }
                            </div>
                        </>
                    }
                    {
                        valObj[`paymentType${eachItem}`] === CREDITCARD &&
                        <div className="col-span-2  flex flex-row relative items-center">
                            {
                                showInputBox("Amount", "credit_card_amount", "Amount", validateInputField, valObj)
                            }
                            {
                                index !== 0 &&
                                <AiOutlineDelete
                                    style={iconStyle}
                                    onClick={() => handleRemoveFromList(eachItem,valObj)}
                                />
                            }
                        </div>

                    }
                    {
                        valObj[`paymentType${eachItem}`] === DEBITCARD &&
                        <div className="col-span-2 flex flex-row relative items-center">
                            {
                                showInputBox("Amount", "debit_card_amount", "Amount", validateInputField, valObj)
                            }
                            {
                                index !== 0 &&
                                <AiOutlineDelete
                                    style={iconStyle}
                                    onClick={() => handleRemoveFromList(eachItem,valObj)}
                                />
                            }
                        </div>

                    }
                </div>
            ))
            }
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-10 px-4 py-2">
                {
                    showInputBox("Reason", 'reason', "Reason", validateReasonField, valObj, true, false, false)
                }

            </div>
        </>
    )
};

export default CashTypes;