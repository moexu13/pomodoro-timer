import React from "react";
import { minutesToDuration } from "../utils/duration/index";

const SessionTitle = ({ onBreak, focusDuration, breakDuration }) => {
 if (onBreak) {
  return (
    <div className="mt-2">
        <h2 data-testid="session-title">
          On Break for {minutesToDuration(breakDuration)} minutes
        </h2>
    </div>
  );
 } else {
  return (
    <div className="mt-1">
      <h2 data-testid="session-title">
        Focusing for {minutesToDuration(focusDuration)} minutes
      </h2>
    </div>
  );
 }
}

export default SessionTitle;