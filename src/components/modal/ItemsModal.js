import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Pagination from "react-bootstrap/Pagination";
import Table from "react-bootstrap/Table";

import "./ItemsModal.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ItemsModal = ({
  closeModel,
  handleComponentSelect,
  selectedComponents,
  selectedLocation,
  componentType,
  component,
}) => {
  const [components, setComponents] = useState([]);
  const [filteredComponents, setFilteredComponents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState([]);

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
  }, [selectedComponent]);

  useEffect(() => {
    setCurrentPage(1); // Reset current page when filtered components change
  }, [filteredComponents]);

  const filterComponents = (component) => {
    if (component === "CPU") {
      setFilteredComponents(components.filter((c) => c.name.includes("CPU")));
    } else if (component === "Ram") {
      setFilteredComponents(components.filter((c) => c.name.includes("Ram")));
    } else if (component === "Mainboard") {
      setFilteredComponents(
        components.filter((c) => c.name.includes("Mainboard"))
      );
    } else if (component === "VGA") {
      setFilteredComponents(components.filter((c) => c.name.includes("VGA")));
    } else if (component === "PSU") {
      setFilteredComponents(components.filter((c) => c.name.includes("PSU")));
    } else if (component === "SSD") {
      setFilteredComponents(components.filter((c) => c.name.includes("SSD")));
    } else if (component === "HDD") {
      setFilteredComponents(components.filter((c) => c.name.includes("HDD")));
    } // else {
    //   setFilteredComponents(components); // Reset to all components
    // }
  };

  useEffect(() => {
    filterComponents(selectedComponent);
  }, [selectedComponent]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSelectComponent = (component) => {
    handleComponentSelect(selectedLocation, component);
    toast.success("Components Updated Successfully!");
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
    <Row className="ItemsModal">
      <div className="modelContainer">
        <Col className="closebtn d-flex justify-content-between align-items-center">
          <h1>Select</h1>
          <Button
            style={{ backgroundColor: "red", width: "45px", height: "45px" }}
            onClick={() => {
              closeModel(false);
            }}
          >
            X
          </Button>
        </Col>
        <Col className="title">
          <input
            type="search"
            placeholder="Do you want to find items?"
            style={{
              height: "40px",
              width: "300px",
              borderRadius: "6px",
              textAlign: "center",
            }}
          />
          <div className="sort">
            <DropdownButton
              title={selectedComponent || "Select Component"}
              onSelect={(eventKey) => setSelectedComponent(eventKey)}
            >
              <Dropdown.Item eventKey="CPU">CPU</Dropdown.Item>
              <Dropdown.Item eventKey="Ram">Ram</Dropdown.Item>
              <Dropdown.Item eventKey="Mainboard">Mainboard</Dropdown.Item>
              <Dropdown.Item eventKey="VGA">VGA</Dropdown.Item>
              <Dropdown.Item eventKey="PSU">PSU</Dropdown.Item>
              <Dropdown.Item eventKey="SSD">SSD</Dropdown.Item>
              <Dropdown.Item eventKey="HDD">HDD</Dropdown.Item>
            </DropdownButton>
          </div>
          <div className="sort">
            <h5>Sort by: </h5>
            <DropdownButton title="Featured Items" id="bg-nested-dropdown">
              <Dropdown.Item eventKey="1">Increase price</Dropdown.Item>
              <Dropdown.Item eventKey="2">Decrease price</Dropdown.Item>
            </DropdownButton>
          </div>
          <div className="paging">
            <Pagination size="sm">{items}</Pagination>
          </div>
        </Col>
        <Col className="body">
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
                      <span className="d-price fw-bold">
                        {component.price &&
                        typeof component.price === "number" ? (
                          <p>
                            {component.price.toLocaleString("vi-VN", {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })}
                          </p>
                        ) : (
                          <p>Price not available</p>
                        )}
                      </span>
                    </td>
                    <td>
                      <Button onClick={() => handleSelectComponent(component)}>
                        Select
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </div>
    </Row>
  );
};
export default ItemsModal;
