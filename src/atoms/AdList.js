import React, { useState } from "react";
import "./AdList.css";
import ThumbIc from "../media/thumbTest.png";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { height } from "@mui/system";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { database, push, ref, set } from "./firebaseConfig";
// import {collection}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "60%",
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  height:"50%"
};


function AdList({ title, thumb, date, size, onClick }) {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // console.log(thumb)

  const [personName, setScreenId] = useState();

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const idPRops = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  
  const screenIds = [
  "MX5S001",
  "MX5S002",
  "MX5S003",
  "MX5S004",
  "MX5S005",
  "MX5S006"
  ];
  

  const [selectedID, setSelecteID] = useState()
  
  
  const formatDate = (dateString) => {
    
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const formattedDate = formatDate(date);

  const extractPathFromUrl = (url) => {
    const parsedUrl = new URL(url);
    return parsedUrl.origin + parsedUrl.pathname;
  };
  
  const path = extractPathFromUrl(thumb);
  // console.log("thumbnail path", size);

  const convertBytesToSize = (bytes) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    if (i === 0) return `${bytes} ${sizes[i]}`;
    return `${(bytes / (1024 ** i)).toFixed(2)} ${sizes[i]}`;
  };
  
  // Usage:
  const formattedSize = convertBytesToSize(size);


  const handleClick = async () => {
  console.log("first: ", title, thumb, date, size);

  // Generate a new reference with a unique key
  const newVideoRef = ref(database, 'videos')
  const pushiee = push(newVideoRef);
  // Data to be stored
  const videoData = {
    "adID": title,
    "adName": selectedID,
  };

  console.log("ad video object: ", videoData);
  
  try {
    // Set the video data at the new reference
    await set(pushiee, videoData);
    console.log("Video data saved successfully.");
  } catch (error) {
    console.error("Error saving video data: ", error);
  }
};



  const handleChange = (event) => {
    setSelecteID(event.target.value);
  };


  
  return (
    <div className="list-holder" key={title} onClick={handleOpen}>
      <div className="list-title">
        <img className="thumbnail-list" src={path} />
        {/* <h3>Vi        <h4>{formattedDate}</h4>
deo Thumbnail</h3> */}
        <h4>{title}</h4>
        <h4>Video description</h4>
        <h4>Advertiser Name</h4>
        <h4>{formattedSize}</h4>
        <h4>00:12</h4>
        {/* <video controls>
//             <source src={`YOUR_S3_BUCKET_URL/${video.videoKey}`} type="video/mp4" />
//           </video> */}


      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Livestream Video Ad
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, mb:2 }}>
Select an ID corresponding to the desired screen, remember each screen is represented by an ID in the list below.
Once submitted the screen will pick up your request, and stream the Ad (Proximity does'nt apply here). 
         <div className="select-box">
         <InputLabel           sx={{mt:2}}
 id="demo-simple-select-label">Screen ID</InputLabel>

<Select
   labelId="demo-simple-select-label"
   id="demo-simple-select"
          value={selectedID}
          onChange={handleChange}
                    label="Screen ID"

          input={<OutlinedInput label="Name" />}
          MenuProps={idPRops}
          className="select-option"
        >
          {screenIds.map((name) => (
            <MenuItem
              key={name}
              value={name}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
         </div>

         </Typography>
        <button onClick={handleClick} >Send Video To Stream</button>
        </Box>
      </Modal>
    </div>
  );
}

export default AdList;
