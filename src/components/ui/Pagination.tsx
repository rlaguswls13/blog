"use client";

import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxPageButtons?: number;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  maxPageButtons = 5,
}: PaginationProps) {
  // Always show at least 1 page even if totalPages is 0 or 1
  const displayPages = totalPages > 0 ? totalPages : 1;

  const currentGroup = Math.floor((currentPage - 1) / maxPageButtons);
  const startPage = currentGroup * maxPageButtons + 1;
  const endPage = Math.min(startPage + maxPageButtons - 1, displayPages);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-container">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="pagination-btn arrow"
        aria-label="Previous Page"
      >
        &lt;
      </button>

      {pageNumbers.map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={`pagination-btn ${currentPage === num ? "active" : ""}`}
        >
          {num}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, displayPages))}
        disabled={currentPage === displayPages}
        className="pagination-btn arrow"
        aria-label="Next Page"
      >
        &gt;
      </button>
    </div>
  );
}
