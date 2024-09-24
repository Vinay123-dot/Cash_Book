import React, { useState, useRef, useContext } from 'react';
import CButton from '../../../components/ui/Button';
import Modal from '../../../components/shared/Modal';
import { HiOutlineUpload } from "react-icons/hi";
import  excelIcon from "../../../assets/excelIcon.png";
import { apiGetDayBookExcelData, apiUploadDayBookExcel } from "../../../services/TransactionService";
import { useDispatch } from 'react-redux';
import { setSelectedBookType, setShowUploadInvoice } from '../../store/stateSlice';
import { DaybookDataContext } from '../../../context/DaybookContext';

const UploadModal = ({ onClose }) => {

  const dispatch = useDispatch();
  const {setDaybookData} = useContext(DaybookDataContext)
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
    dispatch(setShowUploadInvoice(false));
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
        
        setShowErrorMessage({
          flag : false,
          Message : ""
        });
        setDaybookData((prev) => ({
          ...prev,
          getUploadExcelData : true
        }))
        dispatch(setShowUploadInvoice(false));
      }else{
        dispatch(setShowUploadInvoice(false));
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
