import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SendIcon from '@mui/icons-material/Send';
import { useFormik } from 'formik';
import { Grid, MenuItem, TextField, Typography } from '@mui/material';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';

export default function Product_list({ open, onClose, handleGet, rows, data }) {
    const [scroll, setScroll] = React.useState("paper")

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };
    const { handleBlur, handleChange, handleSubmit, values } = useFormik({
        initialValues: {
            name: "",
        },
        onSubmit: (values) => {
            // console.log(values)
            onClose()
            setRows((prev) => {
                return [
                    ...prev, values
                ]
            })
        }
    })
    //   console.log(rows.name);
    // console.log(data);

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    const currencies = [
        {
            value: 'USD',
            label: '$',
        },
        {
            value: 'EUR',
            label: '€',
        }
    ];

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={onClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                >
            <form onSubmit={handleSubmit} style={{ width: "100%",padding:0,margin:0}}>
                <DialogTitle id="scroll-dialog-title">Craete Product</DialogTitle>
                <DialogContent dividers={scroll === 'paper'} sx={{height:500}}>
                        <Grid container sx={{ width: "100%" ,rowGap:2}}>
                            <Grid item xs={3} display={"flex"} alignItems={"center"} flexDirection={"column"} sx={{backgroundColor:"lightgray",border:"2px dotted black",padding:"30px 8px",borderRadius:2,rowGap:1}}>
                                <SystemUpdateAltIcon/>
                                <Typography variant='p'>Drag and drop files here</Typography>
                                <Typography variant='p'>or</Typography>
                                <Button variant='contained'>Browser Files</Button>
                            </Grid>
                            <Grid item xs={3} display={"flex"} alignItems={"center"} flexDirection={"column"} sx={{backgroundColor:"lightgray",marginLeft:5,border:"2px dotted black",padding:"30px 8px",borderRadius:2,rowGap:1}}>
                                <SystemUpdateAltIcon/>
                                <Typography variant='p'>Drag and drop files here</Typography>
                                <Typography variant='p'>or</Typography>
                                <Button variant='contained'>Browser Files</Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>Name</Typography>
                                <TextField placeholder='Discription' name='Discription' onChange={handleChange} onBlur={handleBlur} value={values.Discription} variant="outlined" sx={{width:340}}/>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>Discription</Typography>
                                <TextField placeholder='Discription' name='Discription' onChange={handleChange} onBlur={handleBlur} value={values.Discription} variant="outlined" sx={{width:340}}/>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>Discription</Typography>
                                <TextField placeholder='Discription' name='Discription' onChange={handleChange} onBlur={handleBlur} value={values.Discription} variant="outlined" sx={{width:340}} />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>Discription</Typography>
                                <TextField placeholder='Discription' name='Discription' onChange={handleChange} onBlur={handleBlur} value={values.Discription} variant="outlined" sx={{width:340}} />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>Discription</Typography>
                                <TextField placeholder='Discription' name='Discription' onChange={handleChange} onBlur={handleBlur} value={values.Discription} variant="outlined" sx={{width:340}} />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>Discription</Typography>
                                <TextField placeholder='Discription' name='Discription' onChange={handleChange} onBlur={handleBlur} value={values.Discription} variant="outlined" sx={{width:340}} />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>Choose brand</Typography>
                                <TextField
                                fullWidth
                                    id="outlined-select-currency"
                                    select
                                    sx={{ width: 340 }}
                                >
                                    {currencies.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>Vechicle-segment</Typography>
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="Vechicle-segment"
                                    sx={{ width: 340 }}
                                    >
                                    {currencies.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
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