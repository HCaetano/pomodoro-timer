import React from "react";

const Timer = (props) => {
  const { minute, second } = props;

  const prependZeroIfNumberIsLessThanTen = (number) => {
    if (number < 10) {
      return `0${number}`;
    }

    return number;
  };

  return (
    <div>
      {prependZeroIfNumberIsLessThanTen(minute)}:
      {prependZeroIfNumberIsLessThanTen(second)}
    </div>
  );
};

export default Timer;
