import React,{useState,useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import PropTypes from "prop-types";
import { cloneDeep } from "lodash";
import Input from "components/ui/Input";
import QuickBookStatusFilter from "QuickBook/components/QuickBookStatusFilter";
import { setReqPaymentData } from "../store/dataSlice";
import Button from "components/ui/NewButton";
import { DISABLED_STYLE, ENABLED_STYLE } from "constants/app.styles";
import DatePicker from "components/ui/Datepicker";
import AntdSelectFilter from "components/ui/AntdSelect/AntdSelect";
import { BANK_ID, CHEQUE_ID } from "constants/app.constant";

const PaymentForm  = ({handleGetPartyCodeList}) => {

    const dispatch = useDispatch();
    const { 
        dayInfoList,
        paymentTypeInfo
      } = useSelector((state) => state.quickbookStore.state);
    const { 
        reqPaymentData,
        paymentColArray 
      } = useSelector(state => state.paymentBook.PaymentData);
    const [selectedPaymentList,setSelectedPaymentList] = useState([]);

    useEffect(() => {
      if(paymentTypeInfo.length > 0){
        setSelectedPaymentList(paymentTypeInfo.filter(item =>![7,8].includes(item.Id)));
      }
    },[paymentTypeInfo])

    const onChangeDate = (date,dateString) => {
      const newPaymentData = cloneDeep(reqPaymentData);
      newPaymentData.given_date = dateString;
      dispatch(setReqPaymentData(newPaymentData));
    };

    const handlePaymentSelect = (val) => {
      const newPaymentData = cloneDeep(reqPaymentData);
      newPaymentData.payment_type = val;;
      dispatch(setReqPaymentData(newPaymentData));
    };

    const handleDateChange = (val) => {
      const newPaymentData = cloneDeep(reqPaymentData);
      newPaymentData.history_type = val?.historyType;
      newPaymentData.fromDate = val?.fromDate;
      newPaymentData.toDate = val?.toDate;
      dispatch(setReqPaymentData(newPaymentData));
    };

    const onChangeInput = (id, field, value) => {
      const newPaymentData = cloneDeep(reqPaymentData);
      newPaymentData[field] = value;
      dispatch(setReqPaymentData(newPaymentData));
    };

    const paymentFlag = () => !!(reqPaymentData.fromDate || reqPaymentData.toDate);
    const checkValues = () => !!(reqPaymentData.party_code && reqPaymentData.history_type);
    const getViewBtnCls = checkValues() ? ENABLED_STYLE : DISABLED_STYLE;
  

    return (
      <div className="realtive w-full gap-2 flex flex-row justify-start sm:justify-end flex-wrap">
        {paymentColArray.length > 0 && (
          <>
            <div className="w-36">
              <DatePicker
                labelText="Day"
                name="date"
                ph="--- Select Day ---"
                className="h-10"
                value={reqPaymentData.given_date}
                handleChange={onChangeDate}
              />
            </div>
            <div className="flex flex-col w-36">
              <label htmlFor={"p_type"} className="text-start mb-1 text-black">
                Payment Type
              </label>
              <AntdSelectFilter
                placeholder="Select Payment Type"
                options={selectedPaymentList}
                onStatusChange={handlePaymentSelect}
                value={reqPaymentData.payment_type}
              />
            </div>
            <div className="flex flex-col  w-36">
              <Input
                id="givenAmount"
                label="Amount"
                field="given_amount"
                val={reqPaymentData.given_amount}
                handleInputChange={onChangeInput}
              />
            </div>
            {[BANK_ID, CHEQUE_ID].includes(reqPaymentData.payment_type) && (
              <>
                <div className="flex flex-col w-36">
                  <Input
                    id="reqName"
                    label= {"Bank Name"}
                    field="bank_name"
                    acceptAll={true}
                    disabledIcon={true}
                    val={reqPaymentData.bank_name}
                    handleInputChange={onChangeInput}
                  />
                </div>
                <div className="flex flex-col w-36">
                  <Input
                    id="reqNum"
                    label= {reqPaymentData.payment_type === BANK_ID ? "UTR Number" : "Cheque Number"}
                    field="transaction_num"
                    acceptAll={true}
                    disabledIcon={true}
                    val={reqPaymentData.req_transactionNum}
                    handleInputChange={onChangeInput}
                  />
                </div>
              </>
            )}
          </>
        )}

        <div className="flex flex-col w-36">
          <label htmlFor="status_fil" className="text-start mb-1 text-black">
            Select Duration
          </label>
          <QuickBookStatusFilter
            isFromPayments={paymentFlag()}
            onDateChange={handleDateChange}
            message={""}
            options={dayInfoList}
          />
        </div>
        <div className="flex flex-col w-36">
          <Input
            id="partyCode"
            label="Party Code"
            field="party_code"
            acceptAll={true}
            disabledIcon={true}
            val={reqPaymentData.party_code}
            handleInputChange={onChangeInput}
          />
        </div>
        <div className="self-start">
          <Button
            type="button"
            className={getViewBtnCls}
            isDisabled={!checkValues()}
            onClick={handleGetPartyCodeList}
          >
            View
          </Button>
        </div>
      </div>
    );
};

export default PaymentForm;

PaymentForm.propTypes = {
    handleGetPartyCodeList : PropTypes.func
};