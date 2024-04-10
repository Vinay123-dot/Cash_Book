import React from "react";
import { btnClr } from "../commonStyles";
import { Button } from "antd";
import CButton from "./Button";
import SucessIcon from "../assets/SucessIcon.png";

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
  display : 'flex',
  flexDirection : 'column',
  alignItems : "center",
  width: 565,
  borderRadius: 8,
  backgroundColor: "white",
  padding: 16,
  height: 327,
}

const Modal = (props) => {

  const { openModal,width,height,header } = props;

  if (!openModal) return null;

  return (
    <div  style={mainDiv}>
      <div style={childrenDiv}>
      <img src = {SucessIcon} style={{width:59,height:59,marginTop : 20}}/>
      <p style={{fontSize:16,fontWeight:500,color:"#959595",marginTop : 20}}> Data Saved Sucessfully</p>
      <CButton style ={{position:'absolute',bottom:10}}>
        Ok
      </CButton>
       
      </div>
    </div>

  )
}

export default Modal;