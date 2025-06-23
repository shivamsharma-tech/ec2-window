import { Avatar, Box, Button, Checkbox, Fab, Grid, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, styled, tableCellClasses } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import { CheckBox, Favorite, FavoriteBorder, Pending, Edit } from '@mui/icons-material';
import Model from './Model';
import EditModel from './Edit';


export const Categorys = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [data, setData] = useState({})
  const [rows, setRows] = useState([{
    name: "amit"
  }, { name: "sumit" }])
  const [active, setActive] = useState(true)
  const activePending = (value) => {
    console.log(value);
    setActive(!active)
  }
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
      id: 'Photo', label: 'Photo', minWidth: 100, renderCell: () => {
        return (
          <Avatar alt="Remy Sharp" style={{ marginLeft: 60 }} src="" />
        )
      }
    },
    { id: 'name', label: 'Name', minWidth: 100 },
    {
      id: 'Featured', label: 'Featured', minWidth: 100, renderCell: () => {
        return (
          <Checkbox defaultChecked icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
        )
      }
    },
    {
      id: 'Create', label: 'Create By', minWidth: 100, renderCell: () => {
        return (
          "admin"
        )
      }
    },
    {
      id: 'CreateAt', label: 'CreateAt', minWidth: 150, renderCell: () => {
        const date = new Date()
        return (
          date.getDate()
        )
      }
    },
    {
      id: 'Status', label: 'Status', minWidth: 100, renderCell: () => {
        return (
          <Typography style={{ textAlign: "center" }}>{active ? 'active' : 'Pending'}</Typography>

        )
      }
    },
    {
      id: 'Action', label: 'Action', minWidth: 100, renderCell: (rows) => {
        // console.log(rows.name);
        return (
          <Grid>
            <Button onClick={(rows) => setOpen2(true)}><Edit /></Button>
            <Switch style={{ color: "#1b4b66" }} defaultChecked={active} onChange={activePending} />
            <EditModel rows={rows} open={open2} onClose={() => { setOpen2(false) }} />
          </Grid>
        )
      }
    },
  ];

  return (
    <Box>
      <Grid container>
        <Grid item display={"flex"} xs={6} mt={5}>
          <Grid container>
            <Grid item xs={4} display={"flex"} justifyContent={"space-evenly"}>
              <Typography variant='h5' fontWeight={700}>Categorys</Typography>
              <Button onClick={() => setOpen(true)} style={{ width: 58, borderRadius: 6, height: 42, background: "#1b4b66", textAlign: "center", lineHeight: 4 }}><AddIcon sx={{ color: "white", fontSize: 35 }} /></Button>
            </Grid>
            <Grid item xs={8} display={"flex"} justifyContent={"space-around"}>
              <TextField id="outlined-basic" label="Find category using name" variant="outlined" />
              <TextField id="outlined-basic" label="Status" variant="outlined" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Paper sx={{ width: '96%', overflow: 'hidden', margin: "20px auto" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow >
                {columns.map((column) => (
                  <TableCell
                    sx={{ background: "#e3e3e3", fontWeight: 700, fontSize: 17, borderRadius: "none", textAlign: "center" }}
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
                  <StyledTableRow hover role="checkbox" tabIndex={-1} key={index}>
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
      </Paper>
      {!!rows && <Model open={open} setRows={setRows} onClose={() => { setOpen(false) }} />}
    </Box>
  )
}
