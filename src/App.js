import { useEffect, useState } from "react";

function App() {
  const [minute, setMinute] = useState(10);
  const [second, setSecond] = useState(12);

  useEffect(() => {
    const decrement = () => {
      setSecond((prevCount) => prevCount - 1);
    };
    const intervalId1 = setInterval(decrement, 1000);

    return () => {
      clearInterval(intervalId1);
    };
  }, [minute, second]);

  useEffect(() => {
    setMinute((prevCount) => {
      console.log("second", second);
      console.log("minute", minute);
      if (second === -1) {
        setSecond(12);

        return prevCount - 1;
      }

      return prevCount;
    });
  }, [minute, second]);

  const HandleTimer = (props) => {
    const { minute, second } = props;

    const prependZeroIfNumberIsLessThanTen = (number) => {
      if (number < 10) {
        return `0${number}`;
      }

      return number;
    };

    return (
      <div>
        {prependZeroIfNumberIsLessThanTen(minute)}:{prependZeroIfNumberIsLessThanTen(second)}
      </div>
    );
  };

  return (
    <div>
      hi <HandleTimer minute={minute} second={second} />
    </div>
  );
}

export default App;
