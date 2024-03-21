import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Typography, Switch, Button } from '@mui/material';

const SidePanelEye = ({ handleShowHideColumnsPanelToggle, toggleColumnVisibility, columns, visibleColumns }) => {
  const [allColumnsVisible, setAllColumnsVisible] = useState(false);

  const handleShowAllColumns = () => {
    const allColumnKeys = columns.map(column => column.accessorKey);
    toggleColumnVisibility(allColumnKeys);
    setVisibleColumns(allColumnKeys); // Toggle all column switches
    setAllColumnsVisible(true); // Set the state to indicate all columns are visible
  };

  const handleApply = () => {
    // Trigger action to apply the changes
    handleShowHideColumnsPanelToggle();
  };

  return (
    <Drawer
      anchor="right"
      open={true} // Assuming it's always open when triggered
      onClose={handleShowHideColumnsPanelToggle}
      sx={{ '& .MuiDrawer-paper': { width: "400px", padding: "10px" } }}
    >
      <Typography variant="h6" sx={{ py: 2, fontWeight: "bold" }}>Show/Hide Columns</Typography>
      <List>
        {columns.map((column, index) => (
          <ListItem key={index} 
            button 
            onClick={() => toggleColumnVisibility(column.accessorKey)}
            sx={{
              border: '2px solid grey',
              marginBottom: '10px',
              borderRadius: '10px',
              display: 'flex',
              justifyContent: 'space-between', // Align content to the ends
            }}
          >
            <ListItemText>
              <Typography>{column.header}</Typography>
            </ListItemText>
            <ListItemIcon>
              <Switch 
                checked={visibleColumns.includes(column.accessorKey) || allColumnsVisible} // Check if all columns are visible
                onClick={(event) => event.stopPropagation()} // Prevent ListItem click event when toggling
                onChange={() => toggleColumnVisibility(column.accessorKey)}
              />
            </ListItemIcon>
          </ListItem>
        ))}
        {/* Show All Columns Button */}
        <Button onClick={handleShowAllColumns} variant="outlined" sx={{ marginBottom: '10px', width: "390px" }}>Show All Columns</Button>
        {/* Apply Button */}
        <Button variant="outlined" sx={{ width: "390px" }} onClick={handleApply}>Apply</Button>
      </List>
    </Drawer>
  );
};

export default SidePanelEye;
