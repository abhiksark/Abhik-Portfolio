import React from 'react'
import { ProgressBar } from 'react-bootstrap'

const CustomProgressBar = ({ now, customColor, className }) => {
  return (
    <ProgressBar now={now} className={className}>
      <div
        className="progress-bar"
        role="progressbar"
        style={{
          width: `${now}%`,
          backgroundColor: customColor
        }}
        aria-valuenow={now}
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </ProgressBar>
  )
}

export default CustomProgressBar
