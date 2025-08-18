import React from 'react'
import { Modal } from "react-bootstrap";
import CustomDropdownWithSearch from '../CustomDropdownWithSearch';
const ChatModal = ({ show, hide, heading, data, clickHandlerForShifting, search, setSearch, currentPageForScrollPagination, setCurrentPageForScrollPagination, isScroll }) => {
  return (
    <Modal show={show} onHide={hide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{heading} </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CustomDropdownWithSearch
          data={data}
          hide={hide}
          clickHandlerForShifting={clickHandlerForShifting}
          search={search}
          setSearch={setSearch}
          paginationScrollCurrentState={currentPageForScrollPagination}
          setPaginationScrollCurrentState={setCurrentPageForScrollPagination}
          isScroll={isScroll} />
      </Modal.Body>
    </Modal>
  )
}

export default ChatModal