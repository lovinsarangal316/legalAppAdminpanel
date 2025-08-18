import React, { useEffect, useState } from "react";
import { Row, Col, Card, ListGroup, Form } from "react-bootstrap";
import Panel from "../../components/Panel";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loaders/Loader";
import { FaArrowAltCircleDown } from "react-icons/fa";
import {
  GetTrademarkService,
  UpdateTrademarkStatusService,
} from "../../services/globalServices";
import {
  baseUrlForImage,
  downloadPDF,
  EnumForStatus,
  formatDate,
} from "../../helper";
import DocumentPopup from "../../components/modals/DocumentPopup";
import pdfImage from "../../assets/images/imgpsh_fullsize_anim (7).png";
const AppDetails = () => {
  const { id } = useParams();
  const [docModalShow, setDocModalShow] = useState(false);
  const [attachment, setAttachment] = useState();
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // function for change status
  const changeStatusHandler = async (e) => {
    if (e.target.value) {
      const payload = {
        id: id,
        status: e?.target?.value,
      };
      const isStatusUpdate = await UpdateTrademarkStatusService(
        payload,
        setLoading,
        navigate
      );
      if (isStatusUpdate) {
        setStatus(e.target.value);
      } else {
        setStatus(data && data?.trademark_status);
      }
    }
  };

  const attachmentHandler = (selectedDocument) => {
    setAttachment(selectedDocument);
    setDocModalShow(true);
  };
  const statusOptions = [
    { value: EnumForStatus.Approved, label: "Approved" },
    // { value: EnumForStatus.Reject, label: "Rejected" },
    // { value: EnumForStatus.InProgress, label: "In Progress" },
    { value: EnumForStatus.Pending, label: "Pending" },
  ];
  // effect for get trademark detail
  useEffect(() => {
    GetTrademarkService(setData, setLoading, id, setStatus);
  }, [id]);
  // Show loading
  if (loading) {
    return <Loader />;
  }
  return (
    <Panel>
      <Row>
        <Col md={12}>
          <Card className="mt-4">
            <Card.Header className="text-uppercase">
              Trade Mark details
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between d-none">
                  <strong>Trade Mark Title</strong>{" "}
                  <span className="text-capitalize">
                    {" "}
                    {data && data?.title ? data?.title : "N/A"}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <strong>Register Status</strong>{" "}
                  <span className="text-capitalize">
                    {" "}
                    {data && data?.registerStatus
                      ? data?.registerStatus
                      : "N/A"}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between d-none">
                  <strong>International Classification Number</strong>{" "}
                  <span className="text-capitalize">
                    {" "}
                    {data && data?.internationalClassificationNumber
                      ? data?.internationalClassificationNumber
                      : "N/A"}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <strong>Filing Status</strong>{" "}
                  <span className="text-capitalize">
                    {" "}
                    {data && data?.filingStatus ? data?.filingStatus : "N/A"}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between d-none">
                  <strong>Goods and Services</strong>{" "}
                  <span className="text-capitalize w-50 text-end">
                    {" "}
                    {data && data?.goodsAndServices
                      ? data?.goodsAndServices
                      : "N/A"}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <strong>Endorsement</strong>{" "}
                  <span className="text-capitalize">
                    {" "}
                    {data && data?.endorsements ? data?.endorsements : "N/A"}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <strong>Denomination</strong>{" "}
                  <span className="text-capitalize">
                    {" "}
                    {data && data?.denomination ? data?.denomination : "N/A"}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <strong>Customer Code</strong>{" "}
                  <span className="text-capitalize">
                    {" "}
                    {data && data?.customerCode ? data?.customerCode : "N/A"}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <strong> GPA Number</strong>{" "}
                  <span className="text-capitalize">
                    {" "}
                    {data && data?.gpaNumber ? data?.gpaNumber : "N/A"}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <strong>Application Date</strong>{" "}
                  <span className="text-capitalize">
                    {" "}
                    {data && data?.applicationDate
                      ? formatDate(data?.applicationDate)
                      : "N/A"}
                  </span>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
          <Card className="mt-4 d-none">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <span className="text-uppercase d-none">User Info</span>
              <div className="d-flex align-items-center d-none">
                <label htmlFor="" className="me-2 fw-bold">
                  Status
                </label>
                <Form.Select
                  aria-label="Default select example"
                  name="status"
                  value={status}
                  onChange={changeStatusHandler}
                >
                  {statusOptions?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <strong>User name</strong>{" "}
                  <span className="text-capitalize">
                    {" "}
                    {data && data?.addforService?.full_name
                      ? data?.user_id?.full_name
                      : "N/A"}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <strong>Email</strong>{" "}
                  <span>
                    {" "}
                    {data && data?.user_id?.email
                      ? data?.user_id?.email
                      : "N/A"}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <strong>Address</strong>{" "}
                  <span className="text-capitalize w-50 text-end">
                    {" "}
                    {data && data?.display_address
                      ? data?.display_address
                      : "N/A"}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between d-none">
                  <strong>Country</strong>{" "}
                  <span className="text-capitalize">
                    {" "}
                    {data && data?.user_id?.country
                      ? data?.user_id?.country
                      : "N/A"}
                  </span>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
          <Card className="mt-4 d-none">
            <Card.Header className="text-uppercase">
              Trade Mark application type
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between">
                  <strong>Trade Mark Type</strong>{" "}
                  <span className="text-capitalize">
                    {" "}
                    {data && data?.trademark_type
                      ? data?.trademark_type
                      : "N/A"}
                  </span>
                </ListGroup.Item>
                {data?.trademark_type == "Image mark" && (
                  <ListGroup.Item className="d-flex justify-content-between align-items-center">
                    <strong>Trade Mark Image</strong>{" "}
                    <img
                      src={baseUrlForImage + data?.trademark_image}
                      onClick={() => attachmentHandler(data?.trademark_image)}
                      alt="pdfimage"
                      style={{
                        height: "80px",
                        borderRadius: "10px",
                        cursor: "pointer",
                      }}
                    />
                  </ListGroup.Item>
                )}

                <ListGroup.Item className="d-flex justify-content-between d-none">
                  <strong>Client Reference</strong>{" "}
                  <span className="text-capitalize">
                    {" "}
                    {data && data?.client_reference
                      ? data?.client_reference
                      : "N/A"}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <strong>Trade Mark Nature</strong>{" "}
                  <span className="text-capitalize">
                    {" "}
                    {data && data?.trademark_nature
                      ? data?.trademark_nature
                      : "N/A"}
                  </span>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
          <Card className="mt-4">
            <Card.Header className="text-uppercase">
              Trade Mark ownership
            </Card.Header>
            <Card.Body>
              <div className="applicant card p-2">
                <label className="form-label fw-bold">Applicant</label>

                {data &&
                  data?.applicants?.length > 0 &&
                  data?.applicants?.map((item) => (
                    <ListGroup variant="flush" key={item?.id}>
                      <ListGroup.Item className="d-flex justify-content-between">
                        <strong>Name</strong>{" "}
                        <span className="text-capitalize"> {item?.name}</span>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex justify-content-between">
                        <strong>Email</strong>{" "}
                        <span className="text-lowercase">{item?.email}</span>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex justify-content-between">
                        <strong>Address</strong>{" "}
                        <span className="text-capitalize">
                          {" "}
                          {item?.address}
                        </span>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex justify-content-between">
                        <strong>Town</strong>{" "}
                        <span className="text-capitalize">{item?.town}</span>{" "}
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex justify-content-between">
                        <strong>Zip Code</strong>{" "}
                        <span className="text-capitalize">
                          {" "}
                          {item?.zipCode}
                        </span>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex justify-content-between">
                        <strong>Country</strong>{" "}
                        <span className="text-capitalize">
                          {item?.countryName}
                        </span>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex justify-content-between">
                        <strong>Contact Number</strong>{" "}
                        <span className="text-capitalize">{item?.phone}</span>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex justify-content-between d-none">
                        <strong>FAX</strong>{" "}
                        <span className="text-capitalize">{item?.fax}</span>
                      </ListGroup.Item>

                      <ListGroup.Item className="d-flex justify-content-between d-none">
                        <strong>Doc EX</strong>{" "}
                        <span className="text-capitalize"> {item?.docEx} </span>
                      </ListGroup.Item>
                    </ListGroup>
                  ))}
              </div>
              <div className="applicant mt-4 card p-2">
                <label className="form-label fw-bold">
                  Address For Service
                </label>
                <ListGroup variant="flush">
                  <ListGroup.Item className="d-flex justify-content-between">
                    <strong>Name</strong>{" "}
                    <span className="text-capitalize">
                      {" "}
                      {data && data?.addforService?.name
                        ? data?.addforService?.name
                        : "N/A"}
                    </span>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between">
                    <strong>Address</strong>{" "}
                    <span className="text-capitalize">
                      {" "}
                      {data && data?.addforService?.address
                        ? data?.addforService?.address
                        : "N/A"}
                    </span>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between">
                    <strong>Town</strong>{" "}
                    <span className="text-capitalize">
                      {" "}
                      {data && data?.addforService?.town
                        ? data?.addforService?.town
                        : "N/A"}
                    </span>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between">
                    <strong>Zip Code</strong>{" "}
                    <span className="text-capitalize">
                      {" "}
                      {data && data?.addforService?.zipCode
                        ? data?.addforService?.zipCode
                        : "N/A"}
                    </span>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between">
                    <strong>Country</strong>{" "}
                    <span className="text-capitalize">
                      {" "}
                      {data && data?.addforService?.countyName
                        ? data?.addforService?.countyName
                        : "N/A"}
                    </span>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between d-none">
                    <strong>Country Code</strong>{" "}
                    <span className="text-capitalize">
                      {" "}
                      {data && data?.addforService?.countryCode
                        ? data?.addforService?.countryCode
                        : "N/A"}
                    </span>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between">
                    <strong>Contact Number</strong>{" "}
                    <span className="text-capitalize">
                      {" "}
                      {data && data?.addforService?.phone
                        ? data?.addforService?.phone
                        : "N/A"}
                    </span>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between d-none">
                    <strong>FAX</strong>{" "}
                    <span className="text-capitalize">
                      {" "}
                      {data && data?.addforService?.fax
                        ? data?.addforService?.fax
                        : "N/A"}
                    </span>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between">
                    <strong>Email</strong>{" "}
                    <span className="text-lowercase">
                      {" "}
                      {data && data?.addforService?.email
                        ? data?.addforService?.email
                        : "N/A"}
                    </span>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between d-none">
                    <strong>Doc EX</strong>{" "}
                    <span className="text-capitalize">
                      {" "}
                      {data && data?.addforService?.docEx
                        ? data?.addforService?.docEx
                        : "N/A"}
                    </span>
                  </ListGroup.Item>
                </ListGroup>
              </div>
            </Card.Body>
          </Card>

          <Card className="mt-4">
            <Card.Header className="text-uppercase">Priority Claim</Card.Header>
            <Card.Body className="p-0">
              {data &&
                data?.priorities?.length > 0 &&
                data?.priorities?.map((item) => (
                  <div key={item?.id}>
                    <ListGroup variant="flush">
                      <ListGroup.Item className="d-flex justify-content-between">
                        <strong>Priority Type</strong>{" "}
                        <span className="text-capitalize">
                          {" "}
                          {item?.priorityType}

                        </span>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex justify-content-between">
                        <strong>Country</strong>{" "}
                        <span className="text-capitalize">
                          {" "}
                          {item?.countryName}

                        </span>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex justify-content-between d-none">
                        <strong>Country Code</strong>{" "}
                        <span className="text-capitalize">
                          {" "}
                          {item?.countryCode}

                        </span>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex justify-content-between">
                        <strong>Priority Number</strong>{" "}
                        <span className="text-capitalize">
                          {" "}
                          {item?.priorityNo}

                        </span>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex justify-content-between">
                        <strong>Priority Date</strong>{" "}
                        <span>
                          {" "}
                          {item?.priorityDate}

                        </span>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex justify-content-between d-none">
                        <strong>Priority Restrictions</strong>{" "}
                        <span>
                          {" "}
                          {item?.priorityRestrictions}

                        </span>
                      </ListGroup.Item>
                    </ListGroup>
                    <hr />
                  </div>
                ))}
            </Card.Body>
          </Card>
          <Card className="mt-4 d-none">
            <Card.Header className="text-uppercase">
              Record Attachment
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item
                  className="d-flex"
                  style={{ overflowY: "auto" }}
                >
                  <div className="mb-0 d-flex">
                    {data &&
                      data?.recordAttachments?.length > 0 &&
                      data?.recordAttachments?.map((curElm, index) => (
                        <div key={index} className="text-primary mt-0 me-3">
                          {[".pdf"].includes(curElm?.fileExtension) ? (
                            <div className="position-relative">
                              <span
                                style={{
                                  position: "absolute",
                                  right: "0px",
                                  top: "-3px",
                                }}
                                className="cursor"
                              >
                                <a
                                  href={curElm?.fileURL}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {" "}
                                  <FaArrowAltCircleDown size={25} />
                                </a>
                              </span>{" "}
                              <img
                                src={pdfImage}
                                alt="image"
                                style={{ height: "80px" }}
                              />{" "}
                            </div>
                          ) : (
                            <img
                              src={curElm?.fileURL}
                              onClick={() => attachmentHandler(curElm?.fileURL)}
                              alt="image"
                              style={{
                                height: "80px",
                                borderRadius: "10px",
                                cursor: "pointer",
                              }}
                            />
                          )}
                        </div>
                      ))}
                  </div>
                </ListGroup.Item>
                {/* <ListGroup.Item className="d-flex justify-content-between">
                  <strong>File Type</strong> {data && data?.attachment_type ? data?.attachment_type : "N/A"}
                </ListGroup.Item> */}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {docModalShow && (
        <DocumentPopup
          show={docModalShow}
          hide={() => setDocModalShow(false)}
          document={attachment}
        />
      )}
    </Panel>
  );
};

export default AppDetails;
