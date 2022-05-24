import { FileUpload } from '@mui/icons-material'
import { Button, FormLabel, Grid, InputLabel, MenuItem, TextField, Typography } from '@mui/material'
import { Box, fontWeight } from '@mui/system'
import React, {useState} from 'react'
import Dropzone from 'react-dropzone'
import * as XLSX from 'xlsx'
import axios from 'axios';

const Classifier = () => {

    const baseUrl = 'http://localhost:3000'

    const [clusters, setClusters] = useState(1);
    const [file, setFile] = useState(null);

    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);

    const [defects, setDefects] = useState([]);

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
            
            
            
            const items = description.slice(0, 50)


            setDefects(items);
            setData(data);

            //console.log(description)
        };
        reader.readAsBinaryString(uploadedFile);
    }

    async function handleProcess() {

        console.log(defects)
        
        try{
            const response = await axios.post(`${baseUrl}/reports/script`, { 
                "defects_array": defects
                
            })
            if (response.status === 200) {
                console.log(response.data)
            }
        } catch(error){
            console.log(error)
        }
        
        
      //console.log("It worked")
    }

    return (
        <Grid item sx={{pt: 10, pl: 10}} md={10}>
            <Typography component="h1" variant='h4' fontWeight="bold">Defects Classifier</Typography>
                <Box sx={{mt: 2}}>

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
                    <Box sx={{mt: 3, alignItems: "center", justifyContent: "space-between", width: "60%", display: "flex", flexDirection: "row"}}>
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

                        <Button sx={{margin: 0}} color="secondary" variant="contained" onClick={handleProcess}>Process</Button>
                    </Box>

                </Box>      
        </Grid>
    )
}

export default Classifier