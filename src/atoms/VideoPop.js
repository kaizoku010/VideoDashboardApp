import React from "react";
import './VideoPopup.css';


function VideoPop({ video, onClose }) {
  return (
    <div className="video-popup">
      <div className="video-popup-content">
        {/* <video controls>
          <source src={video.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}

        <div>hi master dixon</div>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default VideoPop;
