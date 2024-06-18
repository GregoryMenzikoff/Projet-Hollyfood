import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({ pageCount, handlePageClick }) => {
  return (
    <ReactPaginate
      previousLabel={'Préc..'}
      nextLabel={'Suiv..'}
      breakLabel={'...'}
      breakClassName={'break-me'}
      pageCount={pageCount}
      marginPagesDisplayed={1}
      pageRangeDisplayed={1}
      onPageChange={handlePageClick}
      containerClassName={'flex items-center mt-4'}
      pageClassName={'mx-1 px-3 py-2  rounded-full bg-yellow-400 text-black'}
      pageLinkClassName={'mx-1'}
      previousClassName={' mx-1'}
      previousLinkClassName={'px-4 py-2 rounded-3xl bg-black text-yellow-400'}
      nextClassName={'mx-1'}
      nextLinkClassName={'px-4 py-2 border rounded-3xl bg-black text-yellow-400'}
      activeClassName={' mb-1 px-3 py-2  rounded-full bg-yellow-400 text-black'}
    />
  );
};

export default Pagination;