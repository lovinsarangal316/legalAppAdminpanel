import React from "react";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import Panel from "../../components/Panel";
import { IoMdDownload } from "react-icons/io";

const PaymentDetails = () => {
  return (
    <Panel>
      <Row>
        <Col md={12}>
          <Card className="mt-4 mb-3">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Card.Title className="text-uppercase mb-0">Payment Info</Card.Title>
                <button className="btn btn-dark d-none">
                  <IoMdDownload size={20} />
                </button>
              </div>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between d-none">
                  <span>Transaction ID</span>
                  <span className="text-muted">TRX1234567890</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>User Name</span>
                  <span className="text-muted">Jhon</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>Email</span>
                  <span className="text-muted">payer@example.com</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>Contact Number</span>
                  <span className="text-muted">+27 123 456 7890</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>Trademark</span>
                  <span className="text-muted">Legal App</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>Amount</span>
                  <span className="text-muted">ZAR 1,500.00</span>
                </ListGroup.Item>


              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Panel>
  );
};

export default PaymentDetails;
