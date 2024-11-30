import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { MUTED_STYLE } from "constants/app.styles";


const Button = (props) => {
  const {
    onClick,
    isDisabled = false,
    className,
    type = "button",
    style,
    children,
    ...rest
  } = props;

  const getBtnClsses = classNames(MUTED_STYLE,className);


  return (
    <button
      style={style}
      onClick={onClick}
      disabled={isDisabled}
      className={getBtnClsses}
      type={type}
      {...rest}
    >
      {children}
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
