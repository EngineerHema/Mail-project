import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../style/card.css";

function Email({
  Address,
  id,
  sender,
  header,
  body,
  color,
  type,
  receiver,
  time,
  attachments,
  API_KEY,
  onCheckboxToggle, // Handler from parent

}) {
  const [isChecked, setIsChecked] = useState(false); // State to manage checkbox value

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setIsChecked(isChecked); // Update local checkbox state
    onCheckboxToggle(id, isChecked); // Notify parent component
  };

  let head = type === "sent" ? `For: ${receiver}` : `From: ${sender}`;

  const CoolDate = ({ time }) => {
    const formatCustomDateFromString = (time) => {
      const date = new Date(time);
      const day = date.getDate();
      const month = date.toLocaleString("en-US", { month: "short" });
      const year = date.getFullYear();
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const seconds = date.getSeconds().toString().padStart(2, "0");
      const daySuffix = (day) => {
        if (day > 3 && day < 21) return "th";
        switch (day % 10) {
          case 1:
            return "st";
          case 2:
            return "nd";
          case 3:
            return "rd";
          default:
            return "th";
        }
      };
      return `${day}${daySuffix(day)} ${month} ${year} | ${hours}:${minutes}:${seconds}`;
    };
    return <span className="time">{formatCustomDateFromString(time)}</span>;
  };



  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const url = new URL(`http://localhost:8080/deleteEmail`);
      url.searchParams.append("Address", Address.current);
      url.searchParams.append("id", id);

      const response = await fetch(url, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${API_KEY.current}` },
      });

      if (response.ok) console.log("Email deleted successfully");
      else console.error("Failed to delete email");
    } catch (error) {
      console.error("Error deleting email:", error);
    }
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
    <div className="email-card-container">
      <div className="email-card">
        <div className="email-card-header">
          <div className="priority-indicator" style={{ backgroundColor: color }}></div>
          <Link
            to="/openEmail"
            state={{ sender, header, body, color, receiver, time, attachments }}
            className="email-card-link"
          >
            <span className={type === "sent" ? "for" : "from"}>{head}</span>
          </Link>
          <CoolDate time={time} />
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            title="Select this email"
            style={{ marginLeft: "10px" , marginRight: "10px"}} // Add some space
          />
          <button className="delete-button" onClick={handleDelete}>
            Delete
          </button>
        </div>

        <div className="email-card-body">
          <div>
            <h3 className="email-title">{header}</h3>
            <p className="email-body">{body}</p>
          </div>
          {/* Attachments Section */}
          {attachments && attachments.length > 0 && (
            <div className="attachments-section">
              <p className="attachments-title">Attachments:</p>
              <ul className="attachments-list">
                {attachments.map((file, index) => (
                  <li key={index} className="attachment-item">
                    <span
                      className="attachment-link"
                      onClick={() => handleDownload(file.content, file.name, file.type)}
                    >
                      {file.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Email;
