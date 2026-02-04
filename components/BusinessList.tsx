import React, { useState, useMemo } from 'react';
import { Business } from '../types';
import BusinessCard from './BusinessCard';
import Pagination from './Pagination';

interface BusinessListProps {
  data: Business[];
}

const ITEMS_PER_PAGE = 10;

const BusinessList: React.FC<BusinessListProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAndSortedData = useMemo(() => {
    // 1. Filter
    let processed = data;
    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase().trim();
      processed = processed.filter(business => 
        business.name.toLowerCase().includes(lowerQuery)
      );
    }

    // 2. Sort
    return [...processed].sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (sortOrder === 'asc') {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });
  }, [data, sortOrder, searchQuery]);

  const totalPages = Math.ceil(filteredAndSortedData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredAndSortedData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as 'asc' | 'desc');
    setCurrentPage(1); // Reset to first page when sort order changes
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when search changes
  };

  const clearSearch = () => {
    setSearchQuery('');
    setCurrentPage(1);
  };

  return (
    <div>
      <div className="mb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
         <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Explore Hotels</h1>
            <p className="text-slate-500">
                {filteredAndSortedData.length > 0 
                  ? `Showing ${startIndex + 1}-${Math.min(startIndex + ITEMS_PER_PAGE, filteredAndSortedData.length)} of ${filteredAndSortedData.length} hotels`
                  : 'No hotels found'
                }
                {searchQuery && ` matching "${searchQuery}"`}
            </p>
         </div>

         <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fa-solid fa-magnifying-glass text-slate-400"></i>
                </div>
                <input 
                    type="text" 
                    placeholder="Search by name..." 
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full pl-10 pr-10 py-2 bg-white border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm text-slate-700"
                />
                {searchQuery && (
                    <button 
                        onClick={clearSearch}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                        title="Clear search"
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center bg-white border border-slate-300 rounded-lg shadow-sm px-3 py-2 w-full sm:w-auto">
                <label htmlFor="sort-select" className="text-sm font-medium text-slate-700 mr-2 whitespace-nowrap">Sort by:</label>
                <div className="relative flex-grow sm:flex-grow-0">
                    <select
                        id="sort-select"
                        value={sortOrder}
                        onChange={handleSortChange}
                        className="appearance-none bg-transparent text-slate-700 pr-6 focus:outline-none text-sm font-medium cursor-pointer w-full"
                    >
                        <option value="asc">Name (A-Z)</option>
                        <option value="desc">Name (Z-A)</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-slate-500">
                        <i className="fa-solid fa-chevron-down text-xs"></i>
                    </div>
                </div>
            </div>
         </div>
      </div>

      {filteredAndSortedData.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-slate-100">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
             <i className="fa-solid fa-magnifying-glass text-3xl text-slate-300"></i>
          </div>
          <h3 className="text-xl font-medium text-slate-800 mb-2">No hotels found</h3>
          <p className="text-slate-500 max-w-md mx-auto">
             We couldn't find any hotels matching "{searchQuery}". Try adjusting your search term.
          </p>
          <button 
             onClick={clearSearch}
             className="mt-6 px-6 py-2 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors"
          >
             Clear Search
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentItems.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default BusinessList;