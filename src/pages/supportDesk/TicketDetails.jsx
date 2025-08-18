import React, { useEffect, useState } from "react";
import { Row, Col, Card, ListGroup, Form } from "react-bootstrap";
import Panel from "../../components/Panel";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loaders/Loader";
import { addCommentService, GetTicketService, UpdateTicketStatusService } from "../../services/globalServices";
import { baseUrlForImage, EnumForTicketStatus, formatTimeStampChat, getInitials } from "../../helper";

const TicketDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("")
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [localState, setLocalState] = useState({
    inputData: {
      response: "",
      ticket_id: id
    }
  })

  // function for change status
  const changeStatusHandler = async (e) => {
    if (e.target.value) {
      const payload = {
        id: id,
        status: e?.target?.value
      }
      const isStatusUpdate = await UpdateTicketStatusService(payload, setLoading)
      if (isStatusUpdate) {
        setStatus(e?.target?.value)
      } else {
        setStatus(data && data?.trademark_status)
      }
    }
  }
  // function for comment
  const commentHandler = async (e) => {
    e.preventDefault()
    const payload = localState?.inputData
    const isComment = await addCommentService(payload, setLoading)
    if (isComment) {
      setLocalState((prev) => ({
        ...prev,
        inputData: {
          ...prev.inputData,
          response: ""
        }
      }))
      await GetTicketService(setData, setLoading, id, setStatus,)
    }
  }
  // status array
  const statusOptions = [
    { value: EnumForTicketStatus.Open, label: "Open" },
    { value: EnumForTicketStatus.Closed, label: "Closed" },
    { value: EnumForTicketStatus.Inprogress, label: "In Progress" },
  ];
  // effect for get trademark detail
  useEffect(() => {
    GetTicketService(setData, setLoading, id, setStatus,)
  }, [id])

  // Show loading 
  if (loading) {
    return <Loader />
  }
  return (
    <Panel>
      <Row>
        <Col className="d-none">
          <img
            src={baseUrlForImage + data?.ticket_files[0]}
            height={400}
            alt="profileImage"
            className="w-100 rounded"
          />
        </Col>
        <Col md={12}>
          <Card className="mt-4">
            <Card.Body>
              <Card.Title className="d-flex justify-content-between align-items-center">
                <span>Ticket Details</span>
                <div className="d-flex align-items-center">
                  <label className="me-2">Status</label>
                  <Form.Select
                    aria-label="Default select example"
                    name="statusFilter"
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
              </Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>Name</span>
                  <span className="text-muted text-capitalize">{data && data?.user_id?.full_name}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>Email</span>
                  <span className="text-muted">{data && data?.user_id?.email} </span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>Phone Number</span>
                  <span className="text-muted">{data && data?.user_id?.phone}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>Ticket Number</span>
                  <span className="text-muted">{data && data?.ticket_identity}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>Severity</span>
                  <span className="text-muted text-capitalize">{data && data?.ticket_severity}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>Ctreated At</span>
                  <span className="text-muted">{data && formatTimeStampChat(data?.createdAt)}</span>
                </ListGroup.Item>
                <ListGroup.Item className="">
                  <span>Description</span>
                  <p className="text-muted text-capitalize">
                    {data && data?.ticket_description}
                  </p>
                  <Form onSubmit={commentHandler}>
                    <label className="form-label">Comment</label>
                    <div className="admin_comment position-relative">
                      <Form.Control type="text" name="comment" value={localState.inputData.response} placeholder="Comments...&#128221;" onChange={(e) => setLocalState((prev) => ({ ...prev, inputData: { ...prev.inputData, response: e.target.value } }))} />
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={!localState.inputData.response.length}
                        style={{ position: "absolute", right: "1px", top: "1px" }}
                      >
                        Save
                      </button>
                    </div>
                  </Form>
                  <div className="comment_list mt-3">
                    {
                      data && data?.responses?.map((curElm) => <div key={curElm?._id} className="mb-4 rounded shadow p-2">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex  align-items-center">
                            {/* <img src={data && baseUrlForImage + curElm?.user_id?.image} alt="userImage" style={{ height: "50px", width: "50px", borderRadius: "50%", objectFit: "cover" }} /> */}
                            <span style={{ backgroundColor: "gray", display: "flex", justifyContent: "center", alignItems: "center", height: "40px", width: "40px", borderRadius: "50%", marginRight: "10px", textTransform: "uppercase" }}>
                              {curElm?.user_id?.full_name && getInitials(curElm?.user_id?.full_name)}
                            </span>
                            <div className="ms-3">
                              <h6 className="mb-0 text-capitalize" title="User">{curElm?.user_id?.full_name} </h6>
                              <small className="text-capitalize">{curElm?.response} </small>
                            </div>
                          </div>
                          <small>{formatTimeStampChat(curElm?.createdAt)} </small>
                        </div>
                      </div>)
                    }
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Panel>
  );
};

export default TicketDetails;
