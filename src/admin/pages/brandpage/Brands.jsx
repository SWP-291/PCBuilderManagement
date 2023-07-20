import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "@react-icons/all-files/ai/AiOutlineEdit";
import { AiOutlineDelete } from "@react-icons/all-files/ai/AiOutlineDelete";
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import { getAllBrand } from "../../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
const OrderTable = () => {
  const [editingRow, setEditingRow] = useState(null);
  const data = useSelector((state) => state.admin.brands.brand.data);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllBrand(dispatch);
  }, []);

  const handleEditCellChange = (params) => {
    const { id, field, value } = params;
    data?.map((item) => (item.id === id ? { ...item, [field]: value } : item));
  };
  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await axios.delete(`https://localhost:7262/api/Brand/${id}`, id);
        getAllBrands(dispatch);
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
      width: 150,
      editable: true,
    },
    { field: "logo", headerName: "Logo", width: 400, editable: true },
    { field: "origin", headerName: "Origin", width: 300, editable: true },

    {
      field: "status",
      headerName: "Status",
      width: 100,
      type: Boolean,
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
            <Link to={`/editBrand/${id}`}>
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
    <div className="container py-5">
      <h2 className="title">Brands List</h2>
      <Link to="/addBrand/">
        <button className="btn-create">Create Brand</button>
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

export default OrderTable;
