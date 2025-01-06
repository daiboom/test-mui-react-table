import { MRT_RowData, MRT_TableInstance } from 'material-react-table';
import { ReactNode } from 'react';
import styled from 'styled-components';

export default function TopToolbar<TData extends MRT_RowData>({
  selectedRows,
  totalRows,
  table,
  children,
}: {
  totalRows: number;
  selectedRows: number;
  table: MRT_TableInstance<TData>;
  children: ReactNode;
}) {
  console.log('table ===>', table.getFilteredSelectedRowModel(), table.initialState);
  return (
    <ToolbarContainer>
      <div
        style={{
          border: '1px solid #ddd',
          borderRadius: '5px',
          width: '100%',
          textAlign: 'start',
          padding: '12px 22px',
        }}
      >
        {children}
      </div>
      <div style={{ alignSelf: 'start' }}>
        <SelectionInfo>총 {`${selectedRows}건 / ${totalRows} 건`}</SelectionInfo>
      </div>
    </ToolbarContainer>
  );
}

const ToolbarContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1rem;
`;

const SelectionInfo = styled.span`
  font-weight: bold;
  font-size: 0.875rem;
`;
