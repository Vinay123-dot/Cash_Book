import React,{useState} from 'react';
import PropTypes from "prop-types";
import classNames from 'classnames';
import { HiOutlinePencil,HiOutlineTrash } from "react-icons/hi";
import { MERCHANT_ID, TERMINAL_ID } from 'constants/app.constant';
import UpdateRequestBook from '../UpdateRequest/UpdateRequestBook';
import useFetchReqBook from '../useFetchReqBook';

let ApprovedObj = {
  "0" : "Pending",
  "1" : "Approved",
  "2" : "Rejected"
};

const showTableHeader = ({ label }) => {
  return (
    <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">
      {label}
    </th>
  );
};

const showTableData = ({ value }) => {
  return (
    <td className="border border-gray-300 px-4 py-2">
      {value}
    </td>
  );
};

const getStatusClr = (receivedVal) => {
  let reqtxtClr = "";
  if(receivedVal === 0){
    reqtxtClr = "text-yellow-700";
  }else if( receivedVal === 1){
    reqtxtClr = "text-green-700";
  }else {
    reqtxtClr = "text-red-700"
  }
  return reqtxtClr;
}

const getApprovedStatus = (val) => {
  return (
    <p className={classNames('font-medium text-sm' , getStatusClr(val))}>
      {ApprovedObj[val]}
    </p>
  )
}


const HistoryDataTable = ({requiredArr,handleDeleteReport}) => {

  const { viewRequestReports } = useFetchReqBook();
  const userType = localStorage.getItem("mType");
  const [requestBookObj,setRequestBookObj] = useState({
    show : false,
    reqObj : {}
  }) ;

  const handleClickRequest = (row) => {
    setRequestBookObj((prev) => ({
      ...prev,
      show : true,
      reqObj : row
    }));
  };

  const onCancelReqBook = () => {
    setRequestBookObj((prev) => ({
      ...prev,
      show : false,
      reqObj : {}
    }));
  }
  return (
    <>
    <table className="min-w-full table-auto border-collapse border border-gray-200 overflow-auto">
      <thead>
        <tr className="bg-gray-100">
          {
            showTableHeader({ label: "Sl.No" })
          }
          {
            showTableHeader({ label: "Book Type" })
          }
          {showTableHeader({ label: "Requested Date" })}
          {showTableHeader({ label: "Requested By" })}
          {showTableHeader({ label: "Requested On" })}
          {showTableHeader({ label: "Approved On" })}
          {showTableHeader({ label: "Approved by" })}
          {showTableHeader({ label: "Valid till" })}
          {showTableHeader({ label: "Reason" })}
          {showTableHeader({ label: "Status" })}
          {showTableHeader({ label: "Action" })}
        </tr>
      </thead>
      <tbody>
        {(requiredArr || []).map((row, index) => (
          <tr key={row.id} className="hover:bg-gray-50">
            {showTableData({ value: index + 1 })}
            {showTableData({ value: row.book_type })}
            {showTableData({ value: row.request_date })}
            {showTableData({ value: row.requested_by })}
            {showTableData({ value: row.requested_on })}

            {showTableData({ value: row.approved_on })}
            {showTableData({ value: row.approved_by })}
            {showTableData({ value: row.valid_till })}
            {showTableData({ value: row.reason })}
            {showTableData({ value: getApprovedStatus(row.isapproved) })}

            {
              userType == MERCHANT_ID && row.isapproved === 0? 
              (
                <td className="border border-gray-300 px-4 py-2">
                  <HiOutlinePencil
                    className="cursor-pointer size-6 text-[#5A87B2] text-start"
                    onClick={() => handleClickRequest(row)}
                  />
                </td>
              )
             :
              <td className="border border-gray-300 px-4 py-2">
                {
                  userType === TERMINAL_ID && row.isapproved === 0 && (
                    <HiOutlineTrash
                      className="cursor-pointer size-6 text-[#5A87B2] text-start"
                      onClick={() => handleDeleteReport(row.id)}
                    />
                  ) 
                }
              </td>
            }
          </tr>
        ))}
      </tbody>
    </table>
     {
          requestBookObj.show &&
            <UpdateRequestBook
              reqObj = {requestBookObj.reqObj}
              handleCancel = {onCancelReqBook}
              handleClickOk={() =>{
                onCancelReqBook()
                viewRequestReports()
              }}
            />
        }
    </>
    
  );
};

export default HistoryDataTable;

HistoryDataTable.propTypes = {
  requiredArr : PropTypes.array,
  handleChangeStatus : PropTypes.func,
  handleDeleteReport : PropTypes.func
};
