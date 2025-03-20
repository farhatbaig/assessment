// src/types/index.ts

// 1) Allow 'undefined' in the index signature, so 'id?: number' fits
export interface RowData {
  [key: string]: string | number | boolean | null | undefined;
}

// 2) Define your Post interface, extending RowData
export interface Post extends RowData {
  id?: number;      // optional if new posts don't have an ID yet
  title: string;
  body: string;
  userId: number;
}

// 3) Define the shape for a payload of Posts
export interface PostsPayload {
  posts: Post[];
  total: number;
}

// 4) The Redux slice might store a large list of posts, plus status, etc.
export interface PostState {
  posts: PostsPayload;
  total: number;
  // or 'status' if you want it here, depending on your actual store shape:
  // status?: 'idle' | 'loading' | 'succeeded' | 'failed';
}

// 5) DataTable columns
export interface ColumnDefinition {
  key: string;
  label: string;
}

// 6) Props for your DataTable
export interface DataTableProps {
  data: RowData[];
  columns: ColumnDefinition[];
  filterableKeys?: string[];
  status?: string;
  total?: number;
  limit?: number;
  currentPage?: number;
  setCurrentPage?: (page: number) => void;
  setLimit?: (limit: number) => void;
  fetchFilteredData?: (params: { key: string; value: string }) => void;

  // 7) Deleting by numeric ID
  onDelete?: (id: number) => void;
  // 8) Updating with partial data (so 'id' can be optional)
  onUpdate?: (updatedData: Partial<Post>) => void;
}
