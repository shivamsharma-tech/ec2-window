import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SendIcon from "@mui/icons-material/Send";
import { useFormik } from "formik";
import {
  Grid,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { AddBook, AddUser, UpdateBook, UpdateUser } from "../Redux/action";
import * as Yup from "yup";

export default function Model({
  open,
  onClose,
  handleGet,
  data,
  initialValues,
}) {
  const [scroll, setScroll] = React.useState("paper");
  const [edit, setEdit] = React.useState(false);
  const dispatch = useDispatch();
console.log(edit);

  const onSubmit = async (e) => {
    console.log(values);
    
    if (edit) {
      dispatch(UpdateUser(values));
    } else {
      dispatch(AddUser(values));
    }
    await onClose();
    setErrors({});
    await setValues({});
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required").min(3, "Too short!"),
    email: Yup.string().required("Email is required").min(3, "Too short!"),
    roleId: Yup.string().required("Role is  required"),
    password: Yup.string().required("Password ids required"),
  });

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    setErrors,
    setTouched,
    values,
    setValues,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 10,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  React.useEffect(() => {
    if (initialValues.name) {
      setEdit(true);
      console.log("loggggg");
      setValues(initialValues);
    } else {
      setValues({
        name: "",
        email: "",
        roleId: "",
        password: "",
      });
    }
  }, [open]);

  const handleClose = () => {
    setValues({}), setTouched({}), onClose(), setEdit(false);
  };

  return (
    <React.Fragment>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <form onSubmit={handleSubmit} style={{ width: "100%", marginTop: 0 }}>
          <DialogTitle id="scroll-dialog-title">
            {edit ? "Edit User" : "Add User"}
          </DialogTitle>
          <DialogContent
            dividers={scroll === "paper"}
            style={{ flexDirection: "column" }}
          >
            <Grid>
              <Typography>Name</Typography>
              <TextField
                placeholder="Name"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                error={touched.name && errors.name}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid mt={3}>
              <Typography>Email</Typography>
              <TextField
                placeholder="Email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && errors.email}
                value={values.email}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid mt={3}>
              <Typography>Role</Typography>
              <Select
                id="role"
                name="roleId"
                value={values.roleId}
                fullWidth
                onChange={handleChange}
              >
                <MenuItem value={1}>Admin</MenuItem>
                <MenuItem value={2}>Customer</MenuItem>
              </Select>
            </Grid>
            <Grid mt={3}>
              <Typography>Password</Typography>
              <TextField
                placeholder="Password"
                name="password"
                type="password"
                onChange={handleChange}
                error={touched.password && errors.password}
                onBlur={handleBlur}
                value={values.password}
                variant="outlined"
                fullWidth
              />
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              style={{ border: "2px solid #1b4b66", color: "#1b4b66" }}
            >
              Close
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: "#1b4b66" }}
              endIcon={<SendIcon />}
              type="submit"
            >
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
