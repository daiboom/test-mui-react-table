import { memo, useMemo, useState } from 'react';
import TopToolbar from './components/table/data-table/components/TopToolbar';
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
  const [rowSelection, setRowSelection] = useState({});

  const queryOptions = useMemo(
    () => ({
      queryKey: ['users'],
      queryFn: fetchUsers,
    }),
    [],
  );

  console.log('queryOptions ===>', queryOptions);

  return (
    <PaginatedDataTable
      rowSelection={rowSelection}
      onRowSelectionChange={setRowSelection}
      useQueryOptions={queryOptions}
      renderBottomLeftToolbarCustomActions={() => {
        return <div>renderBottomLeftToolbarCustomActions</div>;
      }}
      renderTopToolbar={({ table }) => {
        return (
          <TopToolbar table={table} selectedRows={Object.keys(rowSelection).length} totalRows={table.getRowCount()}>
            <input type="date" />
            <input type="date" />
            <select>
              <option>hello</option>
            </select>
            <input type="text" />
            <button>조회</button>
          </TopToolbar>
        );
      }}
    />
  );
};

export default memo(UsersDataTable);
