import { useState } from 'react'
import './App.css'
// import Dasboard from './.component/Dasboard';
import Dasboard from './pages/Dashboard';
import User from './pages/User';
import Login from './pages/Login';
import { Navigate, Route, Routes, redirect } from 'react-router-dom';
import Navbar from './component/Navbar';
import { Box, Grid, Typography } from '@mui/material';
import PublicRoute from "./assets/Helper/PublicRoute"
import ProtectedRoute from "./assets/Helper/ProtectedRoute"

function App() {

  return (
    <Box flex={1} minHeight={"100vh"}>
      <Routes>
        <Route path='/' element={<PublicRoute />}>
          <Route path="/" element={<Navigate replace to="/Login" />} />
          <Route path='/Login' element={<Login />} />
        </Route>
        <Route path='/' element={<ProtectedRoute />}>
          <Route path='/' element={<Navbar />}>
          <Route path='/dashboard' element={<Dasboard />} />
          <Route path='/user' element={<User />} />
          </Route>
        </Route>
      </Routes>
      <Grid item xs={12}>
        <Typography variant='h6' textAlign={"center"} color={"#1b4b66"}>Made by shivam sharma</Typography>
      </Grid>
    </Box>
  )
}

export default App
