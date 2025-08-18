import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import ConfirmationModal from "../../components/modals/Confirm";
import { NavLink } from "react-router-dom";
import { pathData } from "../../navigation/constants";
import CustomDatatable from "../../components/CustomDT";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { DeleteUserService, GetUsersService } from "../../services/globalServices";
import Loader from "../../components/loaders/Loader";
import noImaage from "../../assets/images/noimage.avif"
import { baseUrlForImage, formatDate } from "../../helper";
import { useDispatch, useSelector } from "react-redux";
import { currentPagehandler, resetCurrentPagehandler, resetSearchhandler, searchHandler, searchHandlerFlag } from "../../redux/slices/userProfile";
const UserList = () => {
  const { search, currentPageNumber, searchFlag } = useSelector((state) => state?.userProfile);
  const [data, setData] = useState([]);
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(currentPageNumber || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingForDelete, setLoadingForDelete] = useState(false)
  const [selectedRowId, setSelectedRowId] = useState("");
  // const [search, setSearch] = useState(location?.state?.search || "");
  const [isConfirm, setisConfirm] = useState(false);
  // function for show confirmation modal
  const showDeleteConfirm = (selectedID) => {
    setSelectedRowId(selectedID);
    setisConfirm(true);
  };
  // function for delete user by ID
  const deletehandler = async () => {
    const isDeleted = await DeleteUserService(setLoadingForDelete, selectedRowId);
    if (isDeleted) {
      await GetUsersService(setData, setLoading, setTotalPages, currentPage, search);
    }
    setisConfirm(false);

  }
  // Define table column
  const columns = [
    // {
    //   name: "Image",
    //   selector: (row) => <img src={row?.image ? baseUrlForImage + row.image : noImaage} alt="userimage" style={{ height: "50px", width: "50px", borderRadius: "50%", objectFit: "cover" }} />,
    //   sortable: true,
    //   width: "100px"
    // },
    {
      name: "Full name",
      selector: (row) => <span className="text-capitalize"> {row?.usR_Names}</span>,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row?.usR_EmailAccount,
      sortable: true,
    },
    {
      name: "Username",
      selector: (row) => <span className="text-capitalize"> {row?.usR_Username}</span>,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => `${row?.phoneNumber}`,
      sortable: true,
    },
    // {
    //   name: "Role",
    //   selector: (row) => <span className="text-capitalize">{row?.role} </span>,
    //   sortable: true,
    // },
    // {
    //   name: "Created At",
    //   selector: (row) => formatDate(row?.createdAt),
    //   sortable: true,
    // },

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
              to={`${pathData.userMgmtUsersDetail}${row?.id}`}
              onClick={() => dispatch(currentPagehandler(currentPage)) & dispatch(searchHandler(search)) & dispatch(searchHandlerFlag("User management"))}
            >
              <FaEye />
            </NavLink>
          </OverlayTrigger>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Update</Tooltip>}

          >
            <div onClick={() => "dispatch(searchHandler(search))"} >
              <NavLink
                className="btn btn-warning btn-sm me-2 d-none"
                to={`${pathData.userManagementUpdateUser}${row?._id}`}

              >
                <MdEditSquare />
              </NavLink>
            </div>
          </OverlayTrigger>

          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Delete</Tooltip>}
          >
            <button className="btn btn-danger btn-sm d-none" onClick={() => showDeleteConfirm(row?._id)}>
              <FaTrashAlt />
            </button>
          </OverlayTrigger>
        </div>
      ),
      sortable: false,
    },
  ];
  // effect for get user list
  useEffect(() => {
    let delayDebounce;
    if (search) {
      // Delay API call by 500ms
      delayDebounce = setTimeout(() => {
        GetUsersService(setData, setLoading, setTotalPages, currentPage, search)
      }, 80);
    } else {
      // Immediate API call for default case
      GetUsersService(setData, setLoading, setTotalPages, currentPage, search)
    }
    // Cleanup timeout if component unmounts or dependencies change
    return () => clearTimeout(delayDebounce);
  }, [search, currentPage])

  useEffect(() => {
    dispatch(resetCurrentPagehandler())
    if (searchFlag === "App management" || searchFlag === "Trademark management") {
      dispatch(resetSearchhandler())
    }
  }, [])

  // if (loading) {
  //   return <Loader />
  // }

  return (
    <div>
      <CustomDatatable
        loading={loading}
        data={data}
        columns={columns}
        headtitle="USER MANAGEMENT"
        redirectUrl={pathData.userManagementCreateUser}
        createButtonTitle="Add New User"
        search={search}
        // setSearch={setSearch}
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

export default UserList;
