import React, { useEffect, useState } from "react";
import CustomDatatable from "../../components/CustomDT";
import { NavLink } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { pathData } from "../../navigation/constants";
import { Badge, OverlayTrigger, Tooltip } from "react-bootstrap";
import Loader from "../../components/loaders/Loader";
import { GetTrademarkListService } from "../../services/globalServices";
import { EnumForStatus, EnumForStatusColor, formatDate } from "../../helper";
import { currentPagehandler, resetCurrentPagehandler, resetSearchhandler, searchHandler, searchHandlerFlag } from "../../redux/slices/userProfile";
import { useDispatch, useSelector } from "react-redux";

const TmList = () => {
  const dispatch = useDispatch()
  const { currentPageNumber, search, searchFlag } = useSelector((state) => state?.userProfile);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(currentPageNumber || 1);
  const [totalPages, setTotalPages] = useState(1);
  // const [search, setSearch] = useState("");
  // const columns = [
  //   {
  //     name: "Trademark Name",
  //     selector: (row) => row?.trademark_name,
  //     sortable: true,
  //   },
  //   {
  //     name: "Application Number",
  //     selector: (row) => row?.trademark_identity,
  //     sortable: true,
  //   },
  //   {
  //     name: "Status",
  //     selector: (row) => row?.trademark_status,
  //     cell: (row) => (
  //       <div className="text-capitalize">
  //         <Badge
  //           bg={
  //             row?.trademark_status === EnumForStatus?.Pending
  //               ? EnumForStatusColor.Info
  //               : row?.trademark_status === EnumForStatus?.Approved
  //                 ? EnumForStatusColor.Success
  //                 : row?.trademark_status == EnumForStatus?.InProgress
  //                   ? EnumForStatusColor.Warning
  //                   : EnumForStatusColor.Danger
  //           }
  //         >
  //           {row?.trademark_status}
  //         </Badge>
  //       </div>
  //     ),
  //   },
  //   {
  //     name: "Application Date",
  //     selector: (row) => formatDate(row.createdAt),
  //     sortable: true,
  //   },
  //   {
  //     name: "Action",
  //     selector: (row) => (
  //       <div className="d-flex position-relative">
  //         <OverlayTrigger placement="top" overlay={<Tooltip>Detail</Tooltip>}>
  //           <NavLink
  //             className="btn btn-primary btn-sm me-2"
  //             to={`${pathData.tradeMarkDetails}${row?._id}`}
  //           >
  //             <FaEye />
  //           </NavLink>
  //         </OverlayTrigger>
  //       </div>
  //     ),
  //     sortable: false,
  //   },
  // ];


  const columns = [
    {
      name: "Denomination",
      selector: (row) => row?.denomination,
      sortable: true,
    },
    {
      name: "Title",
      selector: (row) => row?.title,
      sortable: true,
    },
    {
      name: "Register Status",
      selector: (row) => row?.registerStatus,
      sortable: true,
    },
    {
      name: "Endorsements",
      selector: (row) => row?.endorsements ? row?.endorsements : "N/A",
      sortable: true,
    },
    {
      name: "Unique Reference",
      selector: (row) => row?.uniqueReference,
      sortable: true,
    },
    // {
    //   name: "International Classification Number",
    //   selector: (row) => row?.internationalClassificationNumber,
    //   sortable: true,
    // },
    // {
    //   name: "GPA Number",
    //   selector: (row) => row?.gpaNumber,
    //   sortable: true,
    // },
    // {
    //   name: "Goods And Services",
    //   selector: (row) => row?.goodsAndServices,
    //   sortable: true,
    // },
    // {
    //   name: "Good And Services",
    //   selector: (row) => row?.goodAndServices,
    //   sortable: true,
    // },
    // {
    //   name: "Filing Status",
    //   selector: (row) => row?.filingStatus,
    //   sortable: true,
    // },
    // {
    //   name: "Endorsements",
    //   selector: (row) => row?.endorsements,
    //   sortable: true,
    // },
    // {
    //   name: "Denomination",
    //   selector: (row) => row?.denomination,
    //   sortable: true,
    // },
    // {
    //   name: "Customer Code",
    //   selector: (row) => row?.customerCode,
    //   sortable: true,
    // },
    {
      name: "Application Date",
      selector: (row) => formatDate(row?.applicationDate),
      sortable: true,
    },

    // {
    //   name: "Add for Service Name",
    //   selector: (row) => row?.addforService?.name,
    //   sortable: true,
    // },
    // {
    //   name: "Add for Service Email",
    //   selector: (row) => row?.addforService?.email,
    //   sortable: true,
    // },
    // {
    //   name: "Add for Service Address",
    //   selector: (row) => row?.addforService?.address,
    //   sortable: true,
    // },
    // {
    //   name: "Add for Service County Name",
    //   selector: (row) => row?.addforService?.countyName,
    //   sortable: true,
    // },
    // {
    //   name: "Add for Service DocEX",
    //   selector: (row) => row?.addforService?.docEx,
    //   sortable: true,
    // },
    // {
    //   name: "Add for Service Fax",
    //   selector: (row) => row?.addforService?.fax,
    //   sortable: true,
    // },
    // {
    //   name: "Add for Service Phone",
    //   selector: (row) => row?.addforService?.phone,
    //   sortable: true,
    // },
    // {
    //   name: "Add for Service Town",
    //   selector: (row) => row?.addforService?.town,
    //   sortable: true,
    // },
    // {
    //   name: "Add for Service Zipcode",
    //   selector: (row) => row?.addforService?.zipCode,
    //   sortable: true,
    // },

    // {
    //   name: "Status",
    //   selector: (row) => row?.trademark_status,
    //   cell: (row) => (
    //     <div className="text-capitalize">
    //       <Badge
    //         bg={
    //           row.trademark_status === EnumForStatus.Pending
    //             ? EnumForStatusColor.Info
    //             : row.trademark_status === EnumForStatus.Approved
    //               ? EnumForStatusColor.Success
    //               : row.trademark_status == EnumForStatus.InProgress
    //                 ? EnumForStatusColor.Warning
    //                 : EnumForStatusColor.Danger
    //         }
    //       >
    //         {row.trademark_status}
    //       </Badge>
    //     </div>
    //   ),
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
          <OverlayTrigger placement="top" overlay={<Tooltip>Detail</Tooltip>}>
            <NavLink
              className="btn btn-primary btn-sm me-2"
              to={`${pathData.tradeMarkDetails}${row?.uniqueReference}`}
              onClick={() => dispatch(currentPagehandler(currentPage)) & dispatch(searchHandler(search)) & dispatch(searchHandlerFlag("Trademark management"))}
            >
              <FaEye />
            </NavLink>
          </OverlayTrigger>
        </div>
      ),
      sortable: false,
    },
  ];

  // const filterData = data?.filter((curElm) => {
  //   const matchSearch = curElm?.title.toLowerCase().includes(search.toLowerCase()) || curElm?.uniqueReference.toLowerCase().includes(search.toLowerCase())
  //   return matchSearch
  // })

  // effect for get user list
  useEffect(() => {
    let delayDebounce;
    if (search) {
      // Delay API call by 500ms
      delayDebounce = setTimeout(() => {
        GetTrademarkListService(
          setData,
          setLoading,
          setTotalPages,
          currentPage,
          search,
        );
      }, 80);
    } else {
      // Immediate API call for default case
      GetTrademarkListService(
        setData,
        setLoading,
        setTotalPages,
        currentPage,
        search,
      );
    }
    // Cleanup timeout if component unmounts or dependencies change
    return () => clearTimeout(delayDebounce);
  }, [search, currentPage]);
  useEffect(() => {
    dispatch(resetCurrentPagehandler())
    if (searchFlag === "User management" || searchFlag === "App management") {
      dispatch(resetSearchhandler())
    }
  }, [])
  // if (loading) {
  //   return <Loader />;
  // }

  return (
    <div>
      <CustomDatatable
        loading={loading}
        data={data || []}
        columns={columns}
        headtitle="TRADEMARK MANAGEMENT"
        search={search}
        // setSearch={setSearch}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default TmList;
