import { useQuery } from '@tanstack/react-query';
import DataTable from './data-table/DataTable';
import useDataTable from './data-table/useDataTable';
import { columns, User } from './types';

interface UsersResponse {
  data: User[];
  totalCount: number;
}

const fetchUsers = async (page: number, pageSize: number): Promise<UsersResponse> => {
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
  const table = useDataTable<User>({
    columns: columns,
    data: [],
  });

  const { data, isLoading } = useQuery<UsersResponse>({
    queryKey: ['users', table.getState().pagination.pageIndex, table.getState().pagination.pageSize],
    queryFn: () => fetchUsers(table.getState().pagination.pageIndex, table.getState().pagination.pageSize),
  });

  table.setOptions((prev) => ({
    ...prev,
    data: data?.data ?? [],
    state: {
      ...prev.state,
      isLoading,
      showProgressBars: isLoading,
    },
    rowCount: data?.totalCount ?? 0,
  }));

  return <DataTable table={table} />;
};

export default UsersDataTable;
