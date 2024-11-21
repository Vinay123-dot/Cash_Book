import React from "react";
import { useSelector } from "react-redux";
import Modal from "components/shared/Modal";


const MainFile = () => {

    const manageRequestModal = useSelector(state => state);

    console.log("mm",manageRequestModal);
    return (
        <Modal openModal={manageRequestModal} height={"90%"} width={"90%"}  ai = {null}>
            <div>Modal</div>
        </Modal>
    )
};

export default MainFile;