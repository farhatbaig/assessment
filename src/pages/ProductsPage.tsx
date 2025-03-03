import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchProducts } from "../features/productsSlice";
import DataTable from "../components/DataTable";
import {  RowData } from "../types";
import { TABLE_COLUMNS, FILTERABLE_KEYS, PRODUCT_TABS, PAGINATION } from "../constants";

const ProductsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, total, loading } = useSelector((state: RootState) => state.products);

  const [limit, setLimit] = useState<number>(PAGINATION.DEFAULT_LIMIT);
  const [currentPage, setCurrentPage] = useState<number>(PAGINATION.DEFAULT_PAGE);
  const [activeTab, setActiveTab] = useState<string>("ALL");

  useEffect(() => {
    dispatch(
      fetchProducts({
        limit,
        skip: (currentPage - 1) * limit,
        category: activeTab === "Laptops" ? "laptops" : "",
      })
    );
  }, [dispatch, limit, currentPage, activeTab]);

  const fetchFilteredData = ({ key, value }: { key: string; value: string }) => {
    dispatch(
      fetchProducts({
        key,
        value,
        limit,
        skip: 0,
        category: activeTab === "Laptops" ? "laptops" : "",
      })
    );
    setCurrentPage(1);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mt-5">Products</h1>

      <div className="flex gap-4 mb-4 mt-2">
        {PRODUCT_TABS.map((tab) => (
          <button
            key={tab}
            className={`px-2 py-1 rounded ${activeTab === tab ? "bg-yellow-400" : "bg-gray-200"}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <DataTable
        data={products as RowData[]}
        columns={TABLE_COLUMNS.PRODUCTS}
        filterableKeys={FILTERABLE_KEYS.PRODUCTS}
        status={loading ? "loading" : "idle"}
        total={total}
        limit={limit}
        currentPage={currentPage}
        setLimit={setLimit}
        setCurrentPage={setCurrentPage}
        fetchFilteredData={fetchFilteredData}
      />
    </div>
  );
};

export default ProductsPage;
