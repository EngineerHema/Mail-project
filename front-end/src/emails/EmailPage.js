import React from "react";
import { useLocation } from "react-router-dom";
import "../style/Email.css";
import { Card } from "react-bootstrap";

const EmailPage = () => {
  const location = useLocation(); // Access state from Link
  const { sender, header, body, color, receiver, time, attachments } = location.state || {}; // Destructure state

  const formatTime = (time) => {
    const date = new Date(time);
    return date.toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="page">
      <Card className="container_email" border={color} style={{ borderWidth: "2px" }}>
        <h1 className="subject">{header}</h1>
        <div className="details">
          <p>
            <strong>Sender:</strong> <span className="info">{sender}</span>
          </p>
          <p>
            <strong>Receiver:</strong> <span className="info">{receiver}</span>
          </p>
          <p>
            <strong>Time:</strong> <span className="info">{formatTime(time)}</span>
          </p>
        </div>
        <div className="body_email">
          <h3>Body:</h3>
          <p className="bodyText">{body}</p>
        </div>
        <div className="attachments">
          <h3>Attachments:</h3>
          {attachments && attachments.length > 0 ? (
            <div className="attachments-section">
              <ul className="attachments-list">
                {attachments.map((file, index) => (
                  <li key={index} className="attachment-item">
                    <span className="attachment-link">{file.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No attachments available.</p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default EmailPage;
