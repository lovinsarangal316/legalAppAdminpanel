// import React from "react";
// import { Field, ErrorMessage } from "formik";
// import { Col } from "react-bootstrap";

// const FormikInput = ({ label, name, type = "text", colProps = {}, ...rest }) => (
//   <Col {...colProps} className="mb-3">
//     <div>
//       <label htmlFor={name}>{label}</label>
//       <Field id={name} name={name} type={type} {...rest} className="form-control" />
//       <ErrorMessage name={name} component="div" className="text-danger" />
//     </div>
//   </Col>
// );

// export default FormikInput;

import React from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import { Col } from "react-bootstrap";

const FormikInput = ({ label, name, type = "text", colProps = {}, ...rest }) => {
  const { setFieldValue } = useFormikContext();

  const handleChange = (e) => {
    // /Remove Trim on 21-0302025/ 
    const trimmedValue = e.target.value.trimStart();
    setFieldValue(name, trimmedValue);
  };

  return (
    <Col {...colProps} className="mb-3">
      <div>
        <label htmlFor={name}>{label}</label>
        <Field
          id={name}
          name={name}
          type={type}
          {...rest}
          className="form-control"
          onChange={handleChange}
        />
        <ErrorMessage name={name} component="div" className="text-danger" />
      </div>
    </Col>
  );
};

export default FormikInput;

