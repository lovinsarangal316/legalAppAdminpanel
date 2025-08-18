import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import ConfirmationModal from "../../../components/modals/Confirm";
import { pathData } from "../../../navigation/constants";
import CustomDatatable from "../../../components/CustomDT";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { DeletePublicationService, GetPublicationListService } from "../../../services/globalServices";
import Loader from "../../../components/loaders/Loader";
import { baseUrlForImage, formatDate, removeHTMLTags } from "../../../helper";
import noImaage from "../../../assets/images/noimage.avif"

const Publication = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedRowId, setSelectedRowId] = useState("");
  const [loadingForDelete, setLoadingForDelete] = useState(false)
  const [search, setSearch] = useState("");
  const [isConfirm, setisConfirm] = useState(false);

  // function for open confirmation modal
  const showDeleteConfirm = (selecttedID) => {
    setSelectedRowId(selecttedID);
    setisConfirm(true);
  };
  // function for delete publication by id
  const deletehandler = async () => {
    const isDeleted = await DeletePublicationService(setLoadingForDelete, selectedRowId)
    if (isDeleted) {
      await GetPublicationListService(setData, setLoading)
    }
    setisConfirm(false);
  };
  // define table column
  const columns = [
    {
      name: "Image",
      selector: (row) => (
        <div className="pt-1 pb-1">
          <img
            src={row?.image ? baseUrlForImage + row.image : noImaage}
            alt="publicationImage"
            style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover" }}
          />
        </div>
      ),
      width: "100px"

    },
    {
      name: "title",
      // selector: (row) => <div dangerouslySetInnerHTML={{ __html: row?.title }} className="text-capitalize"></div>,
      selector: (row) => <span className="text-capitalize"> {removeHTMLTags(row?.title)}</span>,
      sortable: true,
    },

    {
      name: "Description",
      // selector: (row) => <div dangerouslySetInnerHTML={{ __html: row?.description }} className="text-capitalize"></div>,
      selector: (row) => <span className="text-capitalize"> {removeHTMLTags(row?.description)}</span>,
      sortable: true,
      width: "300px"
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
              to={`${pathData.contentDetailPublication}${row?._id}`}
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
              to={`${pathData.contentUpdatePublication}${row?._id}`}
            >
              <MdEditSquare />
            </NavLink>
          </OverlayTrigger>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Delete</Tooltip>}
          >
            <button className="btn btn-danger btn-sm" onClick={() => showDeleteConfirm(row?._id)}>
              <FaTrashAlt />
            </button>
          </OverlayTrigger>
        </div>
      ),
      sortable: false,
    },
  ];

  // effect for get publication list
  useEffect(() => {
    let delayDebounce;
    if (search) {
      // Delay API call by 500ms
      delayDebounce = setTimeout(() => {
        GetPublicationListService(setData, setLoading, setTotalPages, currentPage, search)
      }, 80);
    } else {
      GetPublicationListService(setData, setLoading, setTotalPages, currentPage, search)
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
        headtitle="PUBLICATION"
        redirectUrl={pathData.contentCreatePublication}
        createButtonTitle="Add Publication"
        search={search}
        setSearch={setSearch}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
      {isConfirm && (
        <ConfirmationModal
          modalHeading="Delete"
          show={isConfirm}
          hide={() => setisConfirm(false)}
          success={deletehandler}
          loading={loadingForDelete}
        />
      )}
    </div>
  );
};

export default Publication;
