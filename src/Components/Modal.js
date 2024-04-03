import React from "react";
import { btnClr } from "../commonStyles";
import { Button } from "antd";

const mainDiv = {
  display: "flex",
  position: "absolute",
  backgroundColor: "rgba(52, 52, 52, 0.6)",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999,
  top: 0,
  left: 0,
  height: "100vh",
  width: "100vw",
}

const childrenDiv = {
  position: "relative",
  // width: "80%",
  borderRadius: 8,
  backgroundColor: "white",
  justifyContent: "center",
  padding: 16,
  // height: "80%",
  overflowY: "auto"
}

const Modal = (props) => {

  const { openModal,width,height } = props;

  if (!openModal) return null;

  return (
    <div style={mainDiv}>
      <div style={{...childrenDiv,width:width,height:height}}>
        {props.children}
       
      </div>
    </div>

  )
}

export default Modal;