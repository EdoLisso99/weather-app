import React from "react";
import "./OtherDays.css";

function OtherDays() {
  return (
    <div className="otherDays">
      <div className="otherDays__shortInfo">
        <div className="otherDays__day">Lunedì</div>
        <div className="otherDays__icon">{/* <WavesIcon /> */}</div>
        <div className="otherDays__maxAndMin">
          <div className="otherDays__max">Max</div>
          <div className="otherDays__min">Min</div>
        </div>
      </div>
    </div>
  );
}

export default OtherDays;
