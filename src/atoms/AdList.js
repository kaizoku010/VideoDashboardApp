import React from "react";
import "./AdList.css";
import ThumbIc from "../media/thumbTest.png";

function AdList({ title, thumb, date, size, onClick }) {

  // console.log(thumb)
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
  const handleClick = () => {
    onClick({ title, thumb, date, size }); // Pass the relevant data to the parent component's onClick handler
  };

  
  return (
    <div className="list-holder" key={title} onClick={handleClick}>
      <div className="list-title">
        <img className="thumbnail-list" src={path} />
        {/* <h3>Video Thumbnail</h3> */}
        <h4>{title}</h4>
        <h4>Video description</h4>
        <h4>{formattedDate}</h4>
        <h4>Advertiser Name</h4>
        <h4>{formattedSize}</h4>
        <h4>00:12</h4>
        {/* <video controls>
//             <source src={`YOUR_S3_BUCKET_URL/${video.videoKey}`} type="video/mp4" />
//           </video> */}
      </div>
    </div>
  );
}

export default AdList;
