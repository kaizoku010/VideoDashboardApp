import React, { useState, useEffect } from 'react';
import AWS from 'aws-sdk';
import CircularProgress from '@mui/material/CircularProgress';
import { database, push, ref } from './firebaseConfig';
import './playlist.css';

const Playlist = ({ id, onPlaylistSelect, screenIds, types }) => {
  const [videos, setVideos] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState(screenIds[0]);
  const [type, setType] = useState([])
  const [loading, setLoading] = useState(true);

  const S3_BUCKET = 'moxiescreen';
  const REGION = 'ap-south-1';

  useEffect(() => {
    AWS.config.update({
      region: REGION,
      credentials: {
        accessKeyId: "AKIAQ3EGP2YOTF7EHSMS",
        secretAccessKey: "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",
      },
    });
    const fetchVideosFromS3 = async () => {
      const myBucket = new AWS.S3({
        params: { Bucket: S3_BUCKET },
        region: REGION,
      });

      try {
        const videoList = await myBucket.listObjects().promise();
        const videoData = videoList.Contents.filter(video => !video.Key.startsWith('thumbnails/')).map(video => ({
          mediaKey: video.Key,
        }));
        setVideos(videoData);
      } catch (error) {
        console.error('Error fetching videos from S3:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideosFromS3();
  }, []);

  const handleVideoSelection = (event, video) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedVideos([...selectedVideos, video]);
    } else {
      setSelectedVideos(selectedVideos.filter(v => v.mediaKey !== video.mediaKey));
    }
  };

  const addToPlaylist = async () => {
    const playlistItem = {
      videos: selectedVideos.map(video => ({ ...video, deviceId: selectedDeviceId, mediaType: type })),
      timestamp: new Date().toISOString(),
      campaignId: id,
    };

    onPlaylistSelect(playlistItem);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="playlist-container">
      <h2>Create A Playlist Of Ads For This Campaign </h2>
      <div>
          <select value={selectedDeviceId} onChange={e => setSelectedDeviceId(e.target.value)}>
        {screenIds.map(screenId => (
          <option key={screenId} value={screenId}>
            {screenId}
          </option>
        ))}
      </select>

      <select value={type} onChange={e => setType(e.target.value)}>
        {types.map(type => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>



      </div>
    


      <ul className="video-list">
        {videos.map((video, index) => (
          <li key={index}>
            <input
              type="checkbox"
              id={`video-${index}`}
              checked={selectedVideos.some(v => v.mediaKey === video.mediaKey)}
              onChange={event => handleVideoSelection(event, video)}
            />
            <label htmlFor={`video-${index}`}>{video.mediaKey}</label>
          </li>
        ))}
      </ul>
      <button className="add-button" onClick={addToPlaylist}>
        Add to Playlist
      </button>
    </div>
  );
};

export default Playlist;
