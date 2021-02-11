import { render } from "@testing-library/react";
import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";

import DurationSettings from "./DurationSettings";

const initialState = {
  focusDuration: 25,
  breakDuration: 5,
  focusMinMax: [5, 60],
  breakMinMax: [1, 15],
  isTimerRunning: false,
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
  handleMinusClick = (type) => {
    if (type === "focus") {
      const focusDuration = this.state.focusDuration;
      const focusMin = this.state.focusMinMax[0];
      if (focusDuration > focusMin) {
        this.setState(prevState => { 
          return { focusDuration: prevState.focusDuration - 1 };
        });
      }
    } else if (type === "break") {
      const breakDuration = this.state.breakDuration;
      const breakMin = this.state.breakMinMax[0];
      if (breakDuration > breakMin) {
        this.setState(prevState => {
          return { breakDuration: prevState.breakDuration - 1};
        })
      }
    } 
  }
  
  handlePlusClick = (type) => {
    if (type === "focus") {
      const focusDuration = this.state.focusDuration;
      const focusMax = this.state.focusMinMax[1];
      if (focusDuration < focusMax) {
        this.setState(prevState => {
          return { focusDuration: prevState.focusDuration + 1 };
        });
      }
    } else if (type === "break") {
      const breakDuration = this.state.breakDuration;
      const breakMax = this.state.breakMinMax[1];
      if (breakDuration < breakMax) {
        this.setState(prevState => {
          return { breakDuration: prevState.breakDuration + 1};
        });
      }
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
            <DurationSettings 
              type="focus"
              duration={this.state.focusDuration}
              minMax={this.state.focusMinMax}
              handleMinusClick={this.handleMinusClick}
              handlePlusClick={this.handlePlusClick}
              showError={this.state.showError}
              disableButtons={this.state.disableButtons}
            />
          </div>
          <div className="col">
            <div className="float-right">
              <DurationSettings 
                type="break"
                duration={this.state.breakDuration}
                minMax={this.state.breakMinMax}
                handleMinusClick={this.handleMinusClick}
                handlePlusClick={this.handlePlusClick}
                showError={this.state.showError}
                disableButtons={this.state.disableButtons}
                />
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
