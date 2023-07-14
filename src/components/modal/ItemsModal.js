import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Pagination from "react-bootstrap/Pagination";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";

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
  const [loading, setLoading] = useState(false);
  const [sortingOption, setSortingOption] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://localhost:7262/api/Component");
        const responseData = await response.json();
        console.log("API Response:", responseData); // Log the response data
        setComponents(responseData.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching components:", error);
        setLoading(false);
      }
    };

    fetchComponents();
  }, []);

  const filteredComponents = components.filter((component) =>
    component.name.includes(selectedLocation)
  );

  // const handleSelectComponent = (component) => {
  //   const componentIndex = components.findIndex(
  //     (item) => item.id === component.id
  //   );
  //   const selectedComponent = filteredComponents[componentIndex];

  //   handleComponentSelect(selectedLocation, selectedComponent);
  //   toast.success("Components Updated Successfully!");
  // };

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

  return (
    <Modal show={true} onHide={closeModel} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Select</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
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
          </Col>
          <Col>
            <div className="sort">
              <DropdownButton
                title="Featured Items"
                id="bg-nested-dropdown"
                onSelect={(eventKey) => setSortingOption(eventKey)}
              >
                <Dropdown.Item eventKey="increase">
                  Increase price
                </Dropdown.Item>
                <Dropdown.Item eventKey="decrease">
                  Decrease price
                </Dropdown.Item>
              </DropdownButton>
            </div>
          </Col>
        </Row>
        <Row>
          <Pagination style={{ display: "flex", justifyContent: "flex-end" }}>
            <Pagination.Prev
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            />
            <Pagination.Item active>{currentPage}</Pagination.Item>
            <Pagination.Next
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={indexOfLastItem >= filteredComponents.length}
            />
          </Pagination>
          <Col>
            {loading ? (
              <p>Loading components...</p>
            ) : (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Summary</th>
                    <th>Price</th>
                    <th>Select</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedComponents.map((component) => (
                    <tr key={component.id}>
                      <td>
                        <img
                          src={component.image}
                          alt={component.name}
                          style={{ width: 80 }}
                        />
                        <h5>{component.name}</h5>
                      </td>
                      <td>
                        <p>{component.summary}</p>
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
                        <Button
                          onClick={() => handleSelectComponent(component)}
                        >
                          Select
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={closeModel}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ItemsModal;
