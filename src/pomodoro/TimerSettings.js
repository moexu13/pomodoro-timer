import React from "react";
import { capitalizeFirstLetter } from "../utils/helpers/index";
import { minutesToDuration } from "../utils/duration/index";

const TimerSettings = (props) => {
  const { type, duration, minMax, handleMinusClick, handlePlusClick, disableMinusButton, disablePlusButton, showError } = props;
  const errorMessage = `${capitalizeFirstLetter(type)} Duration must be between ${minMax[0]} and ${minMax[1]} minutes`;
  return (
    <div className="input-group input-group-lg mb-2">
      { showError ?  (<div className="alert alert-danger">{errorMessage}</div>): "" }
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
          onClick={handleMinusClick}
          disabled={disableMinusButton}
        >
          <span className="oi oi-minus" />
        </button>
        {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
        <button
          type="button"
          className="btn btn-secondary"
          data-testid="increase-{type}"
          onClick={handlePlusClick}
          disabled={disablePlusButton}
        >
          <span className="oi oi-plus" />
        </button>
      </div>
    </div>
  );
}

export default TimerSettings;