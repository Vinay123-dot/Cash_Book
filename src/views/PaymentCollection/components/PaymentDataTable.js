import React from "react";
import PropTypes from "prop-types";
import { convertToNormalFormat } from "utils/dateFormatter";
import Input from "components/ui/Input";

const PaymentDataTable = (props) => {
  const { requiredArr, handleClickCheckbox, handleInputChange } = props;

  const disabledCheckBox = (givenObj) => {
    const { input_amount,pending_balance } = givenObj;
    return !!(Number(input_amount) <= 0 || Number(input_amount) > Number(pending_balance));
  };
  return (
    <div className="mt-4 rounded-lg h-full overflow-hidden">
      <div className="overflow-x-auto h-full">
        <table className="min-w-[800px] w-full text-left">
          {/* Table Header */}
          <thead className="bg-slate-200 sticky top-0 z-50">
            <tr>
              <th className="p-2">Sl No.</th>
              <th className="p-2">Bill Date</th>
              <th className="p-2">Bill No.</th>
              <th className="p-2">Bill Amount</th>
              <th className="p-2">Pending Bill</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
  
          {/* Table Body */}
          <tbody>
            {
              requiredArr?.length <= 0 && 
                <tr>
                  <td
                    colSpan="12"
                    className="text-lg text-swinkpayBlue font-medium p-4 text-center"
                  >
                    No records
                  </td>
                </tr>
            }
            {(requiredArr || []).map((eachDoc, index) => (
              <React.Fragment key={eachDoc.id}>
                <tr>
                  <td className="p-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="cursor-pointer w-5 h-5 mr-2 disabled:cursor-not-allowed"
                        checked={eachDoc.checked}
                        disabled={disabledCheckBox(eachDoc)}
                        onChange={() => handleClickCheckbox(eachDoc)}
                      />
                      {index + 1}
                    </div>
                  </td>
                  <td className="p-2">{convertToNormalFormat(eachDoc.date)}</td>
                  <td className="p-2">{eachDoc.bill_no}</td>
                  <td className="p-2">{eachDoc.bill_value}</td>
                  <td className="p-2">{eachDoc.pending_balance}</td>
                  <td className="p-2">
                    {eachDoc.pending_balance > 0 && (
                      <div className="flex flex-col w-full md:w-24">
                        <Input
                          id={eachDoc.id}
                          label="Amount"
                          field="input_amount"
                          val={eachDoc.input_amount}
                          readonly={eachDoc.checked}
                          handleInputChange={handleInputChange}
                          showLabel={false}
                        />
                      </div>
                    )}
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentDataTable;

PaymentDataTable.propTypes = {
  requiredArr: PropTypes.array,
  handleClickCheckbox: PropTypes.func,
  handleInputChange: PropTypes.func,
};
