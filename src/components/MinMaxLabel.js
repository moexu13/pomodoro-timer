import React from "react";
import { capitalizeFirstLetter } from "../utils/helpers/index";

const MinMaxLabel = ({ type, minMax }) => {
  const [min, max] = [...minMax];
  const labelMessage = `${capitalizeFirstLetter(type)} Duration must be between ${min} and ${max} minutes`;
  return (
    <div className="alert alert-light alert-message">
      {labelMessage}
    </div>
  );
}

export default MinMaxLabel;