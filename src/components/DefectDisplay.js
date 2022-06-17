import { CalendarMonthRounded, CloseRounded } from '@mui/icons-material'
import { Box, Paper, Typography, Modal, IconButton } from '@mui/material'
import { height } from '@mui/system'
import React, {useEffect, useState} from 'react'

const DefectDisplay = ({item, color}) => {

    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    const convertDate = (date) => {
        var timestamp = ((date - 25569) * 86400) + 43200
        var date = new Date(timestamp * 1000).toLocaleDateString()
        return date
    }

    return (
        <div>
            <Box onClick={handleOpen} sx={{cursor: "pointer" ,my: 2, height: 80, borderRadius: "8px", border: "1px solid #DDE0E3"}} bgcolor="rgba(221,224,227,0.2)" alignItems="center" justifyContent="space-between" display="flex">
                <Box display="flex" alignItems="center" width="90%">
                    <Box borderRadius={"8px 0px 0px 8px"} bgcolor={color} sx={{width: "8px", height: 80, mr: 1}}/>
                    <Box>
                        <Box display="flex">
                            <Box display="flex">
                                <Typography fontSize="small" fontWeight="bold" sx={{mr: 1}}>Issue key:</Typography>
                                <Typography fontSize="small">{item[0]}</Typography>
                            </Box>

                            <Box sx={{ml: 2}} display="flex">
                                <Typography fontSize="small" fontWeight="bold" sx={{mr: 1}}>Assignee:</Typography>
                                <Typography fontSize="small">{item[7]}</Typography>
                            </Box>
                        </Box>


                        <Typography width="80%" noWrap>{item[9]}</Typography>
                    </Box>
                </Box>


                <Box width="10%" display="flex" flexDirection="column" alignItems="center">
                    <CalendarMonthRounded/>
                    <Typography fontSize="small">{convertDate(item[6])}</Typography>
                </Box>
            </Box>


            <Modal
                open={open}
                onClose={()=>handleClose()}
                // aria-labelledby="modal-modal-title"
                // aria-describedby="modal-modal-description"
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
                    <Box display="flex" justifyContent="space-between">
                        <Box display="flex" alignItems="center">
                            <CalendarMonthRounded sx={{mr: 1}}/>
                            <Typography>{convertDate(item[6])}</Typography>
                        </Box>
                        <IconButton onClick={()=>handleClose()} size='small'>
                            <CloseRounded/>
                        </IconButton>
                    </Box>

                    <Box display="flex" alignItems="center">
                            <Typography sx={{mr: 1}} fontWeight="bold">Issue key:</Typography>
                            <Typography>{item[0]}</Typography>
                        </Box>

                    <Box display="flex" alignItems="center">
                        <Typography sx={{mr: 1}} fontWeight="bold">Status:</Typography>
                        <Typography>{item[1]}</Typography>
                    </Box>

                    <Box display="flex" alignItems="center">
                        <Typography sx={{mr: 1}} fontWeight="bold">Priority:</Typography>
                        <Typography>{item[2]}</Typography>
                    </Box>

                    <Box display="flex" alignItems="center">
                        <Typography sx={{mr: 1}} fontWeight="bold">Severity:</Typography>
                        <Typography>{item[1]}</Typography>
                    </Box>

                    

                    <Box display="flex" alignItems="center">
                        <Typography sx={{mr: 1}} fontWeight="bold">Issue type:</Typography>
                        <Typography>{item[5]}</Typography>
                    </Box>

                    <Box display="flex" alignItems="center">
                        <Typography sx={{mr: 1}} fontWeight="bold">Assignee:</Typography>
                        <Typography>{item[7]}</Typography>
                    </Box>

                    <Box display="flex" alignItems="center">
                        <Typography sx={{mr: 1}} fontWeight="bold">Digital Service:</Typography>
                        <Typography>{item[8]}</Typography>
                    </Box>

                    <Typography fontWeight="bold" mt={2}>Summary:</Typography>

                    <Typography style={{whiteSpace: 'pre-line'}}>{item[9]}</Typography>

                    <Typography fontWeight="bold" mt={2}>Description:</Typography>

                    <Typography style={{whiteSpace: 'pre-line'}} id="modal-modal-description">{item[10]}</Typography>
                </Box>
            </Modal>
        </div>

    )
}

export default DefectDisplay