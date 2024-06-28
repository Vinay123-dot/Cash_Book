import React from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { DaysArr } from "../../../Constants";

const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%',
};

const thTdStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'center',
};
const CTable = (props) => {
    const { columns, data,handleEditClick,handleDeleteClick } = props;

    const getSelectedDay = (selectedVal) => {
       let res = DaysArr.find((eachDoc)=> eachDoc.Id === selectedVal);
       return res?.Type;
    }
   
    return (
        <div className = "w-full px-5 min-h-[80px] h-full">

            <table style={tableStyle}>
                <thead>
                    <tr>
                        {
                            columns.map((eachDoc) => (
                                <td style={{ ...thTdStyle, backgroundColor: "rgb(219 234 254)" }} key={eachDoc.id}>{eachDoc.name}</td>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        (data || []).map((eachDoc,index) => (
                            <tr key = {index}>
                                <td style={thTdStyle} key={eachDoc.date}>{eachDoc.date}</td>
                                <td style={thTdStyle} key={eachDoc.balance}>{eachDoc.amount}</td>
                                <td style={thTdStyle} key={eachDoc.amount}>{eachDoc.balance}</td>
                                <td style={thTdStyle} key={eachDoc.petty_cash_details}>{eachDoc.petty_cash_details}</td>
                                <td style={thTdStyle}>
                                    {/* <button>
                                        <AiOutlineEdit 
                                            className="text-blue-500" 
                                            onClick = {()=>handleEditClick(index,eachDoc)} 
                                        />
                                    </button> */}
                                    <button>
                                        <AiOutlineDelete 
                                            className="text-red-500"
                                            onClick = {()=>handleDeleteClick(index)} 
                                        />
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>

    )
};

export default CTable;
