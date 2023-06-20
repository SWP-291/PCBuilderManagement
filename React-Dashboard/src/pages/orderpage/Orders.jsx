import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import DashboardHeader from "../../components/DashboardHeader/Header";
import { Link } from "react-router-dom";
import {
  getOrderAPI,
  editOrderAPI,
  deleteOrderAPI,
} from "../../utils/api/OrderAPI";
import { AiOutlineEdit } from "@react-icons/all-files/ai/AiOutlineEdit";
import { AiOutlineDelete } from "@react-icons/all-files/ai/AiOutlineDelete";

const OrderTable = () => {
  const [data, setData] = useState([]);
  const [editingRow, setEditingRow] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getOrderAPI();
      setData(response.data);
    } catch (error) {
      console.error("Error fetching order data:", error);
      // Set an error state or display an error message to the user
    }
  };

  const handleEditCellChange = (params) => {
    const { id, field, value } = params;
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setData(updatedData);
  };

  const handleUpdateClick = async (id) => {
    const row = data.find((item) => item.id === id);

    if (row) {
      if (window.confirm("Are you sure you want to update this order?")) {
        try {
          await editOrderAPI(id, row); // Pass the updated data to the API
          await fetchData(); // Fetch the updated data
        } catch (error) {
          console.error("Error updating order data:", error);
          // Set an error state or display an error message to the user
        }
      }
    }
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await deleteOrderAPI(id); // Call the API to delete the order
        const updatedData = data.filter((item) => item.id !== id);
        setData(updatedData); // Update the data state
      } catch (error) {
        console.error("Error deleting order:", error);
        // Set an error state or display an error message to the user
      }
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90, editable: false },
    {
      field: "orderDate",
      headerName: "Order Date",
      width: 150,
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
        const isEditing = id === editingRow;

        return (
          <>
            <button onClick={() => handleUpdateClick(id)}>
              <AiOutlineEdit />
            </button>
            <button onClick={() => handleDeleteClick(id)}>
              <AiOutlineDelete />
            </button>
          </>
        );
      },
    },
  ];

  return (
    <div>
      <DashboardHeader btnText="New Order" />

      <h2 className="title">
        Orders List
        <Link to="/newOrder">
          <button className="btn-create">Create Order</button>
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
          editMode="cell"
          onEditCellChange={handleEditCellChange}
          disableSelectionOnClick
          pageSize={8}
        />
      </Box>
    </div>
  );
};

export default OrderTable;
