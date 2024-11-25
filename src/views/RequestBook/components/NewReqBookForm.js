import React from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { Form, useFormikContext } from "formik";
import AntdDatePicker from "components/ui/AntdDatePicker";
import ParagraphTag from "constants/PTag";
import AntdInput from "components/ui/AntdInput";
import { verifyInputField } from "QuickBook/components/CompConstants";
import AntdFormikSelect from "components/ui/AntdFormikSelect";
import Button from "components/ui/NewButton";
import { setManageRequestModal } from "../store/stateSlice";

const NewReqBookForm = () => {
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
  }) => {
    return (
      <AntdInput
        text={label}
        value={val}
        ph={label}
        showPrefix={prefix}
        acceptOnlyNum={onlyNum}
        validation={validation}
        validateField={(value) => func(value, values, val)}
      />
    );
  };

  const handleChangeBookType = (name, val) => {
    let findObj = bookTypeList.find((item) => item.Id === val);
    setFieldValue("book_name", findObj?.Type || "");
    setFieldValue(name, val);
  };

  return (
    <Form className="h-full flex flex-col p-4">
      <div className="flex-grow overflow-y-auto">
        <ParagraphTag label="Add New Request Book" />
        <div className="grid grid-cols-1 gap-4 px-4 pb-2 lg:grid-cols-2">
          <AntdDatePicker
            isFromAdvance = {true}
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
            handleChange={(name, selectedValue) =>
              handleChangeBookType(name, selectedValue)
            }
            Arr={bookTypeList}
          />
          {showInputBox({
            label: "Request Name",
            val: "requested_by",
          })}
          {showInputBox({
            label: "Reason",
            val: "reason",
          })}
        </div>
      </div>

       <div className="flex-none px-4 flex justify-end items-center gap-5 h-[150px]">
          <Button
            className={classNames(
              "relative shadow-lg text-black text-sm font-medium h-10 rounded-md w-36 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl bg-gradient-to-r",
              "focus:ring-2 focus:ring-offset-2 focus:ring-black cursor-pointer border-2 border-black"
            )}
            type="cancel"
            onClick = {() =>dispatch(setManageRequestModal(false))}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className={classNames(
              "relative shadow-lg text-white text-sm font-medium h-10 rounded-md w-36 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl bg-gradient-to-r",
              "from-[#5A87B2] to-[#5A87B2] hover:from-[#5A87B2] hover:to-[#5A87B2] focus:ring-2 focus:ring-offset-2 focus:ring-green-500 cursor-pointer"
            )}
          >
            Save
          </Button>
        </div>
    </Form>
  );
};

export default NewReqBookForm;
