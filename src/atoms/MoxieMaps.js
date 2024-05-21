import React from 'react'
import "./MoxieMaps.css"
import { Map, Marker, ZoomControl } from "pigeon-maps"



function MoxieMaps() {

    const position = [0.3490034,32.6167863]
    const position1 = [0.34806636113571504, 32.617075536906356]
    const position2 = [0.3494668489312686, 32.61633998262296]
    const position3 = [0.34854206861124554, 32.616111724493706]

  return (
    <div className='map-section'>
    <Map height={400} defaultCenter={position} defaultZoom={11}>
      <Marker width={50} anchor={position1} /> 
      <Marker color='green' width={50} anchor={position2} />
      <Marker width={50} anchor={position3} />
      <Marker color='red' width={50} anchor={position} />
   <ZoomControl/>

    </Map>
    </div>
  )
}

export default MoxieMaps

