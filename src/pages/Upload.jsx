import { CloudUpload, Description, Publish, Title, Visibility } from '@mui/icons-material'
import { Box, Button, Container, FormControl, InputAdornment, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import React from 'react'

function Upload () {
  return (
    <Container  maxWidth="md">
        <Paper elevation={6}

        sx={{
            padding:4,
            marginTop:5,
            borderRadius:3,
        }}
        >


            <Typography variant='h5' gutterBottom align='center' fontWeight={'bold'}>Upload Here</Typography>
            <Typography align='center'>
                Please upload your video file in MP4 format with a maximum size of 50 MB.
            </Typography>
             <Box display="flex" flexDirection="column" marginTop={3} gap={3}>
                <TextField 
                label={'Video Title'}
                variant="outlined"
                fullWidth
                slotProps={{
                    input:{
                        startAdornment: (
                            <InputAdornment position='start'>
                                {""} <Title color="primary"></Title>{" "}
                            </InputAdornment>
                        ),
                    }
                    
                }}
                />
                  <TextField
                      label={'Video Description'}
                      variant="outlined"
                      fullWidth
                      multiline
                      slotProps={{
                        input:{
                              startAdornment: (
                                  <InputAdornment position='start'>
                                      <Description color="primary"></Description>
                                  </InputAdornment>
                              ),
                        }
                         
                      }}
                  />

  <Box  display='flex'
   alignContent={'center'} 
   justifyContent={'space-between'}
   >
    <input type='file'
      accept='video/'
      id='video-upload' style={{display:'none'}}
       onChange={null}
        />
  <label htmlFor='video-upload'>
    <Button 
       variant='contained' 
       component='span'
       color='secondary'
         startIcon={<CloudUpload/>}
         >
        Upload Video here
    </Button>
  </label>
  </Box>
  
  <FormControl fullWidth>
    <InputLabel>Visibility</InputLabel>
     
     <Select
      label="Visibility"
     slotProps={{
        input:{
            startAdornment:(<InputAdornment position='start'>
                 <Visibility color='primary' />
                </InputAdornment>)
            }
        }
     }>
     <MenuItem value="public">Public </MenuItem>
     <MenuItem value="unlisted">Unlisted </MenuItem>
    <MenuItem value="private">Private </MenuItem>

     </Select>
  
  </FormControl>

  <Box display={'flex'} justifyContent='center'>
                      <Button variant="contained" color='primary' startIcon={<Publish />} fontWeight="bold" padding={1.5}>
                          Publish
                      </Button>
  </Box>
             </Box>



        </Paper>
    </Container>
  )
}

export default Upload

