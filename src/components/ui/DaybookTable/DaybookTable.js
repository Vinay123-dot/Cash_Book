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

const daybookColumns = [
    { id : "sl_no", name : "Sl No"},
    { id: "Date", name: "Bill Date" },
    { id : "party_code", name : "Party Code"},
    { id : "party_name", name : "Party Name"},
    { id: "Bill_No", name: "Bill Number" },
    { id: "Customer_Type", name: "Customer Type" },
    { id: "Bill_Value", name: "Bill Amount" },
    { id: "action", name: "Action" },
];


const CTable = (props) => {
    const { columns, data,handleEditClick,handleDeleteClick } = props;

    const getSelectedDay = (selectedVal) => {
       let res = DaysArr.find((eachDoc)=> eachDoc.Id === selectedVal);
       return res?.Type;
    }
   
    return (
        <div className = "w-full p-5 min-h-[80px]">

            <table style={tableStyle}>
                <thead>
                    <tr>
                        {
                            daybookColumns.map((eachDoc) => (
                                <td style={{ ...thTdStyle, backgroundColor: "rgb(219 234 254)" }} key={eachDoc.id}>{eachDoc.name}</td>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        (data || []).map((eachDoc,index) => {
                            return(
                                <tr key = {index}>
                                    <td style={thTdStyle} key={eachDoc.sl_no}>{index+1}</td>
                                    <td style={thTdStyle} key={eachDoc.Date}>{eachDoc.Date}</td>
                                    <td style={thTdStyle} key={eachDoc.Party_Code}>{eachDoc.Party_Code}</td>
                                    <td style={thTdStyle} key={eachDoc.Party_Name}>{eachDoc.Party_Name}</td>
                                    <td style={thTdStyle} key={eachDoc.Bill_No}>{eachDoc.Bill_No}</td>
                                    <td style={thTdStyle} key={eachDoc.CustomerType}>{eachDoc.CustomerType}</td>
                                    <td style={thTdStyle} key={eachDoc.Bill_Value}>{eachDoc.Bill_Value}</td>
                                    <td style={thTdStyle}>
                                        <button>
                                            <AiOutlineEdit 
                                                className="text-blue-500" 
                                                onClick = {()=>handleEditClick(index,eachDoc)} 
                                            />
                                        </button>
                                    </td>
                                </tr>
                            )})

                        
                           
                    }
                </tbody>
            </table>
        </div>

    )
};

export default CTable;
