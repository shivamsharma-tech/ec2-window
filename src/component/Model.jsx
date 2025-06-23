import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SendIcon from '@mui/icons-material/Send';
import { useFormik } from 'formik';
import { Grid, TextField, Typography } from '@mui/material';

export default function Model({ open, onClose, handleGet, setRows }) {

  const [scroll, setScroll] = React.useState("paper")
  const { handleBlur, handleChange, handleSubmit, values } = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      console.log(values)
      onClose()
      setRows((prev) => {
        return [
          ...prev, values
        ]
      })
    }
  })

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <React.Fragment>
      <Dialog
        fullWidth
        open={open}
        onClose={onClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <DialogTitle id="scroll-dialog-title">Create Category</DialogTitle>
          <DialogContent dividers={scroll === 'paper'} style={{ flexDirection: "column" }}>
            <Grid>
              <Typography>Name</Typography>
              <TextField placeholder='Name' name='name' onChange={handleChange} onBlur={handleBlur} value={values.name} variant="outlined" fullWidth />
            </Grid>
            <Grid mt={5}>
              <Typography>Discription</Typography>
              <TextField multiline rows={7} placeholder='Discription' name='Discription' onChange={handleChange} onBlur={handleBlur} value={values.Discription} variant="outlined" style={{ height: "200px" }} fullWidth />
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} style={{ border: "2px solid #1b4b66", color: "#1b4b66" }}>Close</Button>
            <Button variant="contained" style={{ backgroundColor: "#1b4b66" }} endIcon={<SendIcon />} type='submit'>Submit</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}