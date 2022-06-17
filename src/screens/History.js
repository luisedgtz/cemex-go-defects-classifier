import { Avatar, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, ListItemIcon, Menu, MenuItem, OutlinedInput, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, TextField, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { visuallyHidden } from '@mui/utils'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FileDownloadRounded, FilterAltOffRounded, FilterListOff, MoreVert, Person, SearchRounded } from '@mui/icons-material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns' 

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1
    }
    if (b[orderBy] > a[orderBy]) {
        return 1
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1]
    })
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'id',
        numeric: false,
        disablePadding: true,
        label: 'Report ID'
    },
    {
        id: 'author',
        numeric: false,
        disablePaddig: true,
        label: 'Author'
    },
    {
        id: 'defects',
        numeric: true,
        disablePaddig: true,
        label: "# Defects"
    },
    {
        id: 'groups',
        numeric: true,
        disablePaddig: true,
        label: "# Groups"
    },
    {
        id: 'date',
        numeric: false,
        disablePaddig: true,
        label: "Date created"
    }
]

function EnhancedTableHead(props) {
    const {order, orderBy, onRequestSort} = props
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property)
    }

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell, index) => (
                    <TableCell key={index}>
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === "desc" ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}



const History = () => {
    const baseUrl = 'http://localhost:3000'
    const [order, setOrder] = useState('asc')
    const [orderBy, setOrderBy] = useState('name')
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(7)

    const [rows, setRows] = useState([])

    const [date1, setDate1] = useState(null)
    const [date2, setDate2] = useState(null)
    const [username, setUsername] = useState("")


    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const getFormatDate = (dateString) => {
        var date = new Date(dateString).toLocaleDateString()
        return date
    }

    const getNumberDefects = (arr) => {
        var number = 0;
        for (var i = 0; i < arr.length; i++) {
            number = number + arr[i].length
        }
        return number
    }

    const handleDownloadCSV = (id) => {
        console.log(id)
    }

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
            console.log("date1 es mayor")
            return
        }

        if (username === "" && date1 === null && date2 === null) {
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
            console.log("Fill something")
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
        handleGetReports()
    },[])

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

            <Box bgcolor="white" sx={{border: "1px solid #DDE0E3", mt: 3, overflow: "hidden"}} borderRadius="8px">
                <TableContainer sx={{maxHeight: 570}}>
                    <Table
                        stickyHeader
                        sx={{width: "100%"}}
                        size="medium"
                    >
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => (
                                        <TableRow
                                            hover
                                            key={row._id}
                                            tabIndex={-1}
                                        >
                                            <TableCell
                                                component="th"
                                                id={row._id}
                                                scope="row"
                                                padding="normal"

                                            >
                                                {row.reportId}
                                            </TableCell>
                                            <TableCell>{row.createdBy}</TableCell>
                                            <TableCell>{getNumberDefects(row.groups)}</TableCell>
                                            <TableCell>{row.numGroups}</TableCell>
                                            <TableCell>
                                                <Box alignItems="center" display="flex" justifyContent="space-between">
                                                    <Typography>{getFormatDate(row.createdAt)}</Typography>
                                                    <IconButton onClick={handleClick}>
                                                        <MoreVert/>
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
                                                              filter: 'drop-shadow(0px 2px 5px rgba(0,0,0,0.08))',
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
                                                        <MenuItem onClick={()=>handleDownloadCSV(row._id)}>
                                                            <ListItemIcon>
                                                                <FileDownloadRounded color='primary' fontSize='small'/>
                                                            </ListItemIcon>
                                                            Download CSV
                                                        </MenuItem>
                                                    </Menu>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    )
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[7, 15, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
        </Grid>
    )
}

export default History