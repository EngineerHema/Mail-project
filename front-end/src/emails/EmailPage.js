import React from "react";
import "../style/Email.css"
import { Card } from "react-bootstrap";
const EmailPage = ({time,header,sender,body,attachments,receiver,color}) => {
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
    <div className="page" >
        <Card className="container_email" border={color} style={{borderWidth: "3px"}}>
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
            <ul className="attachmentList">
              {attachments.map((attachment, index) => (
                <li key={index} className="attachmentItem">
                  <a href={attachment.url} download={attachment.name} className="attachmentLink">
                    📎 {attachment.name}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="noAttachments">No attachments</p>
          )}
        </div>
      </Card>
    </div>
  );
  
};



export default EmailPage;
