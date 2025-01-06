import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { OnChangeFn, RowSelectionState, type TableOptionsResolved } from '@tanstack/react-table';
import { MRT_RowData, MRT_TableInstance } from 'material-react-table';
import { memo, ReactNode, useCallback, useEffect, useState } from 'react';
import { columns } from '../types';
import DataTable from './components/DataTable';
import Pagination from './components/Pagination';
import useDataTable from './hooks/useDataTable';
import { PaginatedResponse, QueryOptions } from './types';

interface PaginatedDataTableProps<T extends MRT_RowData> {
  useQueryOptions: QueryOptions<T>;
  pagination?: {
    page: number;
    perPage: number;
  };
  rowSelection: RowSelectionState;
  onRowSelectionChange: OnChangeFn<RowSelectionState>;
  renderTopToolbar?: (props: { table: MRT_TableInstance<T> }) => ReactNode;
  renderBottomLeftToolbarCustomActions?: (props: { table: MRT_TableInstance<T> }) => ReactNode;
}

const PaginatedDataTable = memo(
  <T extends object>({
    useQueryOptions,
    pagination,
    renderTopToolbar,
    renderBottomLeftToolbarCustomActions,
    rowSelection,
    onRowSelectionChange,
  }: PaginatedDataTableProps<T>) => {
    const [currentPage, setCurrentPage] = useState(pagination?.page || 1);
    const [itemsPerPage, setItemsPerPage] = useState(pagination?.perPage || 10);

    useEffect(() => {
      console.log('rowSelection ===>', rowSelection);
    }, [rowSelection]);

    // 테이블 초기세팅
    const table = useDataTable<T>({
      columns,
      data: [],
      enableColumnFilters: true,
      enableSorting: true,
      enableColumnResizing: true,
      enableRowNumbers: true,

      // row selection
      enableRowSelection: true,
      getRowId: (row: T) => {
        console.log(row);
        return 'row-' + row.id;
      }, // 각 행의 고유 ID 설정
      onRowSelectionChange,
      state: {
        rowSelection,
      },

      // pagination custom options
      enablePagination: false,
      enableBottomToolbar: true,
      paginationDisplayMode: 'custom',
      manualPagination: true,
      // 테이블 상단 컴포넌트
      renderTopToolbar: renderTopToolbar,
      // 테이블 하단에 툴바
      renderBottomToolbarCustomActions: (props) => {
        return (
          <div style={{ display: 'flex', width: '100%' }}>
            {renderBottomLeftToolbarCustomActions && renderBottomLeftToolbarCustomActions(props)}
            <div style={{ flex: '1' }}>
              <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalItems={data?.totalCount ?? 0}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
                rowsPerPageOptions={[5, 10, 20, 30, 50, 100]}
              />
            </div>
          </div>
        );
      },
    });

    // 쿼리 연동
    const { data, isLoading } = useQuery<PaginatedResponse<T>>({
      queryKey: [...useQueryOptions.queryKey, currentPage - 1, itemsPerPage],
      queryFn: () => useQueryOptions.queryFn(currentPage - 1, itemsPerPage),
      placeholderData: keepPreviousData,
    });

    // 페이지 변경 핸들러
    const handlePageChange = useCallback(
      (page: number) => {
        setCurrentPage(page);
        table.setPageIndex(page - 1);
      },
      [table],
    );

    // 컴포넌트와 테이블 내부 정보와 동기화
    const handleItemsPerPageChange = useCallback(
      (newItemsPerPage: number) => {
        setItemsPerPage(newItemsPerPage);
        table.setPageSize(newItemsPerPage);
      },
      [table],
    );

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
  },
);

export default PaginatedDataTable;
