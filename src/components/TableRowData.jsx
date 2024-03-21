import React from 'react';
import { TableCell, TableRow } from '@mui/material';
import { MRT_TableBodyCellValue } from 'material-react-table';

const TableRowData = ({ rowData, visibleColumns, groupedColumn, table }) => {
  return (
    <TableRow key={rowData.id}>
      {rowData.cells.map((cell, _columnIndex) => {
        const isVisible = visibleColumns.includes(cell.column.id);

        return (
          <TableCell
            align="center"
            variant="body"
            key={cell.id}
            style={{ display: isVisible ? 'table-cell' : 'none' }}
          >
            {cell.column.id === groupedColumn ? (
              <div>{rowData.cells.find(c => c.column.id === 'category').value} - {rowData.cells.find(c => c.column.id === 'subcategory').value}</div>
            ) : (
              <MRT_TableBodyCellValue cell={cell} table={table} />
            )}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default TableRowData;
