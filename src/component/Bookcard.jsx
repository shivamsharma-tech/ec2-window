import { Delete,Edit } from "@mui/icons-material";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { DeleteBook, UpdateBook } from "../Redux/action";

export const BookCard = ({ data,open ,edit,role}) => {
  const dispatch = useDispatch();
  return (
    <Grid
    key={data?.id}
      sx={{
        width: 245,
        height: 250,
        borderRadius: 3,
        textAlign: "center",
        boxShadow: "0px 0px 10px 2px gray",
        margin: "20px 15px",
        display:"flex"
      }}
    >
        <Grid width={role == "Admin"?200:250} textAlign={"center"}>
        <img
          src={`http://13.60.90.245:5000/uploads/${data?.image}`}
          // src={`http://localhost:4000/uploads/${data?.image}`}
          width={"150px"}
          height={"150px"}
          style={{ marginTop: 5 }}
        />
        
      <Typography
        sx={{ textAlign: "center", color: "#1b4b66" }}
        variant="h6"
        fontWeight={600}
      >
        {data?.title}
      </Typography>
      <Typography sx={{ textAlign: "center", color: "#1b4b66" }}>
        {data?.description}
      </Typography>
      <Typography sx={{ textAlign: "center", mt: 1, color: "red" }}>
        Price:{data?.price}
      </Typography>
    </Grid>
    {role == "Admin" && <Grid bgcolor={"lightgray"} width={30} height={80} textAlign={"center"}>
     <IconButton
     sx={{padding:"5px 0px"}}
     aria-label="delete"
     size="large"
     onClick={() => {
       dispatch(DeleteBook(data.id)),
       console.log(localStorage.getItem('token'));
       
     }}
   >
     <Delete fontSize="inherit" color="error" />
   </IconButton>
   <IconButton
     sx={{padding:"5px 0px",mt:1}}
     aria-label="delete"
     size="large"
     onClick={() => {open(),edit(data)}}
   >
     <Edit fontSize="inherit" color="primary" />
   </IconButton>
   </Grid>}
    </Grid>
  );
};
