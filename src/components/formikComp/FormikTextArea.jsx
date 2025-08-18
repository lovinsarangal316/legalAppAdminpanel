import React from "react";
import { Field, ErrorMessage } from "formik";
import { Col } from "react-bootstrap";

const FormikTextArea = ({ label, name, colProps = {}, ...rest }) => (
  <Col {...colProps} className="mb-3">
    <div>
      <label htmlFor={name}>{label}</label>
      <Field
        as="textarea"
        id={name}
        name={name}
        {...rest}
        className="form-control"
      />
      <ErrorMessage name={name} component="div" className="text-danger" />
    </div>
  </Col>
);

export default FormikTextArea;
