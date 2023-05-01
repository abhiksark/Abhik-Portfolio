import React from 'react'
import { ProgressBar } from 'react-bootstrap'
import PropTypes from 'prop-types'

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

CustomProgressBar.propTypes = {
  now: PropTypes.number.isRequired,
  customColor: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired
}

export default CustomProgressBar
