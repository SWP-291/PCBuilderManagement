import React, { useEffect, useState } from "react";
import "./listPC.scss";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "@react-icons/all-files/ai/AiOutlineEdit";
import { AiOutlineDelete } from "@react-icons/all-files/ai/AiOutlineDelete";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getAllPc } from "../../../redux/apiRequest";
import axios from "axios";

const ListPC = () => {
  const data = useSelector(state => state.admin.pcs.pc?.data);
  const dispatch = useDispatch();
  
  useEffect(() => {
    getAllPc(dispatch);
  }, []);

  const handleEditCellChange = (params) => {
    const { id, field, value } = params;
    data?.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
  }; 
  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
          await axios.delete(`https://localhost:7262/api/PC/${id}`,id);
          getAllPc(dispatch);
          toast.success("Deleted Successfully ~");
      } catch (error) {
          toast.error("Delete: Error!");
      }
    }
  };
  const columns = [
    { field: "id", headerName: "ID", width: 50, editable: false },
    { field: "name", headerName: "Name", width: 250, editable: true,},
    { field: "image", headerName: "Image", width: 400, editable: true },
    { field: "templateId", headerName: "TemplateId", width: 150, editable: true },

    { field: "price", headerName: "price", width: 150, editable: true, },
    { field: "actions", headerName: "Actions", width: 150,
      renderCell: (params) => {
        const { id } = params.row;

        return (
          <>
            <Link to={`/editPc/${id}`}>
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
    <div className="container py-5">
      <h1 className="title"> PCs List </h1>
      <div className="btn">
        <Link to="/addPc/">
            <button className="btn-create">Create PC</button>
        </Link>
      </div>
      

      <Box sx={{ height: "60%", width: "95%", marginTop: "30px" }}>
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

export default ListPC;

