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
      ...options,
    }),
    [columns, data, options],
  );

  return useMaterialReactTable(tableOptions);
};

export default useDataTable;
