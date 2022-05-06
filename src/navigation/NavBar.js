import { History, Person, PieChart } from '@mui/icons-material'
import CemexLogo from "../assets/cemex_logo.png";
import { Grid, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Box } from '@mui/system'
import React, {useState} from 'react'

const NavBar = ({ handleNavIndexChange, admin}) => {
  const [index, setIndex] = useState(1);

  const handleChange = (index) => {
    setIndex(index)
    handleNavIndexChange(index)
  }

  return (
    <Grid md={1.5} sx={{ bgcolor: 'primary.main' }}>
      <img style={{marginLeft: 10, marginTop: 25}} width={80} src={CemexLogo}/>
      <List component="nav" sx={{mt: 5}}>
        <Box bgcolor={index === 1 ?  "#16244F" :  "#475B95" } sx={{mx: 1.5, borderRadius: 3}}>
          <ListItemButton onClick={()=>handleChange(1)} sx={{py: 2, borderRadius: 3}}>
            <ListItemIcon>
              <PieChart sx={{color: "white"}}/>
            </ListItemIcon>
            <ListItemText sx={{color: "white"}} primary="Classifier" />
          </ListItemButton>
        </Box>
        <Box bgcolor={index === 2 ?  "#16244F" :  "#475B95" } sx={{mx: 1.5, borderRadius: 3, my: 5}}>
          <ListItemButton onClick={()=>handleChange(2)} sx={{py: 2, borderRadius: 3}}>
            <ListItemIcon>
              <History sx={{color: "white"}}/>
            </ListItemIcon>
            <ListItemText sx={{color: "white"}} primary="Defects History" />
          </ListItemButton>
        </Box>
        {
          admin ? 
          <Box bgcolor={index === 3 ?  "#16244F" :  "#475B95" } sx={{mx: 1.5, borderRadius: 3, my: 5}}>
            <ListItemButton onClick={()=>handleChange(3)} sx={{py: 2, borderRadius: 3}}>
              <ListItemIcon>
                <Person sx={{color: "white"}}/>
              </ListItemIcon>
              <ListItemText sx={{color: "white"}} primary="Users" />
            </ListItemButton>
          </Box>
          :
          null
        }
      </List>
    </Grid>
  )
}

export default NavBar