import React from "react";
import Modal from "../../shared/Modal";
import CButton from "../Button";

const ErrorModal = ({handleCloseEModal,msg = "",jc = null,ai = "center"}) => {
    return  <Modal openModal= {true} height = {250} width={350} jc = {jc} ai = {ai}>
    {/* <img src={SucessIcon} style={{ width: 59, height: 59, marginTop: 20 }} /> */}
    <p style={{ fontSize: 16, fontWeight: 500, color: "#959595", marginTop: 20,textAlign :"center" }}> 
        {msg}</p>
    <CButton 
        onClick={handleCloseEModal}
        style={{ position: 'absolute', bottom: 20 }}
    >
        Ok
    </CButton>

</Modal>
};

export default ErrorModal;