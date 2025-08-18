// import React from 'react'
// const CustomDropdownWithSearch = ({ data, clickHandlerForShifting, search, setSearch, paginationScrollCurrentState, setPaginationScrollCurrentState }) => {
//   return (
//     <div className='custom_dropdown_search'>
//       <div className='inputSearch'>
//         <input type="search" value={search} name='search' placeholder='Search user...' onChange={(e) => setSearch(e.target.value)} className='form-control' />
//       </div>
//       {
//         <div className='card border rounded p-2 mt-2' style={{ height: "200px", overflowY: "auto" }}>
//           {data?.length > 0 ? data?.map((curElm) => <div key={curElm?.id} className='custom_dropdown_search_hover d-flex p-2' onClick={() => "setSearch(curElm?.usR_Names) & clickHandlerForShifting(curElm)"}>
//             <h6 className='p-2 cursor text-capitalize'>{curElm?.usR_Names} </h6>
//           </div>) : <div className='text-center mt-2'>User Not Found</div>}
//         </div>
//       }

//     </div>
//   )
// }

// export default CustomDropdownWithSearch

import React, { useRef } from 'react';
import { toast } from 'react-toastify';

const CustomDropdownWithSearch = ({
  data,
  clickHandlerForShifting,
  search,
  setSearch,
  paginationScrollCurrentState,
  setPaginationScrollCurrentState,
  isScroll
}) => {
  const dropdownRef = useRef();
  const handleScroll = () => {
    const container = dropdownRef.current;
    if (container) {
      const { scrollTop, scrollHeight, clientHeight } = container;
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        // Near bottom, call pagination handler
        if (isScroll) {
          setPaginationScrollCurrentState(prev => prev + 1);
        }
      }
    }
  };

  return (
    <div className='custom_dropdown_search'>
      <div className='inputSearch'>
        <input
          type="search"
          value={search}
          name='search'
          placeholder='Search user...'
          onChange={(e) => setSearch(e.target.value)}
          className='form-control'
        />
      </div>

      <div
        ref={dropdownRef}
        className='card border rounded p-2 mt-2'
        style={{ height: "200px", overflowY: "auto" }}
        onScroll={handleScroll}
      >
        {data?.length > 0 ? (
          data.map((curElm) => (
            <div
              key={curElm?.id}
              className='custom_dropdown_search_hover d-flex p-2'
              onClick={() => {
                setSearch(curElm?.usR_Names);
                clickHandlerForShifting(curElm);
              }}
            >
              <h6 className='p-2 cursor text-capitalize'>{curElm?.usR_Names}</h6>
            </div>
          ))
        ) : (
          <div className='text-center mt-2'>User Not Found</div>
        )}
      </div>
    </div>
  );
};

export default CustomDropdownWithSearch;
