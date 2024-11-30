import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, useFormikContext } from "formik";
import AntdDatePicker from "components/ui/AntdDatePicker";
import AntdInput from "components/ui/AntdInput";
import { verifyInputField } from "QuickBook/components/CompConstants";
import AntdFormikSelect from "components/ui/AntdFormikSelect";
import Button from "components/ui/NewButton";
// import { setManageRequestModal } from "../store/stateSlice";
import { CANCEL_STYLE, DISABLED_STYLE, ENABLED_STYLE } from "constants/app.styles";
import { setManageRequestModal } from "views/RequestBook/store/stateSlice";

const EditRequestBookForm = ({handleCancel}) => {
  const dispatch = useDispatch();
  const { bookTypeList } = useSelector((state) => state.quickbookStore.state);
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
    const { request_date,book_type,requested_by,reason } = valArr;
    return !!(request_date && book_type && requested_by && reason);
  };


  return (
    <Form className="h-full flex flex-col">
      <div className="flex-grow overflow-y-auto">
        <div className="grid grid-cols-1 gap-4 px-4 pb-2 lg:grid-cols-2">
          <AntdDatePicker
            disabled = {true}
            labelText="Day"
            name="request_date"
            ph="--- Select Day ---"
            value={values["request_date"]}
            handleChange={(date, dateString) =>
              setFieldValue("request_date", dateString)
            }
          />
          <AntdFormikSelect
            labelText="Book Type"
            name="book_type"
            ph="--Select Book Type--"
            // handleChange={(name, selectedValue) =>
            //   handleChangeBookType(name, selectedValue)
            // }
            isDisabled = {true}
            Arr={bookTypeList}
          />
          {
            showInputBox({
              label: "Request Name",
              val: "requested_by",
            })
          }
          {
            showInputBox({
              label: "Reason",
              val: "reason",
            })
          }
        </div>
      </div>

       <div className="flex-none px-4 flex justify-end items-center gap-5 h-[150px]">
          <Button
            className={CANCEL_STYLE}
            type="cancel"
            onClick = {handleCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className={getDisabledStatus(values) ? ENABLED_STYLE : DISABLED_STYLE}
            isDisabled = {!getDisabledStatus(values)}
          >
            Save
          </Button>
        </div>
    </Form>
  );
};

export default EditRequestBookForm;
