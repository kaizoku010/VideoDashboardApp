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
  const [videoKey_, setVideoKey] = useState();

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

        // Filter videos
        const videoObjects = objects.Contents.filter((object) =>
          object.Key.endsWith(".mp4")
        );

        // Retrieve thumbnails for videos
        const videoList = await Promise.all(
          videoObjects.map(async (videoObject) => {
            const videoKey = videoObject.Key;
            const thumbnailKey = `thumbnails/${videoObject.Key}.jpg`;
            setSize(videoObject.Size);
            const [metadata, thumbnailUrl] = await Promise.all([

              myBucket
                .headObject({ Bucket: S3_BUCKET, Key: videoKey })
                .promise(),
            
                myBucket.getSignedUrlPromise("getObject", {
                Bucket: S3_BUCKET,
                Key: thumbnailKey,
                // return {
                //   videoKey,
                //   title: metadata.Metadata["title"],
                //   description: metadata.Metadata["description"],
                //   thumbnailUrl,
                // };
              
              }),
            ]);

            setCreatedAt(metadata.LastModified);

            const title = metadata.Metadata["x-amz-meta-title"];
            const description = metadata.Metadata["x-amz-meta-description"];

            // console.log("Title: ", title);
            // console.log("Description: ", metadata)

            return {
              videoKey,
              title,
              description,
              thumbnailUrl,
            };
          })
        );

        setVideos(videoList);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchVideos();
  }, []);

 
  return (
    <div className="all-videos">
      <p className="welcome-text">Welcome to your video libray</p>
      <div>
        <VideoCardHolder />
      </div>
      {videos.map((ad) => (
        <AdList
          title={ad.videoKey}
          thumb={ad.thumbnailUrl}
          desc={ad.description}
          video={videos}
          date={createdAt}
          size={size}
        />
      ))}
    </div>
  );
}

export default AllVideos;
