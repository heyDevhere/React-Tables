import React, { useState } from 'react';
import { TableCell, TableRow, Typography } from '@mui/material';

const GroupedDataRow = ({ group, items, visibleColumns }) => {
  const [showItems, setShowItems] = useState(false);

  const toggleShowItems = () => {
    setShowItems(prevState => !prevState);
  };

  return (
    <>
      <TableRow>
        <TableCell colSpan={visibleColumns.length}>
          <Typography
            variant="h6"
            onClick={toggleShowItems}
            style={{ cursor: 'pointer' }}
          >
            {group} ({items.length})
          </Typography>
        </TableCell>
      </TableRow>
      {showItems && items.map((item, index) => (
        <TableRow key={index}>
          {visibleColumns.map(columnKey => (
            <TableCell key={columnKey}>{item[columnKey]}</TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export default GroupedDataRow;
