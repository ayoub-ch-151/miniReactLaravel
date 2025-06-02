import React from "react";

export default function Pagination({ currentPage, lastPage, onPageChange }) {
  if (lastPage === 0) return null;

  // Helper to create a range of pages
  function getPageNumbers() {
    const delta = 2; // how many pages to show before and after current
    const range = [];
    const left = Math.max(2, currentPage - delta);
    const right = Math.min(lastPage - 1, currentPage + delta);

    for (let i = left; i <= right; i++) {
      range.push(i);
    }

    // Include first and last page and add ellipsis if needed
    if (left > 2) {
      range.unshift("...");
    }
    if (right < lastPage - 1) {
      range.push("...");
    }
    range.unshift(1);
    if (lastPage > 1) range.push(lastPage);

    return range;
  }

  const pages = getPageNumbers();

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => onPageChange(currentPage - 1)} aria-label="Previous">
            &laquo;
          </button>
        </li>

        {pages.map((page, index) =>
          page === "..." ? (
            <li key={`ellipsis-${index}`} className="page-item disabled">
              <span className="page-link">...</span>
            </li>
          ) : (
            <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
              <button className="page-link" onClick={() => onPageChange(page)}>
                {page}
              </button>
            </li>
          )
        )}

        <li className={`page-item ${currentPage === lastPage ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => onPageChange(currentPage + 1)} aria-label="Next">
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
}
