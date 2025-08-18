import React, { useEffect, useState } from "react";
import { MdEditSquare } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { pathData } from "../../navigation/constants";
import { NavLink } from "react-router-dom";
import ConfirmationModal from "../../components/modals/Confirm";
import CustomDatatable from "../../components/CustomDT";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Loader from "../../components/loaders/Loader";
import { DeleteBannerService, GetBannersListService } from "../../services/globalServices";
import noImaage from "../../assets/images/noimage.avif"
import { baseUrlForImage, formatDate } from "../../helper";

const BannersManagement = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedRowId, setSelectedRowId] = useState("");
  const [isConfirm, setisConfirm] = useState(false);
  const [loadingForDelete, setLoadingForDelete] = useState(false)
  const [search, setSearch] = useState("");
  // define table column
  const columns = [
    {
      name: "Title",
      selector: (row) => <div dangerouslySetInnerHTML={{ __html: row?.title }} className="text-capitalize"></div>,
      sortable: true,
    },
    {
      name: "Image",
      selector: (row) => (
        <div className="pt-1 pb-1">
          <img
            src={row?.image ? baseUrlForImage + row?.image : noImaage}
            alt="bannerImage"
            style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover" }}
          />
        </div>
      ),
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
              to={`${pathData.updateBanner}${row?._id}`}
            >
              {" "}
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

  // function for open confirmation modal
  const showDeleteConfirm = (selecttedID) => {
    setSelectedRowId(selecttedID);
    setisConfirm(true);
  };
  // function for delete banner by id
  const deletehandler = async () => {
    const isDeleted = await DeleteBannerService(setLoadingForDelete, selectedRowId);
    if (isDeleted) {
      await GetBannersListService(setData, setLoading, setTotalPages, currentPage, search);
    }
    setisConfirm(false);

  };
  // effect for get banners
  useEffect(() => {
    let delayDebounce;
    if (search) {
      // Delay API call by 500ms
      delayDebounce = setTimeout(() => {
        GetBannersListService(setData, setLoading, setTotalPages, currentPage, search)
      }, 80);
    } else {
      GetBannersListService(setData, setLoading, setTotalPages, currentPage, search)
    }
    // Cleanup timeout if component unmounts or dependencies change
    return () => clearTimeout(delayDebounce);
  }, [search, currentPage])

  // if (loading) {
  //   return <Loader />
  // }
  return (
    <div className="banner_management_wrapper dangeriousPara">
      <CustomDatatable
        loading={loading}
        data={data}
        columns={columns}
        headtitle="BANNER MANAGEMENT"
        redirectUrl={pathData.createBanner}
        createButtonTitle="Add Banner"
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

export default BannersManagement;
