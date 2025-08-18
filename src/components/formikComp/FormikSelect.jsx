import React from "react";
import { Field, ErrorMessage } from "formik";
import { Col } from "react-bootstrap";

const FormikSelect = ({ label, name, options, colProps = {}, ...rest }) => {
  return (
    <Col {...colProps} className="mb-3">
      <div>
        <label htmlFor={name}>{label}</label>
        <Field as="select" id={name} name={name} className="form-control" {...rest}>
          <option value="">Select {label}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Field>
        <ErrorMessage name={name} component="div" className="text-danger" />
      </div>
    </Col>
  );
};

export default FormikSelect;
