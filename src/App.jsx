import React, { useState } from 'react';
import {
  MRT_TableBodyCellValue,
  MRT_TablePagination,
  MRT_ToolbarAlertBanner,
  MRT_GlobalFilterTextField,
  useMaterialReactTable,
} from 'material-react-table';
import {
  Box,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Search, Visibility, FilterList, Group } from '@mui/icons-material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import data from './components/data.json';
import SidePanel from './components/SidePanel';
import SidePanelEye from './components/SidePanelEye';
import SlidePanelGrp from './components/SlidePanelGrp';
import FilterPanel from './components/FilterPanel';
import FilteredDisplay from './components/FilteredDisplay';

const Example = () => {
  const columns = [
    { accessorKey: 'id', header: 'ID', size: 150 },
    { accessorKey: 'name', header: 'Name', size: 150 },
    { accessorKey: 'category', header: 'Category', size: 200 },
    { accessorKey: 'subcategory', header: 'Subcategory', size: 150 },
    { accessorKey: 'createdAt', header: 'Created At', size: 150 },
    { accessorKey: 'updatedAt', header: 'Updated At', size: 150 },
    { accessorKey: 'price', header: 'Price', size: 150 },
    { accessorKey: 'sale_price', header: 'Sale Price', size: 150 },
  ];

  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [showHideColumnsPanelOpen, setShowHideColumnsPanelOpen] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(columns.map(column => column.accessorKey));
  const [showGrpOpen, setGrpOpen] = useState(false);
  const [groupedColumn, setGroupedColumn] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [sortDesc, setSortDesc] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState({});
  const [showFilterPanel, setShowFilterPanel] = useState(false); // State to control FilterPanel visibility
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const handlePriceFiltering = (priceRange) => {
    const filtered = data.filter(item => {
      const price = parseFloat(item.price);
      return price >= priceRange[0] && price <= priceRange[1];
    });
    setFilteredData(filtered);
  };

  // Function to handle filtering based on sale price range
  const handleSalePriceFiltering = (salePriceRange) => {
    const filtered = data.filter(item => {
      const salePrice = parseFloat(item.sale_price);
      return salePrice >= salePriceRange[0] && salePrice <= salePriceRange[1];
    });
    setFilteredData(filtered);
  };




  const handleFilter = () => {
    setShowFilterPanel(!showFilterPanel);
  };


  const doFiltering = (filters) => {
    const { name, categories, subcategories, dateRange } = filters;
    if (!name && categories.length === 0 && subcategories.length === 0 && (!dateRange[0] || !dateRange[1])) {
      setFilteredData(data);
      return;
    }

    let filtered = data.filter(item => {
      let match = true;

      // Check name filter
      if (name && !item.name.toLowerCase().includes(name.toLowerCase())) {
        match = false;
      }

      // Check categories filter
      if (categories.length > 0 && !categories.includes(item.category)) {
        match = false;
      }

      // Check subcategories filter
      if (subcategories.length > 0 && !subcategories.includes(item.subcategory)) {
        match = false;
      }

      // Check date range filter
      if (dateRange[0] && dateRange[1]) {
        const createdAt = new Date(item.createdAt); // Convert string to Date object
        const updatedAt = new Date(item.updatedAt); // Convert string to Date object
        const startDate = new Date(dateRange[0]);
        const endDate = new Date(dateRange[1]);

        // Filter items based on the createdAt and updatedAt fields
        if (!(createdAt >= startDate && createdAt <= endDate) && !(updatedAt >= startDate && updatedAt <= endDate)) {
          match = false;
        }
      }

      // Check price range filter


      return match;
    });
    setFilteredData(filtered);
    console.log(filteredData);
  };







  // Function to toggle expansion state of a group
  const toggleExpansion = (group) => {
    setExpandedGroups(prevExpandedGroups => ({
      ...prevExpandedGroups,
      [group]: !prevExpandedGroups[group]
    }));
  };

  const handleSortByColumn = (columnKey) => {
    let desc = false;

    if (sortBy === columnKey) {
      desc = !sortDesc;
    }

    setSortBy(columnKey);
    setSortDesc(desc);
    table.setSorting([{ id: columnKey, desc }]);
  };

  const handleSortMenuToggle = () => {
    setSortMenuOpen(!sortMenuOpen);
  };

  const handleGrpToggle = () => {
    setGrpOpen(!showGrpOpen);
  };

  const handleShowHideColumnsPanelToggle = () => {
    setShowHideColumnsPanelOpen(!showHideColumnsPanelOpen);
  };

  const toggleColumnVisibility = (columnKey) => {
    setVisibleColumns(prevVisibleColumns => {
      if (prevVisibleColumns.includes(columnKey)) {
        return prevVisibleColumns.filter(col => col !== columnKey);
      } else {
        return [...prevVisibleColumns, columnKey];
      }
    });
  };

  const applyGrouping = (selectedColumns) => {
    setGroupedColumn(selectedColumns[0]);
  };

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: false,
    initialState: {
      pagination: { pageSize: 10, pageIndex: 0 },
      showGlobalFilter: true,
      sorting: sortBy ? [{ id: sortBy, desc: sortDesc }] : [],
    },
    muiPaginationProps: {
      rowsPerPageOptions: [5, 10, 15],
      variant: 'outlined',
    },
    paginationDisplayMode: 'pages',
  });

  // Function to group data based on selected column
  const groupData = (column) => {
    if (!column) return [];

    const groupedData = {};
    data.forEach(item => {
      const key = item[column];
      if (!groupedData[key]) {
        groupedData[key] = [];
      }
      groupedData[key].push(item);
    });
    return groupedData;
  };


  // Render grouped data
  const renderGroupedData = () => {
    if (!groupedColumn) return null;

    const groupedData = groupData(groupedColumn);
    return Object.entries(groupedData).map(([group, items]) => (
      <React.Fragment key={group}>
        <TableRow>
          <TableCell colSpan={visibleColumns.length} onClick={() => toggleExpansion(group)} style={{ cursor: 'pointer' }}>
            <Typography variant="h6">{group} ({items.length})</Typography>
          </TableCell>
        </TableRow>

        {expandedGroups[group] && items.map((item, index) => (
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
    <Stack sx={{ m: '2rem 1rem' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ textAlign: "center" }}>Intern Assessment</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <MRT_GlobalFilterTextField table={table} />
          <IconButton aria-label="view" onClick={handleShowHideColumnsPanelToggle}>
            <Visibility />
          </IconButton>
          <IconButton aria-label="sort" onClick={handleSortMenuToggle}>
            <SwapVertIcon />
          </IconButton>
          <IconButton aria-label="filter" onClick={handleFilter}>
            <FilterList />
          </IconButton>
          <IconButton aria-label="group" onClick={handleGrpToggle}>
            <Group />
          </IconButton>
        </Box>
      </Box>
      <SidePanel
        columns={columns}
        sortMenuOpen={sortMenuOpen}
        handleSortMenuToggle={handleSortMenuToggle}
        handleSortByColumn={handleSortByColumn}
      />
      {showHideColumnsPanelOpen && (
        <SidePanelEye
          handleShowHideColumnsPanelToggle={handleShowHideColumnsPanelToggle}
          toggleColumnVisibility={toggleColumnVisibility}
          visibleColumns={visibleColumns}
          columns={columns}
        />
      )}
      {showGrpOpen && (
        <SlidePanelGrp
          handleGrpToggle={handleGrpToggle}
          columns={columns}
          applyGrouping={applyGrouping}
        />
      )}
      {showFilterPanel && (
        <FilterPanel
          handleFilter={handleFilter}
          doFiltering={doFiltering} // Pass the doFiltering function
          data={data}
          handlePriceFiltering={handlePriceFiltering}
          handleSalePriceFiltering={handleSalePriceFiltering}

        />
      )}

      {showFilterPanel && (<FilteredDisplay
               columns={columns} // Pass columns array
               filteredData={filteredData} // Pass filtered data array
               visibleColumns={visibleColumns} // Pass visible columns array
               table={table} // Pass material-react-table instance
               handleSortByColumn={handleSortByColumn} // Pass sorting function
               groupedColumn={groupedColumn} // Pass grouped column
               toggleExpansion={toggleExpansion}
      />)}

      {!showFilterPanel && filteredData != data && (<FilteredDisplay
         columns={columns} // Pass columns array
         filteredData={filteredData} // Pass filtered data array
         visibleColumns={visibleColumns} // Pass visible columns array
         table={table} // Pass material-react-table instance
         groupedColumn={groupedColumn} // Pass grouped column
         toggleExpansion={toggleExpansion}
         expandedGroups ={expandedGroups }
         sortBy={sortBy} // Pass sorting column

      />)}

      {filteredData === data && (<TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                visibleColumns.includes(column.accessorKey) && (
                  <TableCell
                    align="center"
                    variant="head"
                    key={column.accessorKey}
                    sx={{ fontWeight: 'bold' }}
                  >
                    {column.header}
                  </TableCell>
                )
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {renderGroupedData()}
            {table.getRowModel().rows.map((row, rowIndex) => (
              <TableRow key={row.id} selected={row.getIsSelected()}>
                {row.getVisibleCells().map((cell, _columnIndex) => {
                  const isVisible = visibleColumns.includes(cell.column.id);

                  return (
                    <TableCell
                      align="center"
                      variant="body"
                      key={cell.id}
                      style={{ display: isVisible ? 'table-cell' : 'none' }}
                    >
                      {cell.column.id === groupedColumn ? (
                        <div>{row.getVisibleCells().find(c => c.column.id === 'category').value} - {row.getVisibleCells().find(c => c.column.id === 'subcategory').value}</div>
                      ) : (
                        <MRT_TableBodyCellValue cell={cell} table={table} staticRowIndex={rowIndex} />
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>)}

      <MRT_ToolbarAlertBanner stackAlertBanner table={table} />
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <MRT_TablePagination table={table} />
      </Box>
    </Stack>
  );
};

export default Example;