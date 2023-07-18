import React, { useEffect, useSelector, useDispatch } from "react";
import "./listPC.css";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { getAllPc, editPcAPI, deletePcAPI } from "../../../redux/apiRequest";
import { AiOutlineDelete } from "@react-icons/all-files/ai/AiOutlineDelete";

const ListPC = () => {
  // const [pc, setPC] = useState([]);
  const data = useSelector((state) => state.admin.pcs.pc.data);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   setData(getAllPc(dispatch));
  //   // console.log(data);
  //   // getAllPc(dispatch);
  // }, []);

  const handleEditCellChange = (params) => {
    const { id, field, value } = params;
    data?.map((item) => (item.id === id ? { ...item, [field]: value } : item));
    // setData(updatedData);
  };
  // const handleDeleteClick = async (id) => {
  //   if (window.confirm("Are you sure you want to delete this order?")) {
  //     try {
  //       // await deletePcAPI(id); // Call the API to delete the order
  //       data.filter((item) => item.id !== id);
  //       // setPC(updatedData); // Update the data state
  //     } catch (error) {
  //       console.error("Error deleting order:", error);
  //       // Set an error state or display an error message to the user
  //     }
  //   }
  // };
  const columns = [
    { field: "id", headerName: "ID", width: 50, editable: false },
    { field: "name", headerName: "Name", width: 300, editable: true },
    { field: "image", headerName: "Image", width: 400, editable: true },
    {
      field: "templateId",
      headerName: "TemplateId",
      width: 150,
      editable: true,
    },

    { field: "price", headerName: "price", width: 150, editable: true },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        const { id } = params.row;
        const isEditing = id === editingRow;

        return (
          <>
            {/* <button>
              <AiOutlineEdit />
              <Link to={`/update/${data.id}`}><button>Edit</button></Link>
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
    // <div className="container pc-section">
    // <h2 className="title">
    //   PCs List
    //   <Link to="/newPC">
    //     <button className="btn-create">Create PC</button>
    //   </Link>
    // </h2>

    //   <div className="pc-list">
    //     {data.map((item) => (
    //       <div key={item.id} className="pc-box">
    //         <h3 className="pc-name">{item.name}</h3>
    //         <p>ID: {item.id}</p>
    //         <img className="pc-image" src={item.image}></img>
    //         <p className="pc-description">Template ID: {item.templateId}</p>
    //         <p className="pc-price">Price: ${item.price}</p>
    //         <>
    //           <button className="btn-update">Update</button>
    //           <button
    //             className="btn-delete"
    //             onClick={() => handleDeleteClick(item.id)}
    //           >
    //             Delete
    //           </button>
    //         </>
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <div className="container py-5">
      <h1 className="title">
        PCs List
        <Link to="/newPC">
          <button className="btn-create">Create PC</button>
        </Link>
      </h1>

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

export default ListPC;
