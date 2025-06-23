import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SendIcon from "@mui/icons-material/Send";
import { useFormik } from "formik";
import { Grid, styled, TextField, Typography } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { AddBook, UpdateBook } from "../Redux/action";
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

  const onSubmit = async (e) => {
    if (edit) {
      dispatch(UpdateBook(values));
    } else {
      dispatch(AddBook(values));
    }
    await onClose();
    setErrors({});
    await setValues({});
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required").min(3, "Too short!"),
    description: Yup.string().required("Author is required"),
    price: Yup.number()
      .typeError("Price must be a number")
      .required("Price is required")
      .positive("Price must be positive"),
    image: Yup.string().required("image is required"),
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
    if (initialValues.title) {
      setEdit(true);
      console.log("loggggg");
      setValues(initialValues);
    } else {
      setValues({
        title: "",
        description: "",
        price: "",
        image: "",
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
            {edit ? "Edit Book" : "Add Book"}
          </DialogTitle>
          <DialogContent
            dividers={scroll === "paper"}
            style={{ flexDirection: "column" }}
          >
            <Grid>
              <Typography>Name</Typography>
              <TextField
                placeholder="Name"
                name="title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
                error={touched.title && errors.title}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid mt={3}>
              <Typography>Discription</Typography>
              <TextField
                multiline
                rows={4}
                placeholder="Discription"
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.description && errors.description}
                value={values.description}
                variant="outlined"
                style={{ height: "100px" }}
                fullWidth
              />
            </Grid>
            <Grid mt={5}>
              <Typography>Price</Typography>
              <TextField
                placeholder="Price"
                name="price"
                onChange={handleChange}
                error={touched.price && errors.price}
                onBlur={handleBlur}
                value={values.price}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid mt={4} justifyContent={"space-between"} display={"flex"}>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                style={{ width: "250px", marginRight: "10px" }}
                startIcon={<CloudUpload />}
              >
                Upload files
                <VisuallyHiddenInput
                  type="file"
                  onChange={(event) =>
                    setFieldValue("image", event.target.files[0])
                  }
                  multiple
                />
              </Button>
              <TextField
                placeholder="image"
                error={touched.image && errors.image}
                name="image"
                fullWidth
                // onChange={handleChange}
                readOnly
                // onBlur={handleBlur}
                value={values.image ? "Image selected" : ""}
                variant="outlined"
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
