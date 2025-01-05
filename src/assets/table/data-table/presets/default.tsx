import { Button } from '@mui/material';
import { type MRT_RowData, type MRT_TableOptions } from 'material-react-table';

export const presetMap = {
  default: <TData extends MRT_RowData>(): Partial<MRT_TableOptions<TData>> => ({
    layoutMode: 'grid',
    defaultColumn: {
      maxSize: 400,
      minSize: 80,
      size: 160,
    },
    paginationDisplayMode: 'default',
    // enableRowNumbers: true,
    rowNumberDisplayMode: 'static',
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
    enableRowSelection: true,
    muiTableBodyCellProps: () => ({
      sx: {
        fontSize: '14px',
        color: 'blue',
        backgroundColor: '#f5f5f5',
      },
    }),
    muiTableHeadCellProps: {
      sx: {
        fontWeight: 'bold',
        fontSize: '14px',
        color: 'green',
      },
    },
    initialState: {
      columnVisibility: {
        '#': false,
        number: true,
      },
    },
    displayColumnDefOptions: {
      'mrt-row-numbers': {
        enableHiding: true,
        size: 0,
      },
    },
    muiSelectCheckboxProps: {
      sx: {
        '& .MuiSvgIcon-root': {
          fontSize: '1.2rem',
        },
      },
    },
    renderToolbarInternalActions: () => <></>,
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true);
        }}
      >
        Create New User
      </Button>
    ),
  }),
};
