import { CloudUpload, Description, Publish, Title, Visibility } from '@mui/icons-material'
// Importing Material UI icons for use in the form, such as cloud upload, description, title, publish, and visibility icons.

import { Alert, Box, Button, Container, FormControl, InputAdornment, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import axios from 'axios';
import { useAuth } from '../helper/AuthContext';
// Importing Material UI components for building the layout and form elements like Box for layout, Button, Container for centralizing the content, FormControl for form controls, Paper for a card-like container, Select for dropdown, TextField for inputs, Typography for text display.

import React ,{useState} from 'react'
import toast from 'react-hot-toast';
// Importing React library to use JSX and functional components.

function Upload() {
     
    const {token}=useAuth()
    const[title,setTitle] = useState('');
    const[desc,setDesc] = useState('');
    const[visibility,setVisibility] = useState('');
    const[videoFile,setVideoFile] = useState('');
    const[message,setMessage] = useState('');

    
   function fileBoxChanged(event){
    setVideoFile(event.target.files[0])
   }

 //all three values
    function  changeValue(event){
       
        const name= event.target.name;
        const value= event.target.value;


        if(name==='title'){
            setTitle(value);
        } else if(name==='desc'){
            setDesc(value);
}else if(name==='visibility'){
    setVisibility(value);
}else{
}
}


    async function formSubmitted(){
      try{
          console.log(videoFile);
          //send file to derver
          //ab we have two options either u send directly to youtube  means use yt apis but then cors error would come means aap client se direct yt ki apis call krke ni send krskte ho
          //so we will took help from backend

          const videoUploaderUrl = 'http://localhost:8080/api/v1/uploadVideo'
          const formData = new FormData()
          formData.append("title", title)
          formData.append("desc", desc)
          formData.append("visibility", visibility)
          formData.append("videoFile", videoFile)
          //we use axios here

          const response = await axios.post(videoUploaderUrl,
              formData,
              {
                  headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": 'multipart/form-data'
                  }
              }
          );

          setMessage("video uploaded successfully");
          toast.success("Upload success")
      }catch(error){
        console.log(error);
        toast.error('uploading error')
      }
      }  
    return (
        <Container maxWidth="md">
            {/* A Container component to wrap and center the content. 'maxWidth="md"' restricts the container width to medium (for responsive design). */}
            {message && <Alert sx={{
                width:'100%',
                marginTop:5
            }}>{message}</Alert>}
           
            <Paper elevation={6}
                // Paper is used as a card-like structure to give a smooth background to the form with 'elevation={6}' providing a shadow effect.
                sx={{
                    padding: 4,
                    marginTop: 5,
                    borderRadius: 3,
                }}
            // sx is a shortcut for style that provides padding, margin from the top, and rounded corners to make the form look better.
            >
   {title}{desc}{visibility}


                <Typography variant='h5' gutterBottom align='center' fontWeight={'bold'}>
                    {/* Typography is used to display text. Here, it is for the main heading of the form, using 'h5' size with bold font and centered alignment. */}
                    Upload Here
                </Typography>

                <Typography align='center'>
                    {/* Another Typography component used for a small instruction below the title, aligned centrally. */}
                    Please upload your video file in MP4 format with a maximum size of 50 MB.
                </Typography>

                <Box display="flex" flexDirection="column" marginTop={3} gap={3}>
                    {/* Box is a flexible container for layout. It uses flexbox to align child elements in a column with some margin on the top and gap between elements. */}

                    <TextField
                    onChange={changeValue}
                    name="title"
                        label={'Video Title'}
                        variant="outlined"
                        fullWidth
                        // TextField is used to create an input field for the video title. The label is 'Video Title', and it spans the full width of the container.
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        {/* InputAdornment adds an icon at the beginning of the text field. */}
                                        {""} <Title color="primary"></Title> {" "}
                                        {/* This is the 'Title' icon from Material UI added to the input field with primary color. */}
                                    </InputAdornment>
                                ),
                            }
                        }}
                    />

                    <TextField
                    name="desc"
                    onChange={changeValue}
                        label={'Video Description'}
                        variant="outlined"
                        fullWidth
                        multiline
                        // This TextField is for entering the video description. It's a multiline input (for longer text).
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        {/* Adding the 'Description' icon at the start of the description input field. */}
                                        <Description color="primary"></Description>
                                    </InputAdornment>
                                ),
                            }
                        }}
                    />

                    <Box
                     display="flex"
                        flexDirection={"row"}
                        alignContent={"center"}
                        justifyContent={"space-between"}
                    >
                        {/* This Box contains the file input and upload button. 'flex' display aligns them horizontally. It also aligns items centrally. */}

                        <input
                        onChange={fileBoxChanged}
                         type='file'
                            accept='video/'
                            id='video-upload' 
                            style={{ display: 'none' }}
                            
                        />
                        {/* Hidden input of type 'file' to let the user select a video file. The file input is hidden by setting display to 'none'. */}

                        <label htmlFor='video-upload'>
                            {/* Label for the hidden file input. It acts as a clickable element to trigger the file upload. */}

                            <Button
                                variant='contained'
                                component='span'
                                color='secondary'
                                startIcon={<CloudUpload />}
                            >
                                Select File
                               
                            </Button>
                           
                        </label>
                        <Typography>{videoFile.name}</Typography>
                    </Box>

                    <FormControl fullWidth>
                        {/* FormControl to wrap the visibility dropdown input. FullWidth to span the entire width. */}

                        <InputLabel>Visibility</InputLabel>
                        {/* InputLabel for the dropdown list (Select component) indicating that it's for setting the visibility of the video. */}

                        <Select
                        name="visibility"
                        onChange={changeValue}
                            label="Visibility"
                            // Select component for the visibility options ('Public', 'Unlisted', 'Private'). It is used like a dropdown.
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            {/* Adding a 'Visibility' icon at the start of the dropdown input. */}
                                            <Visibility color='primary' />
                                        </InputAdornment>
                                    )
                                }
                            }}
                        >
                            <MenuItem value="public">Public </MenuItem>
                            {/* Each MenuItem represents an option in the dropdown. This one is for 'Public' visibility. */}
                            <MenuItem value="unlisted">Unlisted </MenuItem>
                            {/* Option for 'Unlisted' visibility (video can only be viewed by those with the link). */}
                            <MenuItem value="private">Private </MenuItem>
                            {/* Option for 'Private' visibility (video is only visible to the uploader). */}
                        </Select>

                    </FormControl>

                    <Box display={'flex'} justifyContent='center'>
                        {/* Box to center the publish button horizontally. */}

                        <Button 
                        onClick={formSubmitted}
                        variant="contained" color='primary' startIcon={<Publish />} fontWeight="bold" padding={1.5}>
                            {/* Button for publishing the video. 'Publish' icon is added at the start of the button text. 'Contained' makes the button solid with primary color. */}
                            Publish
                        </Button>
                    </Box>
                </Box>

            </Paper>
        </Container>
    )
}

export default Upload
// Exporting the Upload component to be used in other parts of the application.
