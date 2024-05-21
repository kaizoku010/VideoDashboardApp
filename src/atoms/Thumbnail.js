import React from 'react'
import "./Thumbnail.css"
import ThumbIc from "../media/play_white.png"

function Thumbnail({img}) {
  return (
    <div className='thumbnail' >
    <img className='thumbnail-img' src={img}/>    
    </div>
  )
}

export default Thumbnail