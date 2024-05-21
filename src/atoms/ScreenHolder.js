import React from 'react'
import "./ScreenHolder.css"
import ScreenImage from "../media/screen_ic.png"

function ScreenHolder({id, btry, status}) {
  return (
    <div className='screen-holder'>
    <img src={ScreenImage} className='screen-ic'/>
    <div className='screen-details'>
        <p style={{marginBottom:"-1rem"}}>Device ID: {id}</p>
        <p style={{marginBottom:"-1rem"}}>Battery Level: {btry}</p>
        <p>Status: <span className='sc-span'>{status}</span></p>

    </div>
    </div>
  )
}

export default ScreenHolder