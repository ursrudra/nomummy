import React, { useEffect, useState } from "react";

const Notification = ({ message, type }) => {
  const [show, setShow] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 5000);
  });
  if (!show) return <div></div>;
  return (
    <div className="notification">
      <div className={`"notification__card" ${type}`}>
        <div className="notification__close"></div>
        <div className="notification__message">{message}</div>
      </div>
    </div>
  );
};

export default Notification;
