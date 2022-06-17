import { DoneRounded, EventNote, FileUpload, PermIdentity } from '@mui/icons-material'
import { Alert, Avatar, Button, Chip, CircularProgress, Grid, InputLabel, ListItem, Paper, Snackbar, Stack, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, {Fragment, useEffect, useState, useContext} from 'react'
import Dropzone from 'react-dropzone'
import * as XLSX from 'xlsx'
import axios from 'axios';
import { ResponsivePie } from '@nivo/pie'
import DefectDisplay from '../components/DefectDisplay'
import {AuthContext} from '../navigation/AuthProvider'

const Classifier = () => {

    const baseUrl = 'http://localhost:3000'
    const steps = ['Upload file to process', 'Processing file data', 'Save report result']

    const {savedReport, setSavedReport, activeStep, setActiveStep, user} = useContext(AuthContext)
    
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }

    const [clusters, setClusters] = useState(1);
    const [file, setFile] = useState(null);

    const [data, setData] = useState([])
    const [groups, setGroups] = useState([])
    const [pieData, setPieData] = useState([])
    const [pieDataArray, setPieDataArray] = useState([])

    const [dataGroup, setDataGroup] = useState([])
    const [labels, setLabels] = useState([])

    const [values, setValues] = useState({
        open: false,
        error: '',
        selectedAll: true
    })

    const handleChangeLabel = (event, index) => {
        var pieArray = [...pieData]
        pieArray[index].id = event.target.value

        var labelsArray = [...labels]
        labelsArray[index] = event.target.value

        setPieDataArray(pieArray)
        setLabels(labelsArray)
    }

    const handleFilter = (index) => {
        var dataPie = [...pieData]
        var select = false
        var dataArray = []
        if (index === -1) {
            dataPie.map((element)=>{
                element.selected = false;
            })
            setValues({...values, selectedAll: true})
            dataArray = groups

        } else {
            setValues({...values, selectedAll: false})
            dataPie[index].selected = !dataPie[index].selected
        }

        dataPie.map((element, index)=> {
            if (element.selected == true) {
                dataArray.push(groups[index])
                select = true
            }
        })

        if (select == false) {
            setValues({...values, selectedAll: true})
            dataArray = groups
        }
        
        setDataGroup(dataArray)
        setPieData(dataPie)
    }

    const handleClose = () => {
        setValues({...values, open: false})
    }

    const handleChange = (event) => {
        setClusters(event.target.value);
    }

    const handleFileDrop = (acceptedFiles) => {
        const uploadedFile = acceptedFiles[0]
        setFile(uploadedFile)
        
        const reader = new FileReader();
        reader.onload = (evt) => {
            /* Parse data */
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: 'binary' });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_json(ws, { header: 1 });            
            setData(data.slice(1, data.length));

        };
        reader.readAsBinaryString(uploadedFile);
    }

    const handleStartAgain = () => {
        setClusters(1)
        setFile(null)
        setData([])
        setGroups([])
        setPieData([])
        setPieDataArray([])
        setDataGroup([])
        setLabels([])
        setActiveStep(0)
    }

    const handleSave = async () => {
        var groupsArray = []
        groups.map((item)=>{
            groupsArray.push(item.defects)
        })

        try {
            const response = await axios.post(`${baseUrl}/reports/new`, {
                user: user,
                numGroups: groupsArray.length,
                labels: labels,
                groups: groupsArray,
                pieData: pieData
            })

            if (response.status === 201) {
                handleNext()
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleProcess = async () => {
        if (data.length === 0) {
            setValues({...values, open: true, error: "A CSV file is required"})
        } else if (data.length < clusters){
            setValues({...values, open: true, error: "Number of groups should be less or equal than number of defects"})
        } else if (clusters <= 0) {
            setValues({...values, open: true, error: "Number of groups cannot be negative or zero"})
        } else {
            handleNext()
        }
        try{
            const response = await axios.post(`${baseUrl}/reports/script`, { 
                "defects_array": data,
                "cluster_number": clusters
            })
            if (response.status === 200) {
                var groupData = []
                for (var i = 0; i < response.data.length; i++) {
                    var randomColor = Math.floor((Math.random() * 255 + 1))
                    groupData.push({
                        "color": `hsl(${randomColor}, 70%, 50%)`,
                        "defects": response.data[i]
                    })
                }
                setGroups(groupData)
                setDataGroup(groupData)
            }
        } catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        const handlePieData = () => {
            var formatData = [];
            var labelsData = [];
            for (var i = 0; i < groups.length; i++) {
                formatData.push({
                    id: `Group ${i}`,
                    label: `${i}`,
                    value: groups.at(i)["defects"].length,
                    color: groups.at(i)["color"]
                })
                labelsData.push(`Group ${i}`)
            }
            setPieData(formatData)
            setLabels(labelsData)
        }

        if (groups.length !== 0) {
            handlePieData()
            handleNext()
        }
    }, [groups])

    useEffect(()=> {
        setPieData(pieDataArray)
    }, [pieDataArray])

    return (
        <Grid item>
            <Box bgcolor="white" sx={{border: "1px solid #DDE0E3", p: 2}} borderRadius="8px">
                <Typography component="h1" fontSize="20px" fontWeight="bold">Defects Classifier</Typography>
            </Box>
                <Stepper sx={{my: 3}} activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const stepProps = {}
                        const labelProps = {}
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        )
                    })}
                </Stepper>
                {
                    activeStep === 0 ? (
                        <Fragment>
                            <Box bgcolor="white" sx={{border: "1px solid #DDE0E3", p: 3}} borderRadius="8px" height={500}>
                                <Box bgcolor="rgba(221,224,227,0.2)" sx={{height: "60%", borderRadius: "8px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "1px solid #DDE0E3"}}>
                                    <Dropzone maxFiles={1} multiple={false} accept={{'text/csv': ['.csv']}} onDrop={acceptedFiles => handleFileDrop(acceptedFiles)}>
                                    {({getRootProps, getInputProps}) => (
                                        <section>
                                            <div style={{alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "column"}} {...getRootProps()}>
                                                <FileUpload/>
                                                <input {...getInputProps()} />
                                                <p style={file === null ? {} : {fontWeight: "bold"}}>{file === null ? "Drag and drop file to process, or click to select file" : file.name}</p>
                                                <p style={{fontStyle: "italic", fontSize: "13px"}}>Only .csv files are accepted</p>  
                                            </div>
                                        </section>
                                    )}
                                    </Dropzone>
                                </Box>

                                <Typography sx={{my: 2}}>{data.length} defects identified</Typography>

                                <Box display="flex" alignItems="center">
                                    <InputLabel htmlFor='clusters' color='text'>Number of groups to classify:</InputLabel>
                                    <TextField
                                        type="number"
                                        id="clusters"
                                        label=""
                                        value={clusters}
                                        onChange={handleChange}
                                        inputProps={{max: data.length, min: 1}}
                                        sx={{ml: 2, width: "100px"}}
                                    />
                                </Box>

                                <Button sx={{my: 2, width: "100%"}} color="secondary" variant="contained" onClick={handleProcess}>Next</Button>
                            </Box>
                        </Fragment>
                    ) : activeStep === 1 ? (
                        <Fragment>
                            <Box bgcolor="white" sx={{border: "1px solid #DDE0E3", height: 500, borderRadius: "8px", display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "center"}}>
                                <CircularProgress/>
                                <Typography width="50%" textAlign="center" sx={{mt: 3}}>We are processing your file, this might take some minutes</Typography>
                            </Box>
                        </Fragment>
                    ) : activeStep === 2 ? (
                        <Fragment>
                            <Box display="flex" justifyContent="space-between">
                                <Box sx={{width: "35%"}}>
                                    <Box bgcolor="white" sx={{border: "1px solid #DDE0E3", height: 380, borderRadius: "8px"}}>
                                        <ResponsivePie
                                            data={pieData}
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
                                    <Box bgcolor="white" sx={{border: "1px solid #DDE0E3", height: 240, borderRadius: "8px", mt: "10px", p: 2, overflowY: "scroll"}}>
                                        <Typography sx={{mb: 1}} fontWeight="bold">Change labels:</Typography>
                                        <Box display="flex" flexWrap="wrap" justifyContent="space-between" >
                                        {
                                            pieData.map((element, index)=> (
                                                <TextField
                                                    sx={{width: "49%", mb: 2}}
                                                    key={element.label}
                                                    value={element.id}
                                                    onChange={event=>handleChangeLabel(event, index)}
                                                />
                                            ))
                                        }
                                        </Box>
                                    </Box>
                                </Box>

                                <Box sx={{width: "64%"}}>
                                    <Box display="flex" alignItems="center" bgcolor="white" sx={{border: "1px solid #DDE0E3", height: 50, borderRadius: "8px", px: 1, overflowX: "scroll"}}>
                                        <Chip
                                            sx={{mx: 1}}
                                            label="All"
                                            onClick={()=>{handleFilter(-1)}}
                                            avatar={<Avatar>{values.selectedAll ? <DoneRounded sx={{color: 'primary.main'}} fontSize='small'/> : null} </Avatar>}   
                                        />
                                        {
                                            pieData.map((data, index) => (
                                                <Chip
                                                    sx={{mx: 1}}
                                                    key={data.label}
                                                    label={data.id}
                                                    onClick={()=>{handleFilter(index)}}
                                                    avatar={<Avatar sx={{bgcolor: data.color}}> {data.selected ? <DoneRounded sx={{color: 'primary.main'}} fontSize='small'/> : null} </Avatar>}                                                    
                                                />
                                                
                                            ))
                                        }
                                    </Box>

                                    <Box bgcolor="white" sx={{mt: "10px", border: "1px solid #DDE0E3", height: 570, borderRadius: "8px", px: 2, overflowY: "scroll"}}>
                                        {
                                            dataGroup.map((item) => (
                                                item["defects"].map((defect) => (
                                                    <DefectDisplay key={defect[0]} color={item["color"]} item={defect}/>
                                                ))
                                            ))
                                        }
                                    </Box>
                                </Box>
                            </Box>
                            <Button sx={{mt: 3, width: "100%"}} color="secondary" variant="contained" onClick={handleSave}>Save</Button>
                        </Fragment>
                    ) : activeStep === 3 ? (
                        <Fragment>
                            <Box bgcolor="white" sx={{border: "1px solid #DDE0E3", height: 500, borderRadius: "8px", display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "center"}}>
                                <Typography width="50%" textAlign="center" sx={{mt: 3}}>Your report has been successfully saved</Typography>
                                <Button sx={{mt: 3, width: "20%"}} color="secondary" variant="contained" onClick={handleStartAgain}>Process new file</Button>
                            </Box>
                        </Fragment>
                    ) : null
                }
            <Snackbar
                anchorOrigin={{vertical: "top", horizontal: "center"}}
                open={values.open}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>{values.error}</Alert>
            </Snackbar>
        </Grid>
    )
}

export default Classifier