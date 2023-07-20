import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "@react-icons/all-files/ai/AiOutlineEdit";
import { AiOutlineDelete } from "@react-icons/all-files/ai/AiOutlineDelete";
import { getAllCategory } from "../../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
const Component = () => {
  const URL = "https://localhost:7262/api/Category";
  const data = useSelector((state) => state.admin.categories.category.data);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllCategory(dispatch);
  }, []);

  const handleEditCellChange = (params) => {
    const { id, field, value } = params;
    data?.map((item) => (item.id === id ? { ...item, [field]: value } : item));
  };
  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`${URL}/${id}`, id);
        getAllCategories(dispatch);
        toast.success("Deleted Successfully ~");
      } catch (error) {
        toast.error("Delete: Error!");
      }
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 50, editable: false },
    {
      field: "name",
      headerName: "Name",
      width: 300,
      editable: true,
    },
    { field: "parentId", headerName: "Parent ID", width: 150, editable: true },
    { field: "brandId", headerName: "Brand ID", width: 150, editable: true },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        const { id } = params.row;

        return (
          <>
            <Link to={`/editCategory/${id}`}>
              <button>
                <AiOutlineEdit /> Edit
              </button>
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
    <div className="container py-5 category">
      <h2 className="title">Categories List</h2>
      <Link to="/addCategory/">
        <button className="btn-create">Create Category</button>
      </Link>

      <Box sx={{ height: "60%", width: "98%", marginTop: "30px" }}>
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

export default Component;
