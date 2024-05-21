import React, { useEffect, useState } from 'react'
import "./AllScreens.css"
import ScreenIC from "../media/screen_ic.png"



function AllScreens() {
    const [batteryLevel, setBatteryLevel] = useState(null);
    const statisColor = "red"
    let ws;

    useEffect(() => {
        // Assuming 'ws' is your WebSocket connection
        ws = new WebSocket("wss://a9sx5we9gd.execute-api.ap-south-1.amazonaws.com/MoxieDev");
    
        ws.onmessage = (event) => {
          // Parse the incoming message to get the battery level
          const message = JSON.parse(event.data);
          if (message.action === 'sendBatteryLevel') {
            setBatteryLevel(message.level); // Update state with the new battery level
          }
        };
    
        // Don't forget to close the WebSocket connection when the component unmounts
        return () => {
          ws.close();
        };
      }, []);


      console.log("battery levels from rn: ", batteryLevel)
    


  return (
    <div className='all-screens'>
        <p>All Screens</p>

    <div className='screen'>
<div className='screen-header'>
    <h3>Screen ID</h3>
    <h3>Screen OS</h3>
    <h3>Battery Levels</h3>
    <h3>Lat, Long</h3>
    <h3>Status</h3>
    <h3>Actions</h3>
</div>

<div className='screen-item'>
    <div className='screen-id'>
    <img src={ScreenIC}/>
    <p>MX5S001</p>
    </div>
    <p>Android</p>
    {batteryLevel ? (
        <p>Battery Level: {batteryLevel}%</p>
      ) : (
        <p>Waiting for battery level data...</p>
      )}
      <p>12336, 55678</p>
<p style={{color:{statisColor}}}>Online</p>
<p className='play-ad'>Play Ad</p>
</div>

<div className='screen-item'>
    <div className='screen-id'>
    <img src={ScreenIC}/>
    <p>MX5S002</p>
    </div>
    <p>Android</p>
<p>0%</p>
<p>12336, 55678</p>
<p style={{color:{statisColor}}}>Offline</p>
<p className='play-ad'>Play Ad</p>
</div>

<div className='screen-item'>
    <div className='screen-id'>
    <img src={ScreenIC}/>
    <p>MX5S003</p>
    </div>
    <p>Android</p>
<p>0%</p>
<p>12336, 55678</p>
<p style={{color:{statisColor}}}>offline</p>
<p className='play-ad'>Play Ad</p>
</div>

<div className='screen-item'>
    <div className='screen-id'>
    <img src={ScreenIC}/>
    <p>MX5S004</p>
    </div>
    <p>Android</p>
<p>10%</p>
<p>12336, 55678</p>
<p style={{color:{statisColor}}}>Online</p>
<p className='play-ad'>Play Ad</p>
</div>

<div className='screen-item'>
    <div className='screen-id'>
    <img src={ScreenIC}/>
    <p>MX5S005</p>
    </div>
    <p>Android</p>
<p>100%</p>
<p>12336, 55678</p>
<p style={{color:{statisColor}}}>Online</p>
<p className='play-ad'>Play Ad</p>
</div>
<div className='screen-item'>
    <div className='screen-id'>
    <img src={ScreenIC}/>
    <p>MX5S006</p>
    </div>
    <p>Android</p>
<p>100%</p>
<p>12336, 55678</p>
<p style={{color:{statisColor}}}>Online</p>
<p className='play-ad'>Play Ad</p>
</div>




</div>
</div>
  )
}

export default AllScreens