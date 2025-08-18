import React, { useState } from "react";
import { Formik, Form } from "formik";
import {
  FormikFileInput,
  FormikInput,
  FormikSelect,
} from "../../components/formikComp";
import { Button, Col, Row } from "react-bootstrap";
import Panel from "../../components/Panel";
import { useNavigate } from "react-router-dom";
import { pathData } from "../../navigation/constants";
import { ValidationSchemas } from "../../helper/validation";
import PhoneWithCountry from "../../components/PhoneWithCountry";
import { AddUserService } from "../../services/globalServices";
import BthLoader from "../../components/loaders/BtnLoader";
import { EnumForStoreImaage } from "../../helper";

const CreateUser = () => {
  // Initial form values
  const initialValues = {
    email: "",
    dial_code: "",
    phone: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    gender: "",
    address: "",
    city: "",
    country: "",
    province: "",
    postalCode: "",
    image: "",
  };
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  // function for submit user data
  const handleSubmit = (values) => {
    const phoneWithoutDialCode = values.phone.replace(values.dial_code, '');
    const payload = {
      first_name: values.firstName,
      last_name: values.lastName,
      role: "user",
      email: values.email,
      dial_code: values.dial_code,
      phone: phoneWithoutDialCode,
      password: values.password,
      address: values.address,
      city: values.city,
      state: values.province,
      gender: values.gender,
      country: values.country,
      pincode: values.postalCode,
      // lng: 30.707600,
      // lat: 30.707600,
      image: values.image
    }
    AddUserService(payload, setLoading, navigate)
  };

  return (
    <Panel>
      <div className="userMgmt_list">
        <Formik
          initialValues={initialValues}
          validationSchema={ValidationSchemas.UserCreateMgmt}
          onSubmit={handleSubmit}
        >

          {({ setFieldValue, values }) => (
            <Form>
              <Row>
                <Col md={3} className="user_img">
                  <Row>
                    <FormikFileInput
                      // flag={true}  Remove from 21-03-2025
                      colProps={{ xs: 12, sm: 12, md: 12 }}
                      name="image"
                      slug={EnumForStoreImaage.PROFILE}
                      setFieldValue={setFieldValue} // Pass setFieldValue
                      image_url={values.image}
                    />
                  </Row>
                </Col>
                <Col md={9}>
                  <Row>
                    <FormikInput
                      colProps={{ xs: 12, sm: 6, md: 4 }}
                      label="First Name"
                      name="firstName"
                      type="text"
                      placeholder="Enter your first name"
                    />
                    <FormikInput
                      colProps={{ xs: 12, sm: 6, md: 4 }}
                      label="Last Name"
                      name="lastName"
                      type="text"
                      placeholder="Enter your last name"
                    />
                    <FormikInput
                      colProps={{ xs: 12, sm: 6, md: 4 }}
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                    />
                    <div className="country_code mb-2 col-md-4 col-sm-6 col-12">
                      <label htmlFor="">Phone</label>
                      <PhoneWithCountry phonevalue={values.phone}
                        setFieldValue={setFieldValue} />
                    </div>
                    <FormikInput
                      colProps={{ xs: 12, sm: 6, md: 4 }}
                      label="Password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                    />
                    <FormikInput
                      colProps={{ xs: 12, sm: 6, md: 4 }}
                      label="Confirm Password"
                      name="confirmPassword"
                      type="password"
                      placeholder="Re-enter your password"
                    />

                    <FormikSelect
                      colProps={{ xs: 12, sm: 6, md: 4 }}
                      label="Gender"
                      name="gender"
                      options={[
                        { value: "male", label: "Male" },
                        { value: "female", label: "Female" },
                        { value: "other", label: "Other" },
                      ]}
                    />
                    <FormikInput
                      colProps={{ xs: 12, sm: 6, md: 4 }}
                      label="Address"
                      name="address"
                      type="text"
                      placeholder="Enter your address"
                    />
                    <FormikInput
                      colProps={{ xs: 12, sm: 6, md: 4 }}
                      label="City"
                      name="city"
                      type="text"
                      placeholder="Enter your city"
                    />
                    <FormikInput
                      colProps={{ xs: 12, sm: 6, md: 4 }}
                      label="Country"
                      name="country"
                      type="text"
                      placeholder="Enter your country"
                    />
                    <FormikInput
                      colProps={{ xs: 12, sm: 6, md: 4 }}
                      label="Province"
                      name="province"
                      type="text"
                      placeholder="Enter your province"
                    />
                    <FormikInput
                      colProps={{ xs: 12, sm: 6, md: 4 }}
                      label="Postal Code"
                      name="postalCode"
                      type="text"
                      placeholder="Enter your postal code"
                    />
                  </Row>
                  <Button className="me-2" variant="primary" type="submit" disabled={loading}>
                    {loading ? <BthLoader /> : "Submit"}
                  </Button>

                  <Button
                    variant="danger"
                    type="button"
                    onClick={() => navigate(pathData.userManagement)}
                  >
                    Cancel
                  </Button>
                </Col>

              </Row>
            </Form>
          )}
        </Formik>
      </div >
    </Panel>
  );
};

export default CreateUser;
