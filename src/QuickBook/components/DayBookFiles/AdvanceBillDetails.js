import React , {useEffect, useState} from "react";
import PropTypes from "prop-types";
import { useFormikContext } from 'formik';
import ParagraphTag from "constants/PTag";
import AntdInput from "components/ui/AntdInput";
import CButton from "components/ui/Button";
import { verifyInputField } from "../CompConstants";
import ErrorModal from "components/ui/ErrorModal";
import amountFormatter from "utils/amountFormatter";
import { statusArr } from "constants/app.constant";
import { apiVerifyAdvancedBookReceipt } from "services/TransactionService";

const AdvanceBillDetails = (props) => {

    const { values,isFromEditDayBook = false } = props; 
    const { setFieldValue } = useFormikContext();
    const [verifyBtnLdng,setVerifyBtnLdng] = useState(false);
    const [eModal,setEModal] = useState({
        eMessage : "",show : false
    })
    let uniqueId = localStorage.getItem("uniqueId");

    useEffect(() => {
      if (isFromEditDayBook) {
        handleVerifyAdvanceMoney(values);
      }
    }, [isFromEditDayBook]);

    const showInputBox = ({
      text = "",
      value = "",
      placeHolder = "",
      func = validateInputField,
      values = {},
      validation = true,
      prefix = true,
      onlyNum = true,
    }) => {
      return (
        <AntdInput
          text={text}
          value={value}
          ph={placeHolder}
          showPrefix={prefix}
          acceptOnlyNum={onlyNum}
          validation={validation}
          validateField={(value) => func(value, values, value)}
        />
      );
    };

    const onEModalCancel = () => {
      setEModal({
        show: false,
        eMessage: "",
      });
    };

    const handleVerifyAdvanceMoney = async(allVal,isFromVerify) => {
        const {advance_receipt_no} = allVal;
        try {
            if (!advance_receipt_no) return;
            
            setVerifyBtnLdng(true);
            const data = {
                key: uniqueId,
                id: advance_receipt_no
            };
            let response = await apiVerifyAdvancedBookReceipt(data);
            
            if(response){
                setEModal({
                    eMessage : statusArr.includes(response?.Status) ? "This receipt number is already used" : "",
                    show : !!statusArr.includes(response?.Status)
                })
                let cName = statusArr.includes(response?.Status) ? "" : response?.Customer_Name;
                let rBal = statusArr.includes(response?.Status) ? 0 : response?.Remaining_Balance;
                setFieldValue("advance_customer_name",cName);
                setFieldValue("remaining_balance",rBal);
                setVerifyBtnLdng(false);
            }
           
            
        }catch(Err){
            setEModal({
                eMessage : Err?.response?.data?.detail || "Failed you to submit data.Please Check the details again",
                show : true
            })
            if(!isFromVerify) {
                setFieldValue("advance_customer_name","");
                setFieldValue("advance_receipt_amount",0);
            }
            setFieldValue("remaining_balance", 0);
            setVerifyBtnLdng(false);
        }
        
    }

    const validateInputField = (value, allValues, type) => {
        return verifyInputField(value, allValues, type);
    };

    return (
        <>
            <hr style = {{ border: "5px solid #F4F6F9" }} />
            <ParagraphTag label = "Advance Bill Details" />
            <div className="flex px-4 py-2 items-center">
                {
                    showInputBox({
                        text : "Advance Receipt Number",
                        value : 'advance_receipt_no',
                        placeHolder : "Advance Receipt Number",
                        func : validateInputField,
                        values,
                        validation : false,
                        prefix : false,
                        onlyNum : false,
                    })
                }
                <CButton
                    className = "h-44 mt-10 ml-5"
                    style = {{width : 80,height : 32}}
                    isLoading = {verifyBtnLdng}
                    isDisabled = {verifyBtnLdng}
                    onClick = {() => handleVerifyAdvanceMoney(values,true)}
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
                    showInputBox({
                        text : "Amount",
                        value : 'advance_receipt_amount',
                        placeHolder : "Amount",
                        values,
                    })
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

AdvanceBillDetails.propTypes = {
    values : PropTypes.object,
    isFromEditDayBook : PropTypes.bool 
};

AdvanceBillDetails.defaultProps = {
    isFromEditDayBook : false
};