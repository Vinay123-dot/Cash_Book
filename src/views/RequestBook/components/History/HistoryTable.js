import React from 'react';
import PropTypes from "prop-types";
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { HiOutlineTrash } from "react-icons/hi";
import { STATUS_TYPES } from 'constants/app.constant';
import AntdSelectFilter from 'components/ui/AntdSelect/AntdSelect';

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


const HistoryTable = ({handleChangeStatus,handleDeleteReport}) => {

  const { historyArr } = useSelector(state => state.requestBook.reqData);
  const userType = localStorage.getItem("mType");


  return (
    <table className="min-w-full table-auto border-collapse border border-gray-200">
      <thead>
        <tr className="bg-gray-100">
          {showTableHeader({ label: "Sl.No" })}
          {showTableHeader({ label: "Book Type" })}
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
        {(historyArr || []).map((row, index) => (
          <tr key={row.id} className="hover:bg-gray-50">
            {showTableData({ value: index + 1 })}
            {showTableData({ value: row.book_type })}
            {showTableData({ value: row.request_date })}
            {showTableData({ value: row.requested_by })}
            {showTableData({ value: row.requested_on })}
            {showTableData({ value: row.approved_On })}
            {showTableData({ value: row.approved_by })}
            {showTableData({ value: row.valid_till })}
            {showTableData({ value: row.reason })}
            {showTableData({ value: getApprovedStatus(row.isapproved) })}
            {userType == 7 && row.isapproved === 0 && (
              <td className="border border-gray-300 px-4 py-2">
                <HiOutlineTrash
                  className="cursor-pointer size-6 text-[#5A87B2] text-start"
                  onClick={() => handleDeleteReport(row.Id)}
                />
              </td>
            )}
            {userType == 4 && (
              <td className="border border-gray-300 px-4 py-2">
                <AntdSelectFilter
                  showMessage={false}
                  placeholder="Select Book Type"
                  options={STATUS_TYPES}
                  onStatusChange={(val) => handleChangeStatus(val, row.id)}
                  value={row.isapproved}
                />
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default HistoryTable;

HistoryTable.propTypes = {
  handleChangeStatus : PropTypes.func,
  handleDeleteReport : PropTypes.func
};
