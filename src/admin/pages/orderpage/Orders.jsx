import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineDelete } from "@react-icons/all-files/ai/AiOutlineDelete";
import { getAllOrders } from "../../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
const OrderTable = () => {
  const URL = 'https://localhost:7262/api/Order'
  const data = useSelector(state => state.admin.orders.order?.data);
  const dispatch = useDispatch();
  
  useEffect(() => {
    getAllOrders(dispatch);
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
          await axios.delete(`${URL}}/${id}`,id);
          getAllOrders(dispatch);
          toast.success("Deleted Successfully ~");
      } catch (error) {
          toast.error("Delete: Error!");
      }
    }
  };
  const columns = [
    { field: "id", headerName: "ID", width: 50, editable: false },
    {
      field: "orderDate",
      headerName: "Order Date",
      width: 300,
      editable: true,
    },
    { field: "pcId", headerName: "PC ID", width: 100, editable: true },
    { field: "userId", headerName: "User ID", width: 100, editable: true },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      width: 130,
      editable: true,
    },
    { field: "statusId", headerName: "Status", width: 120, editable: true },
    {
      field: "paymentId",
      headerName: "Payment ID",
      width: 120,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => {
        const { id } = params.row;

        return (
          <>
            <button onClick={() => handleDeleteClick(id)}>
              <AiOutlineDelete />
            </button>
          </>
        );
      },
    },
  ];

  return (
    <div className="container py-5">

      <h2 className="title">
        Orders List
      </h2>

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

export default OrderTable;
