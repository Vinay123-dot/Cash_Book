import React from "react";
import PropTypes from "prop-types";

const Button = (props) => {
  const {
    onClick,
    isDisabled = false,
    className,
    type = "button",
    ...rest
  } = props;

  return (
    <button
      style={{ ...rest.style }}
      onClick={onClick}
      disabled={isDisabled}
      className={className}
      type={type}
    >
      {props.children}
    </button>
  );
};

export default Button;

Button.propTypes = {
    onClick: PropTypes.func, 
    isDisabled: PropTypes.bool,
    className: PropTypes.string,
    type: PropTypes.string, 
    style: PropTypes.object, 
    children: PropTypes.node ,
};

// Define default props
Button.defaultProps = {
    isDisabled: false,
    type: 'button' ,               
};
