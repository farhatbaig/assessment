export const BASE_URL = "https://dummyjson.com";

export const API_ENDPOINTS = {
  USERS: `${BASE_URL}/users`,
  PRODUCTS: `${BASE_URL}/products`,
  LAPTOPS_CATEGORY: `${BASE_URL}/products/category/laptops`,
};

export const PAGINATION = {
  DEFAULT_LIMIT: 5,
  DEFAULT_PAGE: 1,
  MAX_LIMIT: 50,
  LIMIT_OPTIONS: [5, 10, 20, 50],
};

export const TABLE_COLUMNS = {
  USERS: [
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "maidenName", label: "Maiden Name" },
    { key: "age", label: "Age" },
    { key: "gender", label: "Gender" },
    { key: "email", label: "Email" },
    { key: "birthDate", label: "Birth Date" },
    { key: "bloodGroup", label: "BloodGroup" },
    { key: "eyeColor", label: "EyeColor" },
  ],
  PRODUCTS: [
    { key: "id", label: "ID" },
    { key: "title", label: "Title" },
    { key: "price", label: "Price" },
    { key: "brand", label: "Brand" },
    { key: "category", label: "Category" },
  ],
};

export const FILTERABLE_KEYS = {
  USERS: ["firstName", "email", "birthDate", "gender"],
  PRODUCTS: ["title", "brand", "category"],
};

export const PRODUCT_TABS = ["ALL", "Laptops"];
