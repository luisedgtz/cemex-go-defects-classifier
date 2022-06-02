import { FileUpload } from '@mui/icons-material'
import { Alert, Button, CircularProgress, Grid, InputLabel, Snackbar, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, {Fragment, useState} from 'react'
import Dropzone from 'react-dropzone'
import * as XLSX from 'xlsx'
import axios from 'axios';
import { ResponsivePie } from '@nivo/pie'

const Classifier = () => {

    const baseUrl = 'http://localhost:3000'
    const steps = ['Upload file to process', 'Processing file data', 'Save result report']

    const pieData = [
        {
            id: 'Group A',
            label: 'Group A',
            value: 3,
            color: "hsl(90,70%, 50%)"
        },
        {
            id: 'Group B',
            label: 'Group B',
            value: 4,
            color: "hsl(30,70%, 50%)"
        },
        {
            id: 'Group C',
            label: 'Group C',
            value: 2,
            color: "hsl(20,70%, 50%)"
        }
    ]

    const [activeStep, setActiveStep] = useState(0)
    
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const [clusters, setClusters] = useState(1);
    const [file, setFile] = useState(null);

    const [data, setData] = useState([])
    const [defects, setDefects] = useState([])
    const [groups, setGroups] = useState([])
    // const [pieData, setPieData] = useState([])

    const [values, setValues] = useState({
        open: false,
        error: ''
    })

    const handleClose = () => {
        setValues({...values, open: false})
    }

    const handleChange = (event) => {
        setClusters(event.target.value);
    };

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
            let description = data.map(a => a[10]);
            
            setDefects(description.slice(1,10));
            setData(data);

            //console.log(description)
        };
        reader.readAsBinaryString(uploadedFile);
    }

    const handlePieData = () => {
        console.log(groups)
        // var formatData = [{}];
        // for (var i = 0; i < groups.length; i++) {
        //     var randomColor = Math.floor((Math.random() * 255 + 1))
        //     formatData.push({
        //         id: `Group ${i}`,
        //         label: `Group ${i}`,
        //         value: groups.at(i).length,
        //         color: `hsl(${randomColor}, 70%, 50%)`
        //     })
        // }
        // setPieData(formatData)
    }

    async function handleProcess() {
        if (defects.length == 0) {
            setValues({...values, open: true, error: "A CSV file is required"})
        } else if (defects.length < clusters){
            setValues({...values, open: true, error: "Number of groups should be less or equal than number of defects"})
        } else {
            handleNext()
        }
        // try{
        //     const response = await axios.post(`${baseUrl}/reports/script`, { 
        //         "defects_array": defects,
        //         "cluster_number": clusters
        //     })
        //     if (response.status === 200) {
        //         setGroups(response.data)
        //         handleNext()
        //         handlePieData()
        //     }
        // } catch(error){
        //     console.log(error)
        // }
    }

    return (
        <Grid item sx={{pt: 5, pl: 5}} md={10}>
            <Typography component="h1" variant='h4' fontWeight="bold">Defects Classifier</Typography>
                <Stepper sx={{mt: 3, mb: 3, width: "60%"}} activeStep={activeStep}>
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
                            <Box bgcolor="primary.light" sx={{height: 200, width: "60%", borderRadius: 5, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
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

                            <Typography sx={{mt: 2}}>{defects.length} defects identified</Typography>

                            <Box sx={{mt: 1, alignItems: "center", justifyContent: "space-between", width: "60%", display: "flex", flexDirection: "row"}}>
                                <Box display="flex" alignItems="center" width="35%">
                                    <InputLabel htmlFor='clusters' color='text'>Number of groups</InputLabel>
                                    <TextField
                                        type="number"
                                        id="clusters"
                                        label=""
                                        value={clusters}
                                        onChange={handleChange}
                                        inputProps={{max: defects.length, min: 1}}
                                        sx={{ml: 2, width: "30%"}}
                                    />
                                </Box>

                                <Button sx={{margin: 0}} color="secondary" variant="contained" onClick={handleProcess}>Next</Button>
                            </Box>
                        </Fragment>
                    ) : activeStep === 1 ? (
                        <Fragment>
                            <Box bgcolor="primary.light" sx={{height: 300, width: "60%", borderRadius: 5, display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "center"}}>
                                <CircularProgress/>
                                <Typography width="50%" textAlign="center" sx={{mt: 3}}>We are processing your file, this might take some minutes</Typography>
                            </Box>
                        </Fragment>
                    ) : activeStep === 2 ? (
                        <Fragment>
                            <Box sx={{width: "50%", height: 500}}>
                                <ResponsivePie
                                    data={pieData}
                                    margin={{top: 40, right: 80, bottom: 80, left: 80}}
                                    innerRadius={0.5}
                                    padAngle={0.7}
                                    cornerRadius={3}
                                    activeOuterRadiusOffset={8}
                                    borderWidth={1}
                                    borderColor={{from: "color", modifiers: [["darker", 0,.2]]}}
                                    arcLinkLabelsSkipAngle={10}
                                    arcLinkLabelsTextColor="#333333"
                                    arcLinkLabelsThickness={2}
                                    arcLinkLabelsColor={{from: "color"}}
                                    arcLabelsSkipAngle={10}
                                />
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