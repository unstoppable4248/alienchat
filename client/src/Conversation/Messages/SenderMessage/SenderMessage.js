import React from "react";
import "./SenderMessage.css";

const SenderMessage = ({ data }) => {
  return (
    <div className="sender-message-container">
      <div className="sender-message">
        <div className="sender-message-content">
          <div className="sender-message-msg">{data.content}</div>
          <div className="sender-message-time">{data.time}</div>
        </div>
      </div>
    </div>
  );
};

export default SenderMessage;
