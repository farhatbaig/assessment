import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { DataTableProps, RowData } from '../types';
import { PAGINATION } from '../constants';


function getPaginationRange(currentPage: number, totalPages: number): Array<number | string> {
  const maxButtons = 7;
  const pages: Array<number | string> = [];

  if (totalPages <= maxButtons) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);
    const left = Math.max(currentPage - 2, 2);
    const right = Math.min(currentPage + 2, totalPages - 1);

    if (left > 2) pages.push('...');

    for (let i = left; i <= right; i++) {
      pages.push(i);
    }
    if (right < totalPages - 1) pages.push('...');
    pages.push(totalPages);
  }
  return pages;
}



const DataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  filterableKeys = [],    
  status = 'idle',
  total = 0,
  limit = PAGINATION.DEFAULT_LIMIT,
  currentPage = PAGINATION.DEFAULT_PAGE,
  setCurrentPage = () => {},
  setLimit = () => {},
  fetchFilteredData = () => {},
}) => {
  const totalPages = total && limit ? Math.ceil(total / limit) : 1;

  const [showInput, setShowInput] = useState(false);
  const [inputType, setInputType] = useState<'search' | 'filter'>('search');
  const [activeFilterKey, setActiveFilterKey] = useState<string>('');

  const [searchQuery, setSearchQuery] = useState('');
  const [filterValue, setFilterValue] = useState('');

  const [filteredData, setFilteredData] = useState<RowData[]>(data);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredData(data);
      return;
    }
    const lower = searchQuery.toLowerCase();
    const newData = data.filter((row) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(lower)
      )
    );
    setFilteredData(newData);
  }, [searchQuery, data]);

  const handleFilterChange = (key: string, value: string) => {
    setCurrentPage(1);
    fetchFilteredData({ key, value });
  };

  const pagesToDisplay = getPaginationRange(currentPage, totalPages);

  return (
    <div className="bg-white shadow-lg rounded-lg p-2 overflow-x-auto">
      <div className="flex items-center gap-4 border border-gray-300 p-2 mb-4">
        
      <select
          onChange={(e) => {
            setCurrentPage(1);
            setLimit(Number(e.target.value));
          }}
          className="p-2 border rounded bg-white text-[#322625]"
        >
          {PAGINATION.LIMIT_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span className="text-[#322625]">Entries</span>

        <span className="border-l border-gray-300 h-5" />

        <button
          onClick={() => {
            setShowInput(!showInput);
            setInputType('search');
            setActiveFilterKey('');
            setFilterValue('');
          }}
          className="p-2 border rounded bg-[#c0e3e5] flex items-center gap-1"
        >
          <FaSearch />
        </button>

        {showInput && inputType === 'search' && (
          <input
            type="text"
            placeholder="Search..."
            className="p-2 border rounded"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        )}

        <span className="border-l border-gray-300 h-5" />

        <div className="flex items-center gap-4 text-[#322625]">
          {filterableKeys.map((filterKey) => {
            const colLabel = columns.find((c) => c.key === filterKey)?.label || filterKey;
            return (
              <div
                key={filterKey}
                className="cursor-pointer flex items-center gap-1"
                onClick={() => {
                  setShowInput(true);
                  setInputType('filter');
                  setActiveFilterKey(filterKey);
                  setSearchQuery('');
                  setFilterValue('');
                }}
              >
                {colLabel} ▾
              </div>
            );
          })}
        </div>
      </div>

      {showInput && inputType === 'filter' && activeFilterKey && (
        <div className="p-2 mb-2">
          <input
            type="text"
            placeholder={`Filter by ${activeFilterKey}`}
            className="p-2 border rounded w-full"
            value={filterValue}
            onChange={(e) => {
              setFilterValue(e.target.value);
              handleFilterChange(activeFilterKey, e.target.value);
            }}
          />
        </div>
      )}

      {status === 'loading' ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <>
          <table className="w-full border-collapse border border-gray-300 text-left">
            <thead>
              <tr className="bg-[#c0e3e5] text-[#322625] uppercase text-sm">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="p-3 border border-gray-400"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((row) => (
                  <tr
                    key={String(row.id)}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    {columns.map((col) => {
                      const cellVal = row[col.key];
                      return (
                        <td key={col.key} className="p-3">
                          {cellVal == null ? 'N/A' : String(cellVal)}
                        </td>
                      );
                    })}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="text-center p-4 text-gray-500">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="flex justify-center mt-4">
            {pagesToDisplay.map((page, idx) =>
              page === '...' ? (
                <span key={idx} className="px-3 py-1 mx-1 text-gray-400">
                  ...
                </span>
              ) : (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(Number(page))}
                  className={`px-3 py-1 mx-1 rounded ${
                    currentPage === page ? 'bg-yellow-400' : 'bg-gray-200'
                  }`}
                >
                  {page}
                </button>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default DataTable;
