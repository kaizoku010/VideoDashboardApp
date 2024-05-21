import React from 'react'
import "./DeviceLocation.css"
import { Map, Marker, ZoomControl } from "pigeon-maps"

function DeviceLocation() {
    const position = [0.3490034,32.6167863]
    const position1 = [0.34806636113571504, 32.617075536906356]
    const position2 = [0.3494668489312686, 42.71633998262296]
    const position3 = [0.34854206861124554, 32.616111724493706]

  return (
    <div className='device-location'>
        <h3>Screen Locations (Using Latitude & Longtitude)</h3>
       <div className='map-section'>
    <Map height={700} defaultCenter={position} defaultZoom={31}>
      <Marker width={50} anchor={position1} /> 
      <Marker color='green' width={50} anchor={position2} />
      <Marker width={50} anchor={position3} />
      <Marker color='blue' width={50} anchor={position} />
   <ZoomControl/>
    </Map>
    </div>  
    </div>
   
  )
}

export default DeviceLocation