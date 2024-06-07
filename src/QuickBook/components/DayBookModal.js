
import React, { useEffect, useState,memo } from "react";
import { Formik, Form } from 'formik';
import CButton from "../../components/ui/Button";
import { DaysArr } from "../../Constants";
import AntdFormikSelect from "../../components/ui/AntdFormikSelect";
import AntdInput from "../../components/ui/AntdInput";
import { useDispatch,useSelector } from "react-redux";
import {
    setShowAddBookPage,
    setDataSavedModal,
    setShowUploadInvoice,
    setShowDayBookFields,
    setEditedDaybookObj
} from '../store/stateSlice';
import ParagraphTag from "../../constants/PTag";
import {
    apiGetCustomerTypeInfo,
    apiGetPaymentTypeInfo,
    apiGetSalesTypeInfo,
    apiGetUPITypeInfo,
    apiStoreDayBookInfo,
    apiGetTerminal,
    apiGetDayBookExcelData
} from "../../services/TransactionService";
import Loader from "../../components/shared/Loader";
import { 
    getTotalMoneyInDayBook,
    getConvertedObj,
    convertTONumbers, 
    verifyInputField 
} from "./CompConstants";
import ShowPaymentTypes from "./DayBookFiles/ShowPaymentTypes";
import BillAmountModal from "./DayBookFiles/BillAmountModal";
import { dayBookIntialObj } from "../intialValuesFol";
import UploadInvoiceModal from "./DayBookFiles/UploadInvoiceModal";
import { DayBookValidations } from "../../Validations";
import CashTypes from "./DayBookFiles/CashTypes";
import AdvanceBillDetails from "./DayBookFiles/AdvanceBillDetails";
import DaybookTable from "../../components/ui/DaybookTable";
import EditModeInDayBook from "./EditInvoice/EditModeInDayBook";

const showSelectBox = (label, name, ph, dynamicArray, setFieldValue) => (
    <AntdFormikSelect
        labelText={label}
        name={name}
        ph={ph}
        handleChange={(name, selectedValue) => setFieldValue(name, selectedValue)}
        Arr={dynamicArray}
    />
)


const DayBookModal = (props) => {

    const { showDaybookModal,onCancel } = props;
    const dispatch = useDispatch();
    const [requiredArrList,setRequiredArrList] = useState({
        salesType : [],paymentListInfo : [],
        upiTypeInfo : [],customerListInfo : []
    })
    const [showBillModal,setShowBillModal] = useState(false);
    const [showLoader,setShowLoader] = useState(false);
    const [billNum,setBillNum] = useState("");
    const [editDayBook,setEditDayBook] = useState({
        showEditDaybookModal : false,
        editDayBookObj : {}
    })
    const showdayBookFields = useSelector(state => state.quickbookStore.state.showdayBookFields);
    const showUploadInvoice = useSelector(state => state.quickbookStore.state.showUploadInvoice);
    const [validateModal,setValidateModal] = useState(true);
    const [excelData,setExcelData] = useState([]);
    let uniqueId = localStorage.getItem("uniqueId");

    useEffect(() => {
        getTerminal();
        fetchReqTypesInDayBook();
        getExcelTrasaction();
    }, []);


    const getExcelTrasaction = async () => {
        try {
            setShowLoader(true);
            let newObj = {
                terminal_id: uniqueId,
                key: uniqueId
            };
            console.log("te,p")
            let resposne = await apiGetDayBookExcelData(newObj);
            let temp = (resposne?.data || []).filter((eachDoc) => eachDoc?.Issales_Report === 1);
            setExcelData(temp || []);
            setShowLoader(false);
        } catch (e) {
            setShowLoader(false);
        }
    }

    const fetchReqTypesInDayBook = async() => {
        try{
            const [salesList,paymentArray,upiArray,customerArr] = await Promise.all([
                apiGetSalesTypeInfo(),apiGetPaymentTypeInfo(),
                apiGetUPITypeInfo(),apiGetCustomerTypeInfo()
            ]);
            setRequiredArrList({
                salesType : salesList?.data || [],
                paymentListInfo : paymentArray?.data || [],
                upiTypeInfo : upiArray?.data || [],
                customerListInfo : customerArr?.data || []
            });
        }catch(e){}
    }
  
    const getTerminal = async() => {
        try{
            let response = await apiGetTerminal(uniqueId);
            setBillNum(response?.[0]?.Sequence_No);
        }
        catch(e){}
    }

    if (!showDaybookModal) return null;
    
    const handleSubmit = async (values,validateModal) => {
        try {
            setShowBillModal(false);
            let diffInAmount = Number(values.bill_value) - getTotalMoneyInDayBook(values);
            let modalFlag = values.sales_type === 1 && validateModal && (diffInAmount > 10 || diffInAmount < -10);
            if (modalFlag) {
                setShowBillModal(true);
                return;
            }
            setShowLoader(true);
            let newObj = JSON.parse(JSON.stringify(values));
            let convertedObj = convertTONumbers(newObj);

            convertedObj.key = uniqueId;
            convertedObj.bill_no = billNum+"/"+ convertedObj.sales_code+"/"+convertedObj.bill_no;
            convertedObj.pending_balance = Number(values.bill_value) - getTotalMoneyInDayBook(values);
            let response = await apiStoreDayBookInfo([convertedObj]);
            if (response.message) {
                dispatch(setShowAddBookPage(false));
                onCancel();
                dispatch(setDataSavedModal(true));
                setBillNum("");
                setValidateModal(true);
            }
            setShowLoader(false);
        } catch (e) {
            setShowLoader(false);
            setValidateModal(true);
        }
    }

    const validateInputField = (value, allValues, type) => {
        return verifyInputField(value, allValues, type);
    }


    const handleChangeSalesType = (name,sValue,setFieldValue,sArr) => {
        setFieldValue(name,sValue);
        let salesObj = sArr.find((eachDoc) => eachDoc.Id === sValue);
        setFieldValue("sales_code",salesObj?.Code || "");
        let temp = [];
        if (sValue == 1) {
            temp = requiredArrList.paymentListInfo.filter((eachDoc) => eachDoc.Id != 4);
        } else {
            temp = JSON.parse(JSON.stringify(requiredArrList.paymentListInfo));
        }
        setRequiredArrList((prev) => ({...prev,paymentListInfo : temp}))
    }

    const getCustomerList = (listArr,allObj) => {
        const { sales_type } =  allObj;
        let cType;
        if(sales_type != 1){
            cType = listArr.filter((eachDoc) => eachDoc.Id != 3);
        }else{
            cType = [...listArr];
        }
        return cType;

    }

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

    const handleCloseInvoiceModal = () => {
        dispatch(setShowUploadInvoice(false));
        getExcelTrasaction();
    }

    const handleEditClick = (index,doc) => {
        let modifiedObj = Object.keys(doc).length !== 0 ? getConvertedObj(doc) : {};
        if (typeof modifiedObj.customer_type === 'string') {
            let findedObj = (requiredArrList.customerListInfo || []).find((eachItem) => eachItem.Type === modifiedObj.customer_type);
            modifiedObj.customer_type = findedObj?.Id || null;
        } 
        dispatch(setEditedDaybookObj(modifiedObj));
        setEditDayBook({
            showEditDaybookModal : true,
            editDayBookObj : modifiedObj
        })
    }

    const onSaveEditDayBook = () => {
        setEditDayBook({
            showEditDaybookModal: false,
            editDayBookObj: {}
        });
        getExcelTrasaction();
    }
  
  
 
    return (
        showdayBookFields ?
        <>
            <Formik
                initialValues={dayBookIntialObj}
                validationSchema={DayBookValidations}
                onSubmit={(values, { setSubmitting }) => {
                    handleSubmit(values, validateModal)
                }}
                style={{ overflow: "auto" }}
            >
                {({ setFieldValue, values }) => {
                    return (
                        <Form>
                            <ParagraphTag label="Details" />
                            <div className="grid grid-cols-1 gap-10 px-4 py-2 lg:grid-cols-3 md:grid-cols-2">
                                {
                                    showSelectBox("Day", "date", "--Select Day--", DaysArr, setFieldValue)
                                }
                                <AntdFormikSelect
                                    labelText="Sale Type"
                                    name="sales_type"
                                    ph="--Select Sale Type--"
                                    handleChange={(name, selectedValue) => handleChangeSalesType(name, selectedValue, setFieldValue, requiredArrList.salesType)}
                                    Arr={requiredArrList.salesType}
                                />
                                <AntdInput
                                    text="Bill Number"
                                    value='bill_no'
                                    ph="Enter Bill Number"
                                    showAddBefore={true}
                                    showAddBeforeValue={
                                        billNum + "/" + (values.sales_code ? values.sales_code + "/" : "")
                                    }
                                    disableInput={!values.sales_type && true}
                                />
                                {
                                    showSelectBox("Customer Type", "customer_type", "--Select CustomerType--", getCustomerList(requiredArrList.customerListInfo, values), setFieldValue)
                                }
                                {
                                    showInputBox("Bill Total Value", 'bill_value', "Bill TotalValue", validateInputField, values, false, true, true)
                                }
                                {
                                    showInputBox("Party Code", 'party_code', "PartyCode", validateInputField, values, false, false, false)
                                }
                                {
                                    showInputBox("Party Name", 'party_name', "Party Name", validateInputField, values, false, false, false)
                                }
                            </div>
                            {
                                values.sales_type === 1 &&
                                <>
                                    <CashTypes
                                        valObj = {values}
                                        paymentListInfo = {requiredArrList.paymentListInfo}
                                        upiTypeInfo = {requiredArrList.upiTypeInfo}
                                    />

                                    <AdvanceBillDetails values={values} />

                                </>
                            }


                            <ShowPaymentTypes paymentValues={values} />
                            <BillAmountModal
                                billModal={showBillModal}
                                valuesObj={values}
                                handleSubmitBillModal={() => handleSubmit(values, false)}
                                handleCancelBillModal={() => { setShowBillModal(false); setValidateModal(true) }}
                            />


                            <div className="flex flex-row-reverse gap-10 px-4 xl:pt-24" style={{ marginBottom: 20 }}>
                                <CButton btnType="submit">
                                    Save
                                </CButton>
                                <CButton onClick={() => {
                                    onCancel();
                                    dispatch(setShowAddBookPage(false));
                                    dispatch(setShowDayBookFields(false));
                                }} type="cancel"
                                >
                                    Cancel
                                </CButton>
                            </div>

                        </Form>
                    )
                }}


            </Formik>
           
            <Loader showLoading = {showLoader} />

        </> :
        showUploadInvoice ? <UploadInvoiceModal onClose={handleCloseInvoiceModal} /> :
            excelData.length >= 0 ? <>
                <DaybookTable
                    data = {excelData}
                    handleEditClick = {handleEditClick}
                />
                <EditModeInDayBook
                    isEditDayBookModal = {editDayBook.showEditDaybookModal}
                    editDayBookObj = {editDayBook.editDayBookObj}
                    handleCancelDBook = {() => setEditDayBook({
                        showEditDaybookModal: false,
                        editDayBookObj: {}
                    })}
                    handleSaveEditDayBook = {onSaveEditDayBook}
                    requiredArrayData = {requiredArrList}
                />
                <Loader showLoading = {showLoader} />
                <div className="p-5 flex flex-row-reverse">
                    <CButton onClick={() => {
                        onCancel();
                        dispatch(setShowAddBookPage(false))
                        dispatch(setShowDayBookFields(false));
                        dispatch(setShowUploadInvoice(false));
                    }} type="cancel"
                    >
                        Cancel
                    </CButton>
                </div>
            </> : null
             
    )
}

export default memo(DayBookModal);

