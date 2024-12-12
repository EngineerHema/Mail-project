import Card from 'react-bootstrap/Card';
import "../style/card.css";

function Email({ sender, header, body, color, onDelete }) {
  return (
    <div className="card-container">
        <Card border={color}  className="Card">
        <a href="URL" target="_blank" className="no-underline">
          <Card.Header className="card-header">
            <span>From {sender}</span>
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
          </a>

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
