import { Avatar, Box, Button, Checkbox, Fab, Grid, MenuItem, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography, styled, tableCellClasses } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import { CheckBox, Favorite, FavoriteBorder, Pending, Edit } from '@mui/icons-material';
import Model from './Model';
import EditModel from './Edit';
import Product_list from './Product_list';


export const Product = () => {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([])
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
 
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 12,
    },
  }));

  const StyledTableRow = styled(TableRow)(() => ({
    '&:nth-of-type(odd)': {
      backgroundColor: '#1b998a10',
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));


  const columns = [
    {
      id: 'Photo', label: 'Photo',  
    },
    { 
      id: 'name', label: 'Name',   
    },
    { 
      id: 'Brand', label: 'Brand',   
    },
    { 
      id: 'Price', label: 'Price',   
    },
    { 
      id: 'Part number', label: 'Part number',   
    },
    {
      id: 'B2B_price', label: "B2B_price",  
    },
    {
      id: 'Tend', label: "Trend",  
    },
    {
      id: 'New Arrival', label: "New Arrival",  
    },
    {
      id: 'Popular Item', label: "Popular Item",  
    },
    {
      id: 'Item_stock', label: "Item_stock",  
    },
    {
      id: 'Tax_Rate', label: 'Tax_Rate',  
    },
    {
      id: 'Weight', label: 'Weight',  
    },
    {
      id: 'Unit', label: "Unit",  
    },
    {
      id: 'HSN_Code', label: 'HSN_Code',  
    },
    {
      id: 'Points', label: 'Points',  
    },
    {
      id: 'CreateAt', label: 'CreateAt',  
    },
    {
      id: 'Action', label: 'Action',  
    },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  }
];

  return (
    <Box>
      <Grid container>
        <Grid item display={"flex"} xs={15} mt={5}>
          <Grid container>
            <Grid item xs={2} display={"flex"} justifyContent={"space-evenly"}>
              <Typography variant='h5' fontWeight={700}>Product</Typography>
              <Button onClick={() => setOpen(true)} style={{ width: 58, borderRadius: 6, height: 42, background: "#1b4b66", lineHeight: 4 }}><AddIcon sx={{ color: "white", fontSize: 35 }} /></Button>
            </Grid>
            <Grid item xs={10} display={"flex"} flexWrap={"wrap"} justifyContent={"space-around"}>
              <TextField id="outlined-basic" label="Find category using name" variant="outlined" />
              <TextField id="outlined-basic" label="Status" variant="outlined" />
              <TextField
          id="outlined-select-currency"
          select
          label="Brand"
          sx={{width:250}}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-select-currency"
          label="Vehicle Segment"
          select
          sx={{width:250}}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-select-currency"
          select
          label="Tend"
          sx={{width:250}}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-select-currency"
          select
          label="New Arrival"
          sx={{width:250,mt:3}}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-select-currency"
          select
          label="Popular item"
          sx={{width:250,mt:3}}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Paper sx={{ width: '99%', overflow: 'hidden', margin: "20px auto" }} >
        <TableContainer sx={{ maxHeight: 460 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow >
                {columns.map((column) => (
                  <TableCell
                    sx={{ background: "#e3e3e3", fontWeight: 700, fontSize: 15, borderRadius: "none", textAlign: "center",}}
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows && rows?.map((row, index) => {
                return (
                  <StyledTableRow hover role="checkbox" tabIndex={-1} key={index} row>
                    {columns.map((column) => {
                      const value = row[column?.id];
                      return <StyledTableCell style={{ textAlign: "center", fontSize: 17 }} key={column.id}>
                        {column.renderCell ? column.renderCell(row) : value ? value : 'N/A'}
                      </StyledTableCell>;
                    })}
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      </Paper>
      {!!rows && <Product_list open={open} setRows={setRows} onClose={() => { setOpen(false) }} />}
    </Box>
  )
}
