import React from "react";
import "./Counter.scss";
const Counter = ({ callback }) => {
  const [counter, setCounter] = React.useState(60);
  // Third Attempts
  React.useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    if (counter <= 0) {
      callback();
    }
    return () => clearInterval(timer);
  }, [counter, callback]);

  return <div className="counter">{counter} sec</div>;
};

export default Counter;
