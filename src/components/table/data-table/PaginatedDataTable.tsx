import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { type TableOptionsResolved } from '@tanstack/react-table';
import { memo } from 'react';
import { columns } from '../types';
import DataTable from './components/DataTable';
import useDataTable from './hooks/useDataTable';
import { PaginatedResponse, QueryOptions } from './types';

const PaginatedDataTable = memo(<T extends object>({ useQueryOptions }: { useQueryOptions: QueryOptions<T> }) => {
  // 테이블 초기세팅
  const table = useDataTable<T>({
    columns,
    data: [],
  });

  // 쿼리 연동
  const { data, isLoading } = useQuery<PaginatedResponse<T>>({
    queryKey: [
      ...useQueryOptions.queryKey,
      table.getState().pagination.pageIndex,
      table.getState().pagination.pageSize,
    ],
    queryFn: () => useQueryOptions.queryFn(table.getState().pagination.pageIndex, table.getState().pagination.pageSize),
    placeholderData: keepPreviousData,
  });

  // 데이터 변경시 테이블 업데이트
  table.setOptions((prev: TableOptionsResolved<T>) => ({
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
});

export default PaginatedDataTable;
