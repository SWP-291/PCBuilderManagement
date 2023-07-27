import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineEdit } from "@react-icons/all-files/ai/AiOutlineEdit";
import { AiOutlineDelete } from "@react-icons/all-files/ai/AiOutlineDelete";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
const OrderList = () => {
  const URL = "https://localhost:7262/api/Order";
  const token = localStorage.getItem("tokenUser");
  const [data, setData] = useState([]);
  useEffect(() => {
    getAllOrders();
  }, []);

  const getAllOrders = async () => {
    await axios
      .get(`${URL}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        setData(response.data.data);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };
  const handleEditCellChange = (params) => {
    const { id, field, value } = params;
    data?.map((item) => (item.id === id ? { ...item, [field]: value } : item));
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      await axios
        .delete(
          `${URL}/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
          id
        )
        .then(function (response) {
          getAllOrders();
          toast.success("Deleted Successfully ~");
        })
        .catch(function (error) {
          toast.error("Delete: Error!");
          console.log(error.message);
        });
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
      width: 150,
      renderCell: (params) => {
        const { id } = params.row;

        return (
          <>
            <Link to={`/editOrder/${id}`}>
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
    <div className="layout">
      <h1 className="title">Orders List</h1>
      <div className="Createbtn">
        <Link to="/addOrder/">
          <button className="btn-create">Create Order</button>
        </Link>
      </div>

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

export default OrderList;
