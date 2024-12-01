import React from "react";
import PropTypes from "prop-types";
import RupeePrefix from "Prefixes/RupeeSign";

const Input = (props) => {
  const {
    id,
    label,
    val = "",
    field,
    readonly,
    keyNum,
    handleInputChange,
    acceptAll = false,
    disabled = false,
    disabledIcon = false,
    showLabel = true
  } = props;

  return (
    <>
      {
        showLabel &&
        <label className="text-start mb-1 text-black">{label}</label>
      }
      <div className="flex items-center border border-gray-300 rounded-md h-10">
        {
          !disabledIcon && <p className="self-center">{RupeePrefix}</p>
        }
        
        <input
          className="w-full h-full rounded-md px-2 focus:outline-none "
          type="text"
          value={val ?? ""}
          disabled={disabled}
          onChange={(e) => handleInputChange(id, field, e.target.value)}
          onKeyDown={(event) => {
            if (!acceptAll) {
              if (
                !/^[0-9.]$/.test(event.key) &&
                event.key !== "Backspace" &&
                event.key !== "Delete" &&
                event.key !== "ArrowLeft" &&
                event.key !== "ArrowRight"
              ) {
                event.preventDefault();
              }
            }
          }}
          readOnly={readonly}
        />
      </div>
    </>
  );
};


export default Input;

Input.propTypes = {
    handleInputChange : PropTypes.func,
    id : PropTypes.string.isRequired,
    label : PropTypes.string.isRequired,
    field : PropTypes.string.isRequired,
    val: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    // val : PropTypes.oneOfType([PropTypes.string, PropTypes.number,PropTypes.oneOf([undefined])]),
    readonly : PropTypes.bool,
    keyNum : PropTypes.number,
    acceptAll : PropTypes.bool,
    disabled : PropTypes.bool,
    disabledIcon : PropTypes.bool,
    showLabel : PropTypes.bool
};

Input.defaultProps = {
    acceptAll : false,
    disabled : false,
    disabledIcon : false,
    showLabel : true,
    val : ""
};
 
 

