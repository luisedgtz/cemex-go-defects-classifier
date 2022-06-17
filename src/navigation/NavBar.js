import { HistoryRounded, MenuRounded, PersonRounded, PieChartRounded } from '@mui/icons-material'
import { Alert, Button, Grid, List, ListItemButton, ListItemText, Paper, Snackbar, Typography } from '@mui/material'
import CemexLogo from '../assets/cemex_logo.png'
import { Box } from '@mui/system'
import React, {useContext, useState} from 'react'
import { AuthContext } from './AuthProvider';
import { useNavigate } from 'react-router-dom';

const NavBar = ({ handleNavIndexChange, admin}) => {
  const [index, setIndex] = useState(1);

  const {savedReport, setSavedReport, activeStep, setActiveStep, user} = useContext(AuthContext)

  const [continueIndex, setContinueIndex] = useState(0)
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  
  const handleChange = (index) => {
    setContinueIndex(index)
    if (!savedReport && (activeStep === 1)) {
      setOpen(true)
    } else if (!savedReport && (activeStep === 2)) {
      setOpen2(true)
      setOpen(false)
    } else {
      setIndex(index)
      handleNavIndexChange(index)
      setActiveStep(0)
    }
  }

  const handleContinue = () => {
    setIndex(continueIndex)
    handleNavIndexChange(continueIndex)
    setActiveStep(0)
    setOpen2(false)
  }

  const continueSave = (
    <Button onClick={()=>handleContinue()} size="small">
      CONTINUE
    </Button>
  )

  return (
    <Box component="nav" width="14vw">
      <Box zIndex={1200} flexDirection="column" alignItems="center" display="flex" sx={{overflowY: "auto"}} width="14vw" top="60px" maxHeight="calc(100vh - 68px)" position="fixed">

        <Box bgcolor={index === 1 ?  "primary.light" :  "white" } sx={{borderRadius: "10px", my: 1, width: "90%"}}>
          <ListItemButton onClick={()=>handleChange(1)} sx={{py: 1.5, borderRadius: "10px"}}>
            <PieChartRounded fontSize='small' sx={{color: "primary.main", mx: 2}}/>
            <Typography fontSize="15px" sx={{color: "primary.main"}}>Classifier</Typography>
          </ListItemButton>
        </Box>

        <Box bgcolor={index === 2 ?  "primary.light" :  "white" } sx={{borderRadius: "10px", my: 1, width: "90%"}}>
          <ListItemButton onClick={()=>handleChange(2)}  sx={{py: 1.5, borderRadius: "10px"}}>
            <HistoryRounded fontSize='small' sx={{color: "primary.main", mx: 2}}/>
            <Typography fontSize="15px" sx={{color: "primary.main"}}>Reports</Typography>
            </ListItemButton>
        </Box>

        {
          user.role ?
          <Box bgcolor={index === 3 ?  "primary.light" :  "white" } sx={{borderRadius: "10px", my: 1, width: "90%"}}>
            <ListItemButton onClick={()=>handleChange(3)} sx={{py: 1.5, borderRadius: "10px"}}>
              <PersonRounded fontSize='small' sx={{color: "primary.main", mx: 2}}/>
              <Typography fontSize="15px" sx={{color: "primary.main"}}>Users</Typography>
            </ListItemButton>
          </Box>
          :
          null
        }
      </Box>

      <Snackbar
        anchorOrigin={{vertical: "top", horizontal: "center"}}
        open={open}
        autoHideDuration={6000}
        onClose={()=>setOpen(false)}
      >
        <Alert onClose={()=>setOpen(false)} severity="warning" sx={{width: "100%"}}>We're processing your file</Alert>
      </Snackbar>


      <Snackbar
        anchorOrigin={{vertical: "top", horizontal: "center"}}
        open={open2}
        autoHideDuration={6000}
        onClose={()=>setOpen2(false)}
      >
        <Alert action={continueSave} onClose={()=>setOpen2(false)} severity="warning" sx={{width: "100%"}}>Your file is not saved yet</Alert>
      </Snackbar>
    </Box>
  )
}

export default NavBar