import { FileUpload } from '@mui/icons-material'
import { Button, FormLabel, Grid, InputLabel, MenuItem, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, {useState} from 'react'
import Dropzone from 'react-dropzone'

const Classifier = () => {

    const [clusters, setClusters] = useState(1);
    const handleChange = (event) => {
        setClusters(event.target.value);
    };

    return (
        <Grid item sx={{pt: 10, pl: 10}} md={10.5}>
            <Typography component="h1" variant='h4' fontWeight="bold">Defects Classifier</Typography>
                <Box sx={{mt: 2}}>
                    <Dropzone accept={{'text/csv': ['.csv']}} onDrop={acceptedFiles => console.log(acceptedFiles)}>
                        {({getRootProps, getInputProps}) => (
                            <section>
                            <div {...getRootProps()}>
                            <Box bgcolor="primary.light" sx={{height: 200, width: "50%", borderRadius: 5, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                                <FileUpload/>
                                <input {...getInputProps()} />
                                <p>Drag and drop file to process, or click to select file</p>
                                <p>Only .csv files are accepted</p>
                            </Box>
                            </div>
                            </section>
                        )}
                    </Dropzone>

                    <Box sx={{mt: 3, alignItems: "center", justifyContent: "space-between", width: "50%", display: "flex", flexDirection: "row"}}>
                        <Box display="flex" alignItems="center">
                            <InputLabel htmlFor='clusters' color='text'>Number of groups</InputLabel>
                            <TextField
                                id="clusters"
                                select
                                label=""
                                value={clusters}
                                onChange={handleChange}
                                sx={{ml: 2}}
                            >
                                    <MenuItem key={1} value={1}>1</MenuItem>
                                    <MenuItem key={2} value={2}>2</MenuItem>
                                    <MenuItem key={3} value={3}>3</MenuItem>
                                    <MenuItem key={4} value={4}>4</MenuItem>
                                    <MenuItem key={5} value={5}>5</MenuItem>
                                    <MenuItem key={6} value={6}>6</MenuItem>
                            </TextField>
                        </Box>

                        <Button sx={{margin: 0}} color="secondary" variant="contained">Process</Button>
                    </Box>

                </Box>      
        </Grid>
    )
}

export default Classifier