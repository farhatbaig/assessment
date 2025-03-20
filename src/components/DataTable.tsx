import React, { useState, useEffect } from 'react';
import { DataTableProps, RowData } from '../types';
import { PAGINATION } from '../constants';
import { FaEdit, FaTrash } from 'react-icons/fa';


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
  total = 0,
  limit = PAGINATION.DEFAULT_LIMIT,
  currentPage = PAGINATION.DEFAULT_PAGE,
  setCurrentPage = () => {},
  onDelete,
  onUpdate,
}) => {
  const totalPages = limit ? Math.ceil(total / limit) : 1;

  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  const [editRow, setEditRow] = useState<RowData | null>(null);
  const [editValues, setEditValues] = useState<Partial<RowData>>({});

  const [filteredData, setFilteredData] = useState<RowData[]>([]);

  useEffect(() => {
    let newData = [...data];

    if (searchQuery) {
      const lower = searchQuery.toLowerCase();
      newData = newData.filter((row) =>
        Object.values(row).some((val) => String(val).toLowerCase().includes(lower))
      );
    }

    Object.keys(filters).forEach((key) => {
      const filterText = filters[key]?.toLowerCase();
      if (filterText) {
        newData = newData.filter((row) =>
          String(row[key]).toLowerCase().includes(filterText)
        );
      }
    });

    // 3) Pagination: slice from (currentPage - 1) * limit to currentPage * limit
    const start = (currentPage - 1) * limit;
    const end = start + limit;
    newData = newData.slice(start, end);

    setFilteredData(newData);
  }, [data, searchQuery, filters, currentPage, limit]);

  const handleEditClick = (row: RowData) => {
    setEditRow(row);
    setEditValues(row);
  };

  const handleUpdateClick = () => {
    if (editRow && onUpdate) {
      onUpdate(editValues);
      setEditRow(null);
    }
  };

  const handleDeleteClick = (id: number) => {
    onDelete?.(id);
  };

  const pagesToDisplay = getPaginationRange(currentPage, totalPages);

  return (
    <div className="bg-white shadow-lg rounded-lg p-2 overflow-x-auto">
      <div className="flex items-center gap-4 border border-gray-300 p-2 mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 border rounded"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <table className="w-full border-collapse border border-gray-300 text-left">
        <thead>
          <tr className="bg-[#c0e3e5] text-[#322625] uppercase text-sm">
            {columns.map((col) => (
              <th key={col.key} className="p-3 border border-gray-400">
                {col.label}
                {filterableKeys.includes(col.key) && (
                  <input
                    type="text"
                    placeholder={`Filter by ${col.label}`}
                    className="ml-2 p-1 border rounded"
                    onChange={(e) =>
                      setFilters({ ...filters, [col.key]: e.target.value })
                    }
                  />
                )}
              </th>
            ))}
            <th className="p-3 border border-gray-400">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((row) => (
              <tr
                key={String(row.id)}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                {columns.map((col) => (
                  <td key={col.key} className="p-3">
                    {editRow?.id === row.id ? (
                      <input
                        type="text"
                        value={String(editValues[col.key] ?? '')}
                        disabled={col.key === 'id'}
                        onChange={(e) =>
                          setEditValues({ ...editValues, [col.key]: e.target.value })
                        }
                        className="p-1 border rounded w-full"
                      />
                    ) : (
                      String(row[col.key]) || 'N/A'
                    )}
                  </td>
                ))}
                <td className="p-3 flex gap-2">
                  {editRow?.id === row.id ? (
                    <button
                      onClick={handleUpdateClick}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditClick(row)}
                      className=" text-black px-2 py-1 rounded"
                    >
                       <FaEdit />
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteClick(row.id as number)}
                    className="text-black px-2 py-1 rounded"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="text-center p-4 text-gray-500"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* PAGINATION */}
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
    </div>
  );
};

export default DataTable;
