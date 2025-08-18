import React, { useState } from "react";
import logo from "../../assets/logo/logo.svg";
import { Button, Form } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import BtnLoader from "../../components/loaders/BtnLoader";
import { Formik } from "formik";
import { pathData } from "../../navigation/constants";
import { ValidationSchemas } from "../../helper/validation";
import { ResetPasswordService } from "../../services/globalServices";

const CreatePassword = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const [openEye, setOpenEye] = useState(false)
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (values) => {
    const payload = {
      new_password: values?.new_password,
      confirm_password: values?.confirm_password,
      token: location?.state?.token
    }
    ResetPasswordService(payload, setLoading, navigate)
  };
  return (
    <div className="loginWrapper vh-100 d-flex align-items-center justify-content-center">
      <div className="w-25">
        <div className="text-center">
          <img src={logo} alt="logo" />
        </div>
        <div className="form_wrapper p-4 mt-3">
          <Formik
            initialValues={{ new_password: "", confirm_password: "" }}
            validationSchema={ValidationSchemas.CreatePass}
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
                <h5 className='mb-3 text-center'>Change Password</h5>
                <Form.Group className="mb-3 position-relative" controlId="formBasicNewPassword">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="new_password"
                    value={values.new_password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter new password"
                    isInvalid={touched.new_password && errors.new_password}
                  />
                  {touched.new_password && errors.new_password && (
                    <small className="text-danger d-block mt-2">{errors.new_password}</small>
                  )}

                </Form.Group>
                <Form.Group className="mb-3 position-relative" controlId="formBasicConfirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type={"password"}
                    name="confirm_password"
                    value={values.confirm_password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter confirm password"
                    isInvalid={touched.confirm_password && errors.confirm_password}
                  />
                  {touched.confirm_password && errors.confirm_password && (
                    <small className="text-danger d-block mt-2">{errors.confirm_password}</small>
                  )}

                </Form.Group>
                <Button type="submit" className="w-100 btn-primary" disabled={loading}>
                  {loading ? <BtnLoader /> : "Save"}
                </Button>
                <NavLink className="nav-link text-end mt-2" to={pathData.login}>Return to Login</NavLink>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CreatePassword;
