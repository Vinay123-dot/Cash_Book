

// import React, { useEffect, useState } from "react";
// import { Input, Select, DatePicker } from "antd";
// import { DepositType, DepostMode, PartyCode } from "../../Constants";
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import CButton from "../../components/ui/Button";
// import { FaRupeeSign } from "react-icons/fa";
// import { DaysArr, SaleType, PaymentsArray, UPIARRAY } from "../../Constants";
// import AntdDatePicker from "../../components/ui/AntdDatePicker";
// import AntdFormikSelect from "../../components/ui/AntdFormikSelect";
// import AntdInput from "../../components/ui/AntdInput";
// import { useDispatch, useSelector } from "react-redux";
// import {
//     setShowAddBookPage
// } from '../store/stateSlice';
// import ParagraphTag from "../../constants/PTag";
// import { 
//     apiGetCustomerTypeInfo, 
//     apiGetDayInfo, 
//     apiGetPaymentTypeInfo, 
//     apiGetSalesTypeInfo, 
//     apiGetUPITypeInfo ,
//     apiVerifyAdvancedBookReceipt
// } from "../../services/TransactionService";



// const validationSchema = Yup.object().shape({
//     Date: Yup.string().required('This field is required.'),
//     Sales_Code: Yup.string().required('This field is required.'),
//     Bill_No: Yup.string().required('This field is required.'),
//     Customer_Type: Yup.string().required('This field is required.'),
//     Bill_Value: Yup.string().required('This field is required.'),
//     // Advance_Receipt_No: Yup.string().required('This field is required.'),


// });

// const selectedValType = {
//     "Cash_Amount": 2,
//     "UPI_Amount": 1,
//     "cardAmount": 5,
//     "Online_Bank_Amount": 3,
//     "Online_Bank_Trans_No": 3,
//     "Online_Bank_Name": 3,
//     "Bank_Cheque_Amount": 4,
//     "Bank_Cheque_No": 4,
//     "Bank_Cheque_Name": 4,
// }
// // Sales_Code: "string", //DOUBT SALES CODE
// // Sales_Type: "string", //DOUBT

// const initialObj = {
//     Terminal_Id: 1720, //NOT REQUIRED FROM HERE
//     Merchant_Id: 554, //NOT REQUIRED FROM HERE
//     Id: 1, 
//     Advance_Customer_Name: "", //string
//     Advance_Receipt_No: "", //string
//     Date: null, //string
//     Customer_Type: null, //string
//     Bill_Value: 0, //number
//     cardAmount: "",
//     Bill_No: "", //string Ex: 8974759759
//     Pending_Balance: 0, //number
//     paymentType0: null,

//     UPI: "", //string newly added from here //UPI DETAILS
//     UPI_Amount: 0, //number
//     UPI_Type: null, //string
//     UPI_Trans_No: "", //DOUBT
    
//     Sales_Code: null, //string //DOUBT SALES CODE
//     Sales_Type: "", //stirng

//     Cash: "", //CASH DETAILS (string why this)
//     Cash_Amount: 0, //number

//     Debit_Card: "", //DEBIT CARD DETAILS (string why this)
//     Debit_Card_Amount: 0, //number
    
//     Credit_Card: "", //CREDIT CARD DETAILS (string why this)
//     Credit_Card_Amount: 0, //number

//     Bank_Cheque: "",  //CHEQUE DETAILS  (string why this)
//     Bank_Cheque_Amount: 0, //number
//     Bank_Cheque_Name: "", //string
//     Bank_Cheque_No: "", //string
    
//     Online_Bank: "", //BANK DETAILS (string Why this)
//     Online_Bank_Amount: 0,
//     Online_Bank_Name: "", //string
//     Online_Bank_Trans_No : "", //string
    
   
// };


// const DayBookModal = (props) => {

//     const { showDaybookModal } = props;
//     const dispatch = useDispatch();
//     const [clickCount, setClickCount] = useState([0]);
//     const [intialValues, setIntialValues] = useState({ ...initialObj });
//     const [salesType, setSalesType] = useState([]);
//     const [daysInfo, setDaysInfo] = useState([]);
//     const [paymentListInfo, setPaymentListInfo] = useState([]);
//     const [upiTypeInfo, setUpiTypeInfo] = useState([]);
//     const [customerListInfo, setCustomerListInfo] = useState([]);

//     useEffect(() => {
//         getSalesType();
//         getDayInfo();
//         getPaymentTypeInfo();
//         getUpiTypeInfo();
//         getCustomerTypeInfo();
//     }, [])

//     const getSalesType = async () => {
//         try {
//             let response = await apiGetSalesTypeInfo();
//             setSalesType(response?.data || []);
//         } catch (e) { }
//     }

//     const getDayInfo = async () => {
//         try {
//             let response = await apiGetDayInfo();
//             setDaysInfo(response?.data || []);
//         } catch (e) { }
//     }

//     const getPaymentTypeInfo = async () => {
//         try {
//             let response = await apiGetPaymentTypeInfo();
//             console.log("reposne",response?.data)
//             setPaymentListInfo(response?.data || []);
//         } catch (e) { }
//     }

//     const getUpiTypeInfo = async () => {
//         try {
//             let response = await apiGetUPITypeInfo();
//             setUpiTypeInfo(response?.data || []);
//         } catch (e) { }
//     }

//     const getCustomerTypeInfo = async () => {
//         try {
//             let response = await apiGetCustomerTypeInfo();
//             setCustomerListInfo(response?.data || []);
//         } catch (e) { }
//     }

//     if (!showDaybookModal) return null;



//     const handleButtonClick = () => {

//         if (clickCount.length > 4) return;
//         intialValues[`paymentType${clickCount.length}`] = null;
//         setIntialValues(intialValues);
//         setClickCount(prevCount => [...prevCount, clickCount.length]);
//     };

//     const handleRemoveFromList = (selectedItem) => {
//         const updatedInitialValues = { ...intialValues };
//         delete updatedInitialValues[`paymentType${selectedItem}`];
//         clickCount.splice(selectedItem, 1);
//         setClickCount(JSON.parse(JSON.stringify(clickCount)));
//         setIntialValues(JSON.parse(JSON.stringify(updatedInitialValues)));
//     }

//     const handleSubmit = (values) => {
//         console.log("temp", values);
//         // let newObj = JSON.parse(JSON.stringify(values));
//         // const { 
//         //     paymentType0: P0, 
//         //     paymentType1: P1, 
//         //     paymentType2: P2, 
//         //     paymentType3: P3, 
//         //     paymentType4: P4 
//         // } = newObj;
//         // let paymentTypeArr = [P0, P1, P2, P3, P4];
//         // if(paymentTypeArr.includes(2)){

//         // }
//     }

//     const validatePaymentType = (value) => {
//         let error;
//         if (!value) {
//             error = 'This Field is Required';
//         }
//         return error;
//     }
//     const validateInputField = (value, allValues, type) => {
//         const { paymentType0: P0, paymentType1: P1, paymentType2: P2, paymentType3: P3, paymentType4: P4 } = allValues;
//         let paymentTypeArr = [P0, P1, P2, P3, P4];
//         let err = (paymentTypeArr.includes(selectedValType[type]) && !value) ? 'This Field is Required' : null
//         // let err =  !value ? 'This Field is Required' : null
//         return err;

//     }

//     const validateUpiType = (value, allValues) => {
//         const { paymentType0: P0, paymentType1: P1, paymentType2: P2, paymentType3: P3, paymentType4: P4 } = allValues;
//         let paymentTypeArr = [P0, P1, P2, P3, P4];
//         let error = (paymentTypeArr.includes("1") && !value) ? 'This Field is Required' : null
//         return error;

//     }

//     // const handleVerify = async() => {
//     //     const Terminal_Id =  "1720"; //NOT REQUIRED FROM HERE
//     //     const Merchant_Id =  "554"; //NOT REQUIRED FROM HERE

//     //     let fetchedData = await apiVerifyAdvancedBookReceipt(){

//     //     }
//     // }

//     return (
//         <Formik
//             initialValues={intialValues}
//             validationSchema={validationSchema}
//             onSubmit={(values, { setSubmitting }) => {
//                 delete values["date"];
//                 handleSubmit(values)
//             }}
//             style={{ overflow: "auto" }}
//         >
//             {({ errors, touched, isSubmitting, setFieldValue, values }) => {
//                 return (
//                     <Form>
//                         <ParagraphTag label="Details" />
//                         <div className="grid grid-cols-1 gap-10 px-4 py-2 lg:grid-cols-3 md:grid-cols-2">
//                             <AntdFormikSelect
//                                 labelText="Day"
//                                 name="Date"
//                                 ph="--Select Day--"
//                                 handleChange={(name, selectedValue) => setFieldValue(name, selectedValue)}
//                                 Arr={DaysArr}
//                             />
//                             <AntdFormikSelect
//                                 labelText="Sale Type"
//                                 name="Sales_Code"
//                                 ph="--Select Sale Type--"
//                                 handleChange={(name, selectedValue) => setFieldValue(name, selectedValue)}
//                                 Arr={salesType}
//                                 error={errors.Sales_Code && touched.Sales_Code}
//                             />
//                             <AntdInput
//                                 text="Bill Number"
//                                 value='Bill_No'
//                                 ph="Enter Bill Number"
//                                 error={errors.Bill_No && touched.Bill_No}
//                             />

//                             <AntdFormikSelect
//                                 labelText="Party Code"
//                                 name="Customer_Type"
//                                 ph="--Select PartyCode--"
//                                 handleChange={(name, selectedValue) => setFieldValue(name, selectedValue)}
//                                 Arr={customerListInfo}
//                                 error={errors.Customer_Type && touched.Customer_Type}
//                             />
//                             <AntdInput
//                                 text="Bill Total Value"
//                                 value='Bill_Value'
//                                 ph="Enter Bill TotalValue"
//                                 showPrefix={true}
//                                 error={errors.Bill_Value && touched.Bill_Value}
//                                 acceptOnlyNum={true}
//                             />
//                         </div>
//                         {
//                             values.Sales_Code === 1 &&
//                             <>
//                                 <hr style={{ border: "5px solid #F4F6F9" }} />

//                                 <div className="flex items-center mt-5">
//                                     <ParagraphTag label="Payment Details" />
//                                     <CButton onClick={handleButtonClick}>Add</CButton>
//                                 </div>
//                                 {clickCount.map((eachItem, index) => (
//                                     <div
//                                         className="grid lg:grid-cols-3 grid-cols-1 gap-10 px-4 py-2"
//                                         key={index}
//                                     >
//                                         <AntdFormikSelect
//                                             labelText="Payment Type"
//                                             name={`paymentType${eachItem}`}
//                                             ph="--Select PaymentType--"
//                                             handleChange={(name, selectedValue) => setFieldValue(name, selectedValue)}
//                                             Arr={paymentListInfo}
//                                             validation={true}
//                                             validateField={validatePaymentType}
//                                             key={index}
//                                         />
//                                         {
//                                             values[`paymentType${eachItem}`] === 2 &&
//                                             <AntdInput
//                                                 text="Enter Amount"
//                                                 value='Cash_Amount'
//                                                 ph="Enter Amount"
//                                                 showPrefix={true}
//                                                 validation={true}
//                                                 validateField={(value) => validateInputField(value, values, "Cash_Amount")}
//                                             />

//                                         }
//                                         {
//                                             values[`paymentType${eachItem}`] === 1 &&
//                                             <AntdFormikSelect
//                                                 labelText="UPI Type"
//                                                 name="UPI_Type"
//                                                 ph="--Select UPI Type--"
//                                                 handleChange={(name, selectedValue) => setFieldValue(name, selectedValue)}
//                                                 Arr={upiTypeInfo}
//                                                 validation={true}
//                                                 validateField={(value) => validateUpiType(value, values)}

//                                             />
//                                         }
//                                         {
//                                             values[`paymentType${eachItem}`] === 1 &&
//                                             <AntdInput
//                                                 text="Enter Amount"
//                                                 value='UPI_Amount'
//                                                 ph="Enter Amount"
//                                                 showPrefix={true}
//                                                 validation={true}
//                                                 validateField={(value) => validateInputField(value, values, "UPI_Amount")}
//                                             />

//                                         }
//                                         {
//                                             values[`paymentType${eachItem}`] === 5 &&
//                                             <AntdInput
//                                                 text="Enter Amount"
//                                                 value='Credit_Card_Amount'
//                                                 ph="Enter Amount"
//                                                 showPrefix={true}
//                                                 validation={true}
//                                                 validateField={(value) => validateInputField(value, values, "Credit_Card_Amount")}
//                                             />

//                                         }
//                                           {
//                                             values[`paymentType${eachItem}`] === 6 &&
//                                             <AntdInput
//                                                 text="Enter Amount"
//                                                 value='Debit_Card_Amount'
//                                                 ph="Enter Amount"
//                                                 showPrefix={true}
//                                                 validation={true}
//                                                 validateField={(value) => validateInputField(value, values, "Debit_Card_Amount")}
//                                             />

//                                         }
//                                         {
//                                             values[`paymentType${eachItem}`] === 3 &&
//                                             <AntdInput
//                                                 text="Enter Amount"
//                                                 value='Online_Bank_Amount'
//                                                 ph="Enter Amount"
//                                                 showPrefix={true}
//                                                 validation={true}
//                                                 validateField={(value) => validateInputField(value, values, "Online_Bank_Amount")}
//                                             />

//                                         }
//                                         {
//                                             values[`paymentType${eachItem}`] === 3 &&
//                                             <AntdInput
//                                                 text="UTR Number"
//                                                 value='Online_Bank_Trans_No'
//                                                 ph="Enter UTR Number"
//                                                 showPrefix={true}
//                                                 validation={true}
//                                                 validateField={(value) => validateInputField(value, values, "Online_Bank_Trans_No")}
//                                             />

//                                         }
//                                         {
//                                             values[`paymentType${eachItem}`] === 3 &&
//                                             <AntdInput
//                                                 text="Bank Name"
//                                                 value='Online_Bank_Name'
//                                                 ph="Enter BankName"
//                                                 showPrefix={true}
//                                                 validation={true}
//                                                 validateField={(value) => validateInputField(value, values, "Online_Bank_Name")}
//                                             />

//                                         }
//                                         {
//                                             values[`paymentType${eachItem}`] === 4 &&
//                                             <AntdInput
//                                                 text="Amount"
//                                                 value='Bank_Cheque_Amount'
//                                                 ph="Enter Amount"
//                                                 showPrefix={true}
//                                                 validation={true}
//                                                 validateField={(value) => validateInputField(value, values, "Bank_Cheque_Amount")}
//                                             />

//                                         }
//                                         {
//                                             values[`paymentType${eachItem}`] === 4 &&
//                                             <AntdInput
//                                                 text="Bank Cheque Number"
//                                                 value='Bank_Cheque_No'
//                                                 ph="Enter CheckNumber"
//                                                 showPrefix={true}
//                                                 validation={true}
//                                                 validateField={(value) => validateInputField(value, values, "Bank_Cheque_No")}
//                                             />

//                                         }
//                                         {
//                                             values[`paymentType${eachItem}`] === 4 &&
//                                             <AntdInput
//                                                 text="Bank Check Name"
//                                                 value='Bank_Cheque_Name'
//                                                 ph="Enter BankName"
//                                                 showPrefix={true}
//                                                 validation={true}
//                                                 validateField={(value) => validateInputField(value, values, "Bank_Cheque_Name")}
//                                             />

//                                         }
//                                         <CButton onClick={() => handleRemoveFromList(eachItem)}>
//                                             Delete
//                                         </CButton>
//                                     </div>))
//                                 }

//                                 <hr style={{ border: "5px solid #F4F6F9" }} />
//                                 <ParagraphTag label="Advanced Bill Details" />
//                                 <div className="flex px-4 py-2 items-center">
//                                     <AntdInput
//                                         text="Advance Receipt Number"
//                                         value='Advance_Receipt_No'
//                                         ph="Enter AdvanceReceiptNumber"
//                                     />
//                                     <CButton className="h-44 mt-5 ml-10" >
//                                         Verify
//                                     </CButton>


//                                 </div>
//                                 <div className="grid grid-cols-1  px-4 py-2 md:grid-cols-2 lg:grid-cols-3">
//                                     <div className="flex flex-col">
//                                         <p>Advanced Receipt Amount</p>
//                                         <p>{"values.adva"}</p>
//                                     </div>
//                                     <div>
//                                         <p>Customer Name</p>
//                                         <p>{values.Advance_Customer_Name}</p>
//                                     </div>
//                                     <AntdInput
//                                         text="Amount"
//                                         value='Advance_Receipt_No'
//                                         ph="Enter Amount"
//                                     />
//                                 </div>

//                             </>
//                         }
//                         <hr style={{ border: "5px solid #F4F6F9" }} />
//                         <ParagraphTag label="Summary" />
//                         <div className="flex flex-col px-4 py-2">
//                             <p>Total Bill Amount</p>
//                             <p>${values.Bill_Value}</p>
//                         </div>
//                         {
//                             values.Sales_Code === 1 &&
//                             <div className="grid grid-cols-1  px-4 py-2 md:grid-cols-2 lg:grid-cols-3">
//                                 <div className="flex flex-col">
//                                     <p>Payment Type</p>
//                                     {/* {
//                                         values.cardAmount && <p> Card- {values.cardAmount}</p>
//                                     } */}
//                                     {
//                                         values.Cash_Amount && <p> Cash - {values.Cash_Amount}</p>
//                                     }
//                                     {
//                                         values.Online_Bank_Amount && <p> Bank- {values.Online_Bank_Amount}</p>
//                                     }

//                                     {
//                                         values.UPI_Amount && <p> Upi - {values.UPI_Amount}</p>
//                                     }
//                                     {
//                                         values.Bank_Cheque_Amount && <p> Cheque - {values.Bank_Cheque_Amount}</p>
//                                     }

//                                 </div>
//                                 <div>
//                                     <p>Advanced Used Amount</p>
//                                     <p>0</p>
//                                 </div>
//                                 <div>
//                                     <p> Pending Amount</p>
//                                     <p>0</p>
//                                 </div>
//                             </div>
//                         }

//                         <div className="flex flex-row-reverse gap-10 px-4 xl:pt-24">
//                             <CButton btnType="submit">
//                                 Save
//                             </CButton>
//                             <CButton onClick={() => dispatch(setShowAddBookPage(false))} type="cancel">
//                                 Cancel
//                             </CButton>
//                         </div>

//                     </Form>
//                 )
//             }}

//         </Formik>
//     )
// }

// export default DayBookModal;

