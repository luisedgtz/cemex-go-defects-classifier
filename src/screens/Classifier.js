import { FileUpload } from '@mui/icons-material'
import { Button, FormLabel, Grid, InputLabel, MenuItem, TextField, Typography } from '@mui/material'
import { Box, fontWeight } from '@mui/system'
import React, {useState} from 'react'
import Dropzone from 'react-dropzone'
import * as XLSX from 'xlsx'

const Classifier = () => {

    const [clusters, setClusters] = useState(1);
    const [file, setFile] = useState(null);

    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);

    const processData = dataString => {
        console.log(dataString)
        // const dataStringLines = dataString.split(/\r\n|\n/);
        // console.log(dataStringLines[2])
        // console.log(dataStringLines[0])
        // const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);

     
        // const list = [];
        // for (let i = 1; i < dataStringLines.length; i++) {
        //     const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
        //     if (headers && row.length == headers.length) {
        //         const obj = {};
        //         for (let j = 0; j < headers.length; j++) {
        //             let d = row[j];
        //             if (d.length > 0) {
        //                 if (d[0] == '"')
        //                     d = d.substring(1, d.length - 1);
        //                 if (d[d.length - 1] == '"')
        //                     d = d.substring(d.length - 2, 1);
        //             }
        //             if (headers[j]) {
        //                 obj[headers[j]] = d;
        //             }
        //         }
     
        //         if (Object.values(obj).filter(x => x).length > 0) {
        //             list.push(obj);
        //         }
        //     }
        // }
     
        // prepare columns list from headers
        // const columns = headers.map(c => ({
        //   name: c,
        //   selector: c,
        // }));
     
        // setData(list);
        // setColumns(columns);
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
            processData(data);
        };
        reader.readAsBinaryString(uploadedFile);
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

                        <Button sx={{margin: 0}} color="secondary" variant="contained">Process</Button>
                    </Box>

                </Box>      
        </Grid>
    )
}

export default Classifier