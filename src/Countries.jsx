import React from "react";
import "./Countries.css";

function Countries({ country }) {
  return (
    <div className="countries">
      <li>{country}</li>
    </div>
  );
}

export default Countries;
