import { Alert, Avatar, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, ListItemIcon, Menu, MenuItem, OutlinedInput, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, TextField, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { visuallyHidden } from '@mui/utils'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FileDownloadRounded, FilterAltOffRounded, FilterListOff, MoreVert, Person, SearchRounded } from '@mui/icons-material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns' 
import ReportDisplay from '../components/ReportDisplay'

const History = () => {
    const baseUrl = 'http://localhost:3000'
    const [rows, setRows] = useState([])

    const [date1, setDate1] = useState(null)
    const [date2, setDate2] = useState(null)
    const [username, setUsername] = useState("")
    const [deleted, setDeleted] = useState(false)


    const [openSnack, setOpenSnack] = useState(false)
    const [error, setError] = useState('')

    const handleSearchByUserDate = async () => {
        try {
            const response = await axios.get(`${baseUrl}/reports/byUserDate` , {
                params: {
                    username: username,
                    minDate: date1,
                    maxDate: date2
                }
            })
            if (response.status === 200) {
                setRows(response.data)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleSearchByUser = async () => {
        try {
            const response = await axios.get(`${baseUrl}/reports/byUser`, {
                params: {
                    username: username
                }
            })
            if (response.status === 200) {
                setRows(response.data)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleSearchByDate = async () => {
        try {
            const response = await axios.get(`${baseUrl}/reports/byDate`, {
                params : {
                    minDate: date1,
                    maxDate: date2
                }
            })
            if (response.status === 200) {
                setRows(response.data)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleSearch = () => {
        if (date1 > date2) {
            setOpenSnack(true)
            setError("Invalid dates: 'From date' cannot be greater than 'to date' ")
            return
        }

        if (username === "" && date1 === null && date2 === null) {
            setOpenSnack(true)
            setError("Fill filters")
            return
        } 

        if (username !== "" && date1 !== null && date2 !== null) {
            handleSearchByUserDate()
        } else if (date1 !== null && date2 !== null) {
            handleSearchByDate()
        } else if(username !== "") {
            setDate1(null)
            setDate2(null)
            handleSearchByUser()
        } else {
            setOpenSnack(true)
            setError("Fill filters")
        }
    }

    const handleClearSearch = () => {
        handleGetReports()
        setDate1(null)
        setDate2(null)
        setUsername("")
    }

    const handleClearFilters = () => {
        setDate1(null)
        setDate2(null)
        setUsername("")
    }

    const handleChangeUsername = (e) => {
        setUsername(e.target.value)
    }

    const handleGetReports = async () => {
        try {
            const response = await axios.get(`${baseUrl}/reports/all`)
            if (response.status === 200) {
                setRows(response.data)
            }
        } catch (e) {
            console.log(e)
        }
    }
    
    useEffect(()=> {
        if (date1 > date2) {
            console.log("date1 es mayor")
            return
        }

        if (username === "" && date1 === null && date2 === null) {
            handleGetReports()
            console.log("Fill something")
            return
        } 

        if (username !== "" && date1 !== null && date2 !== null) {
            handleSearchByUserDate()
        } else if (date1 !== null && date2 !== null) {
            handleSearchByDate()
        } else if(username !== "") {
            setDate1(null)
            setDate2(null)
            handleSearchByUser()
        } else {
            handleGetReports()
            console.log("Fill something")
        }

    }, [deleted])


    return (
        <Grid item>
            <Box bgcolor="white" sx={{border: "1px solid #DDE0E3"}} borderRadius="8px">
                <Typography component="h1" fontSize="20px" p={2} fontWeight="bold">Reports</Typography>
            </Box>

            <Box display="flex" alignItems="center" justifyContent="space-between" bgcolor="white" sx={{border: "1px solid #DDE0E3", borderRadius: "8px", p: 2, overflowX: "scroll", mt: 3}}>
                <Box alignItems="center" display="flex" width="70%" justifyContent="space-between">
                    <Box display="flex" alignItems="center">
                        <InputLabel sx={{mr: 2}}>From date:</InputLabel>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Select date"
                                value={date1}
                                onChange={(newValue) => {
                                    setDate1(newValue)
                                }}
                                renderInput={(params) => <TextField {...params}/>}
                            />
                        </LocalizationProvider>
                    </Box>

                    <Box display="flex" alignItems="center">
                        <InputLabel sx={{mr: 2}}>To date:</InputLabel>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Select date"
                                value={date2}
                                onChange={(newValue) => {
                                    setDate2(newValue)
                                }}
                                renderInput={(params) => <TextField {...params}/>}
                            />
                        </LocalizationProvider>
                    </Box>

                    <Box sx={{width: "30%"}}>
                        <FormControl sx={{width: "100%"}} variant="outlined">
                            <InputLabel html="username">Search by username</InputLabel>
                            <OutlinedInput
                                onChange={handleChangeUsername}
                                value={username}
                                name="username"
                                id="username"
                                label="Search by username"
                            />
                        </FormControl>
                    </Box>

                    <Tooltip title="Clear filters">
                        <IconButton onClick={handleClearFilters} sx={{width: 40, height: 40}}>
                            <FilterListOff/>
                        </IconButton>
                    </Tooltip>

                </Box>


                <Box display="flex">
                    <Tooltip title="Clear search">
                        <IconButton onClick={handleClearSearch} sx={{mr: 2}}>
                            <FilterAltOffRounded/>
                        </IconButton>
                    </Tooltip>


                    <Button onClick={handleSearch} size='large' variant="contained" startIcon={<SearchRounded/>}>
                        Search
                    </Button>
                </Box>

            </Box>

            <Box bgcolor="white" sx={{border: "1px solid #DDE0E3", mt: 3, overflowY: "scroll", maxHeight: 570}} borderRadius="8px">
                <Box sx={{p: 2, borderBottom: "1px solid #DDE0E3", position: "sticky", top: 0, bgcolor: "white", zIndex: 1200}}>
                    <Box display="flex" width="90%">
                        <Typography sx={{fontWeight: "bold", width: "30%"}}>Report ID</Typography>
                        <Typography sx={{fontWeight: "bold", width: "15%"}}>Author</Typography>
                        <Typography textAlign="center" sx={{fontWeight: "bold", width: "15%"}}># Defects</Typography>
                        <Typography textAlign="center" sx={{fontWeight: "bold", width: "15%"}}># Groups</Typography>
                        <Typography textAlign="center" sx={{fontWeight: "bold", width: "15%"}}>Date created</Typography>
                    </Box>
                </Box>
                {
                    rows.map((row) => (
                        <ReportDisplay setDeleted={setDeleted} key={row._id} item={row}/>
                    ))
                }
            </Box>
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

export default History