import { LogoutRounded, MenuRounded, PersonRounded } from '@mui/icons-material'
import { Avatar, Box, IconButton, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CemexLogo from '../assets/cemex_logo.png'
import { AuthContext } from './AuthProvider'


const Header = () => {
  const {user, logout} = useContext(AuthContext)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  let navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login", {replace: true})
  }
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box 
        position="fixed" 
        zIndex="1100" top="0px" 
        left="auto" right="0px" 
        component="header" width="100%" 
        sx={{backgroundColor: "white", height: "68px"}} 
        justifyContent="space-between" 
        display="flex"
    >
        <Box sx={{width: "200px", px: "15px", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <img alt='' width={50} src={CemexLogo}/>

          {/* <Box sx={{width: "34px", height: "34px", borderRadius: "8px", justifyContent: "center", alignItems: "center", display: "flex"}} bgcolor="primary.light">
            <MenuRounded color='primary'/>
          </Box> */}
        </Box>

        <Box sx={{pr: 3, display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup = "true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{width: 38, height: 38, bgcolor: "primary.light", color: "primary.main"}}/>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
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
            <MenuItem onClick={()=>handleLogout()}>
              <ListItemIcon>
                <LogoutRounded fontSize='small'/>
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
    </Box>
  )
}

export default Header