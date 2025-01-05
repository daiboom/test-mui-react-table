import { MaterialReactTable, MRT_TableInstance, type MRT_RowData } from 'material-react-table';

interface DataTableProps<TData extends MRT_RowData> {
  table: MRT_TableInstance<TData>;
}

export default function DataTable<TData extends MRT_RowData>({ table }: DataTableProps<TData>) {
  return <MaterialReactTable table={table} />;
}
