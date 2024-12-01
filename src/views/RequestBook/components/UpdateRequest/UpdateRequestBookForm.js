import React from "react";
import { Form, useFormikContext } from "formik";
import AntdDatePicker from "components/ui/AntdDatePicker";
import AntdInput from "components/ui/AntdInput";
import { verifyInputField } from "QuickBook/components/CompConstants";
import Button from "components/ui/NewButton";
// import { setManageRequestModal } from "../store/stateSlice";
import { CANCEL_STYLE, DISABLED_STYLE, ENABLED_STYLE } from "constants/app.styles";
import { STATUS_TYPES } from "constants/app.constant";
import AntdSelectFilter from "components/ui/AntdSelect/AntdSelect";

const UpdateRequestBookForm = ({handleCancel}) => {
 
  const { values, setFieldValue } = useFormikContext();

  const showInputBox = ({
    label,
    val,
    func = verifyInputField,
    values,
    validation = false,
    prefix = false,
    onlyNum = false,
    disableInput = false
  }) => {
    return (
      <AntdInput
        text={label}
        value={val}
        ph={label}
        showPrefix={prefix}
        acceptOnlyNum={onlyNum}
        validation={validation}
        disableInput = {disableInput}
        validateField={(value) => func(value, values, val)}
      />
    );
  };

  // const handleChangeBookType = (name, val) => {
  //   let findObj = bookTypeList.find((item) => item.Id === val);
  //   setFieldValue("book_name", findObj?.Type || "");
  //   setFieldValue(name, val);
  // };

  const getDisabledStatus = (valArr) => {
    const { approved_by,valid_till,isapproved } = valArr;
    return !!(isapproved && valid_till && approved_by);
  };

  return (
    <Form className="h-full flex flex-col">
      <div className="flex-grow overflow-y-auto">
        <div className="grid grid-cols-1 gap-4 px-4 pb-2 lg:grid-cols-2">
          <AntdDatePicker
            disabled = {true}
            labelText="Request Date"
            name="request_date"
            ph="--- Select Day ---"
            value={values["request_date"]}
            handleChange={(date, dateString) =>
              setFieldValue("request_date", dateString)
            }
          />
          {showInputBox({
            label: "Request Name",
            val: "requested_by",
          })}
          {showInputBox({
            label: "Approved By",
            val: "approved_by",
          })}
          <AntdDatePicker
            labelText="Valid Till"
            name="valid_till"
            ph="--- Select Day ---"
            value={values["valid_till"]}
            handleChange={(date, dateString) =>
              setFieldValue("valid_till", dateString)
            }
          />
          <div className="flex flex-col">
            <label htmlFor = "sel">Select Status</label>
            <AntdSelectFilter
                showMessage={false}
                placeholder="Select Status"
                options={STATUS_TYPES}
                onStatusChange={(val) => setFieldValue("isapproved", val)}
                value={values["isapproved"]}
            />
          </div>
         
        </div>
      </div>

      <div className="flex-none px-4 flex justify-end items-center gap-5 h-[150px]">
        <Button className={CANCEL_STYLE} type="cancel" onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          className={getDisabledStatus(values) ? ENABLED_STYLE : DISABLED_STYLE}
          isDisabled={!getDisabledStatus(values)}
        >
          Save
        </Button>
      </div>
    </Form>
  );
};

export default UpdateRequestBookForm;
