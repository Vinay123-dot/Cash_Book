import React from "react";


const mainDiv = {
  display: "flex",
  position: "fixed",
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

  const { openModal,width,height,header,children } = props;

  if (!openModal) return null;

  return (
    <div  style={mainDiv}>
      <div style={childrenDiv}>
      {children}
      </div>
    </div>

  )
}

export default Modal;