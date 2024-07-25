import { useEffect, useState } from "react";

function App() {
  const [minute, setMinute] = useState(10);
  const [second, setSecond] = useState(12);

  useEffect(() => {
    const decrement = () => {
      setSecond((prevCount) => {
        if (prevCount > 0) {
          if (prevCount <= 10) {
            return `0${prevCount - 1}`;
          } else {
            return prevCount - 1;
          }
          // } else {
          //   return 12;
          //   // return 59;
        }
      });
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
      if (second === "00") {
        setSecond(12);

        return prevCount - 1;
      } else {
        return prevCount;
      }
    });
  }, [minute, second]);

  const HandleTimer = (props) => {
    return (
      <div>
        {props.minute}:{props.second}
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
