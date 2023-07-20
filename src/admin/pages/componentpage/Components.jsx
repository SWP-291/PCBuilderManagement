import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
// import "./newComponent.css";
import { AiOutlineEdit } from "@react-icons/all-files/ai/AiOutlineEdit";
import { AiOutlineDelete } from "@react-icons/all-files/ai/AiOutlineDelete";
import { useDispatch, useSelector } from "react-redux";
import { getAllComponents } from "../../../redux/apiRequest";
import { toast } from "react-toastify";
import axios from "axios";
const Components = () => {
  const URL = "https://localhost:7262/api/Component";
  const data = useSelector((state) => state.admin.components.component.data);
  const dispatch = useDispatch();
  useEffect(() => {
    getAllComponents(dispatch);
  }, []);

  const handleEditCellChange = (params) => {
    const { id, field, value } = params;
    data?.map((item) => (item.id === id ? { ...item, [field]: value } : item));
  };
  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this component?")) {
      try {
        await axios.delete(`${URL}/${id}`, id);
        getAllComponents(dispatch);
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
      width: 200,
      editable: true,
    },
    { field: "image", headerName: "Image", width: 250, editable: true },
    { field: "price", headerName: "Price", width: 100, editable: true },

    {
      field: "description",
      headerName: "Description",
      width: 250,
      editable: true,
    },
    {
      field: "brandId",
      headerName: "Brand ID",
      width: 90,
      editable: true,
    },
    {
      field: "categoryId",
      headerName: "Category ID",
      width: 90,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        const { id } = params.row;

        return (
          <>
            <Link to={`/editComponent/${id}`}>
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
    <div className="container py-5 component">
      <h2 className="title">Components List</h2>
      <Link to="/addComponent/">
        <button className="btn-create">Create Component</button>
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

export default Components;
