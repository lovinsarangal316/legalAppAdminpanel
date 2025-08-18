import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { pathData } from "../../navigation/constants";
import CustomDatatable from "../../components/CustomDT";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Loader from "../../components/loaders/Loader";
import { GetTicketsListService } from "../../services/globalServices";
import { EnumForTicketStatus, formatDate } from "../../helper";

const SupportTicket = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(EnumForTicketStatus.All);
  const columns = [
    {
      name: "Ticket Title",
      selector: (row) => row?.ticket_identity,
      sortable: true,
    },
    {
      name: "Ticket Description",
      selector: (row) => row?.ticket_description,
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => formatDate(row?.createdAt),
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => (
        <span
          className={`badge text-capitalize ${row?.ticket_status === EnumForTicketStatus.Closed
            ? "bg-danger"
            : row?.ticket_status === EnumForTicketStatus.Inprogress
              ? "bg-warning"
              : "bg-success"
            }`}
        >
          {row?.ticket_status}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="d-flex position-relative">
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Detail</Tooltip>}
          >
            <NavLink
              className="btn btn-primary btn-sm me-2"
              to={`${pathData.supportTicketDetails}${row?._id}`}
            >
              <FaEye />
            </NavLink>
          </OverlayTrigger>

        </div>
      ),
      sortable: false,
    },
  ];
  const priorityOptions = [
    { value: EnumForTicketStatus.All, label: "ALL" },
    { value: EnumForTicketStatus.Open, label: "Open" },
    { value: EnumForTicketStatus.Closed, label: "Closed" },
    { value: EnumForTicketStatus.Inprogress, label: "In Progress" },
  ];
  // effect for get user list
  useEffect(() => {
    let delayDebounce;
    if (search) {
      // Delay API call by 500ms
      delayDebounce = setTimeout(() => {
        GetTicketsListService(setData, setLoading, setTotalPages, currentPage, search, status)
      }, 80);
    } else {
      // Immediate API call for default case
      GetTicketsListService(setData, setLoading, setTotalPages, currentPage, search, status)
    }
    // Cleanup timeout if component unmounts or dependencies change
    return () => clearTimeout(delayDebounce);
  }, [search, status, currentPage])

  // if (loading) {
  //   return <Loader />
  // }
  return (
    <div>
      <CustomDatatable
        loading={loading}
        data={data}
        columns={columns}
        headtitle="SUPPORT TICKETS"
        search={search}
        statusfilter={status}
        filterOptions={priorityOptions}
        setSearch={setSearch}
        setStatus={setStatus}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default SupportTicket;
