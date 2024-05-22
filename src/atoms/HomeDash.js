import React, { useEffect, useState } from "react";
import "./HomeDash.css";
import PlayIC from "../media/play_white.png"
import DetailsHolder from "./DetailsHolder";
import ContentDetails from "./ContentDetails";
import TestPop from "./TestPop";
import { useLocation } from 'react-router-dom';

function HomeDash() {
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState()
  const savedName = localStorage.getItem('userName');
  useEffect(()=>{
    setUserName(savedName);
  })


// const sendMessage = (value) => {
//     // Create a WebSocket connection
//     // const ws = new WebSocket("ws://localhost:8080");
//     // console.log("new connection");

//     // When the WebSocket connection is opened
//     // ws.onopen = () => {
//     //   // Send message to WebSocket server
//     //   ws.send(message);
//     //   console.log("Data To Send", message);
//     //   console.log("Value: ", value)
//     //         // Close the WebSocket connection after sending the message
//     //   ws.close();
//     // };
//   };

  return (
    <div className="">
      <div className="homeDashboard">
        <div className="greetings">
          <h2 className="greetings-text">Hello, {userName}</h2>
          <h2 className="greetings-subText">Let's get the show started!</h2>
        </div>
        <div className="dash-holder">
          {/* hidden layers */}
          <div className="hide-me">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            {/* <button onClick={sendMessage}>Send Data</button> */}
          
          </div>

          <div className="recent-video">
          <img className="play_ic" src={PlayIC}/>
          <div className="last-video-details">
          <p className="lvp-title">Last Video played</p>
          <p className="lv-title">Activate Moxie 5</p>
          <p className="lv-playback">Duration: 00:30</p>
         </div>
          </div>
        </div>
      </div>

      <div className="overview">
        <div className="details-holder">
          <p className="add-text">Click To Add A New Ad</p>
        <TestPop isOpen={isOpen} />
        </div>
        <DetailsHolder title={"All Ads"} numbers={100} action={"View All"}/>
        <DetailsHolder title={"Total Ads Played"} numbers={300} action={"View All"}/>
        <DetailsHolder title={"Pending Ads"} numbers={"120 Files"} action={"View All"}/>
        <DetailsHolder title={"Total Playback Time"} numbers={"60 Minutes"} action={"View All"}/>
      </div>
<div>
  <p>Available Screens</p>
  <ContentDetails/>
</div>

    </div>
  );
}

export default HomeDash;
