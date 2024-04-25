import React from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";


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

   
    return (
        <div className="w-full px-5 h-[300px]">

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
                            <tr>
                                <td style={thTdStyle} key={eachDoc.seelctedDay}>{eachDoc.seelctedDay}</td>
                                <td style={thTdStyle} key={eachDoc.remAmount}>{eachDoc.remAmount}</td>
                                <td style={thTdStyle} key={eachDoc.amount}>{eachDoc.amount}</td>
                                <td style={thTdStyle} key={eachDoc.reason}>{eachDoc.reason}</td>
                                <td style={thTdStyle}>
                                    <button>
                                        <AiOutlineEdit 
                                            className="text-blue-500" 
                                            onClick = {()=>handleEditClick(index,eachDoc)} 
                                        />
                                    </button>
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
