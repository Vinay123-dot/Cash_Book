import React , {useState} from "react";
import ParagraphTag from "../../../constants/PTag";
import AntdInput from "../../../components/ui/AntdInput";
import CButton from "../../../components/ui/Button";
import { useFormikContext } from 'formik';
import { DaysArr,selectedValType } from "../../../Constants";
import { apiVerifyAdvancedBookReceipt } from "../../../services/TransactionService";
import { verifyInputField } from "../CompConstants";
import ErrorModal from "../../../components/ui/ErrorModal";
import amountFormatter from "../../../utils/amountFormatter";

const statusArr = ["Partially Refunded","Invoiced","ORDERCANCEL",""];

const AdvanceBillDetails = (props) => {

    const { values } = props; 
    const { setFieldValue } = useFormikContext();
    const [verifyBtnLdng,setVerifyBtnLdng] = useState(false);
    const [eModal,setEModal] = useState({
        eMessage : "",show : false
    })
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

    const onEModalCancel = () => {
        setEModal({
            show : false,
            eMessage : ""
        })
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
            
            if(response){
                setEModal({
                    eMessage : statusArr.includes(response?.Status) ? "This receipt number is already used" : "",
                    show : statusArr.includes(response?.Status) ?true :false
                })
                setFieldValue("advance_customer_name",response?.Customer_Name || "");
                setFieldValue("remaining_balance",response?.Remaining_Balance || 0);
                setVerifyBtnLdng(false);
            }
           
            
        }catch(Err){
            setEModal({
                eMessage : Err?.response?.data?.detail || "Failed you to submit data.Please Check the details again",
                show : true
            })
            setVerifyBtnLdng(false);
        }
        
    }


    const validateInputField = (value, allValues, type) => {
        return verifyInputField(value, allValues, type);

    }

    


    return (
        <>
            <hr style = {{ border: "5px solid #F4F6F9" }} />
            <ParagraphTag label = "Advance Bill Details" />
            <div className="flex px-4 py-2 items-center">
                {
                    showInputBox("Advance Receipt Number", 'advance_receipt_no', "Advance Receipt Number", validateInputField, values, false, false, false)
                }
                <CButton
                    className = "h-44 mt-10 ml-5"
                    style = {{width : 80,height : 32}}
                    isLoading = {verifyBtnLdng}
                    onClick = {() => handleVerifyAdvanceMoney(values)}
                >
                    Verify
                </CButton>
            </div>
             {
                values.advance_receipt_no &&
                <div className="flex flex-col justify-between items-start px-4 py-2 lg:items-center  lg:flex-row">
                    <div className="flex flex-col">
                        <p className="text-start">Advance Receipt Amount</p>
                        <p className="text-start">{amountFormatter(values.remaining_balance || 0)}</p>
                    </div>
                    <div className="">
                        <p className="text-start">Customer Name</p>
                        <p className="text-start">{values.advance_customer_name || "--"}</p>
                    </div>
                    {
                        showInputBox("Amount", 'advance_receipt_amount', "Amount", validateInputField, values)
                    }
                   
                </div>
            }
            { 
                eModal.show && <ErrorModal msg = {eModal.eMessage} handleCloseEModal={onEModalCancel}/>
            }
        </>

    )
};

export default AdvanceBillDetails;