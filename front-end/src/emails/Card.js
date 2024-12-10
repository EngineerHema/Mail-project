import Card from 'react-bootstrap/Card';
import "../style/card.css"
function Email({sender,header,body,color}) {
  
  return (
<div className="card-container">
<Card border={color} style={{ width: '73.5rem' }} className='Card'>
        <Card.Header>From {sender}</Card.Header>
        <Card.Body className='Body_Card'>
          <Card.Title>{header}</Card.Title>
          <Card.Text>
            {body}
          </Card.Text>
        </Card.Body>
      </Card>
      <br />
 </div>

  );
}

export default Email;