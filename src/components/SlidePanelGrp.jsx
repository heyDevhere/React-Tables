import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Typography, Button, FormControl, Select, MenuItem, Stack } from '@mui/material';

const SlidePanelGrp = ({ handleGrpToggle, columns, applyGrouping }) => {
    const [selectedColumns, setSelectedColumns] = useState([]);

    const handleApplyGrouping = () => {
        applyGrouping(selectedColumns);
        handleGrpToggle();
    };

    const handleClearGrouping = () => {
        applyGrouping(0);
        handleGrpToggle();
    };

    return (
        <Drawer
            anchor="right"
            open={true} // Assuming it's always open when triggered
            onClose={handleGrpToggle}
            sx={{ '& .MuiDrawer-paper': { width: "400px", padding: "10px" } }}
        >
            <Typography variant="h6" sx={{ py: 2, fontWeight: "bold" }}>Create Groups</Typography>
            <List>
                <ListItem>
                    <ListItemText>
                        <FormControl fullWidth>
                            <Typography variant="subtitle1">Select Columns </Typography>
                            <Select
                                labelId="select-column-label"
                                id="select-column"
                                multiple
                                value={selectedColumns}
                                onChange={(e) => setSelectedColumns(e.target.value.slice(0, 2))} // Limit selection to 2 columns
                                renderValue={(selected) => selected.join(', ')}
                            >
                                {columns
                                    .filter(column => column.accessorKey === 'category' || column.accessorKey === 'subcategory') // Filter only "Category" and "Subcategory" columns
                                    .map((column, index) => (
                                        <MenuItem key={index} value={column.accessorKey}>{column.header}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <Stack direction="row" justifyContent="center" spacing={2}>
                        <Button variant="contained" onClick={handleApplyGrouping} sx={{ width: "150px" }}>Apply Grouping</Button>
                        <Button variant="contained" onClick={handleClearGrouping} sx={{ width: "150px" }}>Clear Grouping</Button>
                    </Stack>
                </ListItem>
            </List>
        </Drawer>
    );
};

export default SlidePanelGrp;
