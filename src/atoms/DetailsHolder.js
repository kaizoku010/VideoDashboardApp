import React, { useState } from "react";
import "./DetailsHolder.css";
import { Link } from "react-router-dom";
import TestPop from "./TestPop";


function DetailsHolder({ title, numbers, action }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="details-holder">
      <p className="tvp">{title}</p>
      <div className="tvp-lower-details">
        <h2 className="numbers">{numbers}</h2>
          <p className="actions">{action}</p>
      </div>
    </div>
  );
}

export default DetailsHolder;
