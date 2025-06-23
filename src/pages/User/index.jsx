import React, { useEffect, useState } from "react";
import { Card } from "../../component/Card";
import { Box, Grid } from "@mui/material";
import DataTable from "../../component/DataTable";
import { useDispatch, useSelector } from "react-redux";
import { DeleteUser, GetBooks, GetUsers, UpdateUser } from "../../Redux/action";
import UserModel from "../../component/UserModel";

export default function index() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [initialvalue, setInitialValue] = React.useState({});

  const dispatch = useDispatch();
  const users = useSelector((state) => state.UsersData);
  console.log(users);

  const columns = [
    { id: "name", label: "Name", minWidth: 170 },
    {
      id: "email",
      label: "Email",
      minWidth: 170,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      // id: 'role',
      label: "Role",
      minWidth: 100,
      align: "center",
      renderCell: (value) => {
        return <div style={{ textAlign: "center" }}>{value.role.name}</div>;
      },
    },
    {
      label: "Action",
      minWidth: 50,
      align: "center",
      renderCell: (value) => {
        return (
          <div
            style={{
              textAlign: "center",
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <button style={{ padding: "0 5px" }} onClick={() => {setOpen(true),setInitialValue(value)}}>update</button>
            <button style={{ padding: "0 5px" }} onClick={() => dispatch(DeleteUser(value.id))}>delete</button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(GetUsers());
    localStorage.setItem("user", []);
  }, []);

  useEffect(() => {
    setData(users);
  }, [users]);

  return (
    <Box>
      {/* <Card Text1="Total User" Text2="10" /> */}
      <Grid textAlign={"right"} marginBottom={5} marginTop={2} marginRight={1}>
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
          Add User
        </button>
      </Grid>
      <DataTable columns={columns} rows={data} />
      <UserModel
        open={open}
        onClose={() => {
          setOpen(false), setInitialValue({});
        }}
        initialValues={initialvalue}
      />
    </Box>
  );
}
