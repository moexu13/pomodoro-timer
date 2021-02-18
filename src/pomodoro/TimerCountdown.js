import React from "react";
import { secondsToDuration } from "../utils/duration/index";

const TimerCountdown = ({ timeRemaining, sessionState}) => {
  if (!sessionState.stopped) {
    return (
      <p className="lead" data-testid="session-sub-title">
        {secondsToDuration(timeRemaining)} remaining
      </p>
    );
  } else {
    return null;
  }
}

export default TimerCountdown;