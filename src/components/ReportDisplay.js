import { CloseRounded, DeleteRounded, FileDownloadRounded, MoreVert } from '@mui/icons-material'
import { Alert, Chip, CssBaseline, Icon, IconButton, ListItemIcon, Menu, MenuItem, Modal, Snackbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { ResponsivePie } from '@nivo/pie'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { CSVLink } from 'react-csv'
import { CSVDownload } from 'react-csv'
import { AuthContext } from '../navigation/AuthProvider'
import DefectDisplay from './DefectDisplay'

const ReportDisplay = ({item, setDeleted}) => {  
    const baseUrl = 'http://localhost:3000'    
    const {user} = useContext(AuthContext)
    const [anchorEl, setAnchorEl] = useState(null)
    const [data, setData] = useState([])

    const [openModal, setOpenModal] = useState(false)

    const open = Boolean(anchorEl)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const getNumberDefects = (arr) => {
        var number = 0;
        for (var i = 0; i < arr.length; i++) {
            number = number + arr[i].length
        }
        return number
    }

    const getFormatDate = (dateString) => {
        var date = new Date(dateString).toLocaleDateString()
        return date
    }

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`${baseUrl}/reports/delete` , {
                params: {
                    reportId: item.reportId
                }
            })
            setDeleted((prevState)=>!prevState)
        } catch(error) {
            console.log(error.response.data)
        }
    }

    const headers = [
        {label: "Issue key", key: "issueKey"},
        {label: "Status", key: "status"},
        {label: "Priority", key: "priority"},
        {label: "Severity", key: "severity"},
        {label: "Project Key", key: "projectKey"},
        {label: "Issue Type", key: "issueType"},
        {label: "Created", key: "created"},
        {label: "Asignee", key: "asignee"},
        {label: "Digital Service", key: "digitalService"},
        {label: "Summary", key: "summary"},
        {label: "Description", key: "description"},
        {label: "Label", key: "label"},
    ]

    useEffect(()=>{
        var groups = item.groups
        var dataArray = []
        for (var i = 0; i < groups.length; i++) {
            for (var j = 0; j < groups[i].length; j++) {
                var element = {
                    issueKey: groups[i][j][0],
                    status: groups[i][j][1],
                    priority: groups[i][j][2],
                    severity: groups[i][j][3],
                    projectKey: groups[i][j][4],
                    issueType: groups[i][j][5],
                    created: groups[i][j][6],
                    asignee: groups[i][j][7],
                    digitalService: groups[i][j][8],
                    summary: groups[i][j][9],
                    description: groups[i][j][10].replace(/\r?\n|\r/g, ""),
                    label: item.labels[i]
                }
                dataArray.push(element)
            }
        }
        setData(dataArray)
    },[])

    return (
        <Box 
            display="flex" 
            className="report-display"
            sx={{px: 2, py: 3}}
            alignItems="center"
            justifyContent="space-between"
           
        >
            <Box display="flex" width="90%"  onClick={()=>{setOpenModal(true)}}>
                <Typography sx={{width: "30%"}}>{item.reportId}</Typography>
                <Typography sx={{width: "15%"}}>{item.createdBy}</Typography>
                <Typography textAlign="center" sx={{width: "15%"}}>{getNumberDefects(item.groups)}</Typography>
                <Typography textAlign="center" sx={{width: "15%"}}>{item.numGroups}</Typography>
                <Typography textAlign="center" sx={{width: "15%"}}>{getFormatDate(item.createdAt)}</Typography>
            </Box>
            <Box>
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
                    <CSVLink style={{color: "#243B80", textDecoration: "none"}} filename={item.reportId} data={data} headers={headers}>
                    <MenuItem>
                        <ListItemIcon>
                            <FileDownloadRounded color='primary' fontSize='small'/>
                        </ListItemIcon>
                        Download CSV
                    </MenuItem>
                    </CSVLink>

                    {
                        user.role === true ?
                        <MenuItem onClick={()=>handleDelete()}>
                            <ListItemIcon>
                                <DeleteRounded color='secondary' fontSize='small'/>
                            </ListItemIcon>
                            Delete report
                        </MenuItem>
                        :
                        null
                    }

              
                </Menu>
            </Box>

            <Modal
                open={openModal}
                onClose={()=>setOpenModal(false)}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "90%",
                        bgcolor: "#F2F1F5",
                        boxShadow: 24,
                        px: 4,
                        py: 2,
                        height: "90vh",
                        overflowY: "scroll"
                    }}
                >
                    <Box sx={{mb: "2vh"}} display="flex" justifyContent="flex-end">
                        <IconButton onClick={()=>setOpenModal(false)} size="small">
                            <CloseRounded/>
                        </IconButton>
                    </Box>

                    <Box display="flex" justifyContent="space-between">

                        <Box sx={{width: "30%"}}>
                            <Box bgcolor="white" sx={{border: "1px solid #DDE0E3", borderRadius: "8px", mb: "2vh", p: 2}}>
                                <Box display="flex">
                                    <Typography fontWeight="bold" sx={{mr: 1}}>Report ID:</Typography>
                                    <Typography>{item.reportId}</Typography>
                                </Box>
                                <Box display="flex">
                                    <Typography fontWeight="bold" sx={{mr: 1}}>Created by:</Typography>
                                    <Typography>{item.createdBy}</Typography>
                                </Box>
                                <Box display="flex">
                                    <Typography fontWeight="bold" sx={{mr: 1}}>Date created:</Typography>
                                    <Typography>{getFormatDate(item.createdAt)}</Typography>
                                </Box>
                                <Box display="flex">
                                    <Typography fontWeight="bold" sx={{mr: 1}}># Groups:</Typography>
                                    <Typography>{item.numGroups}</Typography>
                                </Box>
                                <Box display="flex">
                                    <Typography fontWeight="bold" sx={{mr: 1}}># Defects:</Typography>
                                    <Typography>{getNumberDefects(item.groups)}</Typography>
                                </Box>
                            </Box> 

                            <Box bgcolor="white" sx={{height: "59.9vh", border: "1px solid #DDE0E3", borderRadius: "8px"}}>
                                <ResponsivePie
                                    data={item.pieData}
                                    sortByValue={true}
                                    colors={{datum: 'data.color'}}
                                    margin={{top: 30, right: 90, bottom: 30, left: 90}}
                                    innerRadius={0.5}
                                    padAngle={1.2}
                                    cornerRadius={3}
                                    activeOuterRadiusOffset={8}
                                    activeInnerRadiusOffset={8}
                                    arcLinkLabelsThickness={1}
                                    arcLinkLabelsDiagonalLength={17}
                                    arcLinkLabelsStraightLength={1}
                                    arcLinkLabelsSkipAngle={10}
                                />
                            </Box>
                        </Box>

                        <Box sx={{width: "68%"}}>
                            <Box bgcolor="white" sx={{border: "1px solid #DDE0E3", height: "78vh", borderRadius: "8px", px: 2, overflowY: "scroll"}}>
                                {
                                    item.groups.map((element, index) => (
                                        element.map((defect) => {
                                            return (
                                                <DefectDisplay key={defect[0]} color={item.pieData[index]["color"]} item={defect}/>
                                            )
                                        }
                                        )
                                    ))
                                }
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}

export default ReportDisplay