import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Pagination from "react-bootstrap/Pagination";
import Table from "react-bootstrap/Table";

import "./ItemsModal.scss";

const ItemsModal = ({
  closeModel,
  handleComponentSelect,
  selectedLocation,
}) => {
  const [components, setComponents] = useState([]);
  const [filteredComponents, setFilteredComponents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://localhost:7262/api/Component");
        const data = await response.json();
        console.log("API Response:", data); // Log the response data
        setComponents(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching components:", error);
        setLoading(false);
      }
    };

    fetchComponents();
  }, []);

  useEffect(() => {
    filterComponents(selectedComponent);
  }, [selectedComponent, selectedLocation]);

  useEffect(() => {
    setCurrentPage(1); // Reset current page when filtered components change
  }, [filteredComponents]);

  const filterComponents = (categoryName) => {
    let filtered = [...components]; // Create a new array to hold the filtered components
    if (categoryName === "CPU") {
      filtered = filtered.filter((component) => component.name.includes("CPU"));
    } else if (categoryName === "Mainboard") {
      filtered = filtered.filter((component) =>
        component.name.includes("Mainboard")
      );
    } else if (categoryName === "VGA") {
      filtered = filtered.filter((component) => component.name.includes("VGA"));
    } else if (categoryName === "PSU") {
      filtered = filtered.filter((component) => component.name.includes("PSU"));
    } else if (categoryName === "Ram") {
      filtered = filtered.filter((component) => component.name.includes("Ram"));
    } else if (categoryName === "SSD") {
      filtered = filtered.filter((component) => component.name.includes("SSD"));
    } else if (categoryName === "HDD") {
      filtered = filtered.filter((component) => component.name.includes("HDD"));
    }

    if (selectedLocation) {
      filtered = filtered.filter(
        (component) => component.location === selectedLocation
      );
    }
    setFilteredComponents(filtered);
  };

  // const handleSelectButtonClick = (componentId) => {
  //   const selectedComponent = filteredComponents.find(
  //     (c) => c.id === componentId
  //   );
  //   handleComponentSelect(selectedComponent, selectedLocation);
  //   console.log(componentId);
  // };

  const handleSelectButtonClick = (component) => {
    handleComponentSelect(component, selectedLocation);
    console.log(component);
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedComponents = filteredComponents.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  let active = currentPage;
  let items = [];
  for (
    let number = 1;
    number <= Math.ceil(filteredComponents.length / itemsPerPage);
    number++
  ) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => handlePageChange(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h1>Select</h1>
          <Button
            style={{ backgroundColor: "red", width: "45px", height: "45px" }}
            onClick={() => {
              closeModel(false);
            }}
          >
            X
          </Button>
        </div>
        <div className="modal-body">
          <div className="search">
            <input
              type="search"
              placeholder="Search here..."
              style={{
                height: "30px",
                width: "300px",
                borderRadius: "6px",
                textAlign: "center",
              }}
            />
          </div>
          <div className="pagination">
            <Pagination size="sm">{items}</Pagination>
          </div>
          {loading ? (
            <p>Loading components...</p>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Detail</th>
                  <th>Price</th>
                  <th>Select</th>
                </tr>
              </thead>
              <tbody>
                {paginatedComponents.map((component) => (
                  <tr key={component.id}>
                    <td>
                      <img src={component.image} alt={component.name} />
                      <h5>{component.name}</h5>
                    </td>
                    <td>
                      <p>{component.description}</p>
                    </td>
                    <td>
                      <p style={{ color: "red", fontWeight: "600" }}>
                        ${component.price}
                      </p>
                    </td>
                    <td>
                      <Button
                        onClick={() => handleSelectButtonClick(component)}
                      >
                        Select
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemsModal;
