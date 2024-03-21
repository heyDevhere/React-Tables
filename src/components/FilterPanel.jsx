import React, { useState } from 'react';
import { Drawer, Button, Typography, TextField, FormControl, Select, MenuItem,Slider  } from '@mui/material';
// import { LocalizationProvider } from '@mui/lab';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { MobileDateRangePicker } from '@mui/x-date-pickers-pro';

const FilterPanel = ({ handleFilter, doFiltering, data,handlePriceFiltering,handleSalePriceFiltering}) => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]); // State for date range
  const [priceRange, setPriceRange] = useState([0, 200]); // State for price range
  const [salePriceRange, setSalePriceRange] = useState([0,200]); 

  // Extract unique categories and subcategories from data
  const categories = Array.from(new Set(data.map(item => item.category)));
  const subcategories = Array.from(new Set(data.map(item => item.subcategory)));


  const handlePriceRangeChange = (event) => {
    setPriceRange(event.target.value);
    handlePriceFiltering(event.target.value);

    
  };
  
  const handleSalePriceRangeChange = (event) => {
    setSalePriceRange(event.target.value);
    handleSalePriceFiltering(event.target.value);
    
  };
  

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
    doFiltering({ name: event.target.value, categories: selectedCategories, subcategories: selectedSubcategories, dateRange });
  };

  const handleCategoryChange = (event) => {
    setSelectedCategories(event.target.value);
    doFiltering({ name: searchText, categories: event.target.value, subcategories: selectedSubcategories, dateRange });
  };

  const handleSubcategoryChange = (event) => {
    setSelectedSubcategories(event.target.value);
    doFiltering({ name: searchText, categories: selectedCategories, subcategories: event.target.value, dateRange });
  };

  const handleDateRangeChange = (newDateRange) => {
    setDateRange(newDateRange);
    doFiltering({ name: searchText, categories: selectedCategories, subcategories: selectedSubcategories, dateRange: newDateRange });
  };

  const handleClearFilters = () => {
    setSearchText('');
    setSelectedCategories([]);
    setSelectedSubcategories([]);
    setDateRange([null, null]);
    setPriceRange([0, 200]);
    setSalePriceRange([0, 200]);
    doFiltering({ name: '', categories: [], subcategories: [], dateRange: [null, null] });
    handleFilter();
  };

  return (
    <Drawer
      anchor="right"
      open={true} // Assuming it's always open when triggered
      onClose={handleFilter}
      sx={{ '& .MuiDrawer-paper': { width: "400px", padding: "10px" , height:"480px"} }}
    >
      <Typography variant="h6" sx={{ py: 2, fontWeight: "bold" }}>Filters</Typography>

      <TextField
        label="Name"
        variant="outlined"
        onChange={handleSearchTextChange}
        value={searchText}
        fullWidth
        sx={{ marginBottom: '1rem' }}
      />

      <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
        <Typography id="category-label" variant="subtitle1" sx={{ marginBottom: '0.5rem' }}>
          Category
        </Typography>
        <Select
          labelId="category-label"
          id="category-select"
          multiple
          value={selectedCategories}
          onChange={handleCategoryChange}
          variant="outlined"
          renderValue={(selected) => selected.join(', ')}
        >
          {/* Render MenuItem for each category */}
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
        <Typography id="subcategory-label" variant="subtitle1" sx={{ marginBottom: '0.5rem' }}>
          Subcategory
        </Typography>
        <Select
          labelId="subcategory-label"
          id="subcategory-select"
          multiple
          value={selectedSubcategories}
          onChange={handleSubcategoryChange}
          variant="outlined"
          renderValue={(selected) => selected.join(', ')}
        >
          {/* Render MenuItem for each subcategory */}
          {subcategories.map((subcategory) => (
            <MenuItem key={subcategory} value={subcategory}>
              {subcategory}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography variant="subtitle1" sx={{ marginBottom: '0.5rem' }}>
        Created At
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileDateRangePicker value={dateRange} onChange={handleDateRangeChange} sx={{ marginBottom: '0.5rem' }}/>
      </LocalizationProvider>

      <Typography variant="subtitle1" sx={{ marginBottom: '0.5rem' }}>
        Updated At
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs} >
        <MobileDateRangePicker value={dateRange} onChange={handleDateRangeChange} sx={{ marginBottom: '1rem' }}/>
      </LocalizationProvider>

      <Typography variant="subtitle1" sx={{ marginBottom: '0.5rem' }}>
        Price Range
      </Typography>
      <Slider
        value={priceRange}
        onChange={handlePriceRangeChange}
        valueLabelDisplay="auto"
        min={0}
        max={200}
        aria-labelledby="range-slider"
        sx={{ marginBottom: '0.5rem'}}
      />

      <Typography variant="subtitle1" sx={{ marginBottom: '0.5rem' }}>
        Sale Price Range
      </Typography>
      <Slider
        value={salePriceRange}
        onChange={handleSalePriceRangeChange}
        valueLabelDisplay="auto"
        min={0}
        max={200}
        aria-labelledby="range-slider"
        sx={{ marginBottom: '1rem'} }
      />

      <Button variant="contained" onClick={handleClearFilters}>Clear Filters</Button>
    </Drawer>
  );
};

export default FilterPanel;
