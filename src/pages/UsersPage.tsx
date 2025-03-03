// src/pages/Users.tsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchUsers } from '../features/usersSlice';
import DataTable from '../components/DataTable';
import { FILTERABLE_KEYS, PAGINATION, TABLE_COLUMNS } from '../constants';


const Users = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { users, total, status } = useSelector((state: RootState) => state.users);

  const [limit, setLimit] = useState<number>(PAGINATION.DEFAULT_LIMIT);
  const [currentPage, setCurrentPage] = useState<number>(PAGINATION.DEFAULT_PAGE);

  useEffect(() => {
    dispatch(fetchUsers({ limit, skip: (currentPage - 1) * limit }));
  }, [dispatch, limit, currentPage]);

  const fetchFilteredData = ({ key, value }: { key: string; value: string }) => {
    dispatch(fetchUsers({ limit, skip: 0, key, value }));
    setCurrentPage(1);
  };



  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-3 mt-5">Users</h1>
      <DataTable
        data={users} 
        columns={TABLE_COLUMNS.USERS}
        filterableKeys={FILTERABLE_KEYS.USERS}
        status={status} 
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

export default Users;
