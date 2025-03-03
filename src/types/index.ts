// ✅ Shared Interface for Dynamic Table Row Data
export interface RowData {
    [key: string]: string | number | boolean | null;
  }
  
  // ✅ Product Interface (Extends RowData for DataTable Compatibility)
  export interface Product extends RowData {
    id: number;
    title: string;
    price: number;
    brand: string;
    category: string;
  }
  
  // ✅ User Interface (Extends RowData for DataTable Compatibility)
  export interface User extends RowData {
    id: number;
    firstName: string;
    email: string;
    birthDate: string;
    gender: string;
  }
  
  // ✅ Product Slice State
  export interface ProductsPayload {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
  }
  
  export interface ProductState {
    products: ProductsPayload;
    loading: boolean;
    error: string | null;
  }
  
  // ✅ User Slice State
  export interface UsersPayload {
    users: User[];
    total: number;
  }
  
  export interface UserState {
    users: UsersPayload;
    total: number;
    status: "idle" | "loading" | "succeeded" | "failed";
  }
  
  // ✅ Table Column Definitions
  export interface ColumnDefinition {
    key: string;
    label: string;
  }
  
  // ✅ Props for the DataTable Component
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
  }
  