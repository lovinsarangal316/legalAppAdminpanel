import React, { useState } from "react";
import logo from "../../assets/logo/logo.svg";
import { Button, Form } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import BtnLoader from "../../components/loaders/BtnLoader";
import { Formik } from "formik";
import PasswordEye from "../../components/PasswordEye";
import { pathData } from "../../navigation/constants";
import { ValidationSchemas } from "../../helper/validation";
import { LoginService, LoginServiceForThirdParty } from "../../services/globalServices";
import { getDataFromLocalStorage } from "../../helper";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [openEye, setOpenEye] = useState(false);
  // function for handlelogin
  const handleSubmit = async (values) => {
    const fcmToken = getDataFromLocalStorage("fcmToken");
    const payload = {
      ...values,
      fcmToken: fcmToken ? fcmToken : "",
    };

    // LoginService(payload, setLoading, navigate);
    await LoginService(payload, setLoading, navigate);
  };
  return (
    <div className="loginWrapper vh-100 d-flex align-items-center justify-content-center">
      <div className="w-25">
        <div className="text-center">
          <img src={logo} alt="logo" />
        </div>
        <div className="form_wrapper  p-4 mt-3">
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={ValidationSchemas.Login}
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
                <h5 className="text-center">LOGIN</h5>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
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
                    <small className="text-danger d-block mt-2">
                      {errors.email}
                    </small>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <div className="position-relative">
                    <Form.Control
                      type={openEye ? "text" : "password"}
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Password"
                      isInvalid={touched.password && errors.password}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: "9px",
                        right: "10px",
                      }}
                    >
                      <PasswordEye setEye={setOpenEye} openEye={openEye} />
                    </div>
                  </div>

                  {touched.password && errors.password && (
                    <small className="text-danger d-block mt-2">
                      {errors.password}
                    </small>
                  )}
                </Form.Group>
                <Button
                  type="submit"
                  className="w-100 btn-primary"
                  disabled={loading}
                >
                  {loading ? <BtnLoader /> : "SIGN IN"}
                </Button>
                <div className="text-end mt-2">
                  <NavLink className={"nav-link"} to={pathData.forgotPassword}>
                    Forgot Password
                  </NavLink>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
