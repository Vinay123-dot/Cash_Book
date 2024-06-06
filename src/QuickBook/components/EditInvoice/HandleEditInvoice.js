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
import { getToday,getYesterDay } from '../../../utils/dateFormatter';
import { HiOutlinePencil } from "react-icons/hi";
// //import { Upload } from 'components/ui'



// const validationSchema2 = Yup.object().shape({
//     phone_number: Yup.string()
//         .required('This field is required')
//         .min(10, 'Please enter a valid 10-digit mobile number.'),
// })





const HandleEditInvoice = (props) => {

    const {row} = props;
    const [seletedModalVal,setSelectedModalVal] = useState(null);
    const cashbookData = useSelector((state) => state.quickbookStore.data.cashbookData);

    console.log("rod",row,"cBook",cashbookData)

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
      
        return (
        <>
            {
                (row.Date === getToday() ||row.Date === getYesterDay()) ?
                <HiOutlinePencil 
                    size = {24} 
                    style = {{color:"#5A87B2",marginLeft:20,backgroundColor : "red"}}
                    onClick = {handleClickIcon}
                /> : "N/A"
            }
            
            <PettyCashEditModal 
                showEditPettyCash = {seletedModalVal === 4}
            />

            {/* <span className="pr-1.5 pl-1.5"><button onClick={()=>{setDownloadtrigger(true);handleOpenDialog('view')}}><img src={eyeico} width={15} height={15} alt=''/></button></span>
            <span className="pr-1.5"><button onClick={()=>{setDownloadtrigger(true);handleOpenDialog('download')}}><img src={downloadico} width={15} height={15} alt=''/></button></span>
            <span className="pr-1.5"><button onClick={()=>{handleOpenDialog('share')}}><img src={shareico} width={15} height={15} alt=''/></button></span>
            <span className=""><button onClick={()=>{setDownloadtrigger(true);handleOpenDialog('remove')}}><img src={deletebin} width={15} height={15} alt=''/></button></span> */}
            
            {/* <Dialog
                    isOpen={isOpenDialog === 'share'}
                    onClose={handleCloseDialog}
                    onRequestClose={handleCloseDialog}
                    bodyOpenClassName="overflow-hidden"
                    width="470px"
                >   
                    <div id='printmodal'>
                    <div className="grid grid-rows-1 grid-cols-3 h-10">
                    
                    <div className="row-start-1 col-start-1 col-span-3 ">
                    <h4 className="mt-1 text-center text-blue-600 font-bold">
                        Share Invoice
                    </h4>
                    </div>
                    </div>
                    
                   
                    
                    </div>
                    <Formik
                            innerRef={formikRef}
                            initialValues={{
                                phone_number: '',
                                transaction_id: row?.transactionId,
                                merchant_id: sessionStorage.getItem('mId'),
                            }}
                            validationSchema={validationSchema2}
                            onSubmit={(values, { setSubmitting }) => {

                                 values.phone_number= Number('91'+values.phone_number);
                                handleSms(values, setSubmitting)
                            }}
                        >
                            {({ values, touched, errors, isSubmitting }) => (
                                <Form>
                                <FormContainer>
                                
                               <div className="flex items-center px-8 mt-8 text-base text-black">
                               <span className="w-full font-medium">
                               Enter Customer Mobile Number :
                        
                               </span>
                               </div>
                               <div className="flex items-center px-8 mt-2 text-base text-black">
                               <span className="w-full">
                                    <FormItem 
                                        invalid={
                                            errors.phone_number &&
                                            touched.phone_number
                                        }
                                        errorMessage={errors.phone_number}
                                        className="mb-0"
                                    >
                                    
                                        <Field
                                            autoComplete="off"
                                            name="phone_number"
                                            //placeholder="item"
                                            component={Input}
                                            maxLength='10'
                                            className="bg-[#F4F6F9] border-none"
                                            value={values?.phone_number?.toString().replace(
                                                /[^\d{10}$]/gi,
                                                ''
                                            )}
                                        />
                                        </FormItem>
                                        </span>
                               </div>
                               
                               

                                
                                
                                
                                <div className="w-full mt-3 px-8 text-center">
                                        
                                    <Button
                                        className="w-[213px] h-[48px] my-8 font-medium text-lg tracking-wide"
                                        loading={isSubmitting}
                                        variant="solid"
                                        type="submit"
                                    >
                                        {isSubmitting
                                            ? 'Sharing...'
                                            : 'Share'}
                                    </Button>
                                    </div>
                              </FormContainer>
                            </Form>
                                
                            )}
                        </Formik>
                </Dialog>


                <Dialog
                    isOpen={isOpenDialog === 'upload'}
                    onClose={handleCloseDialog}
                    onRequestClose={handleCloseDialog}
                    bodyOpenClassName="overflow-hidden"
                    width="470px"
                >   
                    <div id='printmodal'>
                    <div className="grid grid-rows-1 grid-cols-3 h-10">
                    
                    <div className="row-start-1 col-start-1 col-span-3 ">
                    <h4 className="mt-1 text-center text-blue-600 font-bold">
                        Upload Generated Invoice
                    </h4>
                    </div>
                    </div>
                    
                   
                    
                    </div>
                    <form onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
                        <div className="flex items-center px-8 mt-2 text-base text-black">
                              
                               <span className="w-full h-60 bg-[#5A87B2] bg-opacity-10 rounded-md">
                               {file &&
                               <div className="grid place-items-center h-60">
                               <object data={file} type="application/pdf" width="100%" height="100%">
                               <p>PDF Not LOADED!</p>
                               </object>
                               
                               <Button className="flex item-center -my-5" onClick={()=> {setFile();setUpfile()}}>Remove file</Button>
                               </div>
                                }
                                {(!file) &&
                               <>
                               <input ref={inputRef} type="file" accept='application/pdf' id="input-file-upload" onChange={handleChange} className="hidden" />
                               <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : "" } >
                               <div className="grid place-items-center h-60">
                               <HiOutlinePencil size={44} style={{color:"#5A87B2"}}/>
                               <p>Drag and drop your file</p>
                               <p>or</p>
                               <Button className="flex item-center" onClick={onButtonClick}>Choose a file</Button>
                               </div> 
                               </label>
                               </>
                                }

                               </span>
                               
                               </div>
                               
                               { dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
                              </form>

                                
                                
                                
                                <div className="w-full mt-3 px-8 text-center">
                                        
                                    <Button
                                        className="w-[213px] h-[48px] my-8 font-medium text-lg tracking-wide"
                                        loading={isUploading}
                                        disabled={!upfile}
                                        variant="solid"
                                        //type="submit"
                                        onClick={handleUpload}
                                    >
                                        {isUploading
                                            ? 'Uploading...'
                                            : 'Upload'}
                                       
                                    </Button>
                                    </div>
                                   
                </Dialog>

                <Dialog
                    isOpen={isOpenDialog === 'remove'}
                    onClose={handleCloseDialog}
                    onRequestClose={handleCloseDialog}
                    bodyOpenClassName="overflow-hidden"
                    width="470px"
                >   
                    <div id='printmodal'>
                    <div className="grid grid-rows-1 grid-cols-3 h-10">
                    
                    <div className="row-start-1 col-start-1 col-span-3 ">
                    <h4 className="mt-1 text-center text-blue-600 font-bold">
                        Delete Invoice
                    </h4>
                    </div>
                    </div>
                    
                   
                    
                    </div>
                    
                        <div className="flex items-center px-8 mt-2 text-base text-black">
                              
                               <span className="w-full h-60">
                               {
                               <object data={pdfdata} type="application/pdf" width="100%" height="100%">
                               <p>PDF Not LOADED!</p>
                               </object>
                               
                               
                            }
                             
                              
                               </span>
                               
                               </div>
                               
                               

                                
                                
                                
                                <div className="w-full mt-3 px-8 text-center">
                                        
                                    <Button
                                        className="w-[213px] h-[48px] my-8 font-medium text-lg tracking-wide"
                                        //loading={isSubmitting}
                                        variant="solid"
                                        //type="submit"
                                        onClick={handleDelete}
                                    >
                                       Confirm Delete
                                    </Button>
                                    </div>
                </Dialog>



                <Dialog
                    isOpen={isOpenDialog === 'view'}
                    onClose={handleCloseDialog}
                    onRequestClose={handleCloseDialog}
                    bodyOpenClassName="overflow-hidden"
                    width="470px"
                >     
                    <div id='printmodal'>
                    <div className="grid grid-rows-1 grid-cols-3 h-10">
                    
                    <div className="row-start-1 col-start-1 col-span-3 ">
                    <h4 className="mt-1 text-center text-blue-600 font-bold">
                        View Invoice
                    </h4>
                    </div>
                    </div>
                   
                    
                    </div>
                    
                        <div className="flex items-center px-8 mt-2 text-base text-black">
                              
                               <span className="w-full h-60">
                               {
                               <object data={pdfdata} type="application/pdf" width="100%" height="100%">
                               <p>PDF Not LOADED!</p>
                               </object>
                               
                            }
                               </span>
                               
                               </div>

                                <div className="w-full mt-3 px-8 text-center">
                            
                                    <Button
                                        className="w-[213px] h-[48px] my-8 font-medium text-lg tracking-wide"
                                        //loading={isSubmitting}
                                        variant="solid"
                                        //type="submit"
                                        onClick={handlePrint}
                                    >
                                       Print
                                    </Button>
                                    </div>
                </Dialog>

                <Dialog
                    isOpen={isOpenDialog === 'download'}
                    onClose={handleCloseDialog}
                    onRequestClose={handleCloseDialog}
                    bodyOpenClassName="overflow-hidden"
                    width="470px"
                >   
                    <div id='printmodal'>
                    <div className="grid grid-rows-1 grid-cols-3 h-10">
                    
                    <div className="row-start-1 col-start-1 col-span-3 ">
                    <h4 className="mt-1 text-center text-blue-600 font-bold">
                        Download Invoice
                    </h4>
                    </div>
                    </div>
                    
                   
                    
                    </div>
                    
                        <div className="flex items-center px-8 mt-2 text-base text-black">
                              
                               <span className="w-full h-60">
                               {
                               <object data={pdfdata} type="application/pdf" width="100%" height="100%">
                               <p>PDF Not LOADED!</p>
                               </object>
                               
                               
                            }
                             
                              
                               </span>
                               
                               </div>
                               
                               

                                
                                
                                
                                <div className="w-full mt-3 px-8 text-center">
                                        
                                    <Button
                                        className="w-[213px] h-[48px] my-8 font-medium text-lg tracking-wide"
                                        //loading={isSubmitting}
                                        variant="solid"
                                        //type="submit"
                                        onClick={handleDownloadInvoice}
                                    >
                                       Download
                                    </Button>
                                    </div>
                </Dialog> */}


                {/* <Dialog
                    isOpen={isOpenDialog === 'message'}
                    closable={false}
                    onClose={handleCloseDialog}
                    onRequestClose={handleCloseDialog}
                    portalClassName="text-center"
                    bodyOpenClassName="overflow-hidden"
                >
                    {(message?.status === 'failed') ? (
                        <FailureSvg className="w-16 h-16 m-auto mt-4" />
                    ) : (
                        <SuccessSvg className="w-16 h-16 m-auto mt-4" />
                    )}
                    <h4
                        className={`mt-6 mb-4 text-center font-bold ${
                            message?.status === 'failed'
                                ? 'text-red-600'
                                : 'text-blue-600'
                        }`}
                    >
                        {message?.message}
                    </h4>
                    <div className="mt-8 mb-4 text-center">
                        <Button
                            variant="solid"
                            size="md"
                            className="w-1/3"
                            onClick={handleCloseDialog}
                        >
                            OK
                        </Button>
                    </div>
                </Dialog> */}

        
        
                
                </>
            )
  }

  export default HandleEditInvoice;