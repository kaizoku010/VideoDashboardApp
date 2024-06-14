import React, { useEffect, useState } from 'react';
import AWS from 'aws-sdk';

const EditPlaylistForm = ({ playlist, onSave, screenIds, videos }) => {
  const [timestamp, setTimestamp] = useState(playlist.timestamp);
  const [playlistVideos, setPlaylistVideos] = useState(playlist.videos);
  const [selectedVideo, setSelectedVideo] = useState('');
  const [selectedScreenId, setSelectedScreenId] = useState('');
  const [newKeys, setNewKeys] = useState();
  const S3_BUCKET = 'moxiescreen';
  const REGION = 'ap-south-1';






//   console.log("keys: ", newKeys)

  const handleAddVideo = () => {
    setPlaylistVideos([...playlistVideos, { mediaKey: selectedVideo, deviceId: selectedScreenId }]);
    setSelectedVideo('');
    setSelectedScreenId('');
  };

  const handleRemoveVideo = index => {
    setPlaylistVideos(playlistVideos.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onSave({ ...playlist, timestamp, videos: playlistVideos });
  };

  return (
    <div>
      <h2>Edit Playlist</h2>
      <label>Timestamp:</label>
      <input
        type="text"
        value={timestamp}
        onChange={e => setTimestamp(e.target.value)}
      />
      <h3>Videos</h3>
      <select value={selectedVideo} onChange={e => setSelectedVideo(e.target.value)}>
        <option value="">Select Video</option>
        {videos.map((video, index) => (
          <option key={index} value={video.mediaKey}>
            {video.mediaKey}
          </option>
        ))}
      </select>
      <select value={selectedScreenId} onChange={e => setSelectedScreenId(e.target.value)}>
        <option value="">Select Screen ID</option>
        {screenIds.map((id, index) => (
          <option key={index} value={id}>
            {id}
          </option>
        ))}
      </select>
      <button onClick={handleAddVideo}>Add Video</button>
      <ul>
        {playlistVideos.map((video, index) => (
          <li key={index}>
            {video.mediaKey} (Device ID: {video.deviceId})
            <button onClick={() => handleRemoveVideo(index)}>Remove Video</button>
          </li>
        ))}
      </ul>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default EditPlaylistForm;
