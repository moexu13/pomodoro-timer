import React from "react";

const ProgressBar = ({ percentComplete, sessionState }) => {
  if (!sessionState.stopped) {
    return (
      <div className="progress" style={{ height: "20px" }}>
        <div
          className="progress-bar"
          role="progressbar"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={percentComplete}// TODO: Increase aria-valuenow as elapsed time increases
          style={{ width: `${percentComplete}%` }} // TODO: Increase width % as elapsed time increases
        />
      </div>
    );
  } else {
    return null;
  } 
}

export default ProgressBar;