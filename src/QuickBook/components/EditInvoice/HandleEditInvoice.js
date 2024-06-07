import React, { useMemo, useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import cloneDeep from 'lodash/cloneDeep'
// import { getTransactions, setTableData } from '../store/dataSlice'
// import { Button, Dialog, FormItem, FormContainer, Input, toast, Notification } from 'components/ui'
// import eyeico from 'assets/svg/eyeico.png'
// import downloadico from 'assets/svg/downloadico.png'
// import shareico from 'assets/svg/shareico.png'
// import deletebin from 'assets/svg/deletebin.png'
// import { Field, Form, Formik } from 'formik'
// import { SuccessSvg, FailureSvg } from 'assets/svg'
// import * as Yup from 'yup'
// import useTransactionUpdate from 'utils/hooks/useTransactionUpdate'
// import { getFormatDate, getUTCFormatDate } from 'utils/dateFormatter'
// import FileSaver from 'file-saver'
import PettyCashEditModal from "./PettyCashEditModal";
import EditDayBookFromDashboard from "./EditModeFromDashboard";
import { getToday, getYesterDay } from '../../../utils/dateFormatter';
import { HiOutlinePencil } from "react-icons/hi";
import { getConvertedObj } from '../CompConstants';
// //import { Upload } from 'components/ui'



// const validationSchema2 = Yup.object().shape({
//     phone_number: Yup.string()
//         .required('This field is required')
//         .min(10, 'Please enter a valid 10-digit mobile number.'),
// })





const HandleEditInvoice = (props) => {

    const { row } = props;
    const [seletedModalVal, setSelectedModalVal] = useState(null);
    const cashbookData = useSelector((state) => state.quickbookStore.data.cashbookData);

    console.log("cBook", cashbookData)

    // const user = useSelector((state) => state.auth.user)
    // const [isOpenDialog, setIsOpenDialog] = useState('')
    // const [message, setMessage] = useState({
    //     status: '',
    //     message: '',
    // })
    // const [pdfdata, setPdfdata] = useState('')
    // const [downloadtrigger, setDownloadtrigger] = useState(false)

    // const formikRef = useRef()
    // const dispatch = useDispatch()

    // const { postSmsInvoice, postDownloadInvoice, postUploadInvoice, postDeleteInvoice } = useTransactionUpdate()

    // const tableData = useSelector((state) => state.transactions.data.tableData)
    // const filterData = useSelector(
    //     (state) => state.transactions.data.filterData
    // )

    //     const handleOpenDialog = (modalname) => {
    //         setIsOpenDialog(modalname)
    //     }

    //     const handleCloseDialog = () => {
    //         const newTableData = cloneDeep(tableData)
    //         const newFilterData = cloneDeep(filterData)
    //         dispatch(getTransactions({ ...newTableData, newFilterData }))

    //         setIsOpenDialog('')
    //     } 


    //     const handleSms = async (values, setSubmitting) => {
    //         setSubmitting(true)

    //         //values.merchantid =  merch; //"0000000000000085";

    //         const result = await postSmsInvoice(values, row?.itemid)
    //         console.log("ressu", result);
    //         if (result.status === 'success') {
    //             setMessage(result)
    //         }
    //         if (result.status === 'failed') {
    //             setMessage(result)
    //         }
    //         setIsOpenDialog('message')
    //         setSubmitting(false)
    //     }

    //     const handleDownload = async () => {
    //         //setSubmitting(true)

    //         //values.merchantid =  merch; //"0000000000000085";

    //         const result = await postDownloadInvoice({"transaction_id":row?.transactionId,"merchant_id":sessionStorage.getItem('mId')}, row?.itemid)
    //         console.log("ressu", result);
    //         if (result.status === 'success') {

    //             let data = new Blob([result.message], {
    //                 type: 'application/pdf',
    //             })

    //             const fileURL = URL.createObjectURL(data);

    //             setPdfdata(fileURL)

    //         }
    //         if (result.status === 'failed') {
    //             setMessage(result)
    //             setIsOpenDialog('message')
    //         }

    //        // setSubmitting(false)
    //     }

    //     const handlePrint = () => {
    //         window.open(pdfdata, "PRINT", "height=400,width=600");
    //     }



    //       useEffect(()=>{
    //         if(downloadtrigger){
    //         handleDownload()
    //         }
    //       },[downloadtrigger])

    //       const handleDownloadInvoice = async () => {
    //         //setSubmitting(true)

    //         //values.merchantid =  merch; //"0000000000000085";

    //         const result = await postDownloadInvoice({"phone_number":0,"transaction_id":row?.transactionId,"merchant_id":sessionStorage.getItem('mId')}, row?.itemid)
    //         // console.log("ressu", result);
    //         if (result.status === 'success') {

    //             let data = new Blob([result.message], {
    //                 type: 'application/pdf',
    //             })

    //             FileSaver.saveAs(
    //                 data,
    //                 `Invoice_${getFormatDate(
    //                     new Date(),
    //                     'DD_MM_YYYY_HH_mm_ss'
    //                 )}.pdf`
    //             )



    //         }
    //         if (result.status === 'failed') {
    //             setMessage(result)
    //             setIsOpenDialog('message')
    //         }

    //        // setSubmitting(false)
    //     }
    //     const inputRef = React.useRef(null);
    //     const onButtonClick = () => {
    //         // console.log("uspp");
    //         inputRef.current.click();
    //       };

    //       const [dragActive, setDragActive] = useState(false);

    //       const handleDrag = function(e) {
    //         e.preventDefault();
    //         e.stopPropagation();
    //         if (e.type === "dragenter" || e.type === "dragover") {
    //           setDragActive(true);
    //         } else if (e.type === "dragleave") {
    //           setDragActive(false);
    //         }
    //       };

    //       // triggers when file is dropped
    //       const handleDrop = function(e) {
    //         e.preventDefault();
    //         e.stopPropagation();
    //         setDragActive(false);
    //         if (e.dataTransfer.files && e.dataTransfer.files[0]) {
    //           // handleFiles(e.dataTransfer.files);
    //         }
    //       };


    // const [file, setFile] = useState()
    // const [upfile, setUpfile] =useState()

    // const handleChange = function(e) {
    //     e.preventDefault();
    //     if (e.target.files && e.target.files[0]) {
    //       // at least one file has been selected so do something
    //       // handleFiles(e.target.files);
    //     //   console.log("uppp",e.target.files[0]);
    //       const fileURL = URL.createObjectURL(e.target.files[0]);
    //       setFile(fileURL)
    //       setUpfile(e.target.files[0])
    //     }
    //   };



    //   const [isUploading, setIsUploading] =useState(false);
    //     const handleUpload = async (event) => {
    //         event.preventDefault()
    //         setIsUploading(true)

    //         const formData = new FormData();


    //         formData.append(
    //             "file",
    //             upfile,
    //             upfile.name
    //        ); 
    //        formData.append("terminalid", sessionStorage.getItem('tType'));
    //        formData.append("utr", row?.rrn);
    //        formData.append("amount", row?.amout);
    //        formData.append( "transaction_id",row?.transactionId);
    //        formData.append("merchant_id",sessionStorage.getItem('mId'));




    //         const result = await postUploadInvoice(formData, row?.itemid)

    //         if (result.status === 'success') {
    //             setMessage(result)
    //         }
    //         if (result.status === 'failed') {
    //             setMessage(result)
    //         }
    //         setIsUploading(false)
    //         setIsOpenDialog('message')
    //       }


    //       const handleDelete = async (values) => {
    //         //setSubmitting(true)

    //         //values.merchantid =  merch; //"0000000000000085";

    //         const result = await postDeleteInvoice({'merchant_id':sessionStorage.getItem('mId'), 'transaction_id':row?.transactionId}, row?.itemid)
    //         console.log("ressu", result);
    //         if (result.status === 'success') {
    //             setMessage(result)
    //         }
    //         if (result.status === 'failed') {
    //             setMessage(result)
    //         }
    //         setIsOpenDialog('message')
    //        // setSubmitting(false)
    //     }

    const handleClickIcon = () => {
        setSelectedModalVal(cashbookData.book_type);
    }
    console.log("row", row)

    const convertToSmallPettyCashObj = (pObj) => {
        let newTemp = {
            id: pObj.Id || 0,
            date:  pObj.Date ||null,
            amount: pObj.Amount || null,
            petty_cash_details: pObj.Petty_Cash_Details || '',
        }
        return newTemp;
    }
    const onCancelPettyCash = () => {
        setSelectedModalVal(null);
    }

    return (
        <>
            {
                (row.Date === getToday() || row.Date === getYesterDay()) ?
                    <HiOutlinePencil
                        size={20}
                        style={{ color: "#5A87B2",width : 120,textAlign:'center' }}
                        onClick={handleClickIcon}
                    /> : null
            }

            <PettyCashEditModal
                showEditPettyCash = {seletedModalVal === 4}
                selectedPettyCashObj = {convertToSmallPettyCashObj(row)}
                handleCancelPettyCash = {onCancelPettyCash}
            />
            <EditDayBookFromDashboard
                isEditDayBookModal = {seletedModalVal === 3}
                editDayBookObj = {getConvertedObj(row)}
                handleCloseEditModal = {onCancelPettyCash}
            /> 




        </>
    )
}

export default HandleEditInvoice;