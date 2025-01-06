import {
  MRT_TableInstance,
  useMaterialReactTable,
  type MRT_RowData,
  type MRT_TableOptions,
} from 'material-react-table';
import { useMemo } from 'react';

const useDataTable = <TData extends MRT_RowData>({
  columns,
  data = [],
  ...options
}: MRT_TableOptions<TData>): MRT_TableInstance<TData> => {
  const tableOptions: MRT_TableOptions<TData> = useMemo(
    () => ({
      columns,
      data,
      enableColumnFilters: true,
      enableSorting: true,
      enablePagination: true,
      enableColumnResizing: true,
      manualPagination: true,
      muiPaginationProps: {
        rowsPerPageOptions: [5, 10, 20, 30],
      },
      ...options,
    }),
    [columns, data, options],
  );

  return useMaterialReactTable(tableOptions);
};

export default useDataTable;
