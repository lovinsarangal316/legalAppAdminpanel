import React, { useEffect, useState } from "react";
import { Row, Col, Image, ListGroup, Card } from "react-bootstrap";
import Panel from "../../components/Panel";
import { NavLink, useParams } from "react-router-dom";
import { pathData } from "../../navigation/constants";
import { GetUserService } from "../../services/globalServices";
import Loader from "../../components/loaders/Loader";
import noImaage from "../../assets/images/noimage.avif"
import { baseUrlForImage, formatDate } from "../../helper";

const UserDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false)

  // effect for get user detail
  useEffect(() => {
    GetUserService(setData, setLoading, id)
  }, [id])

  if (loading) {
    return <Loader />
  }
  return (
    <Panel className="userDetail">
      <Card className="p-3">
        <Card.Body>
          <Row>
            <Col md={3} className="d-none">
              <Image src={data && data?.image ? baseUrlForImage + data?.image : noImaage} fluid rounded style={{ width: "100%", height: "250px", objectFit: "cover" }} />
              <h6 className="mt-2 text-uppercase">{data && data?.full_name} </h6>
            </Col>
            <Col md={9}>
              <div className="d-flex justify-content-between align-items-center">
                <Card.Title className="text-uppercase mb-0">Contact Info</Card.Title>
                <div className="text-end mb-0 d-none">
                  <NavLink to={`${pathData.userManagementUpdateUser}${id}`} className="btn btn-primary">Edit</NavLink>
                </div>
              </div>

              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex">
                  <strong className="w-50">Full name</strong>
                  <span className="ms-3">{data && data?.usR_Names}</span>
                </ListGroup.Item>

                <ListGroup.Item className="d-flex">
                  <strong className="w-50">User Identity Number</strong>
                  <span className="ms-3">{data && data?.usR_IdentityNumber ? data?.usR_IdentityNumber : "N/A"}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex">
                  <strong className="w-50">User name</strong>
                  <span className="ms-3">{data && data?.usR_Username}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex">
                  <strong className="w-50">Email</strong>
                  <span className="ms-3">{data && data?.usR_EmailAccount}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex">
                  <strong className="w-50">Phone</strong>
                  <span className="ms-3">{data && `${data?.phoneNumber}`}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex">
                  <strong className="w-50">Street City</strong>
                  <span className="ms-3">{data && data?.streetCity} </span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex d-none">
                  <strong className="w-50">Street City</strong>
                  <span className="ms-3">{data && data?.streetCity}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex">
                  <strong className="w-50">Street Address</strong>
                  <span className="ms-3">{data && data?.streetAddress}</span>
                </ListGroup.Item>

                <ListGroup.Item className="d-flex">
                  <strong className="w-50">Postal Code</strong>
                  <span className="ms-3">{data && data?.postalCode} </span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex">
                  <strong className="w-50">User Creation</strong>
                  <span className="ms-3">{data && formatDate(data?.usR_CreationDate)} </span>
                </ListGroup.Item>
              </ListGroup>

            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Panel>
  );
};

export default UserDetail;
