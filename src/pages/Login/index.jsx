import { useEffect, useState } from "react";
import { useFormik } from "formik";
import Lottie from "lottie-react";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import Animation from "../../Animation.json";
import {
  Box,
  Grid,
  Typography,
  Checkbox,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  TextField,
} from "@mui/material";
import { Validation } from "../../component/Validation";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../../Redux/action";

function Index() {
  const [check, setCheck] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginData = useSelector(state => state.LoginData);

  // useEffect(() => {
  //   console.log(loginData);
    
  //   const isLoggedIn = loginData?.token;
  
  //   if (isLoggedIn) {
  //     console.log("******");
  //     navigate("/dashboard");
  //   } 
  // }, []);

  const navigateTodashboard = () => {    
    navigate("/dashboard")
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleCheckboxChange = (event) => setCheck(!event.target.checked);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Validation,
    onSubmit: (values) => {
      dispatch(LoginUser(values,navigateTodashboard));
    },
  });

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } = formik;

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Grid container>
        {/* Left Animation Panel */}
        <Grid item xs={12} lg={6} sx={{ backgroundColor: "#1976d2", display: 'flex', justifyContent: 'center', alignItems: 'center', height: { xs: '200px', sm: '300px', lg: 'auto' } }}>
          <Lottie animationData={Animation} loop={true} style={{ width: 'auto', maxWidth: "500" }} />
        </Grid>

        {/* Right Form Panel */}
        <Grid item xs={12} lg={6} sx={{ px: { xs: 3, sm: 8, md: 12 }, py: { xs: 4, sm: 6, md: 8 }, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <img src="../src/assets/Lock_i.png" alt="lock icon" style={{ width: 60, marginBottom: 10 }} />

          <Typography variant="h5" >Sign In</Typography>

          {loginData && <Typography variant="body2" color="error" sx={{ mb: 2 }}>
            {loginData?.message}
          </Typography>}

          <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 280,marginTop:"30px" }}>
            {/* Email Field */}
            <TextField
              name="email"
              label="Email"
              variant="outlined"
              fullWidth
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              sx={{ mb: 2 }}
            />
            {errors.email && touched.email && (
              <Typography className="error" variant="caption" color="error">{errors.email}</Typography>
            )}

            {/* Password Field */}
            <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                name="password"
                id="password"
                type={showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            {errors.password && touched.password && (
              <Typography className="error" variant="caption" color="error">{errors.password}</Typography>
            )}

            {/* Remember me */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Checkbox onChange={handleCheckboxChange} />
              <Typography variant="body2" color="gray">Remember me</Typography>
            </Box>

            {/* Submit Button */}
            <Button
              variant="contained"
              type="submit"
              fullWidth
              disabled={check}
              sx={{ mb: 2 }}
            >
              Login
            </Button>

            {/* Link */}
            {/* <Typography variant="body2">
              <a href="#" style={{ textDecoration: "none", color: "#1976d2" }}>
                Forgot password?
              </a>
            </Typography> */}
          </form>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Index;
