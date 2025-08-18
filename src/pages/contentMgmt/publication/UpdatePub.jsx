import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import { pathData } from "../../../navigation/constants";
import BtnLoader from "../../../components/loaders/BtnLoader";
import { FormikFileInput } from "../../../components/formikComp";
import CmsEditor from "../../../components/Editor";
import Panel from "../../../components/Panel";
import { ValidationSchemas } from "../../../helper/validation";
import { GetPublicationService, UpdatePublicationService } from "../../../services/globalServices";

const UpdatePublication = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loadingForGetUser, setLoadingForGetUser] = useState(false);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  // define initial values
  const initialValues = {
    title: data && data?.title || "",
    description: data && data?.description || "",
    image: data && data?.image || "",
  };
  //  function for submit publication
  const handleSubmit = (values) => {
    const payload = {
      id: id,
      image: values.image,
      title: values.title,
      description: values?.description
    }
    UpdatePublicationService(payload, setLoading, navigate)
  };

  // Fetch publication data on component mount
  useEffect(() => {
    GetPublicationService(setData, setLoadingForGetUser, id)
  }, [id])

  return (
    <Panel>
      <div className="create_user rounded p-2 pb-3">
        <Formik
          key={data ? data._id : "new-form"}
          enableReinitialize
          initialValues={initialValues}
          validationSchema={ValidationSchemas.Publication}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, isSubmitting, values }) => (
            <div className="row">
              <div className="col-md-12">
                <FormikFileInput
                  colProps={{ xs: 12, sm: 12, md: 12 }}
                  name="image"
                  setFieldValue={setFieldValue}
                  image_url={values.image}
                />
              </div>
              <div className="col-md-12">
                <Form>
                  <CmsEditor label="Title" name="title" />
                  <CmsEditor label="Description" name="description" />
                  <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? <BtnLoader /> : "Submit"}
                  </Button>
                  <Button
                    variant="danger ms-3"
                    type="button"
                    onClick={() => navigate(pathData.contentPublication)}
                  >
                    Cancel
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

export default UpdatePublication;
