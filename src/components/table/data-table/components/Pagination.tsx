import { memo } from 'react';
import styled from 'styled-components';

interface PaginationProps {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  rowsPerPageOptions?: number[];
}

const Pagination = memo(
  ({
    currentPage,
    itemsPerPage,
    totalItems,
    onPageChange,
    onItemsPerPageChange,
    rowsPerPageOptions = [5, 10, 20, 30, 50, 100],
  }: PaginationProps) => {
    const pageNumbers = [];
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    let startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 4);

    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <PaginationContainer>
        <RowsPerPage>
          <span>Items per page:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              onItemsPerPageChange(Number(e.target.value));
              onPageChange(1);
            }}
          >
            {rowsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </RowsPerPage>
        <PageInfo>
          {currentPage} of {totalPages}
        </PageInfo>

        <PageNavigation>
          <PageButton onClick={() => onPageChange(1)} disabled={currentPage === 1}>
            {'<<'}
          </PageButton>
          <PageButton onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
            {'<'}
          </PageButton>

          {startPage > 1 && (
            <>
              <PageButton onClick={() => onPageChange(1)}>1</PageButton>
              {startPage > 2 && <span>...</span>}
            </>
          )}

          {pageNumbers.map((number) => (
            <PageButton key={number} onClick={() => onPageChange(number)} isActive={currentPage === number}>
              {number}
            </PageButton>
          ))}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && <span>...</span>}
              <PageButton onClick={() => onPageChange(totalPages)}>{totalPages}</PageButton>
            </>
          )}

          <PageButton onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            {'>'}
          </PageButton>
          <PageButton onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages}>
            {'>>'}
          </PageButton>
        </PageNavigation>
      </PaginationContainer>
    );
  },
);

export default Pagination;

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;

  gap: 1rem;
`;

const PageNavigation = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  button {
    padding: 0.5rem;
    min-width: 2rem;
    border: 1px solid #ddd;
    background: white;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
      background-color: #f5f5f5;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  span {
    margin: 0 0.25rem;
  }
`;

const RowsPerPage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  span {
    color: #666;
  }

  select {
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: white;
    cursor: pointer;

    &:focus {
      outline: none;
      border-color: #999;
    }
  }
`;

const PageButton = styled.button<{ isActive?: boolean }>`
  ${({ isActive }) =>
    isActive &&
    `
    background-color: #ddd !important;
    font-weight: bold;
  `}
`;

const PageInfo = styled.div`
  color: #666;
  font-size: 0.9rem;
  margin: 0 0.5rem;
`;
