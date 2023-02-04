import React, { Fragment } from 'react';

const Timer = ({ time }) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  
  return (
    <Fragment>
      <h2>Temps: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h2>
    </Fragment>
  );
};

export default Timer;
