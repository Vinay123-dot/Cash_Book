import React from "react";


const mainDiv = {
  display: "flex",
  position: "fixed",
  backgroundColor: "rgba(52, 52, 52, 0.6)",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 10,
  top: 0,
  left: 0,
  height: "100vh",
  width: "100vw",
}

const childrenDiv = {
  position: "relative",
  display : 'flex',
  flexDirection : 'column',
  // alignItems : "center",
  // width: 565,
  borderRadius: 8,
  backgroundColor: "white",
  // padding: 16,
  // height: 327,
}

const Modal = (props) => {

  const { openModal,width = 565,height = 327,children,jc = null,ai = "center" ,bStyle = "none"} = props;

  if (!openModal) return null;

  return (
    <div  style={mainDiv}>
      <div style={{...childrenDiv,
        width:width,height:height,justifyContent:jc,alignItems : ai,
        borderStyle:bStyle,borderWidth:1.5,borderColor:"#5A87B2"}}
      >
      {children}
      </div>
    </div>

  )
}

export default Modal;

// Modal.propTypes = {
//   openModal : PropTypes.bool,
//   width : PropTypes.number,
//   height : PropTypes.number,
//   children : PropTypes.node,
//   jc : PropTypes.d,
//   ai "center" ,bStyle = "none"
// };

// Modal.defaultProps = {
//   width : 565,
//   height : 327,
//   jc : null,
//   ai : "center",
//   bStyle : "none"
// };