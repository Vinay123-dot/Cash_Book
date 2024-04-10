// Table.js
import React, { useState } from 'react';
import './table.css';
import Pagination from '../../components1/ui/Pagination/Pagination';

const listStyle = {
  width: 20,
  height: 20,
  textAlign: "center",
  color: "black",
  // backgroundColor : "grey"
}

const Table = (props) => {
  const { columns, dataSource, itemsPerPage = 10 } = props;
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <div style={{ position: "relative",display:"flex",flexDirection:"column" }}>
      <div className="table-container">
        <table className="responsive-table">
          <thead>
            <tr>
              {
                columns.map((eachCol, index) => <td className="headerTxt">{eachCol.title}</td>)
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
      <div className="flex flex-row items-center justify-end ">
        <Pagination
          // pageSize={pageSize}
          // currentPage={pageIndex}
          // total={total}
          pageSize={10}
          currentPage={2}
          total={100}
          // onChange={handlePaginationChange}
        />
      </div>
      {/* <ul style ={{display:"flex",fledDirection:"row-reverse",position:"absolute",right:10}}>
      <li style={listStyle}>1</li>
      <li style={listStyle}>2</li>
      <li style={listStyle}>3</li>
      <li style={listStyle}>4</li>
      <li style={listStyle}>5</li>
      <li style={listStyle}>6</li>
      <li style={listStyle}>7</li>
      <li style={listStyle}>8</li>
      <li style={listStyle}>9</li>
      <li style={listStyle}>10</li>
    </ul > */}
    </div>

  );
};

export default Table;

// import React, { useState } from 'react';

// const TableWithPagination = ({ data, itemsPerPage }) => {
//   const [currentPage, setCurrentPage] = useState(0);

//   // const totalPages = Math.ceil(data.length / itemsPerPage);
//   const totalPages = Math.ceil(105 / 10);

//   const handleClick = (page) => {
//     setCurrentPage(page);
//   };

//   const renderTableData = () => {
//     const start = currentPage * itemsPerPage;
//     const end = start + itemsPerPage;
//     return (data || []).slice(start, end).map((item, index) => (
//       <tr key={index}>
//         <td>{item.column1}</td>
//         <td>{item.column2}</td>
//         {/* Add more columns as needed */}
//       </tr>
//     ));
//   };

//   const renderPagination = () => {
//     const pages = [];
//     for (let i = 0; i < totalPages; i++) {
//       pages.push(
//         <button key={i} onClick={() => handleClick(i)}>
//           {i + 1}
//         </button>
//       );
//     }
//     return pages;
//   };

//   return (
//     <div>
//       <table>
//         <thead>
//           <tr>
//             <th>Column 1</th>
//             <th>Column 2</th>
//             {/* Add more table headers if needed */}
//           </tr>
//         </thead>
//         <tbody>{renderTableData()}</tbody>
//       </table>
//       <div>
//         {renderPagination()}
//       </div>
//     </div>
//   );
// };

// export default TableWithPagination;

