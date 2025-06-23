import { Box, Grid, Typography } from '@mui/material'
import React from 'react'

export const Card = (props) => {
  return (
        <Grid sx={{width:320,height:150,borderRadius:3,border:"2px solid gray",margin:"10px 10px"}}>
            <Typography sx={{textAlign:"center",mt:2,color:"#1b4b66"}} variant='h6' fontWeight={500}>{props.Text1}</Typography>
            <Typography sx={{textAlign:"center",fontWeight:700,mt:5,color:"#1b4b66"}} variant='h5'>{props.Text2}</Typography>
        </Grid>
  )
}
