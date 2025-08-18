import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { NavLink } from "react-router-dom";
import PaginationComponent from "./Pagination";
import { Form } from "react-bootstrap";
import Loader from "./loaders/Loader";
import { useDispatch } from "react-redux";
import { searchHandler } from "../redux/slices/userProfile";
const CustomDatatable = ({
  headtitle,
  loading,
  columns,
  setStatus,
  statusfilter,
  createButtonTitle,
  data,
  redirectUrl,
  search,
  setSearch,
  filterOptions,
  currentPage,
  setCurrentPage,
  totalPages
}) => {
  const dispatch = useDispatch()
  return (
    <div className="data_table_wrapper">
      <div className="table_head">
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2 w-25"
          aria-label="Search"
          value={search}
          onChange={(e) => setSearch ? setSearch(e?.target?.value) : dispatch(searchHandler(e?.target?.value))}
        />

        {redirectUrl && (
          createButtonTitle !== "Add New User" &&
          <NavLink className="btn btn-dark text-uppercase text-white" to={redirectUrl}>
            {createButtonTitle}
          </NavLink>
        )}
        {statusfilter && (
          <Form.Select
            aria-label="Default select example"
            className="w-25"
            name="statusFilter"
            value={statusfilter}
            onChange={(e) => setStatus(e?.target?.value)}
          >
            {filterOptions?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Form.Select>
        )}
      </div>
      {/* Show Loader only if loading is true and search is empty */}
      {loading && !search ? <Loader /> : <DataTable columns={columns} data={data} />}
      {!isNaN(totalPages) && totalPages > 0 && (
        <div className="pagination_component d-flex justify-content-end">
          {
            <PaginationComponent
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          }

        </div>
      )}
    </div>
  );
};

export default CustomDatatable;
