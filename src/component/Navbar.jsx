import * as React from "react";
import AppBar from "@mui/material/AppBar";
import {
  Avatar,
  Box,
  Menu,
  MenuItem,
  Stack,
  styled,
} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import IconButton from "@mui/material/IconButton";
import { Link, Outlet, useNavigate, useNavigation } from "react-router-dom";
import Slidebar from "./Slidebar";
import { useDispatch, useSelector } from "react-redux";
import { LogoutUser } from "../Redux/action";

export default function Navbar() {
  const [state, setState] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = useSelector(state => state.LoginData)
  
  // const toggleDrawer = (anchor, open) => (event) => {
  //   if (
  //     event.type === "keydown" &&
  //     (event.key === "Tab" || event.key === "Shift")
  //   ) {
  //     return;
  //   }
  //   setState({ ...state, [anchor]: open });
  // };

  const StyLink = styled(Link)({
    textDecoration: "none",
    margin: "0 25px",
    fontWeight: 500,
    color: "#1b4b66",
  });


  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // React.useEffect(() => {
  //   if(token){
  //     navigate("/login")
  //   }
  // },[token])
  const navigateToLogin = () => {    
    navigate("/")
  }

  const logoutUser = () => {
     const data = dispatch(LogoutUser(navigateToLogin))
     
  }

  return (
    <Box
      sx={{ minHeight: "100vh" }}
      onMouseMove={(e) => {
        if (e.pageY > 64 && e.pageX < 10) {
          setState(true);
        } else if (e.pageY > 64 && e.pageX < 298) {
        } else if (
          (e.pageY > 64 && e.pageX > 298) ||
          (e.pageY < 64 && e.pageX > 298)
        ) {
          setState(false);
        }
      }}
    >
      <AppBar
        position="static"
        sx={{
          boxShadow: "0px 2px 5px 2px lightgray",
          color: "gray",
          background: "white",
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: {sm:0,md:1,lg:2},display:{xs:"none",md:"none",lg:"flex"} }}
          >
            {["left"].map((anchor) => (
              <React.Fragment key={anchor}>
                <Button onClick={() => setState(true)}>
                  <FormatAlignLeftIcon sx={{ color: "gray" }} />
                </Button>
              </React.Fragment>
            ))}
          </IconButton>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 0.8, color: "purple", fontWeight: 700 }}
          >
            now this is run on new_version_v1
          </Typography>
          <Stack
            variant="h5"
            component="div"
            sx={{
              flexGrow: 1,
              color: "blue",
              flexDirection: "row",
              fontWeight: 700,
            }}
          >
            <StyLink to="/dashboard" style={{ textDecoration: "none" }}>
              DASHBOARD
            </StyLink>
            {/* <StyLink to="/PRODUCT">PRODUCT LIST</StyLink> */}
            <StyLink to="/user">USERS</StyLink>
            {/* <StyLink to="/CUSTOMERS">CUSTOMERS</StyLink> */}
          </Stack>
          <Avatar
            alt="Remy Sharp"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            src="./src/assets/test1.png"
          />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={logoutUser}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Slidebar state={state} onClose={() => setState(true)} />
      <Outlet />
    </Box>
  );
}
