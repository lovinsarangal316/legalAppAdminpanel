import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Panel from "../../../components/Panel";
import { NavLink, useParams } from "react-router-dom";
import { pathData } from "../../../navigation/constants";
import { GetFAQService } from "../../../services/globalServices";
import Loader from "../../../components/loaders/Loader";

const FaqDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loadingForGetUser, setLoadingForGetUser] = useState(false);
  // Fetch faq data on component mount
  useEffect(() => {
    GetFAQService(setData, setLoadingForGetUser, id)
  }, [id])
  if (loadingForGetUser) {
    return <Loader />
  }
  return (
    <Panel>
      <div className="text-end mb-2">
        <NavLink to={`${pathData.contentUpdateFaq}${id}`} className="btn btn-primary">Edit</NavLink>
      </div>
      <Row>
        <Col md={12}>
          <h5 className="text-uppercase mb-4">FAQ Details</h5>
          <hr />
          <div className="faq-detail">
            <h6 className="mb-3">{data && <div dangerouslySetInnerHTML={{ __html: data?.question }}></div>}</h6>
            <p>
              {data && <div dangerouslySetInnerHTML={{ __html: data?.answer }}></div>}
            </p>
          </div>
        </Col>
      </Row>
    </Panel>
  );
};

export default FaqDetail;
