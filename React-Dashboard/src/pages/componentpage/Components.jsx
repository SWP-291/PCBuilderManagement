import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import DashboardHeader from "../../components/DashboardHeader/Header";
import { Link } from "react-router-dom";
import {
  getComponentAPI,
  editComponentAPI,
  deleteComponentAPI,
} from "../../utils/api/ComponentAPI";
import { AiOutlineEdit } from "@react-icons/all-files/ai/AiOutlineEdit";
import { AiOutlineDelete } from "@react-icons/all-files/ai/AiOutlineDelete";

const Categories = () => {
  const [data, setData] = useState([]);
  const [editingRow, setEditingRow] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getComponentAPI();
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
          await editComponentAPI(id, row); // Pass the updated data to the API
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
        await deleteComponentAPI(id); // Call the API to delete the order
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
      field: "name",
      headerName: "Name",
      width: 150,
      editable: true,
    },
    { field: "image", headerName: "Image", width: 150, editable: true },
    { field: "price", headerName: "Price", width: 150, editable: true },

    {
      field: "description",
      headerName: "Description",
      width: 150,
      editable: true,
    },
    {
      field: "brandId",
      headerName: "Brand ID",
      width: 120,
      editable: true,
    },
    {
      field: "categoryId",
      headerName: "Category ID",
      width: 120,
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
      <Link to="/newComponent">
        <DashboardHeader btnText="New Component" />
      </Link>

      <Box sx={{ height: "60%", width: "100%", marginTop: "30px" }}>
        <div
          className="dashboard-content"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              color: "#009393",
              fontSize: "xx-large",
              fontWeight: "700",
            }}
          >
            Components List
          </h2>
        </div>
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

export default Categories;
