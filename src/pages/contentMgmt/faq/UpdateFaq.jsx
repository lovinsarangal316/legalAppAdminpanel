import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import { pathData } from "../../../navigation/constants";
import BtnLoader from "../../../components/loaders/BtnLoader";
import CmsEditor from "../../../components/Editor";
import Panel from "../../../components/Panel";
import { ValidationSchemas } from "../../../helper/validation";
import {
  GetFAQService,
  UpdateFAQService,
} from "../../../services/globalServices";

const UpdateFAQ = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [count, setCount] = useState(0);
  const [countAnswer, setCountAnswer] = useState(0);
  const [loadingForGetUser, setLoadingForGetUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // define initial values
  const initialValues = {
    question: (data && data?.question) || "",
    answer: (data && data?.answer) || "",
  };

  //  function for submit faq
  const handleSubmit = (values) => {
    const payload = {
      id: id,
      question: values?.question,
      answer: values?.answer,
    };
    UpdateFAQService(payload, setLoading, navigate);
  };

  // Fetch faq data on component mount
  useEffect(() => {
    GetFAQService(setData, setLoadingForGetUser, id, setCount, setCountAnswer);
  }, [id]);

  return (
    <Panel>
      <div className="create_user rounded p-2 pb-3">
        <Formik
          key={data ? data._id : "new-form"}
          enableReinitialize
          initialValues={initialValues}
          validationSchema={ValidationSchemas.Faq}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, isSubmitting }) => (
            <Form>
              <span className="fw-bold">{count}/301 </span>

              <CmsEditor
                label="Question"
                name="question"
                setCount={setCount}
                flag={true}
              />
              <span className="fw-bold">{countAnswer}/301 </span>
              <CmsEditor
                label="Answer"
                name="answer"
                setCount={setCountAnswer}
                flag={true}
              />

              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? <BtnLoader /> : "Submit"}
              </Button>
              <Button
                variant="danger ms-3"
                type="button"
                onClick={() => navigate(pathData.contentFaq)}
              >
                Cancel
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Panel>
  );
};

export default UpdateFAQ;
