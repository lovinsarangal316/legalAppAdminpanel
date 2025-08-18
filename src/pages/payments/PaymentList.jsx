import React, { useState } from "react";
import { Badge, OverlayTrigger, Tooltip } from "react-bootstrap";
import CustomDatatable from "../../components/CustomDT";
import { NavLink } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { pathData } from "../../navigation/constants";
import { IoMdDownload } from "react-icons/io";

const PaymentList = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [appData, setAppData] = useState([
    {
      id: 1,
      userName: "John Doe",
      userEmail: "john@gmail.com",
      trademarkName: "michal",
      txnId: "TXN12345",
      status: "pending",
      amount: "R1500",
    },
    {
      id: 2,
      userName: "Jane Smith",
      userEmail: "smith@gmail.com",
      txnId: "TXN67890",
      trademarkName: "michal",
      status: "pending",
      amount: "R2500",
    },
    {
      id: 3,
      userName: "Emily Carter",
      userEmail: "carter@gmail.com",
      txnId: "TXN54321",
      trademarkName: "michal",
      status: "completed",
      amount: "R1000",
    },
    {
      id: 4,
      userName: "Michael Johnson",
      userEmail: "johnson@gmail.com",
      trademarkName: "michal",
      txnId: "TXN98765",
      status: "rejected",
      amount: "R3000",
    },
    {
      id: 5,
      userName: "Sarah Brown",
      userEmail: "sarah@gmail.com",
      txnId: "TXN45678",
      trademarkName: "michal",
      status: "completed",
      amount: "R2000",
    },
  ]);

  const columns = [
    {
      name: "User Name",
      selector: (row) => row.userName,
      sortable: true,
    },
    {
      name: "User Email",
      selector: (row) => row.userEmail,
      sortable: true,
    },
    {
      name: "Trademark name",
      selector: (row) => row.trademarkName,
      sortable: true,
    },
    // {
    //   name: "TxnId",
    //   selector: (row) => row.txnId,
    //   sortable: true,
    // },
    {
      name: "Amount (ZAR)",
      selector: (row) => row.amount,
      sortable: true,
    },
    {
      name: "Detail",
      selector: (row) => (
        <div className="d-flex position-relative align-items-center">
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Detail</Tooltip>}
          >
            <NavLink className="btn btn-primary btn-sm me-2" to={`${pathData.paymentDetails}`}>
              <FaEye />
            </NavLink>
          </OverlayTrigger>
          {/* <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Download</Tooltip>}
          >
            <button className="btn">
              <IoMdDownload size={20} />
            </button>
          </OverlayTrigger> */}

        </div>
      ),
      sortable: false,
    },
  ];

  const filteredData = appData?.filter((item) => {
    const matchesSearch = item?.userName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = status === "all" || item.status === status;
    return matchesSearch && matchesStatus;
  });

  const statusOptions = [
    { value: "all", label: "ALL" },
    { value: "pending", label: "Pending" },
    { value: "completed", label: "Completed" },
    { value: "rejected", label: "Rejected" },
  ];

  return (
    <div>
      <CustomDatatable
        data={filteredData}
        columns={columns}
        headtitle="PAYMENT MANAGEMENT"
        search={search}
        // statusfilter={status}
        filterOptions={statusOptions}
        setSearch={setSearch}
        setStatus={setStatus}
      />
    </div>
  );
};

export default PaymentList;
