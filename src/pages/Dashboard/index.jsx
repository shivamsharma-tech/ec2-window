import * as React from "react";
import { Box, CircularProgress, Grid } from "@mui/material";
import BookModel from "../../component/BookModel";
import { Card } from "../../component/Card";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { GetBooks } from "../../Redux/action";
import { BookCard } from "../../component/Bookcard";
// import  jwt_decode from 'jwt-decode';
import { decodeJwt } from "jose";
import Snakbar from "../../component/Snakbar";

export default function index() {
  const [state, setState] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [loader, setLoader] = React.useState(false);
  const [role, setRole] = React.useState("");

  //  const token = localStorage.getItem('token')
  // console.log(decodeJwt(token));

  const [initialvalue, setInitialValue] = React.useState({});
  const dispatch = useDispatch();
  let lastLoggedPage = 0;
  window.addEventListener("scroll", () => {
    const currentScroll = Math.trunc(window.scrollY + 590);
    // const viewportHeight = 850;
    const viewportHeight = 4380 - page*150;
    console.log(currentScroll, viewportHeight);

    const currentPage = Math.floor(Math.trunc(currentScroll) / viewportHeight);
    if (currentPage > lastLoggedPage) {
      setLoader(true);
      setTimeout(() => {
        console.log("loader");
        setPage(currentPage);
        setLoader(false);
      }, 3000);
      lastLoggedPage = currentPage; // Update the last logged page
    }
  });

  const data = useSelector((state) => state.BooksData);
  // console.log(data);


  useEffect(() => {
    dispatch(GetBooks(page));
  }, [page]);

  useEffect(() => {
    localStorage.removeItem("data");
    window.scrollTo(0, 0);
    const token = localStorage.getItem("token");
    const userData = decodeJwt(token);
    setRole(userData.role);
  }, []);

  return (
    <Box>
      <Grid textAlign={"end"} mr={2} mt={1}>
        {role == "Admin" && (
          <button
            onClick={() => setOpen(true)}
            style={{
              background: "red",
              padding: "2px 5px",
              border: "2px solid gray",
              borderRadius: "5%",
              color: "white",
              fontSize: "15px",
              cursor: "pointer",
            }}
          >
            Add Book
          </button>
        )}
      </Grid>
      <Grid
        sx={{
          display: "flex",
          flexWrap: "wrap",

          margin: "50px 0",
          // ml: 10,
          justifyContent:"center",
          mb: 5,
        }}
      >
        {data?.map((value) => {
          // console.log(value);

          return (
            <BookCard
              data={value}
              open={() => setOpen(true)}
              edit={(data) => setInitialValue(data)}
              role={role}
            />
          );
        })}
      </Grid>
      <Grid textAlign={"center"}>
        {loader && <CircularProgress size={"45px"} />}
      </Grid>
      <BookModel
        open={open}
        onClose={() => {
          setOpen(false), setInitialValue({});
        }}
        initialValues={initialvalue}
      />
    </Box>
  );
}
