import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import "../style/card.css";
import { useNavigate } from 'react-router-dom';


function Email({ sender, header, body, color, onDelete ,type,receiver,time,attachments}) {
  
  let head ; 
  console.log("type for kero"+type)
  if (type==="sent") {
    head = "For: " + receiver 
  }
  else{
    head = "From: " + sender
  }

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
          case 1: return "st";
          case 2: return "nd";
          case 3: return "rd";
          default: return "th";
        }
      };
  
      return `${day}${daySuffix(day)} ${month} ${year} | ${hours}:${minutes}:${seconds}`;
    };
    return <span className='time'>{formatCustomDateFromString(time)}</span>;
  };
  return (
    <div className="card-container">
        <Card border={color}  className="Card" style={{borderWidth: "5px"}}>
      
          <Card.Header className="card-header">
          <Link to="/openEmail" state={{sender, header,body, color, receiver, time }}>
              <span className={type === 'sent' ? "for" : "from"}>{head}</span>
            </Link>
            <CoolDate time={time}></CoolDate>
            <button
              className="delete-button"
              onClick={(e) => {
                e.preventDefault(); // Prevent link navigation
                onDelete && onDelete();
              }}
            >
              Delete
            </button>
          </Card.Header>
          <Card.Body className="Body_Card">
            <Card.Title>{header}</Card.Title>
            <Card.Text>{body}</Card.Text>
          </Card.Body>
        </Card>
      <br />
    </div>
  );
}

export default Email;
