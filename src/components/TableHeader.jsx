// TableHeader.jsx

import React from 'react';
import { TableCell, TableRow } from '@mui/material';

const TableHeader = ({ columns, visibleColumns, handleSortByColumn, sortBy, sortDesc }) => {
  return (
    <TableRow>
      {columns.map(column => (
        visibleColumns.includes(column.accessorKey) && (
          <TableCell
            align="center"
            variant="head"
            key={column.accessorKey}
            sx={{ fontWeight: 'bold' }}
            onClick={() => handleSortByColumn(column.accessorKey)} // Call handleSortByColumn on cell click
          >
            {column.header}
  
          </TableCell>
        )
      ))}
    </TableRow>
  );
};

export default TableHeader;
