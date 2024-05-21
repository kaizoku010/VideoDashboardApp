import React from "react";
import "./ContentDetails.css";
import ScreenHolder from "./ScreenHolder";
import VideoListItem from "./VideoListItem";
import ThumbTest from "../media/thumbTest.png"
import BLL from "../media/bll.mp4"
import MoxieMaps from "./MoxieMaps";


function ContentDetails() {
  return (
    <div>
       <div className="content-details">
      <div className="holder-left">
        <div className="screen-section">
          <ScreenHolder id="MS565TOD" btry="20%" status="Offline" />
          <ScreenHolder id="MS515TNI" btry="30%" status="Offline" />
          <ScreenHolder id="MS525TKX" btry="90%" status="Offline" />
        </div>
        <div className="screen-section">
          <ScreenHolder id="MS1YNAPD" btry="20%" status="Offline" />
          <ScreenHolder id="MS21ZLUS" btry="30%" status="Offline" />
          <ScreenHolder id="MS42IASX" btry="90%" status="Offline" />
        </div>
      </div>
      <div className="list-item"> 
     <video
     className="video"
     loop={true}
     height={"100%"}
      autoPlay={true}
      controls={true}
     src={BLL}/>
      </div>
      
    </div> 
    <MoxieMaps/>
    </div>
  
  );
}

export default ContentDetails;
