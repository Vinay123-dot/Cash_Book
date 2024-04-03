import React, { useState } from "react";
import { Button, Select } from "antd";
import { btnClr } from "../commonStyles";
import DayBookModal from "./DayBookModal";
import AdvanceBookModal from "./AdvanceBookModal";
import { HeaderSelectOptions } from "../Constants";
import { horizontalLine } from "../commonStyles";
import BankDepositModal from "./BankDepositModal";
import PettyCashModal from "./PettyCashModal";
import Modal from "../Components/Modal";
import { AiFillCloseCircle } from "react-icons/ai";

const mainDiv = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20
};

const Header = () => {

    const [showModal, setShowModal] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);


    const handleClick = () => setShowModal(!showModal);
    const handleChange = (value) => setSelectedValue(value);
    const handleCloseModal = () => setShowModal(false);

    return <div style = {mainDiv}>
        <h1>Cash Book</h1>
        <div>
            <h3 style={{ color: "#5A87B2" }}>Opening Balance</h3>
            <p>100,000,0</p>
        </div>
        <Button
            style={btnClr}
            onClick={handleClick}
        >
            Add Book
        </Button>
        
        <Modal openModal={showModal} width={'100%'} height={"100%"}>
            <div style={{ display: "flex", justifyContent: "space-between",alignItems:'center' }}>
                <div>
                    <Select
                        showSearch
                        style={{ width: 200, marginBottom: 10 }}
                        placeholder="Search to Select"
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        onChange={handleChange}
                        options={HeaderSelectOptions}

                    />

                </div>

                <div style={{ display: "flex" }}>
                    <div>
                        <h3 style={{ color: "#5A87B2" }}>Opening Balance</h3>
                        <p>100,000,0</p>
                    </div>

                    <AiFillCloseCircle
                        style={{ width: 24, height: 24,marginLeft:10 }}
                        onClick={handleCloseModal}
                    />
                </div>

            </div>



            <hr style={horizontalLine} />
            {selectedValue === 1 && <DayBookModal />}
            {selectedValue === 2 && <AdvanceBookModal />}
            {selectedValue === 3 && <PettyCashModal />}
            {selectedValue === 4 && <BankDepositModal />}

        </Modal>


    </div>
}

export default Header;