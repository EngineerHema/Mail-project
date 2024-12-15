import { Link } from "react-router-dom";
import "../style/card.css";
import axios from "axios";

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
}) {
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

      console.log("At del:" + API_KEY.current);

      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${API_KEY.current}`,
        },
      });

      if (response.ok) {
        console.log("Email deleted successfully");
      } else {
        console.error("Failed to delete email");
      }
    } catch (error) {
      console.error("Error deleting email:", error);
    }
  };

  return (
    <div className="email-card-container">
      <div className="email-card">
        <div className="email-card-header">
          <div className="priority-indicator" style={{ backgroundColor: color }}></div>
          <Link
            to="/openEmail"
            state={{ sender, header, body, color, receiver, time }}
            className="email-card-link"
          >
            <span className={type === "sent" ? "for" : "from"}>{head}</span>
          </Link>
          <CoolDate time={time} />
          <button className="delete-button" onClick={handleDelete}>
            Delete
          </button>
        </div>
        <div className="email-card-body">
          <h3 className="email-title">{header}</h3>
          <p className="email-body">{body}</p>
        </div>
      </div>
    </div>
  );
}

export default Email;
