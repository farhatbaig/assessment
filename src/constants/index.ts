export const BASE_URL = "https://jsonplaceholder.typicode.com/";

export const API_ENDPOINTS = {
  POSTS: `${BASE_URL}/posts`,
};

export const PAGINATION = {
  DEFAULT_LIMIT: 5,
  DEFAULT_PAGE: 1,
  MAX_LIMIT: 50,
  LIMIT_OPTIONS: [5, 10, 20, 50],
};

export const TABLE_COLUMNS = {
  POST: [
    { key: "id", label: "ID " },
    { key: "title", label: "Title" },
    { key: "body", label: "Description" },
    { key: "userId", label: "User Id" },
  ],
 
};



