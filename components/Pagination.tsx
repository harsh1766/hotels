import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-12 mb-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          currentPage === 1
            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
            : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 hover:border-primary/50 hover:text-primary shadow-sm'
        }`}
      >
        <i className="fa-solid fa-chevron-left mr-1"></i> Prev
      </button>

      <div className="flex space-x-1">
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded-lg text-sm font-medium transition-all shadow-sm flex items-center justify-center ${
              currentPage === page
                ? 'bg-primary text-white shadow-primary/30'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 hover:border-primary/50 hover:text-primary'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          currentPage === totalPages
            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
            : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 hover:border-primary/50 hover:text-primary shadow-sm'
        }`}
      >
        Next <i className="fa-solid fa-chevron-right ml-1"></i>
      </button>
    </div>
  );
};

export default Pagination;
