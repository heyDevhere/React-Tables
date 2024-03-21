import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { MRT_TableBodyCellValue } from 'material-react-table';

const FilteredDisplay = ({ columns, filteredData, visibleColumns, groupedColumn, handleSortByColumn, toggleExpansion, expandedGroups }) => {
  const [sortBy, setSortBy] = useState(null);
  const [sortDesc, setSortDesc] = useState(false);

  const handleSort = (columnKey) => {
    if (sortBy === columnKey) {
      setSortDesc(!sortDesc);
    } else {
      setSortBy(columnKey);
      setSortDesc(false);
    }
    table.setSorting([{ id: columnKey}]);

  };

  // Function to sort the filtered data
  const sortFilteredData = (data) => {
    if (!sortBy) return data;

    const sortedData = [...data].sort((a, b) => {
      const valueA = a[sortBy];
      const valueB = b[sortBy];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return sortDesc ? valueB.localeCompare(valueA) : valueA.localeCompare(valueB);
      } else {
        return sortDesc ? valueB - valueA : valueA - valueB;
      }
    });

    return sortedData;
  };

  // Function to render grouped data
  const renderGroupedData = () => {
    if (!groupedColumn) return null;

    const groupData = (column) => {
      const groupedData = {};
      filteredData.forEach(item => {
        const key = item[column];
        if (!groupedData[key]) {
          groupedData[key] = [];
        }
        groupedData[key].push(item);
      });
      return groupedData;
    };

    const groupedData = groupData(groupedColumn);
    return Object.entries(groupedData).map(([group, items]) => (
      <React.Fragment key={group}>
        <TableRow>
          <TableCell colSpan={visibleColumns.length} onClick={() => toggleExpansion(group)} style={{ cursor: 'pointer' }}>
            <Typography variant="h6">{group} ({items.length})</Typography>
          </TableCell>
        </TableRow>

        {expandedGroups[group] && sortFilteredData(items).map((item, index) => (
          <TableRow key={index}>
            {visibleColumns.map(columnKey => (
              <TableCell key={columnKey}>{item[columnKey]}</TableCell>
            ))}
          </TableRow>
        ))}
      </React.Fragment>
    ));
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map(column => (
              visibleColumns.includes(column.accessorKey) && (
                <TableCell
                  align="center"
                  variant="head"
                  key={column.accessorKey}
                  sx={{ fontWeight: 'bold', cursor: 'pointer' }} // Add cursor pointer here
                  onClick={() => handleSort(column.accessorKey)}
                >
                  {column.header}
                </TableCell>
              )
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {groupedColumn ? renderGroupedData()
            : (
              sortFilteredData(filteredData).map((row, index) => (
                <TableRow key={index}>
                  {visibleColumns.map(columnKey => (
                    <TableCell key={columnKey}>{row[columnKey]}</TableCell>
                  ))}
                </TableRow>
              ))
            )}

        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FilteredDisplay;
