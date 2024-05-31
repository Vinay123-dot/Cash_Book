import React , {useState} from "react";
import ParagraphTag from "../../../constants/PTag";
import AntdInput from "../../../components/ui/AntdInput";
import CButton from "../../../components/ui/Button";
import { useFormikContext } from 'formik';
import { DaysArr,selectedValType } from "../../../Constants";
import { apiVerifyAdvancedBookReceipt } from "../../../services/TransactionService";

const AdvanceBillDetails = (props) => {

    const { values } = props; 
    const { setFieldValue } = useFormikContext();
    const [verifyBtnLdng,setVerifyBtnLdng] = useState(false);
    let uniqueId = localStorage.getItem("uniqueId");

    const showInputBox = (txt, val, placeHolder, func, values, validation = true, prefix = true, onlyNum = true) => {
        return (
            <AntdInput
                text = {txt}
                value = {val}
                ph = {placeHolder}
                showPrefix = {prefix}
                acceptOnlyNum = {onlyNum}
                validation = {validation}
                validateField = {(value) => func(value, values, val)}
            />
        )
    }

    const handleVerifyAdvanceMoney = async(allVal) => {
        const {advance_receipt_no} = allVal;
        try {
            if(!advance_receipt_no) return console.log("test")
                setVerifyBtnLdng(true);
                const data = {
                    key : uniqueId,
                    id : advance_receipt_no
                };
            let response = await apiVerifyAdvancedBookReceipt(data);
            console.log("r",response)
            setFieldValue("advance_receipt_amount",response?.Bill_Value || 0);
            setFieldValue("advance_customer_name",response?.Customer_Name || "");
            setVerifyBtnLdng(false);
        }catch(e){
            console.log("ERR..",e);
            setVerifyBtnLdng(false);
        }
        
    }

    const validateInputField = (value, allValues, type) => {
        const {
            paymentType0: P0, paymentType1: P1,
            paymentType2: P2, paymentType3: P3,
            paymentType4: P4, paymentType5: P5
        } = allValues;
        let paymentTypeArr = [P0, P1, P2, P3, P4, P5];
        let err = (paymentTypeArr.includes(selectedValType[type]) && !value) ? 'This field is required' : null
        // let err =  !value ? 'This Field is Required' : null
        return err;

    }


    return (
        <>
            <hr style = {{ border: "5px solid #F4F6F9" }} />
            <ParagraphTag label = "Advance Bill Details" />
            <div className="flex px-4 py-2 items-center">
                {
                    showInputBox("Advance Receipt Number", 'advance_receipt_no', "AdvanceReceiptNumber", validateInputField, values, false, false, false)
                }
                <CButton
                    className = "h-44 mt-10 ml-10"
                    isLoading = {verifyBtnLdng}
                    onClick = {() => handleVerifyAdvanceMoney(values)}
                >
                    Verify
                </CButton>
            </div>
            {
                values.advance_receipt_no &&
                <div className="grid grid-cols-1  px-4 py-2 md:grid-cols-2 lg:grid-cols-3">
                    <div className="flex flex-col">
                        <p>Advance Receipt Amount</p>
                        <p>{values.advance_receipt_amount}</p>
                    </div>
                    <div>
                        <p>Customer Name</p>
                        <p>{values.advance_customer_name}</p>
                    </div>
                    {
                        showInputBox("Amount", 'used_receipt_amount', "Amount", validateInputField, values, false, false, false)
                    }
                </div>
            }
        </>

    )
};

export default AdvanceBillDetails;