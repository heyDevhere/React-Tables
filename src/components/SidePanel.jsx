import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Box, Button, Typography } from '@mui/material';

const SidePanel = ({ columns, sortMenuOpen, handleSortMenuToggle, handleSortByColumn, sortBy }) => {
  const [sortedColumns, setSortedColumns] = useState([]);

  // Function to toggle the sorting status of a column
  const toggleSort = (columnKey) => {
    setSortedColumns(prevState => {
      if (prevState.includes(columnKey)) {
        // Remove the column if it's already in the list
        return prevState.filter(key => key !== columnKey);
      } else {
        // Add the column if it's not already in the list
        return [...prevState, columnKey];
      }
    });
  };

  // Function to check if a column is currently sorted
  const isSorted = (columnKey) => sortBy === columnKey;

  // Function to check if a column is in the sortedColumns state
  const isSortedColumn = (columnKey) => sortedColumns.includes(columnKey);

  // Function to clear sorting for the columns in sortedColumns state
  const clearSort = () => {
    sortedColumns.forEach(columnKey => {
      handleSortByColumn(columnKey); // Clear sorting for the column
      toggleSort(columnKey); // Remove the column from sortedColumns state
    });
  };

  return (
    <Drawer
      anchor="right"
      open={sortMenuOpen}
      onClose={handleSortMenuToggle}
      sx={{ '& .MuiDrawer-paper': { width: "400px", padding: "10px" } }}
    >
      <Typography variant="h6" sx={{ py: 2, fontWeight: "bold" }}>Sorting Options</Typography>
      <List>
        {columns.map((column) => (
          <ListItem
            button
            key={column.accessorKey}
            onClick={() => {
              handleSortByColumn(column.accessorKey);
              toggleSort(column.accessorKey);
            }}
            sx={{
              backgroundColor: isSortedColumn(column.accessorKey) ? 'lightgrey' : 'transparent',
              border: '2px solid grey',
              marginBottom: '10px',
              borderRadius: '10px',
            }}
          >
            <Box sx={{ marginLeft: "2px" }}>
              <ListItemText
                primary={column.header}
                sx={{ color: isSorted(column.accessorKey) ? '' : 'inherit' }}
                primaryTypographyProps={{ variant: 'subtitle1' }}
              />
            </Box>
          </ListItem>
        ))}
        <ListItem>
          <Button variant="outlined" sx={{ width: "400px" }} onClick={clearSort}>Clear Sort</Button>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SidePanel;
