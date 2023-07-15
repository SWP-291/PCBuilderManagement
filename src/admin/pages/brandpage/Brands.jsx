import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
// import {
//   getBrandAPI,
//   editBrandAPI,
//   deleteBrandAPI,
// } from "../../utils/api/BrandAPI";
import { AiOutlineEdit } from "@react-icons/all-files/ai/AiOutlineEdit";
import { AiOutlineDelete } from "@react-icons/all-files/ai/AiOutlineDelete";
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import { getAllBrand } from "../../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
const OrderTable = () => {
  const [editingRow, setEditingRow] = useState(null);
  const data = useSelector(state => state.admin.catergories.catergory.data);
  const dispatch = useDispatch();
  useEffect(() => {
    getAllBrand(dispatch);
  }, []);

  const handleEditCellChange = (params) => {
    const { id, field, value } = params;
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    // setData(updatedData);
  };

  // const handleUpdateClick = async (id) => {
  //   const row = data.find((item) => item.id === id);

  //   if (row) {
  //     if (window.confirm("Are you sure you want to update this order?")) {
  //       try {
  //         await editBrandAPI(id, row); // Pass the updated data to the API
  //         await fetchData(); // Fetch the updated data
  //       } catch (error) {
  //         console.error("Error updating order data:", error);
  //         // Set an error state or display an error message to the user
  //       }
  //     }
  //   }
  // };

  // const handleDeleteClick = async (id) => {
  //   if (window.confirm("Are you sure you want to delete this order?")) {
  //     try {
  //       await deleteBrandAPI(id); // Call the API to delete the order
  //       const updatedData = data.filter((item) => item.id !== id);
  //       setData(updatedData); // Update the data state
  //     } catch (error) {
  //       console.error("Error deleting order:", error);
  //       // Set an error state or display an error message to the user
  //     }
  //   }
  // };

  const columns = [
    { field: "id", headerName: "ID", width: 90, editable: false },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: true,
    },
    { field: "logo", headerName: "Logo", width: 150, editable: true },
    { field: "origin", headerName: "Origin", width: 150, editable: true },

    {
      field: "status",
      headerName: "Status",
      width: 150,
      type: Boolean,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        const { id } = params.row;
        const isEditing = id === editingRow;

        return (
          <>
            {/* <button onClick={() => handleUpdateClick(id)}>
              <AiOutlineEdit />
            </button>
            <button onClick={() => handleDeleteClick(id)}>
              <AiOutlineDelete />
            </button> */}

            <button>
              <AiOutlineEdit />
            </button>
            <button>
              <AiOutlineDelete />
            </button>
          </>
        );
      },
    },
  ];

  return (
    <div className="container">
      <h2 className="title">
        Brands List
        <Link to="/newBrand">
          <button className="btn-create">Create Brand</button>
        </Link>
      </h2>

      <Box sx={{ height: "60%", width: "100%", marginTop: "30px" }}>
        <div
          className="dashboard-content"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></div>
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 8,
              },
            },
          }}
          pageSizeOptions={[6]}
          checkboxSelection
          disableRowSelectionOnClick
          editMode="cell"
          onEditCellChange={handleEditCellChange}
        />
      </Box>
    </div>
  );
};

export default OrderTable;
