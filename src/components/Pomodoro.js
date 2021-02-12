import { render } from "@testing-library/react";
import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";

import DurationSettings from "./DurationSettings";
import MinMaxLabel from "./MinMaxLabel";
import ProgressBar from "./ProgressBar";
import TimerControls from "./TimerControls";

const initialState = {
  focusDuration: 25,
  breakDuration: 5,
  focusMinMax: [5, 60],
  breakMinMax: [1, 15],
  disableButtons: false,
  isTimerRunning: false,
  isPaused: false,
}

class Pomodoro extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  handleIncrementClick = (type, increment) => {
    if (type === "focus") {
      const currentDuration = this.state.focusDuration;
      const [min, max] = [...this.state.focusMinMax];
      const newDuration = currentDuration + increment;
      if (newDuration >= min && newDuration <= max) {
        this.setState({ focusDuration: newDuration });
      }
    } else if (type === "break") {
      const currentDuration = this.state.breakDuration;
      const [min, max] = [...this.state.breakMinMax];
      const newDuration = currentDuration + increment;
      if (newDuration >= min && newDuration <= max) {
        this.setState({ breakDuration: newDuration });
      }
    }
  }

  handlePlayPauseClick = () => {
    const isTimerRunning = this.state.isTimerRunning;
    this.setState({ isTimerRunning: !isTimerRunning, disableButtons: true });
  }

  handleStopClick = () => {
    this.setState({ isTimerRunning: false, disableButtons: false });
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
            <div className="float-left">
              <MinMaxLabel type="focus" minMax={this.state.focusMinMax} />
            </div>
          </div>
          <div className="col">
            <div className="float-right">
              <MinMaxLabel type="break" minMax={this.state.breakMinMax} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <DurationSettings 
              type="focus"
              duration={this.state.focusDuration}
              minMax={this.state.focusMinMax}
              handleIncrementClick={this.handleIncrementClick}
              disableButtons={this.state.disableButtons}
            />
          </div>
          <div className="col">
            <div className="float-right">
              <div className="input-group input-group-lg mb-2">
                <DurationSettings 
                  type="break"
                  duration={this.state.breakDuration}
                  minMax={this.state.breakMinMax}
                  handleIncrementClick={this.handleIncrementClick}
                  disableButtons={this.state.disableButtons}
                  />
                </div>
              </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <TimerControls 
              isTimerRunning={this.state.isTimerRunning}
              handlePlayPauseClick={this.handlePlayPauseClick}
              handleStopClick={this.handleStopClick}
            />
          </div>
        </div>
        <div>
          <ProgressBar />
          {/* {this.state.isTimerRunning || this.state.isPaused ? (<ProgressBar />) : "" } */}
        </div>
      </div>
    );
  }
}

export default Pomodoro;
