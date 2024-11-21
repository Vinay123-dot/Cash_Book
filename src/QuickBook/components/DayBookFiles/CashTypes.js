import React,{useState} from "react";
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import ParagraphTag from "constants/PTag";
import CButton from "components/ui/Button";
import PaymentSelect from "components/ui/PaymentSelect/PaymentSelect";
import AntdFormikSelect from "components/ui/AntdFormikSelect";
import AntdInput from "components/ui/AntdInput";
import { AiOutlineDelete } from "react-icons/ai";
import { 
    verifyInputField, 
    verifyPaymentType, 
    verifyReasonField, 
    verifyUpiType,
    verifyInputTextField,
    verifyUTRNum,
    verifyChequeNum,
    UPI,CASH,
    BANK,
    CHEQUE,
    CREDITCARD,
    DEBITCARD,
    PAYMENTGATEWAY,
    REFERENCEORDER 
 } from "../CompConstants";

const CashTypes = (props) => {
    const { valObj,paymentListInfo,upiTypeInfo,pLength = 6,  isFromEditObj = false,  showReferenceName = false } = props;
    
    
    const { setFieldValue } = useFormikContext();
    const [clickCount, setClickCount] = useState(isFromEditObj ?[...valObj.PaymentCountArr]  :[0]);

    const validateUpiType = (value, allValues) => verifyUpiType(value, allValues);

    const validateInputField = (value, allValues, type) => verifyInputField(value, allValues, type);

    const validateInputTextField = (value, allValues, type) => verifyInputTextField(value, allValues, type);
    
    const validateReasonField = (value,allValues) => verifyReasonField(value,allValues);

    const validateReferenceField = (value,allValues) => null;

    const validateUTRNumber = (value, allValues) => verifyUTRNum(value, allValues);

    const validateChequeNum = (value, allValues) => verifyChequeNum(value, allValues);
    
    const handleSetFieldData = (name, selectedValue,valObj) => {
        let existedType = valObj?.[name] || null;
        if(existedType === UPI){
            setFieldValue("upi_amount",null);
            setFieldValue("upi_type",null);
        }
        if (existedType === CASH){
            setFieldValue("cash_amount",null);
        }
        if(existedType === BANK){
            setFieldValue("online_bank_amount",null);
            setFieldValue("online_bank_name","");
            setFieldValue("online_bank_trans_no","");
        }
        if(existedType === CHEQUE){
            setFieldValue("bank_cheque_amount",null);
            setFieldValue("bank_cheque_name","");
            setFieldValue("bank_cheque_no","");
        }
        if(existedType === CREDITCARD){
            setFieldValue("credit_card_amount",null)
        }
        if(existedType === DEBITCARD){
            setFieldValue("debit_card_amount",null)
        }
        if(existedType === REFERENCEORDER){
            setFieldValue("reference_order_amount",null)
        }
        if(existedType === PAYMENTGATEWAY){
            setFieldValue("pg_order_amount",null)
        }
        setFieldValue(name, selectedValue);
    } 

    const handleButtonClick = () => {
        if (clickCount.length > pLength) return;
        setFieldValue(`paymentType${clickCount.length}`,null);
        setClickCount(prevCount => [...prevCount, clickCount.length]);
    };

   const handleSetUPIData = (name,selectedVal) => setFieldValue(name,selectedVal);
    
    const showInputBox = ({txt, val, placeHolder, func, validation = true, prefix = true, onlyNum = true,mLen}) => {
        return (
            <AntdInput
                text={txt}
                value={val}
                ph={placeHolder}
                showPrefix={prefix}
                acceptOnlyNum={onlyNum}
                validation={validation}
                validateField={(value) => func(value, valObj, val)}
                maxLen = {mLen}
            />
        )
    };

    const handleRemoveFromList = (selectedItem,valObj) => {
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
        if(selectedVal === REFERENCEORDER){
            setFieldValue("reference_order_amount",null)
        }
        if(selectedVal === PAYMENTGATEWAY){
            setFieldValue("pg_order_amount",null)
        }

        let filteredCount = clickCount.filter(item => item !== selectedItem);
        setClickCount(JSON.parse(JSON.stringify(filteredCount)));
    }

    const showDeleteIcon = (Item,fullObj) => {
        return <AiOutlineDelete
                // style = {iconStyle}
                className="text-red-500 w-5 h-5 absolute right-2.5 bottom-2.5 cursor-pointer"
                onClick={() => handleRemoveFromList(Item,fullObj)}
            />
        
    }

    return (
        <>
            <hr style={{ border: "5px solid #F4F6F9" }} />

            <div className="flex items-center mt-5">

                <ParagraphTag label="Payment Details" />
                <CButton 
                    onClick={handleButtonClick}
                    style = {{width : 80,height : 36}}
                >Add</CButton>

            </div>

            {clickCount.map((eachItem, index) =>(
                
                <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 px-4 pb-2 relative" key={eachItem}>
                    <div className="flex items-center">
                    <PaymentSelect
                        labelText = "Payment Type"
                        name = {`paymentType${eachItem}`}
                        ph = "--Select Payment Type--"
                        handleChange = {(name,val) =>handleSetFieldData(name,val,valObj)}
                        outputObj = {valObj}
                        Arr = {paymentListInfo}
                        validation = {false}
                        validateField = {(val) => verifyPaymentType(val)}
                        key = {index+`paymentType${eachItem}`}
                    />
                    {
                        index !== 0 && valObj[`paymentType${eachItem}`] == null &&
                        <AiOutlineDelete
                            key = {eachItem}
                            className="w-10 h-5  right-2.5 bottom-2.5 cursor-pointer self-end text-red-500"
                            onClick={() => handleRemoveFromList(eachItem, valObj)}
                            // onClick={() => console.log("TEMp")}
                        />
                    }

                    </div>
                    
                    

                    {
                        valObj[`paymentType${eachItem}`] === UPI &&
                        <>
                            <AntdFormikSelect
                                labelText = "UPI Type"
                                name = "upi_type"
                                ph = "--Select UPI Type--"
                                handleChange = {handleSetUPIData}
                                Arr = {upiTypeInfo}
                                validation = {true}
                                validateField = {(value) => validateUpiType(value, valObj)}
                            />
                            <div className="col-span-1 flex flex-row relative items-center">
                                {
                                    showInputBox({txt:"Enter Amount", val:'upi_amount', placeHolder:"Amount", func:validateInputField})
                                }
                                {
                                    index !== 0 && showDeleteIcon(eachItem,valObj)
                                }
                                
                            </div>
                        </>

                    }
                   

                    {
                        valObj[`paymentType${eachItem}`] === CASH &&
                        <div className="col-span-2  flex flex-row relative items-center">
                            {
                                showInputBox({txt:"Enter Amount", val:'cash_amount', placeHolder:"Amount", func:validateInputField})
                            }
                            {
                                index !== 0 && showDeleteIcon(eachItem,valObj)
                            }
                        </div>
                    }

                    {
                        valObj[`paymentType${eachItem}`] === BANK && 
                        <>
                            {
                                showInputBox({txt:"Enter Amount", val:'online_bank_amount', placeHolder:"Amount", func:validateInputField})
                            }
                            {
                                showInputBox({txt:"UTR Number", val:'online_bank_trans_no', placeHolder:"UTR Number", func:validateUTRNumber,prefix: false,mLen:12})
                            }

                            <div className="col-span-3  flex flex-row relative items-center">
                                {
                                    showInputBox({txt:"Bank Name", val:'online_bank_name', placeHolder:"Bank Name", func:validateInputTextField,prefix: false,onlyNum:false})
                                }
                                {
                                    index !== 0 && showDeleteIcon(eachItem,valObj)
                                }
                            </div>
                        </>
                       
                    }
                    {
                        valObj[`paymentType${eachItem}`] === CHEQUE &&
                        <>
                            {
                                showInputBox({txt:"Amount", val:'bank_cheque_amount', placeHolder:"Amount", func:validateInputField})
                            }
                            {
                                showInputBox({txt:"Cheque Number", val:'bank_cheque_no', placeHolder:"Cheque Number", func:validateChequeNum,prefix: false,onlyNum:false})
                            }
                            <div className="col-span-3  flex flex-row relative items-center">
                                {
                                    showInputBox({txt:"Bank", val:'bank_cheque_name', placeHolder:"Bank Name", func:validateInputTextField,prefix: false,onlyNum:false})
                                }
                                {
                                    index !== 0 && showDeleteIcon(eachItem,valObj)
                                }
                            </div>
                        </>
                    }
                    {
                        valObj[`paymentType${eachItem}`] === CREDITCARD &&
                        <div className="col-span-2  flex flex-row relative items-center">
                            {
                                showInputBox({txt:"Amount", val:'credit_card_amount', placeHolder:"Amount", func:validateInputField})
                            }
                            {
                                index !== 0 && showDeleteIcon(eachItem,valObj)
                            }
                        </div>

                    }
                    {
                        valObj[`paymentType${eachItem}`] === DEBITCARD &&
                        <div className="col-span-2 flex flex-row relative items-center">
                            {
                                showInputBox({txt:"Amount", val:'debit_card_amount', placeHolder:"Amount", func:validateInputField})
                            }
                            {
                                index !== 0 && showDeleteIcon(eachItem,valObj)
                            }
                        </div>

                    }
                    {
                        valObj[`paymentType${eachItem}`] === PAYMENTGATEWAY &&
                        <div className="col-span-2 flex flex-row relative items-center">
                            {
                                showInputBox({txt:"Amount", val:'pg_order_amount', placeHolder:"Amount", func:validateInputField})
                            }
                            {
                                index !== 0 && showDeleteIcon(eachItem,valObj)
                            }
                        </div>

                    }
                    {
                        valObj[`paymentType${eachItem}`] === REFERENCEORDER &&
                        <div className="col-span-2 flex flex-row relative items-center">
                            {
                                showInputBox({txt:"Amount", val:'reference_order_amount', placeHolder:"Amount", func:validateInputField})
                            }

                            {
                                index !== 0 && showDeleteIcon(eachItem,valObj)
                            }
                        </div>

                    }
                </div>
            ))
            }
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-10 px-4 py-2">
                {
                    showInputBox({txt:"Reason", val:'reason', placeHolder:"Bank Name", func:validateReasonField,prefix: false,onlyNum:false})
                }
                {
                    showReferenceName && showInputBox({txt:"Reference Name", val:'reference_name', placeHolder:"Reference Name", func:validateReferenceField,prefix: false,onlyNum:false,validation: false})
                }
 
            </div>
        </>
    )
};

export default CashTypes;

CashTypes.propTypes = {
    valObj : PropTypes.object,
    paymentListInfo : PropTypes.array,
    upiTypeInfo : PropTypes.array,
    pLength : PropTypes.number,
    isFromEditObj : PropTypes.bool,
    showReferenceName : PropTypes.bool
};

CashTypes.defaultProps = {
    pLength : 6,  
    isFromEditObj : false, 
    showReferenceName : false
};