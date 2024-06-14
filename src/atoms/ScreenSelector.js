import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function ScreenSelector() {
  const [selectedScreens, setSelectedScreens] = useState([]);

  const handleScreenSelection = (event) => {
    // Implement screen selection logic
    const selectedScreenId = event.target.value;
    setSelectedScreens([...selectedScreens, selectedScreenId]);
  };
  
  const addScreensToPlaylist = () => {
    // Check if there are selected screens
    if (selectedScreens.length > 0) {
      // Update the playlist state by adding the selected screens
      setPlaylist([...playlist, ...selectedScreens]);
      // Clear the selected screens after adding them to the playlist
      setSelectedScreens([]);
    } else {
      // Handle no selected screens case
      console.log('Please select screens to add to the playlist.');
    }
  };
  

  return (
    <div>
      <h2>Select Screens</h2>
      <TextField
        label="Screen ID"
        value={selectedScreens}
        onChange={handleScreenSelection}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={addScreensToPlaylist}>
        Add Screens to Playlist
      </Button>
    </div>
  );
}

export default ScreenSelector;
