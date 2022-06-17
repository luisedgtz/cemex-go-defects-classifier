import { DeleteRounded, MoreVertRounded } from '@mui/icons-material'
import { Alert, Avatar, Box, IconButton, ListItemIcon, Menu, MenuItem, Paper, Snackbar, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../navigation/AuthProvider'
import axios from 'axios'
import { findAllByDisplayValue } from '@testing-library/react'

const UserDisplay = ({item, setDeleted}) => {
    const baseUrl = 'http://localhost:3000'
    const {user} = useContext(AuthContext)
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const [openSnack, setOpenSnack] = useState(false)
    const [message, setMessage] = useState('')

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    
    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`${baseUrl}/users/deleteuser` , {
                params: {
                    "email": item.email
                }
            })
            setDeleted((prevState)=> !prevState)
        } catch(error) {
            console.log(error.response.data)
        }
    }

    return (
        <Box alignItems="center" sx={{height: 100, p: 1, width: "23%", borderRadius: "8px", border: "1px solid #DDE0E3"}} display="flex" bgcolor="rgba(221,224,227,0.2)" justifyContent="space-between">
                <Box display="flex">
                    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" mr={1}>
                        <Avatar sx={{width: 50, height: 50}}></Avatar>
                        {
                            item.role === true ?
                            <Typography fontSize="9px" fontWeight="bold" sx={{mt: 0.3}}>ADMIN</Typography>
                            :
                            <Typography fontSize="9px" fontWeight="bold" sx={{mt: 0.3}}>USER</Typography>
                        }
                    </Box>
                    <Box>
                        <Typography fontWeight="bold">{item.name} {item.lastname}</Typography>
                        <Typography fontSize="small" fontWeight="light">{item.email}</Typography>
                    </Box>
                </Box>

                {
                    user._id !== item._id ? 
                    <Box sx={{height: 30, width: 30, alignSelf: "start"}}>
                        <IconButton onClick={handleClick} sx={{height: 30, width: 30}}>
                            <MoreVertRounded/>
                        </IconButton>

                        <Menu
                            anchorEl={anchorEl}
                            id="more-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                    },
                                    '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                    },
                                }
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem onClick={()=>handleDelete()}>
                                <ListItemIcon>
                                    <DeleteRounded color='secondary' fontSize='small'/>
                                </ListItemIcon>
                                Delete user
                            </MenuItem>
                        </Menu>
                    </Box>
                    : 
                    null
                }
        </Box>
    )
}

export default UserDisplay