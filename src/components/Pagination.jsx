import { LiaArrowLeftSolid, LiaArrowRightSolid } from "react-icons/lia";
import { useState, useEffect } from "react";

export default function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage); 

  useEffect(() => {
    onPageChange(currentPage); 
  }, [currentPage, onPageChange]);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const goToPage = (pageNumber) => {
    onPageChange(pageNumber);
  };

  return (
    <div className="flex justify-between items-center mt-[60px]">
      {/* Previous Button */}
      <div className="bg-white flex items-center w-[132px] h-[44px] justify-center mx-4 font-normal">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className={`flex items-center text-sm ${currentPage === 1 ? "text-gray-300" : "text-neutral-900"}`}
        >
          <LiaArrowLeftSolid className="mr-2 w-[15px] h-3" />
          Previous
        </button>
      </div>

      {/* Page Numbers */}
      <div className="flex gap-4 items-center justify-around">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((item) => (
          <button
            key={item}
            className={`mr-2 text-sm ${currentPage === item ? "font-bold border border-[#D9F99D]" : ""}`}
            onClick={() => goToPage(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <div className="bg-white flex items-center w-[132px] h-[44px] justify-center mx-4 font-normal">
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`flex items-center text-sm ${currentPage === totalPages ? "text-gray-300" : "text-neutral-900"}`}
        >
          Next
          <LiaArrowRightSolid className="ml-2 w-[15px] h-3" />
        </button>
      </div>
    </div>
  );
}
