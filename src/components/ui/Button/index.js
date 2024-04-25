import React from "react";

const btnStyle = {
    color : "white",
    height : 30,
    width : 150,
    borderRadius : 4,
    textAlign : "center",
    backgroundColor :"#5A87B2"
}
const cancelBtnStyle = {
    color : "black",
    height : 30,
    width : 150,
    borderRadius : 4,
    border : "1px solid #121212",
    textAlign : "center",
    backgroundColor :"white"
}

const CButton = (props) => {
    
    const {onClick,isDisabled,className,type ="save",btnType = "button",...rest} = props;
    
    return <button 
        style = {type != "cancel" ? {...btnStyle,...rest.style}:{...cancelBtnStyle,...rest.style}} 
        onClick = {onClick} 
        disabled = {isDisabled}
        className= {className}
        type = {btnType}
    >
        {props.children}
    </button>
}

export default CButton;