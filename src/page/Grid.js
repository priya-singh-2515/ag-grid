import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
} from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css"; 
import "ag-grid-community/styles/ag-theme-alpine.css"; 

const Grid = () => {
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

  // Each Column Definition results in one Column.
  const [columnDefs] = useState([
    { field: "make", filter: true },
    { field: "model", filter: true },
    { field: "price" ,filter: true},
  ]);

  const defaultColDef = useMemo(() => ({
    sortable: true,
  }));

  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/row-data.json")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));
  }, []);


  return (
   
      <div
        className="ag-theme-alpine"
        style={{ width: "100vh", height: "80vh" }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
          rowSelection="multiple"
        />
      </div>
  );
};

export default Grid;
