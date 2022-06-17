import { CssBaseline, Grid, Typography, ListItemButton, ListItemText } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../navigation/AuthProvider'
import Header from '../navigation/Header'
import NavBar from '../navigation/NavBar'
import Classifier from './Classifier'
import Users from './Users'
import History from './History'

const PortalScreen = () => {
    const {user, loggedIn} = useContext(AuthContext)
    const [navIndex, setNavIndex] = useState(1)

    const handleNavIndexChange = (index) => {
        setNavIndex(index)
    }

    return (
        <Box display="flex">
            <CssBaseline/>
            <Header/>
            <NavBar handleNavIndexChange = {(index)=>handleNavIndexChange(index)} admin={true}/>
            <Grid 
                component="main" 
                bgcolor="#F2F1F5"
                width="85vw" 
                minHeight="calc(100vh - 68px)" 
                padding="20px"
                mr="1vw"
                mt="68px"
                borderRadius="8px 8px 0px 0px"
                marginLeft="0px"
            >
                {
                    navIndex === 1 ?
                    <Classifier/>
                    :
                    null
                }
                {
                    navIndex === 2 ?
                    <History/>
                    :
                    null
                }
                {
                    navIndex === 3 ?
                    <Users/>
                    :
                    null
                }
            </Grid>
        </Box>     
    )
}

export default PortalScreen