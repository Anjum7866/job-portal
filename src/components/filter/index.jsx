import React, { useState } from 'react';
import { Select, MenuItem, Grid } from '@mui/material';

const FilterDropdown = ({ data, label, property, handleFilter }) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    filterData(event.target.value);
  };

  const filterData = (value) => {
    let filteredData = [...data];
    if (value !== '') {
      filteredData = filteredData.filter(item => {
        return (
          item[property] &&
          (typeof item[property] === 'string' || typeof item[property] === 'number') &&
          String(item[property]).includes(String(value))
        );
      });
    }
    handleFilter(filteredData);
  };

  const getUniqueValues = () => {
    const uniqueValues = [...new Set(data.map(item => item[property]))];
    return uniqueValues;
  };

  return (
   
    <>
    <Grid container alignItems="center">
      <Grid item xs>
        <Select
          value={selectedValue}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{ width: '100%' }}
        >
          <MenuItem value="">{label}</MenuItem>
          {label === "Experience" ?
            [...Array(10).keys()].map(num => (
              <MenuItem key={num + 1} value={(num + 1).toString()}>{num + 1}</MenuItem>
            )) :
            label === "Base pay" ?
            [...Array(8).keys()].map(num => (
              <MenuItem key={num} value={(num * 10).toString()}>{num * 10}L</MenuItem>
            ))  :
            label === "Remote" ?
            ['remote', 'hybrid', 'in office'].map((mode, index) => (
              <MenuItem key={index} value={mode}>{mode}</MenuItem>
            )) :
            getUniqueValues().map((value, index) => (
              <MenuItem key={index} value={value}>{value}</MenuItem>
            ))
          }
        </Select>
      </Grid>
     
    </Grid>
    {label !== "Experience"}
  </>

  );
};

export default FilterDropdown;
