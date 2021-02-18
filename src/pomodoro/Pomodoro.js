import React, { useState, useEffect } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import { minutesToDuration } from "../utils/duration/index";

import ProgressBar from "./ProgressBar";
import SessionTitle from "./SessionTitle";
import TimerCountdown from "./TimerCountdown";

function Pomodoro() {
  const session = {
    running: false,
    paused: false,
    stopped: true
  }
  // Timer starts out stopped
  const [sessionState, setSessionState] = useState(session);
  const [onBreak, setOnBreak] = useState(false);
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [percentComplete, setPercentComplete] = useState(0);
  const [disableButtons, setDisableButtons] = useState(false);
  const focusMinMax = [5, 60];
  const breakMinMax = [1, 15];

  const startSession = () => {
    setSessionState({
      running: true,
      paused: false,
      stopped: false
    });
  }

  const pauseSession = () => {
    setSessionState({
      running: false,
      paused: true,
      stopped: false
    });
  }

  const stopSession = () => {
    setDisableButtons(false);
    setOnBreak(false);
    setTimeRemaining(0);
    setPercentComplete(0);
    setSessionState({
      running: false,
      paused: false,
      stopped: true
    });
  }

  const handleIncrementClick = (type, increment) => {
    if (type === "focus") {
      const [min, max] = [...focusMinMax];
      const newDuration = focusDuration + increment;
      if (newDuration >= min && newDuration <= max) {
        setFocusDuration(newDuration);
      }
    } else if (type === "break") {
      const [min, max] = [...breakMinMax];
      const newDuration = breakDuration + increment;
      if (newDuration >= min && newDuration <= max) {
        setBreakDuration(newDuration);
      }
    }
  }

  const calculatePercentComplete = () => {
    if (onBreak) {
      const breakInSeconds = breakDuration * 60;
        setPercentComplete(Math.trunc(((breakInSeconds - timeRemaining) / breakInSeconds) * 100));
    } else {
      const focusInSeconds = focusDuration * 60;
      setPercentComplete(Math.trunc(((focusInSeconds - timeRemaining) / focusInSeconds) * 100));
    }
  }

  const playAudio = () => {
    const audio = document.getElementsByClassName("audio-element")[0];
    audio.play();
  }

  useEffect(calculatePercentComplete, [timeRemaining]);

  const toggleBreak = () => {
    playAudio();
    if (!onBreak) {
      setTimeRemaining(breakDuration * 60);
    } else {
      setTimeRemaining(focusDuration * 60);
    }
    setOnBreak(prevState => !prevState);
    setPercentComplete(0);
  }
  
  useInterval(
    () => {
      // ToDo: Implement what should happen when the timer is running
      if (timeRemaining === 0) {
        toggleBreak();
      } else {
        setTimeRemaining(timeRemaining - 1);
      }
    },
    sessionState.running ? 1000 : null
  );

  const playPause = () => {
    setDisableButtons(true);
    if (sessionState.running) {
      pauseSession();
    } else if (sessionState.paused) {
      startSession();
    } else if (sessionState.stopped) {
      startSession();
      setPercentComplete(0);
      if (onBreak) {
        setTimeRemaining(breakDuration * 60);
      } else {
        setTimeRemaining(focusDuration * 60);
      }
      }
  }

  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <div className="input-group input-group-lg mb-2">
            <div className="alert alert-light alert-message float-left">
              Focus duration must be between {focusMinMax[0]} and {focusMinMax[1]} minutes
            </div>
            <span className="input-group-text" data-testid="duration-focus">
              {/* TODO: Update this text to display the current focus session duration */}
              Focus Duration: {minutesToDuration(focusDuration)}
            </span>
            <div className="input-group-append">
              {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-focus"
                onClick={() => handleIncrementClick("focus", -5)}
                disabled={focusDuration === focusMinMax[0] || disableButtons}
              >
                <span className="oi oi-minus" />
              </button>
              {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="increase-focus"
                onClick={() => handleIncrementClick("focus", 5)}
                disabled={focusDuration === focusMinMax[1] || disableButtons}
              >
                <span className="oi oi-plus" />
              </button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="alert alert-light alert-message float-right">
            Break duration must be between {breakMinMax[0]} and {breakMinMax[1]} minutes
          </div>
          <div className="float-right">
            <div className="input-group input-group-lg mb-2">
              <span className="input-group-text" data-testid="duration-break">
                {/* TODO: Update this text to display the current break session duration */}
                Break Duration: {minutesToDuration(breakDuration)}
              </span>
              <div className="input-group-append">
                {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="decrease-break"
                  onClick={() => handleIncrementClick("break", -1)}
                  disabled={breakDuration === breakMinMax[0] || disableButtons}
                >
                  <span className="oi oi-minus" />
                </button>
                {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="increase-break"
                  onClick={() => handleIncrementClick("break", 1)}
                  disabled={breakDuration === breakMinMax[1] || disableButtons}
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
                  "oi-media-play": !sessionState.running,
                  "oi-media-pause": sessionState.running,
                })}
              />
            </button>
            {/* TODO: Implement stopping the current focus or break session and disable when there is no active session */}
            <button
              type="button"
              className="btn btn-secondary"
              title="Stop the session"
              onClick={stopSession}
              disabled={sessionState.stopped}
            >
              <span className="oi oi-media-stop" />
            </button>
          </div>
        </div>
      </div>
      <audio className="audio-element">
        <source src="https://assets.coderrocketfuel.com/pomodoro-times-up.mp3"></source>
      </audio>
      <div>
        {/* TODO: This area should show only when a focus or break session is running or pauses */}
        <div className="row mb-2">
          <div className="col">
            {/* TODO: Update message below to include current session (Focusing or On Break) and total duration */}
            <SessionTitle 
              onBreak={onBreak} 
              focusDuration={focusDuration} 
              breakDuration={breakDuration} 
            />
            {/* TODO: Update message below to include time remaining in the current session */}
            <TimerCountdown sessionState={sessionState} timeRemaining={timeRemaining} />
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <ProgressBar percentComplete={percentComplete} sessionState={sessionState} />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            {sessionState.paused ? <h3 className="text-center">Paused</h3> : "" }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pomodoro;
