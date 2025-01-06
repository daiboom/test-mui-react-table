import { memo, useMemo } from 'react';
import PaginatedDataTable from './components/table/data-table/PaginatedDataTable';
import { FetchFunction } from './components/table/data-table/types';
import { User } from './components/table/types';

const fetchUsers: FetchFunction<User> = async (page: number, pageSize: number) => {
  const response = await fetch(`https://dummyjson.com/users?skip=${page * pageSize}&limit=${pageSize}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return {
    data: data.users,
    totalCount: data.total,
  };
};

const UsersDataTable = () => {
  const queryOptions = useMemo(
    () => ({
      queryKey: ['users'],
      queryFn: fetchUsers,
    }),
    [],
  );

  console.log('queryOptions ===>', queryOptions);

  return <PaginatedDataTable useQueryOptions={queryOptions} />;
};

export default memo(UsersDataTable);
