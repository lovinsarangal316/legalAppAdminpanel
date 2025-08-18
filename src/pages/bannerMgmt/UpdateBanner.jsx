import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import { pathData } from "../../navigation/constants";
import BtnLoader from "../../components/loaders/BtnLoader";
import { FormikFileInput } from "../../components/formikComp";
import CmsEditor from "../../components/Editor";
import Panel from "../../components/Panel";
import { ValidationSchemas } from "../../helper/validation";
import { GetBannerService, UpdateBannerService } from "../../services/globalServices";

const UpdateBanner = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loadingForGetUser, setLoadingForGetUser] = useState(false);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const initialValues = {
    title: data && data?.title || "",
    banner_image: data && data?.image || "",
  };

  const handleSubmit = (values) => {
    const payload = {
      id: id,
      image: values.banner_image,
      title: values.title
    }
    UpdateBannerService(payload, setLoading, navigate)
  };
  // Fetch banner data on component mount
  useEffect(() => {
    GetBannerService(setData, setLoadingForGetUser, id)
  }, [id])
  return (
    <Panel>
      <div className="create_banner rounded p-2 pb-3">
        <Formik
          key={data ? data._id : "new-form"}
          enableReinitialize
          initialValues={initialValues}
          validationSchema={ValidationSchemas.Banner}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, isSubmitting, values }) => (
            <div className="row">
              <div className="col-md-12">
                <FormikFileInput
                  colProps={{ xs: 12, sm: 12, md: 12 }}
                  name="banner_image"
                  slug="banner-images"
                  setFieldValue={setFieldValue}
                  image_url={values.banner_image}
                />
              </div>
              <div className="col-md-12">
                <Form>
                  <CmsEditor label="Banner Title" name="title" />

                  <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? <BtnLoader /> : "Submit"}
                  </Button>
                  <Button
                    variant="danger ms-3"
                    type="button"
                    onClick={() => navigate(pathData.bannersManagement)}
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

export default UpdateBanner;

