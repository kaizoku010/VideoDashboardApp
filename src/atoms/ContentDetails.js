import React, { useEffect, useState } from "react";
import { database, ref, onValue } from "./firebaseConfig";
import "./ContentDetails.css";
import ScreenHolder from "./ScreenHolder";
import VideoListItem from "./VideoListItem";
import ThumbTest from "../media/thumbTest.png";
import BLL from "../media/bll.mp4";
import MoxieMaps from "./MoxieMaps";

function ContentDetails() {
  const [deviceData, setDeviceData] = useState({});
  const [devic2, setDevic2Data]= useState({})
  const [devic3, setDevic3Data]= useState({})
  const [devic4, setDevic4Data]= useState({})
  const [devic5, setDevic5Data]= useState({})
  const [devic6, setDevic6Data]= useState({})
  const [devic7, setDevic7Data]= useState({})

  useEffect(() => {
    const locationRef = ref(database, 'devices/MX5S001/location');
    const batteryRef = ref(database, 'devices/MX5S001/battery');
    const connectionRef = ref(database, 'devices/MX5S001/status')
    
    // variables for device 2
    const locationRef2 = ref(database, 'devices/MX5S002/location');
    const batteryRef2 = ref(database, 'devices/MX5S002/battery');
    const connectionRef2 = ref(database, 'devices/MX5S002/status')

    //variables for device 3

    const locationRef3 = ref(database, 'devices/MX5S003/location');
    const batteryRef3 = ref(database, 'devices/MX5S003/battery');
    const connectionRef3 = ref(database, 'devices/MX5S003/status')


// device one
    const unsubscribeLocation = onValue(locationRef, (snapshot) => {
      const locationData = snapshot.val();
      setDeviceData(prevData => ({ ...prevData, location: locationData }));
      console.log("Real-time location data:", locationData);
    });

    const unsubscribeBattery = onValue(batteryRef, (snapshot) => {
      const batteryData = snapshot.val();
      setDeviceData(prevData => ({ ...prevData, battery: batteryData }));
      console.log("Real-time battery data:", batteryData);
    });

    const unsubscribeStatus = onValue(connectionRef, (snapshot) => {
      const connection = snapshot.val();
      setDeviceData(prevData => ({ ...prevData, connection: connection }));
      console.log("Real-time battery data:", connection);
    });



    // device 2


    const unsubscribeLocation2 = onValue(locationRef2, (snapshot) => {
      const locationData = snapshot.val();
      setDevic2Data(prevData => ({ ...prevData, location2: locationData }));
      console.log("Real-time location data:", locationData);
    });

    const unsubscribeBattery2 = onValue(batteryRef2, (snapshot) => {
      const batteryData = snapshot.val();
      setDevic2Data(prevData => ({ ...prevData, battery2: batteryData }));
      console.log("Real-time battery data from device 2:", batteryData);
    });

    const unsubscribeStatus2 = onValue(connectionRef2, (snapshot) => {
      const connection = snapshot.val();
      setDevic2Data(prevData => ({ ...prevData, connection2: connection }));
      console.log("Real-time battery data:", connection);
    });

    // device 3
    
    const unsubscribeLocation3 = onValue(locationRef3, (snapshot) => {
      const locationData = snapshot.val();
      setDevic3Data(prevData => ({ ...prevData, location3: locationData }));
      console.log("Real-time location data:", locationData);
    });

    const unsubscribeBattery3 = onValue(batteryRef3, (snapshot) => {
      const batteryData = snapshot.val();
      setDevic3Data(prevData => ({ ...prevData, battery3: batteryData }));
      console.log("Real-time battery data from device 2:", batteryData);
    });

    const unsubscribeStatus3 = onValue(connectionRef3, (snapshot) => {
      const connection = snapshot.val();
      setDevic3Data(prevData => ({ ...prevData, connection3: connection }));
      console.log("Real-time battery data:", connection);
    });


    // Clean up the subscription on unmount
    return () => {
      unsubscribeLocation();
      unsubscribeBattery();
      unsubscribeStatus()
// device 2
      unsubscribeLocation2();
      unsubscribeBattery2();
      unsubscribeStatus2()

      // device 3
      unsubscribeLocation3();
      unsubscribeBattery3();
      unsubscribeStatus3()

    };
  }, []);

  const { battery, location, connection } = deviceData;
  const { battery2, location2, connection2 } = devic2;
  const { battery3, location3, connection3 } = devic3;


  // console.log("connection: ", connection.online)
  // Function to format battery level
  const formatBatteryLevel = (level) => {
    if (level !== undefined && level !== null) {
      return level.toFixed(2); // Adjust the number in toFixed based on your preference
    }
    return "N/A";
  };

  const batteryLeveled = formatBatteryLevel(battery?.batteryLevel)
  const status = connection?.online;

  const batteryLeveled2 = formatBatteryLevel(battery2?.batteryLevel)
  const status2 = connection2?.online;

  const batteryLeveled3 = formatBatteryLevel(battery3?.batteryLevel)
  const status3 = connection3?.online;


  // console.log("status: " )
  return (
    <div>
      {/* <p>Battery Level: {formatBatteryLevel(battery?.batteryLevel)}%</p>
      <p>Location: {location ? `Lat: ${location.latitude}, Long: ${location.longitude}` : "No location data"}</p> */}
      <div className="content-details">
        <div className="holder-left">
          <div className="screen-section">
            <ScreenHolder id="MXS0001" btry={batteryLeveled} status={status} />
            <ScreenHolder id="MXS0002"btry={batteryLeveled2} status={status2} />
            <ScreenHolder id="MXS0003" btry={batteryLeveled3} status={status3} />
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
            src={BLL}
          />
        </div>
      </div>
      <MoxieMaps />
    </div>
  );
}

export default ContentDetails;
