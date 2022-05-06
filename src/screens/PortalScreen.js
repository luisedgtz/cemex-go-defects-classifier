import { CssBaseline, Grid } from '@mui/material'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../navigation/AuthProvider'
import NavBar from '../navigation/NavBar'
import Classifier from './Classifier'
import History from './History'

const PortalScreen = () => {
    // const {user} = useContext(AuthContext)
    const [navIndex, setNavIndex] = useState(1)

    const handleNavIndexChange = (index) => {
        console.log(index)
        setNavIndex(index)
    }

    return (
        <Grid container component="main" sx={{height: "100vh"}}>
            <CssBaseline/>
            <NavBar handleNavIndexChange = {(index)=>handleNavIndexChange(index)} admin={true}/>
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
        </Grid>
    )
}

export default PortalScreen