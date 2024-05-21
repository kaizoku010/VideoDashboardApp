import React from 'react'
import "./VideoListItem.css"

import Thumbnail from "./Thumbnail"

function VideoListItem({img}) {
  return (
    <div>
    <div style={{marginTop:"10px", marginBottom:"0px"}} className='vd-item'>
<div className='vd-tem-holder'>
<Thumbnail img={img}/>
<div className='thumbnail-details'>
    <p style={{marginBottom:"-1rem"}}>Digital Solutions Ad</p>
    <p style={{marginBottom:"-1rem", fontSize:"small"}}>Willapps Limited</p>
    <p style={{fontSize:"smaller"}}>00:22</p>

</div>
</div>

    </div>
    </div>
  )
}

export default VideoListItem