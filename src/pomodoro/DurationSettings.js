import React, { useState } from "react";
import { capitalizeFirstLetter } from "../utils/helpers/index";
import { minutesToDuration } from "../utils/duration/index";

const TimerSettings = (props) => {
  const { type, duration, minMax, handleMinusClick, handlePlusClick, disableButtons } = props;
  const [min, max] = [...minMax];
  const errorMessage = `${capitalizeFirstLetter(type)} Duration must be between ${min} and ${max} minutes`;
  
  const [showError, setShowError] = useState(false);
  const [disableMinusButton, setDisableMinusButton] = useState(false);
  const [disablePlusButton, setDisablePlusButton] = useState(false);

  if (disableButtons) {
    setDisableMinusButton(true);
    setDisablePlusButton(true);
  }

  const checkMinMax = () => {
    console.log(duration);
    if (duration === min) {
      setShowError(true);
      setDisableMinusButton(true);
      setDisablePlusButton(false);
    } else if (duration === max) {
      setShowError(true);
      setDisablePlusButton(true);
      setDisableMinusButton(false);
    } else {
      setShowError(false);
      setDisableMinusButton(false);
      setDisablePlusButton(false);
    }
  }

  return (
    <div className="input-group input-group-lg mb-2">
      { showError ?  (<div className="alert alert-info">{errorMessage}</div>): "" }
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
          onClick={() => {
            handleMinusClick(type);
            checkMinMax();
          }}
          disabled={disableMinusButton}
        >
          <span className="oi oi-minus" />
        </button>
        {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
        <button
          type="button"
          className="btn btn-secondary"
          data-testid="increase-{type}"
          onClick={() => {
            handlePlusClick(type);
            checkMinMax();
          }}
          disabled={disablePlusButton}
        >
          <span className="oi oi-plus" />
        </button>
      </div>
    </div>
  );
}

export default TimerSettings;