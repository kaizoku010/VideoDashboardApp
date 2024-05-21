import React from 'react'
import "./VideoCardHolder.css"

function VideoCardHolder() {
  return (
    <div className='list'>
  
    <div className="thumb-title">
        {/* <img className='thumbnail-list' src={ThumbIc}/> */}
        <h3>Video Thumbnail</h3>
        <h3>video title</h3> 
        <h3>Video description</h3>
        <h3>Date Created</h3>
        <h3>Advertiser Name</h3>
        <h3>File Size</h3>
        <h3>Duration</h3>

        </div>
    </div>
  
  )
}

export default VideoCardHolder

// import React, { useState, useEffect } from 'react';
// import AWS from "aws-sdk";

// const VideoList = () => {
//   const [videos, setVideos] = useState([]);

//   useEffect(() => {
//     const fetchVideos = async () => {
//       const S3_BUCKET = 'moxiescreen';
//       const REGION = 'us-east-1';

//       AWS.config.update({
//         region: REGION,
//         credentials: {
//           accessKeyId: "YOUR_ACCESS_KEY_ID",
//           secretAccessKey: "YOUR_SECRET_ACCESS_KEY"
//         }
//       });

//       const myBucket = new AWS.S3({
//         params: { Bucket: S3_BUCKET },
//         region: REGION,
//       });

//       try {
//         const objects = await myBucket.listObjects().promise();

//         // Filter videos
//         const videoObjects = objects.Contents.filter(object => object.Key.endsWith('.mp4'));

//         // Retrieve thumbnails for videos
//         const videoList = await Promise.all(videoObjects.map(async videoObject => {
//           const thumbnailKey = `thumbnails/${videoObject.Key}.jpg`;
//           const thumbnailObject = await myBucket.getObject({ Bucket: S3_BUCKET, Key: thumbnailKey }).promise();
//           return {
//             videoKey: videoObject.Key,
//             thumbnailUrl: URL.createObjectURL(new Blob([thumbnailObject.Body], { type: 'image/jpeg' })),
//             metadata: videoObject.Metadata // Assuming you stored metadata during upload
//           };
//         }));

//         setVideos(videoList);
//       } catch (error) {
//         console.error("Error fetching videos:", error);
//       }
//     };

//     fetchVideos();
//   }, []);

//   return (
//     <div>
//       {videos.map(video => (
//         <div key={video.videoKey}>
//           <h2>{video.metadata.title}</h2>
//           <p>{video.metadata.description}</p>
//           <img src={video.thumbnailUrl} alt="Thumbnail" />
//           <video controls>
//             <source src={`YOUR_S3_BUCKET_URL/${video.videoKey}`} type="video/mp4" />
//           </video>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default VideoList;
