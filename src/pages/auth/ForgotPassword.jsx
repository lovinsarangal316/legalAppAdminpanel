import React, { useState } from "react";
import logo from "../../assets/logo/logo.svg";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BtnLoader from "../../components/loaders/BtnLoader";
import { Formik } from "formik";
import { ValidationSchemas } from "../../helper/validation";
import { ForgotPasswordService } from "../../services/globalServices";



const ForgotPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  // function for handlelogin
  const handleSubmit = async (values) => {
    ForgotPasswordService(values, setLoading, navigate)
  };
  return (
    <div className="loginWrapper vh-100 d-flex align-items-center justify-content-center">
      <div className="w-25">
        <div className="text-center">
          <img src={logo} alt="logo" />
        </div>
        <div className="form_wrapper p-4 mt-3">
          <Formik
            initialValues={{ email: "" }}
            validationSchema={ValidationSchemas.ForgotPass}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit}>
                <h5 className='mb-3 text-center'> Forgot Password</h5>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  {/* <Form.Label>Email</Form.Label> */}
                  <Form.Control
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter email"
                    isInvalid={touched.email && errors.email}
                  />
                  {touched.email && errors.email && (
                    <small className="text-danger d-block mt-2">{errors.email}</small>
                  )}
                </Form.Group>
                <Button type="submit" className="w-100 btn-primary" disabled={loading}>
                  {loading ? <BtnLoader /> : "Send"}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

