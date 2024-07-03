import React from "react";
import Modal from "../../../components/shared/Modal";
import CButton from "../../../components/ui/Button";
import { getTotalMoneyInDayBook } from "../CompConstants";

const BillAmountModal = (props) => {

    const {
        billModal,handleCancelBillModal,valuesObj,
        handleSubmitBillModal,isFromPaymentCol = false
    } = props;
    let diffInAmount = Number(valuesObj.bill_value) - getTotalMoneyInDayBook(valuesObj);

    if(!billModal) return null;

    return  <Modal openModal={true} height={250} width={350}>
    <p style={{ fontSize: 16, fontWeight: 500, color: "#959595", marginTop: 20, textAlign: "center" }}>
        {
            isFromPaymentCol ? "Bill amount and payable amount not matching .Please check the given amount." :
            "Bill amount and payable amount not matching .Do you want to continue?"
        }
    </p>
    <p className="w-full text-start px-7 mt-4">Bill amount : <span className="text-gray-500">{valuesObj.bill_value || 0}/-</span></p>
    <p className="w-full text-start px-7">Payable amount : <span className="text-gray-500">{getTotalMoneyInDayBook(valuesObj)}/-</span></p>
    <p className="w-full text-start px-7">Difference :  <span className="text-gray-500">{diffInAmount}/-</span></p>
        <div className="flex justify-evenly w-full absolute bottom-5">
            {
                isFromPaymentCol ?
                    <CButton
                        onClick={handleCancelBillModal}
                        style={{ width: 150 }}
                    >
                        Ok
                    </CButton> :
                    <>
                        <CButton
                            onClick={handleCancelBillModal}
                            style={{ width: 72 }}
                            type="cancel"
                        >
                            Cancel
                        </CButton>
                        <CButton
                            onClick={handleSubmitBillModal}
                            style={{ width: 72 }}
                        >
                            Ok
                        </CButton>
                    </>
            }

        </div>
   

</Modal>
}

export default BillAmountModal;