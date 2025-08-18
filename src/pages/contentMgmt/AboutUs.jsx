import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import CmsEditor from "../../components/Editor";
import BtnLoader from "../../components/loaders/BtnLoader";
import { Formik, Form } from "formik";
import Panel from "../../components/Panel";
import { ValidationSchemas } from "../../helper/validation";
import { AddCMSService, GetCmsDataFromType } from "../../services/globalServices";
import { EnumForCMS } from "../../helper";
const AboutUs = () => {
  const [cmsData, setCmsData] = useState(null)
  const [loading, setLoading] = useState(false)
  // define initial values
  const initialValues = {
    title: cmsData && cmsData.title || "",
    description: cmsData && cmsData.description || "",
  };
  // function for add about us
  const handleSubmit = (values, { setFieldValue }) => {
    const payload = {
      title: values.title,
      description: values.description,
      type: EnumForCMS.AboutUS
    }
    const fetchCMSData = () => {
      GetCmsDataFromType((data) => {
        if (data) {
          setFieldValue("title", data.title);
          setFieldValue("description", data.description);
        }
      }, setLoading, EnumForCMS.AboutUS);
    };

    AddCMSService(payload, setLoading, fetchCMSData);
  };

  useEffect(() => {
    GetCmsDataFromType(setCmsData, setLoading, EnumForCMS.AboutUS)
  }, [])

  return (
    <Panel>
      <div className="create_user rounded p-2 pb-3">
        <Formik
          key={cmsData ? cmsData._id : "new-form"}
          enableReinitialize
          initialValues={initialValues}
          validationSchema={ValidationSchemas.AboutTermPolicy}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, isSubmitting }) => (
            <div className="row">
              <div className="col-md-12">
                <Form>
                  <CmsEditor label="Title" name="title" />
                  <CmsEditor label="Description" name="description" />
                  <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? <BtnLoader /> : "Submit"}
                  </Button>
                </Form>
              </div>
            </div>
          )}
        </Formik>
      </div>
    </Panel>
  );
};

export default AboutUs;
