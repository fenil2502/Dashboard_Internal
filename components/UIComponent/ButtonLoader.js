import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const ButtonLoader = () => {
  return (
    <button className="button-loader">
      <span className="loading-icon">
        <FontAwesomeIcon icon={faSpinner} className="spin" />
      </span>
      <span className="loading-text">Loading</span>
    </button>
  );
};

export default ButtonLoader;
