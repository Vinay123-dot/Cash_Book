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
    
    const {onClick,isDisabled,className,type ="save",btnType = "button",isLoading = false,...rest} = props;
    
    return <button 
        style = {type != "cancel" ? {...btnStyle,...rest.style,opacity:isDisabled?0.2:1}:{...cancelBtnStyle,...rest.style}} 
        onClick = {onClick} 
        disabled = {isDisabled}
        className= {className}
        type = {btnType}
    >
        {isLoading ? 'Saving...' :props.children}
    </button>
}

export default CButton;