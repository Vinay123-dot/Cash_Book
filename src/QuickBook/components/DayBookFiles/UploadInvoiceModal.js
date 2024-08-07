// import React, { useState } from "react";
// import * as XLSX from 'xlsx';
// import Modal from "../../components/shared/Modal";
// import CButton from "../../components/ui/Button";

//  const UploadInvoiceModal = (props) => {

//     const [file, setFile] = useState(null);
//     const [upfile, setUpfile] = useState(''); //not there in cpt
//     const [fileContent, setFileContent] = useState(null);
//     const [dragActive, setDragActive] = useState(false);
//     const inputRef = React.useRef(null);

//     const handleDrag = function (e) {
//         e.preventDefault();
//         e.stopPropagation();
//         if (e.type === "dragenter" || e.type === "dragover") {
//             setDragActive(true);
//         } else if (e.type === "dragleave") {
//             setDragActive(false);
//         }
//     };


//     const handleChange = function (e) {
//         e.preventDefault();
//         if (e.target.files && e.target.files[0]) {
//             const fileURL = URL.createObjectURL(e.target.files[0]);
//             setFile(fileURL)
//             setUpfile(e.target.files[0]) //no cpt
//             readFile(file);
//         }
//     };


//     const handleDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       const file = e.dataTransfer.files[0];
//       setFile(URL.createObjectURL(file));
//       readFile(file);
//     }
//   };

//     const onButtonClick = () => {
//         inputRef.current.click();
//     }

//     const readFile = (file) => {
//     const reader = new FileReader();
//     reader.onload = (event) => {
//       const data = new Uint8Array(event.target.result);
//       const workbook = XLSX.read(data, { type: 'array' });
//       const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//       const jsonContent = XLSX.utils.sheet_to_json(worksheet);
//       setFileContent(jsonContent);
//     };
//     reader.readAsArrayBuffer(file);
//   };

//     return (
//         <Modal openModal={true} height={400} width={350}>
//             <div id='printmodal'>
//                 <div className="grid grid-rows-1 grid-cols-3 h-10">
//                     <div className="row-start-1 col-start-1 col-span-3 ">
//                         <h4 className="mt-1 text-center font-bold" style={{ color: "#5A87B2" }}>
//                             Upload Generated Invoice
//                         </h4>
//                     </div>
//                 </div>
//             </div>
//             <form onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
//                 <div className="flex items-center px-8 mt-2 text-base text-black">
//                     <span className="w-full h-60 bg-[#5A87B2] bg-opacity-10 rounded-md">
//                         {file && (
//                             <div className="grid place-items-center h-60">
//                                 <object data={file} type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" width="100%" height="100%">
//                                     <p>Excel Not LOADED!</p>
//                                 </object>
//                                 <CButton onClick={() => { setFile(null); setFileContent(null); }}>Remove file</CButton>
//                             </div>
//                         )}

//                         {!file && (
//                             <>
//                                 <input ref={inputRef} type="file" accept=".xlsx" id="input-file-upload" onChange={handleChange} className="hidden" />
//                                 <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : ""}>
//                                     <div className="grid place-items-center h-60">
//                                         {/* <HiOutlineUpload size={44} style={{ color: "#5A87B2" }} /> */}
//                                         <p>Drag and drop your file</p>
//                                         <p>or</p>
//                                         <CButton onClick={onButtonClick}>Choose a file</CButton>
//                                     </div>
//                                 </label>
//                             </>
//                         )}

//                     </span>

//                 </div>

//                 {dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
//             </form>
//             {fileContent && (
//                 <div className="px-8 mt-2">
//                     <pre className="text-sm">{JSON.stringify(fileContent, null, 2)}</pre>
//                 </div>
//             )}
//             <div className="w-full mt-3 px-8 text-center">
//                 <CButton
//                     className="w-[213px] h-[48px] my-8 font-medium text-lg tracking-wide"
//                     // loading={isUploading}
//                     // disabled={!upfile}
//                     variant="solid"
//                 //type="submit"
//                 // onClick={handleUpload}
//                 >
//                     {/* {isUploading
//                         ? 'Uploading...'
//                         : 'Upload'} */}
//                     Upload

//                 </CButton>
//             </div>


//         </Modal>
//     )
// }

// export default UploadInvoiceModal;



// // {/* <Dialog
// //                 isOpen={isOpenDialog === 'upload'}
// //                 onClose={handleCloseDialog}
// //                 onRequestClose={handleCloseDialog}
// //                 bodyOpenClassName="overflow-hidden"
// //                 width="470px"
// //             >
                
// //                 <form onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
// //                     <div className="flex items-center px-8 mt-2 text-base text-black">

// //                         <span className="w-full h-60 bg-[#5A87B2] bg-opacity-10 rounded-md">
// //                             {file &&
// //                                 <div className="grid place-items-center h-60">
// //                                     <object data={file} type="application/pdf" width="100%" height="100%">
// //                                         <p>PDF Not LOADED!</p>
// //                                     </object>

// //                                     <Button className="flex item-center -my-5" onClick={() => { setFile(); setUpfile() }}>Remove file</Button>
// //                                 </div>
// //                             }
// //                             {(!file) &&
// //                                 <>
// //                                     <input ref={inputRef} type="file" accept='application/pdf' id="input-file-upload" onChange={handleChange} className="hidden" />
// //                                     <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : ""} >
// //                                         <div className="grid place-items-center h-60">
// //                                             <HiOutlineUpload size={44} style={{ color: "#5A87B2" }} />
// //                                             <p>Drag and drop your file</p>
// //                                             <p>or</p>
// //                                             <Button className="flex item-center" onClick={onButtonClick}>Choose a file</Button>
// //                                         </div>
// //                                     </label>
// //                                 </>
// //                             }

// //                         </span>

// //                     </div>

// //                     {dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
// //                 </form>




// //                 <div className="w-full mt-3 px-8 text-center">

// //                     <Button
// //                         className="w-[213px] h-[48px] my-8 font-medium text-lg tracking-wide"
// //                         loading={isUploading}
// //                         disabled={!upfile}
// //                         variant="solid"
// //                         //type="submit"
// //                         onClick={handleUpload}
// //                     >
// //                         {isUploading
// //                             ? 'Uploading...'
// //                             : 'Upload'}

// //                     </Button>
// //                 </div>

// //             </Dialog> */}

import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import CButton from '../../../components/ui/Button';
import Modal from '../../../components/shared/Modal';
import { HiOutlineUpload } from "react-icons/hi";
import  excelIcon from "../../../assets/excelIcon.png";
import { apiUploadDayBookExcel } from "../../../services/TransactionService";

const UploadModal = ({ onClose }) => {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState(null);
  const inputRef = useRef(null);
  const [loadingUPBtn,setLoadingUPBtn] = useState(false);
  const [showErrorMessage,setShowErrorMessage] = useState({
    flag : false,
    Message : ""
  });

  let uniqueId = localStorage.getItem("uniqueId");

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave' || e.type === 'drop') {
      setDragActive(false);
    }
  };
  const handleChange = (e) => {

    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      // setFile(e.target.value)
      // setFile(URL.createObjectURL(file));
      setFile(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      // setFile(URL.createObjectURL(file));
      setFile(file);
    }
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };

  const handleCancelBtn = () => {
    setFile(null);
    setFileName(null)
    setShowErrorMessage({
      flag : false,
      Message : ""
    });
    onClose();
  }

  const handleSubmitExcel = async() => {
    try{
      if(!file){
        setShowErrorMessage({
          flag : true,
          Message : "Please select file"
        });
        return;
      }
      setLoadingUPBtn(true);
      const formData = new FormData();
      formData.append("key",uniqueId);
      formData.append("file",file);
      let response = await apiUploadDayBookExcel(formData);
      setLoadingUPBtn(false);
      if(response?.status === 200) {
        onClose();
        setShowErrorMessage({
          flag : false,
          Message : ""
        });
      }
      

    }catch(ev){
      setLoadingUPBtn(false);
      setShowErrorMessage({
        flag : true,
        Message : ev?.response?.data.detail || ""
      });
    }
    
  }

  return (
    <Modal openModal={true} height={250} width={400} jc="center" bStyle="dashed">
      <form onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
        <div className="flex items-center justify-center px-8 mt-2 text-base text-black rounded-md">
          { (!file || showErrorMessage.flag) && (
            <>
              <input ref={inputRef} type="file" accept=".xlsx, .csv"  id="input-file-upload" onChange={handleChange} className="hidden" />
              <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : ""}>
                <div className="flex flex-col items-center justify-center">
                  <HiOutlineUpload size={44} style={{ color: "#5A87B2" }} />
                  <CButton onClick={onButtonClick} style={{borderRadius: 16,width:96,fontSize:12}}>Choose a file</CButton>
                  <p style={{fontSize: 14,color: "rgba(18, 18, 18, 0.38)"}}> or drop a file here</p>
                  {
                    showErrorMessage.flag && (
                        <p className='text-red-900 text-lg'>{showErrorMessage.Message}</p>
                    )
                  }
                  <p style={{fontSize: 16}}> <span className='text-red-600 text-2xl'>*</span>File supported .csv, .xlsx</p>
                </div>
              </label>
            </>
          )}
          {
            (file && !showErrorMessage.flag) && (
              <div className="flex flex-col items-center justify-center">
                <img src={excelIcon} style={{ width: 80, height: 80}} />
                <p style={{fontSize: 14,color: "rgba(18, 18, 18, 0.38)"}}>{fileName||""}</p>
                <p style={{fontSize: 16}} className='text-[#5A87B2]'>File Selected Sucessfully</p>
              </div>
            )
          }
          
          
        </div>
        {dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
      </form>
      <div className='flex mt-4'>
        <CButton 
          onClick={handleCancelBtn} 
          type = "cancel"
          style={{borderRadius: 8,width:96,fontSize:12,marginRight:10}}
        > 
          Cancel 
        </CButton>
        <CButton 
          onClick={handleSubmitExcel} 
          style={{borderRadius: 8,width:96,fontSize:12}}
        >
          {loadingUPBtn ? "Submitting...":"Submit"}
        </CButton>
      </div>
    </Modal>
  );
};

export default UploadModal;
