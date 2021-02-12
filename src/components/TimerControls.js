import React from "react";
import classNames from "../utils/class-names";

// Timer starts out paused
const TimerControls = ({ isTimerRunning, handlePlayPauseClick, handleStopClick }) => {
  return (
    <div
      className="btn-group btn-group-lg mb-2"
      role="group"
      aria-label="Timer controls"
    >
      <button
        type="button"
        className="btn btn-primary"
        data-testid="play-pause"
        title="Start or pause timer"
        onClick={handlePlayPauseClick}
      >
        <span
          className={classNames({
            oi: true,
            "oi-media-play": !isTimerRunning,
            "oi-media-pause": isTimerRunning,
          })}
        />
      </button>
      {/* TODO: Implement stopping the current focus or break session and disable when there is no active session */}
      <button
        type="button"
        className="btn btn-danger"
        title="Stop the session"
        onClick={handleStopClick}
        disabled={!isTimerRunning}
      >
        <span className="oi oi-media-stop" />
      </button>
    </div>
  );
}

export default TimerControls;