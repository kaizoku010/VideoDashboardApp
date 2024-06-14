import React, { useState, useEffect } from "react";
import "./AdList.css";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { database, push, ref, set, serverTimestamp } from "./firebaseConfig";
import {io} from "socket.io-client";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "60%",
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  height: "50%",
  outline: "none",
  display: "flex",
  flexDirection: "column",
};

const closeButtonStyle = {
  position: 'absolute',
  right: 8,
  top: 8,
  zIndex: 10,
};

function AdList({ title, thumb, date, size, type }) {
  const [open, setOpen] = useState(false);
  const [selectedID, setSelectedID] = useState('');
  const [selectedMediaType, setSelectedMediaType] = useState('video');
  const screenIds = ["MX5S001", "MX5S002", "MX5S003", "MX5S004", "MX5S005", "MX5S006"];
  const [socket, setSocket] = useState(null);
  const [testData, setTestData] = useState();

  // const handleDataReceived = (data) => {
  //   console.log('Data received from Socket:', data);
  // };

  useEffect(() => {

    const newSocket = io('https://socket-yzb8.onrender.com', { transports: ["websocket"] });
    newSocket.on('location', (data) => {
      console.log('Data received from Socket:', {data});
    });

    newSocket.on('location', (data) => {
      console.log("Hello Data received from socket: ", data);
      // setSocketData(data);
    });
    setSocket(newSocket);
   

    return () => {
      if (newSocket.readyState === 1) { // <-- This is important
        newSocket.close();
      }
    }
    },[]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSocketClick = () => {
    // Emit data via Socket.IO
    socket.emit("media", {
      adID: title,
      adName: selectedID,
      // point:serverTimestamp(),
      type: selectedMediaType,
    });

    socket.emit("title", title)
      
    socket.on('location', (data) => {
      setTestData(data)
    });
    console.log("Data sent via Socket.IO");
    handleClose();
  };

  // console.log("test Data: ", testData)

  const handleClick = async () => {
    const newVideoRef = ref(database, 'videos');
    const pushiee = push(newVideoRef);
    const videoData = {
      "adID": title,
      "adName": selectedID,
      "type": selectedMediaType,
      "createdAt": serverTimestamp(),

    };
    try {
      await set(pushiee, videoData);
      console.log("Video data saved successfully.");

      // Send data via Socket.IO
      handleSocketClick();
    } catch (error) {
      console.error("Error saving video data: ", error);
    }
  };

  const handleScreenIDChange = (event) => {
    setSelectedID(event.target.value);
  };

  const handleMediaTypeChange = (event) => {
    setSelectedMediaType(event.target.value);
  };

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

  const convertBytesToSize = (bytes) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    if (i === 0) return `${bytes} ${sizes[i]}`;
    return `${(bytes / (1024 ** i)).toFixed(2)} ${sizes[i]}`;
  };
  
  const formattedSize = convertBytesToSize(size);

  return (
    <div className="list-holder" key={title} onClick={handleOpen}>
      <div className="list-title">
        <img className="thumbnail-list" src={path} alt={title} />
        <h4 className="video-title">{title}</h4>
        <h4 className="video-desc">Video description</h4>
        <h4>Advertiser Name</h4>
        <h4>{formattedSize}</h4>
        <h4>{date}</h4>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton onClick={handleClose} sx={closeButtonStyle}>
            <CloseIcon />
          </IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Livestream Video Ad
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
            Select an ID corresponding to the desired screen, remember each screen is represented by an ID in the list below.
            Once submitted, the screen will pick up your request, and stream the Ad (Proximity doesn't apply here).
          </Typography>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="screen-id-select-label">Screen ID</InputLabel>
            <Select
              labelId="screen-id-select-label"
              id="screen-id-select"
              value={selectedID}
              onChange={handleScreenIDChange}
              input={<OutlinedInput label="Screen ID" />}
            >
              {screenIds.map((id) => (
                <MenuItem key={id} value={id}>{id}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="media-type-select-label">Media Type</InputLabel>
            <Select
              labelId="media-type-select-label"
              id="media-type-select"
              value={selectedMediaType}
              onChange={handleMediaTypeChange}
              input={<OutlinedInput label="Media Type" />}
            >
              <MenuItem value="video">Video</MenuItem>
              <MenuItem value="image">Image</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleClick}>
            Save to Firebase
          </Button>
          <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSocketClick}>
            Send via Socket.IO
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default AdList;
