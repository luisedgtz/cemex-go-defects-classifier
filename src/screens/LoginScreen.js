import React, {useContext, useState} from 'react'
import CemexLogo from "../assets/cemex_logo.png";
import background from '../assets/login.jpg'

import {AuthContext} from '../navigation/AuthProvider'

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { Alert, Box, Button, CssBaseline, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, Snackbar, Typography } from '@mui/material';
import { Lock, Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {

  let navigate = useNavigate();

  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false,
    open: false,
    error: ''
  })

  const {login} = useContext(AuthContext)

  const handleClose = () => {
    setValues({ ...values, open: false });
  };

  const handleChange = (prop) => (event) => {
    setValues({...values, [prop]: event.target.value});
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    var response = await login(values.email, values.password)
    if (response.error) {
      setValues({...values, open: true, error: response.message})
    } else {
      setValues({...values, open: false})
      navigate('/portal', {replace: true})
    }
  }

  const handlePasswordVisibilityToggle = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  return (
      <Grid container component="main" sx={{height: "100vh"}}>
        <CssBaseline/>
        <Grid
          item
          md = {5}
          pl = {5}
          pt = {5}
          sx = {{
            backgroundImage: `url(${background})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'multiply',
            backgroundColor: 'rgba(0,0,0,0.3)',
            filter: 'grayscale(100%)'
          }}
        />

        <Grid item md={7} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 15,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: "center",
              px: 10
            }}
          >
            <img width={80} src={CemexLogo}/>
            <Typography sx={{mt: 5}} fontWeight="bold" component="h1" variant="h5">Welcome to CEMEX GO Defects Classifier!</Typography>
            <Typography color="text.secondary" fontWeight="500" component="h2" variant="h6">Login with your assigned credentials</Typography>
            
            <Box component="form" noValidate onSubmit={handleLogin} sx={{mt: 3, width: "100%"}}>
              <FormControl required sx={{mt: 2, width: "100%" }} variant="outlined">
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <OutlinedInput
                  onChange={handleChange('email')}
                  value={values.email}
                  name="email"
                  id='email'
                  autoComplete='email'
                  label="Email Address"
                  startAdornment = {
                    <InputAdornment position='start'>
                      <Person color='primary'/>
                    </InputAdornment>
                  }
                />
              </FormControl>
              
              <FormControl required sx={{mt: 2, width: "100%" }} variant="outlined">
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  onChange={handleChange('password')}
                  value={values.password}
                  name="password"
                  type= {values.showPassword ? 'text' : 'password'}
                  id='password'
                  autoComplete='current-password'
                  label="Password"
                  startAdornment = {
                    <InputAdornment position='start'>
                      <Lock color='primary'/>
                    </InputAdornment>
                  }
                  endAdornment = {
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handlePasswordVisibilityToggle}
                        edge="end"
                      >
                        {values.showPassword ? <VisibilityOff/> : <Visibility/>}

                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>

              <Button
                type="submit"
                fullWidth
                color="secondary"
                variant='contained'
                sx={{ mt: 3, mb: 2}}
              >
                Sign In
              </Button>
            </Box>

          </Box>
        </Grid>
        <Snackbar
          anchorOrigin={{vertical: "top", horizontal: "center"}}
          open={values.open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>{values.error}</Alert>
        </Snackbar>
      </Grid>
  )
}

export default LoginScreen