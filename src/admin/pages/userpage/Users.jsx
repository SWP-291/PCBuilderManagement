import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "@react-icons/all-files/ai/AiOutlineEdit";
import { AiOutlineDelete } from "@react-icons/all-files/ai/AiOutlineDelete";
import { getAllUsers } from "../../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
const Users = () => {
  const URL = 'https://localhost:7262/api/User';
  const data = useSelector(state => state.admin.users.user?.data);
  const dispatch = useDispatch();
  
  useEffect(() => {
    getAllUsers(dispatch);
  }, []);

  const handleEditCellChange = (params) => {
    const { id, field, value } = params;
    data?.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
  }; 
  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
          await axios.delete(`${URL}/${id}`,id);
          getAllUsers(dispatch);
          toast.success("Deleted Successfully ~");
      } catch (error) {
          toast.error("Delete: Error!");
      }
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 50, editable: false },
    { field: "fullname", headerName: "Full Name", width: 150, editable: true },
    { field: "email", headerName: "Email", width: 210, editable: true },
    { field: "phone", headerName: "Phone", type: "number", width: 100, editable: true },
    { field: "country", headerName: "Country", width: 80, editable: true },
    { field: "gender", headerName: "Gender", width: 60, editable: true },
    { field: "password", headerName: "Password", width: 80, editable: true },
    { field: "address", headerName: "Address", width: 180, editable: true },
    { field: "avatar", headerName: "Avatar", width: 120, editable: true },
    { field: "actions", headerName: "Actions", width: 150,
      renderCell: (params) => {
        const { id } = params.row;

        return (
          <>
            <Link to={`/editUser/${id}`}>
            <button><AiOutlineEdit /> Edit</button>
            </Link>
            <button onClick={() => handleDeleteClick(id)}>
              <AiOutlineDelete /> Delete
            </button>
          </>
        );
      },
    },
  ];

  return (
    <div className="container py-5 newUser">
      <h2 className="title">
        Users List
      </h2>
      <Link to="/addUser/">
        <button className="btn-create">Create User</button>
      </Link>
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
                pageSize: 10,
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
