import React from "react";
import { capitalizeFirstLetter } from "../utils/helpers/index";
import { minutesToDuration } from "../utils/duration/index";

const TimerSettings = (props) => {
  const { type, duration, minMax, handleIncrementClick, disableButtons } = props;
  const [min, max] = [...minMax];
  
  return (
    <div className="input-group input-group-lg mb-2">
      <span className="input-group-text" data-testid="duration-{type}">
        {/* TODO: Update this text to display the current focus session duration */}
        {capitalizeFirstLetter(type)} Duration: {minutesToDuration(duration)}
      </span>
      <div className="input-group-append">
        {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
        <button
          type="button"
          className="btn btn-secondary"
          data-testid="decrease-{type}"
          onClick={() => handleIncrementClick(type, -1)}
          disabled={duration === min || disableButtons}
        >
          <span className="oi oi-minus" />
        </button>
        {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
        <button
          type="button"
          className="btn btn-secondary"
          data-testid="increase-{type}"
          onClick={() => handleIncrementClick(type, 1)}
          disabled={duration === max || disableButtons}
        >
          <span className="oi oi-plus" />
        </button>
      </div>
    </div>
  );
}

export default TimerSettings;