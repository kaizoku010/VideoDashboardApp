import React, { useState } from 'react'
import Modal from 'react-modal';
import "./TestPop.css"
import Popup from "./PopUp"
import { Link } from 'react-router-dom';

function TestPop() {

  return (
    <div className="popup-container">
      <Link to="/add-videos">
            <button className='new-vid'>Add Video</button>
      </Link>
    </div>
  );
};
export default TestPop