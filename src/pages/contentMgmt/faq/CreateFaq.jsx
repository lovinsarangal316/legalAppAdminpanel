import React, { useState } from "react";
import { Formik, Form } from "formik";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { pathData } from "../../../navigation/constants";
import BtnLoader from "../../../components/loaders/BtnLoader";
import CmsEditor from "../../../components/Editor";
import Panel from "../../../components/Panel";
import { ValidationSchemas } from "../../../helper/validation";
import { AddFAQService } from "../../../services/globalServices";

const CreateFAQ = () => {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [countAnswer, setCountAnswer] = useState(0);

  const navigate = useNavigate();

  const initialValues = {
    question: "",
    answer: "",
  };

  const handleSubmit = (values) => {
    AddFAQService(values, setLoading, navigate);
  };

  return (
    <Panel>
      <div className="create_user rounded p-2 pb-3">
        <Formik
          initialValues={initialValues}
          validationSchema={ValidationSchemas.Faq}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, isSubmitting, values }) => (
            <Form>
              <span className="fw-bold">{count}/301 </span>
              <CmsEditor
                setCount={setCount}
                label="Question"
                name="question"
                flag={true}
              />
              <span className="fw-bold">{countAnswer}/301 </span>
              <CmsEditor
                setCount={setCountAnswer}
                label="Answer"
                name="answer"
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

export default CreateFAQ;
