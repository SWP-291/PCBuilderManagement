import React from "react";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Pagination from "react-bootstrap/Pagination";
import Table from "react-bootstrap/Table";

import "./ItemsModal.scss";
const ItemsModal = ({ closeModel }) => {
  let active = 1;
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }
  return (
    <Row className="ItemsModal">
      <div className="modelContainer">
        <Col className="closebtn">
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
              borderRadius: "8px",
              textAlign: "center",
            }}
          />
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
              <tr>
                <td>
                  <img src="" alt="" />
                  <h5>AMD Ryzn 9 5900X Destop Processor</h5>
                </td>
                <td>
                  <p>
                    mot hai ba bon nam sau bay tam chin muoi mot hai ba bon nam
                    sau bay tam chin muoi
                  </p>
                </td>
                <td>
                  <p style={{ color: "red", fontWeight: "600" }}>$123456789</p>
                </td>
                <td>
                  <Button>Select</Button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>3</td>
                <td colSpan={2}>Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </div>
    </Row>
  );
};
export default ItemsModal;
