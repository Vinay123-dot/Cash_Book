// Table.js
import React from 'react';
import './table.css';

const Table = (props) => {
  const {columns,dataSource} = props;
  return (
    <div className="table-container">
      <table className="responsive-table">
        <thead>
          <tr>
            {
              columns.map((eachCol,index)=><td className ="headerTxt">{eachCol.title}</td>)
            }
          </tr>
        </thead>
        <tbody>
          <tr>
            {
              dataSource.map((eachData) => <td>{eachData.name}</td>)
            }
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
