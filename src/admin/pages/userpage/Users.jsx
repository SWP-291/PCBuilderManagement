import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
// import {
//   getUserAPI,
//   editUserAPI,
//   deleteUserAPI,
// } from "../../utils/api/UserAPI";
import { AiOutlineEdit } from "@react-icons/all-files/ai/AiOutlineEdit";
import { AiOutlineDelete } from "@react-icons/all-files/ai/AiOutlineDelete";
import { getAllUsers } from "../../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
const Users = () => {
  const [editingRow, setEditingRow] = useState(null);

  const data = useSelector(state => state.admin.users.user.data);
  const dispatch = useDispatch();
  useEffect(() => {
    getAllUsers(dispatch);
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
  //         await editUserAPI(id, row); // Pass the updated data to the API
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
  //       await deleteUserAPI(id); // Call the API to delete the order
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
    { field: "fullname", headerName: "Full Name", width: 100, editable: true },
    {
      field: "email",
      headerName: "Email",
      width: 100,
      editable: true,
    },
    {
      field: "phone",
      headerName: "Phone",
      type: "number",
      width: 130,
      editable: true,
    },
    { field: "country", headerName: "Country", width: 120, editable: true },
    {
      field: "gender",
      headerName: "Gender",
      width: 120,
      editable: true,
    },
    {
      field: "password",
      headerName: "Password",
      width: 120,
      editable: true,
    },
    {
      field: "address",
      headerName: "Address",
      width: 120,
      editable: true,
    },
    {
      field: "avatar",
      headerName: "Avatar",
      width: 120,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
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
    <div>
      <h2 className="title">
        Users List
        <Link to="/newUser">
          <button className="btn-create">Create User</button>
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

export default Users;
