import React, { useEffect, useState } from "react";
import VideoCardHolder from "./VideoCardHolder";
import AdList from "./AdList";
import AWS from "aws-sdk";
import "./AllScreens.css"
import { getObjectMetadata } from "../DataLayer/AWSLayer";


function AllVideos() {
  const [videos, setVideos] = useState([]);
  const [createdAt, setCreatedAt] = useState();
  const [size, setSize] = useState();
  const [batteryLevel, setBatteryLevel] = useState(null);

  useEffect(() => {

    const fetchVideos = async () => {
      const S3_BUCKET = "moxiescreen";
      const REGION = "ap-south-1";
    
    AWS.config.update({
  region: REGION,
  credentials: {
    accessKeyId: "AKIAQ3EGP2YOTF7EHSMS",
    secretAccessKey: "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",
  },
});
      const myBucket = new AWS.S3({
        params: { Bucket: S3_BUCKET },
        region: REGION,
      });
    
      try {
        const objects = await myBucket.listObjects().promise();
    
        // Filter both videos and images
        const mediaObjects = objects.Contents.filter(
          (object) =>
            (object.Key.endsWith(".mp4") ||
              object.Key.endsWith(".jpg") ||
              object.Key.endsWith(".jpeg") ||
              object.Key.endsWith(".png")) &&
            !object.Key.startsWith("thumbnails/")
        );
        // Retrieve thumbnails for videos and images
        const mediaList = await Promise.all(
          mediaObjects.map(async (mediaObject) => {
            const mediaKey = mediaObject.Key;
            const mediaType = mediaKey.endsWith(".mp4") ? "video" : "image";
            const thumbnailKey = mediaType === "video" ? `thumbnails/${mediaKey}.jpg` : mediaKey;
    
            const [metadata, thumbnailUrl] = await Promise.all([
              myBucket.headObject({ Bucket: S3_BUCKET, Key: mediaKey }).promise(),
              myBucket.getSignedUrlPromise("getObject", { Bucket: S3_BUCKET, Key: thumbnailKey }),
            ]);
    
            const title = metadata.Metadata["x-amz-meta-title"];
            const description = metadata.Metadata["x-amz-meta-description"];
    
            return {
              mediaKey,
              mediaType,
              title,
              description,
              thumbnailUrl,
            };
          })
        );
    
        setVideos(mediaList);
      } catch (error) {
        console.error("Error fetching media:", error);
      }
    };
    

    
    fetchVideos();



  }, []);

  // console.log("all-videos:", videos )
 
  return (
    <div className="all-videos">
      <p className="welcome-text">Welcome to your Ads libray, you can find both your recently video and images Ads here {batteryLevel}</p>
      <div>
        <VideoCardHolder />
      </div>
      {videos.map((ad) => (
        <AdList
          title={ad.mediaKey}
          thumb={ad.thumbnailUrl}
          desc={ad.description}
          video={videos}
          date={createdAt}
          size={size}
          type={ad.mediaType}
        />
      ))}
    </div>
  );
}

export default AllVideos;
