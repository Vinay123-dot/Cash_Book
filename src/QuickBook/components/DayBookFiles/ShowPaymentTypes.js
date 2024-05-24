import React from "react";
import { FaRupeeSign } from "react-icons/fa";
import { getTotalMoneyInDayBook } from "../CompConstants";
import ParagraphTag from "../../../constants/PTag";

const ShowPaymentTypes = (props) => {
    const { paymentValues } = props;

    return <>
        <hr style={{ border: "5px solid #F4F6F9" }} />
        <ParagraphTag label="Summary" />
        <div className="flex flex-col px-4 py-2">
            <p>Total Bill Amount</p>
            <div className="flex items-center">
                <FaRupeeSign style={{ fontSize: 16, marginRight: 2 }} />
                <p>{paymentValues.bill_value || 0}</p>
            </div>
        </div>
        <div className="grid grid-cols-1  px-4 py-2 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col">
                <p>Payment Type</p>
                {
                    paymentValues.cash_amount && <p> Cash - {paymentValues.cash_amount}</p>
                }
                {
                    paymentValues.online_bank_amount && <p> Bank - {paymentValues.online_bank_amount}</p>
                }

                {
                    paymentValues.upi_amount && <p> Upi - {paymentValues.upi_amount}</p>
                }
                {
                    paymentValues.bank_cheque_amount && <p> Cheque - {paymentValues.bank_cheque_amount}</p>
                }
                {
                    paymentValues.credit_card_amount && <p> Credit Card - {paymentValues.credit_card_amount}</p>
                }
                {
                    paymentValues.debit_card_amount && <p> Debit Card - {paymentValues.debit_card_amount}</p>
                }

            </div>
            <div>
                <p>Advance Used Amount</p>
                {/* <p>{paymentValues.used_receipt_amount}</p> */}
                {<p>{paymentValues.advance_receipt_amount}</p>}
            </div>
            <div>
                <p> Pending Amount</p>
                <p>{Number(paymentValues.bill_value) - getTotalMoneyInDayBook(paymentValues)}</p>
            </div>
        </div>
    </>



}

export default ShowPaymentTypes;