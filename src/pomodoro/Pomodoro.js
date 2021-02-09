import { render } from "@testing-library/react";
import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";

import TimerSettings from "./TimerSettings";

const initialState = {
  focusDuration: 25,
  breakDuration: 5,
  focusMinMax: [5, 60],
  breakMinMax: [1, 15],
  isTimerRunning: false,
  showError: false,
  disableMinusButton: false,
  disablePlusButton: false,
}

const playPause = () => {
  const isTimerRunning = this.state.isTimerRunning;
  this.setState({ isTimerRunning: !isTimerRunning });
}

class Pomodoro extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  // Timer starts out paused
  handleMinusClick = () => {
    const focusDuration = this.state.focusDuration;
    const focusMin = this.state.focusMinMax[0];
    this.setState({ disablePlusButton: false });
    if (focusDuration > focusMin) {
      this.setState({ focusDuration: focusDuration - 1 });
      this.setState({ showError: false });
    } else {
      this.setState({ duration: focusMin })
      this.setState({ showError: true });
      this.setState({ disableMinusButton: true});
    }
  }
  
  handlePlusClick = () => {
    const focusDuration = this.state.focusDuration;
    const focusMax = this.state.focusMinMax[1];
    this.setState({ disableMinusButton: false });
    if (focusDuration < focusMax) {
      this.setState({ focusDuration: focusDuration + 1 });
      this.setState({ showError: false });
    } else {
      this.setState({ duration: focusMax });
      this.setState({ showError: true });
      this.setState({ disablePlusButton: true });
    }
  }
  // useInterval(
  //   () => {
  //     // ToDo: Implement what should happen when the timer is running
  //   },
  //   isTimerRunning ? 1000 : null
  // );

  render() {
    return (
      <div className="pomodoro">
        <div className="row">
          <div className="col">
            <TimerSettings 
              type="focus"
              duration={this.state.focusDuration}
              minMax={this.state.focusMinMax}
              handleMinusClick={this.handleMinusClick}
              handlePlusClick={this.handlePlusClick}
              showError={this.state.showError}
              disableMinusButton={this.state.disableMinusButton}
              disablePlusButton={this.state.disablePlusButton}
            />
          </div>
          <div className="col">
            <div className="float-right">
              <div className="input-group input-group-lg mb-2">
                <span className="input-group-text" data-testid="duration-break">
                  {/* TODO: Update this text to display the current break session duration */}
                  Break Duration: 05:00
                </span>
                <div className="input-group-append">
                  {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-testid="decrease-break"
                  >
                    <span className="oi oi-minus" />
                  </button>
                  {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-testid="increase-break"
                  >
                    <span className="oi oi-plus" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
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
                onClick={playPause}
              >
                <span
                  className={classNames({
                    oi: true,
                    // "oi-media-play": !isTimerRunning,
                    // "oi-media-pause": isTimerRunning,
                    "oi-media-play": false,
                    "oi-media-pause": true,
                  })}
                />
              </button>
              {/* TODO: Implement stopping the current focus or break session and disable when there is no active session */}
              <button
                type="button"
                className="btn btn-secondary"
                title="Stop the session"
              >
                <span className="oi oi-media-stop" />
              </button>
            </div>
          </div>
        </div>
        <div>
          {/* TODO: This area should show only when a focus or break session is running or pauses */}
          <div className="row mb-2">
            <div className="col">
              {/* TODO: Update message below to include current session (Focusing or On Break) and total duration */}
              <h2 data-testid="session-title">Focusing for 25:00 minutes</h2>
              {/* TODO: Update message below to include time remaining in the current session */}
              <p className="lead" data-testid="session-sub-title">
                25:00 remaining
              </p>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col">
              <div className="progress" style={{ height: "20px" }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-valuenow="0" // TODO: Increase aria-valuenow as elapsed time increases
                  style={{ width: "0%" }} // TODO: Increase width % as elapsed time increases
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Pomodoro;
