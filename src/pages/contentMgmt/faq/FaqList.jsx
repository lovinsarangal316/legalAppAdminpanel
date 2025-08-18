import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import ConfirmationModal from "../../../components/modals/Confirm";
import { pathData } from "../../../navigation/constants";
import CustomDatatable from "../../../components/CustomDT";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { DeleteFAQService, GetFAQListService } from "../../../services/globalServices";
import Loader from "../../../components/loaders/Loader";
import { formatDate, removeHTMLTags } from "../../../helper";

const FAQ = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false)
  const [loadingForDelete, setLoadingForDelete] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedRowId, setSelectedRowId] = useState("");
  const [search, setSearch] = useState("");
  const [isConfirm, setIsConfirm] = useState(false);

  // function for confirmation popup
  const showDeleteConfirm = (selectedID) => {
    setSelectedRowId(selectedID);
    setIsConfirm(true);
  };

  // function for delete faq
  const deleteHandler = async () => {
    const isDeleted = await DeleteFAQService(setLoadingForDelete, selectedRowId)
    if (isDeleted) {
      await GetFAQListService(setData, setLoading)

    }
    setIsConfirm(false);

  };
  // define table column
  const columns = [
    {
      name: "Question",
      // selector: (row) => <div dangerouslySetInnerHTML={{ __html: row?.question }} className="text-capitalize"></div>,
      selector: (row) => <span className="text-capitalize"> {removeHTMLTags(row?.question)}</span>,
      // sortable: true,
      width: "180px"
    },
    {
      name: "Answer",
      // selector: (row) => <div dangerouslySetInnerHTML={{ __html: row?.answer }} className="text-capitalize"></div>,
      selector: (row) => <span className="text-capitalize"> {removeHTMLTags(row?.answer)}</span>,

      // sortable: true,
      width: "300px",
    },
    {
      name: "Created At",
      selector: (row) => formatDate(row?.createdAt),
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
              to={`${pathData.contentDetailFaq}${row?._id}`}
            >
              <FaEye />
            </NavLink>
          </OverlayTrigger>

          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Update</Tooltip>}
          >
            <NavLink
              className="btn btn-warning btn-sm me-2"
              to={`${pathData.contentUpdateFaq}${row?._id}`}
            >
              <MdEditSquare />
            </NavLink>
          </OverlayTrigger>

          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Delate</Tooltip>}
          >
            <button
              className="btn btn-danger btn-sm"
              onClick={() => showDeleteConfirm(row?._id)}
            >
              <FaTrashAlt />
            </button>
          </OverlayTrigger>

        </div>
      ),
      sortable: false,
      // width: "150px",
    },
  ];
  // effect for get faq list


  useEffect(() => {
    let delayDebounce;
    if (search) {
      // Delay API call by 500ms
      delayDebounce = setTimeout(() => {
        GetFAQListService(setData, setLoading, setTotalPages, currentPage, search)
      }, 80);
    } else {
      GetFAQListService(setData, setLoading, setTotalPages, currentPage, search)
    }
    return () => clearTimeout(delayDebounce);

  }, [search, currentPage])

  // if (loading) {
  //   return <Loader />
  // }
  return (
    <div className="dangeriousPara">
      <CustomDatatable
        loading={loading}
        data={data}
        columns={columns}
        headtitle="FAQ Management"
        redirectUrl={pathData.contentCreateFaq}
        createButtonTitle="Add FAQ"
        search={search}
        setSearch={setSearch}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
      {isConfirm && (
        <ConfirmationModal
          modalHeading="Delete FAQ"
          show={isConfirm}
          hide={() => setIsConfirm(false)}
          success={deleteHandler}
          loading={loadingForDelete}

        />
      )}
    </div>
  );
};

export default FAQ;
