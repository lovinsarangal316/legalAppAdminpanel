import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return <div className="d-flex justify-content-center align-items-center vh-100">
    <div>
      <Spinner animation="grow" variant="dark" className="me-2" />
      <Spinner animation="grow" variant="dark" className="me-2" />
      <Spinner animation="grow" variant="dark" />
    </div>
  </div>;
};

export default Loader;
