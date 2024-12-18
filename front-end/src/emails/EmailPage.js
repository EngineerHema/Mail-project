import React from "react";
import { useLocation } from "react-router-dom";
import "../style/Email.css";
import { Card } from "react-bootstrap";

const EmailPage = () => {
  const location = useLocation(); 
  const { sender, header, body, color, receiver, time, attachments ,singleAddressDraft,toAddressDraft} = location.state || {}; 
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


  function handleDownload(base64, fileName, fileType) {
    const base64Data = base64.split(",")[1];
    const binaryData = atob(base64Data);
    const byteArray = new Uint8Array(binaryData.length);
  
    for (let i = 0; i < binaryData.length; i++) {
      byteArray[i] = binaryData.charCodeAt(i);
    }
  
    const blob = new Blob([byteArray], { type: fileType });
    const fileURL = URL.createObjectURL(blob);
  
    const link = document.createElement("a");
    link.href = fileURL;
    link.download = fileName || "download";
    link.click();
    URL.revokeObjectURL(fileURL);
  }

  return (
    <div className="page">
      <Card className="container_email" border={color} style={{ borderWidth: "2px" }}>
        <h1 className="subject">{header}</h1>
        <div className="details">
          <p>
            <h5>Sender:</h5> <span className="info">{sender}</span>
          </p>
          <p>
            <h5>Receiver:</h5> <span className="info">{receiver}</span>
          </p>
          <p>
            <h5>Time:</h5> <span className="info">{formatTime(time)}</span>
          </p>
        </div>
        <div className="body_email">
          <h4>Body:</h4>
          <p className="bodyText">{body}</p>
        </div>
        <div className="attachments">
          <h4>Attachments:</h4>
          {attachments && attachments.length > 0 ? (
            <div className="attachments-section">
              <ul className="attachments-list">
                {attachments.map((file, index) => (
                  <li key={index} className="attachment-item">
                    <span  className="attachment-link" onClick={() => handleDownload(file.content, file.name, file.type)}>
                      {file.name}
                      </span>
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
