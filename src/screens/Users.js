import { AddRounded, CloseRounded, Person, VisibilityOffRounded, VisibilityRounded } from '@mui/icons-material'
import { Alert, Button, Fab, FormControl, FormControlLabel, Grid, IconButton, InputAdornment, InputLabel, Modal, OutlinedInput, Snackbar, Switch, Typography } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserDisplay from '../components/UserDisplay'

const Users = () => {
    const baseUrl = 'http://localhost:3000'
    const [users, setUsers] = useState([])
    const [open, setOpen] = useState(false)

    const [openSnack, setOpenSnack] = useState(false)
    const [error, setError] = useState('')

    const [deleted, setDeleted] = useState(false)

    const [values, setValues] = useState({
        username: '',
        password: '',
        email: '',
        name: '',
        lastname: '',
        role: false,
        showPassword: false,
    })

    const handleChangeRole = (event) => {
        setValues({...values, ['role']: event.target.checked})
    }

    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value})
    }

    const handlePasswordVisibilityToggle = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
    };

    const handleOpen = () => {
        setOpen(true)   
    }

    const handleClose = () => {
        setOpen(false)
        setValues({
            username: '',
            password: '',
            email: '',
            name: '',
            lastname: '',
            role: false,
            showPassword: false,
        })
    }

    const handleAddUser = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${baseUrl}/users/register`, {
                "username": values.username,  
                "password": values.password,
                "email": values.email,
                "name": values.name,
                "lastname": values.lastname,
                "role": values.role
            })
            if (response.status === 201) {
                setOpen(false)
                setValues({
                    username: '',
                    password: '',
                    email: '',
                    name: '',
                    lastname: '',
                    role: false,
                    showPassword: false,
                })
            } else {
                throw new Error("an eror has occured")
            }
        } catch(error) {
            console.log(error.response.data)
            setError(error.response.data)
            setOpenSnack(true)
        }
    }

    const handleGetUsers = async () => {
        try {
            const response = await axios.get(`${baseUrl}/users/all`)
            if (response.status === 200) {
                setUsers(response.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleGetUsers()
    }, [open, deleted])

    return (
        <Grid item>
            <Box bgcolor="white" sx={{border: "1px solid #DDE0E3", p: 2}} borderRadius="8px">
                <Typography component="h1" fontSize="20px"  fontWeight="bold">Users</Typography>
            </Box>

            <Fab onClick={handleOpen} sx={{mt: 1.5, position: "absolute", right: 50}} variant="extended" size="small" color="primary" aria-label="add">
                <AddRounded sx={{ mr: 1 }}/>
                ADD USER
            </Fab>

            <Box alignContent="flex-start" display="flex" flexWrap="wrap" height="calc(100vh - 300px)" bgcolor="white" sx={{border: "1px solid #DDE0E3", mt: 3, p: 4, gap: "20px"}} borderRadius="8px">
                {
                    users.map((item, index)=>(
                        <UserDisplay setDeleted={setDeleted} key={index} item={item}/>
                    ))
                }
            </Box>

            <Modal
                open={open}
                onClose={()=>handleClose()}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "50%",
                        bgcolor: "white",
                        boxShadow: 24,
                        px: 4,
                        py: 2,
                        maxHeight: "70vh",
                        overflowY: "scroll"
                    }}
                >
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography component="h1" fontSize="20px" fontWeight="bold">New User</Typography>
                        <IconButton onClick={()=>handleClose()} size='small'>
                            <CloseRounded/>
                        </IconButton>
                    </Box>

                    <Box component="form" noValidate onSubmit={handleAddUser} sx={{width: "100%"}}>
                        <FormControlLabel
                            sx={{m: 0}}
                            value="admin"
                            control={<Switch onChange={handleChangeRole} color="primary" />}
                            label="Admin:"
                            labelPlacement="start"
                        />

                        <Box display="flex" justifyContent="space-between" sx={{mt: 1}}>
                            <FormControl required sx={{width: "49%"}} variant="outlined">
                                <InputLabel htmlFor="name">First Name</InputLabel>
                                <OutlinedInput
                                    onChange={handleChange('name')}
                                    value={values.name}
                                    name="name"
                                    id="name"
                                    autoComplete='given-name'
                                    label="First Name"
                             
                                />
                            </FormControl>

                            <FormControl required sx={{width: "49%"}} variant="outlined">
                                <InputLabel htmlFor="lastname">Last Name</InputLabel>
                                <OutlinedInput
                                    onChange={handleChange('lastname')}
                                    value={values.lastname}
                                    name="lastname"
                                    id="lastname"
                                    autoComplete='family-name'
                                    label="First Name"
                                />
                            </FormControl>
                        </Box>

                        <FormControl required sx={{mt: 2, width: "100%"}} variant="outlined">
                            <InputLabel htmlFor="email">Email Address</InputLabel>
                            <OutlinedInput
                                onChange={handleChange('email')}
                                value={values.email}
                                name="email"
                                id="email"
                                autoComplete='email'
                                label="Email Address"
                            />
                        </FormControl>

                        <Box display="flex" justifyContent="space-between">
                            <FormControl required sx={{mt: 2, width: "49%"}} variant="outlined">
                                <InputLabel htmlFor="username">Username</InputLabel>
                                <OutlinedInput
                                    onChange={handleChange('username')}
                                    value={values.username}
                                    name="usernmae"
                                    id="username"
                                    autoComplete='username'
                                    label="Username"
                                />
                            </FormControl>

                            <FormControl required sx={{mt: 2, width: "49%"}} variant="outlined">
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <OutlinedInput
                                    onChange={handleChange('password')}
                                    value={values.password}
                                    name="password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    id="password"
                                    autoComplete='new-password'
                                    label="Password"
                                    endAdornment = {
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label='toggle password visibility'
                                                onClick={handlePasswordVisibilityToggle}
                                                edge="end"
                                            >
                                                {values.showPassword ? <VisibilityOffRounded/> : <VisibilityRounded/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Box>
                        <Button
                            type="submit"
                            fullWidth
                            color='secondary'
                            variant='contained'
                            sx={{mt: 2}}
                        >
                            Create User
                        </Button>
                    </Box>
                </Box>
            </Modal>

            <Snackbar
                anchorOrigin={{vertical: "top", horizontal: "center"}}
                open={openSnack}
                autoHideDuration={6000}
                onClose={()=>setOpenSnack(false)}
            >
                <Alert onClose={()=>setOpenSnack(false)} severity="error" sx={{width: '100%'}}>{error}</Alert>
            </Snackbar>
       
        </Grid>
    )
}

export default Users