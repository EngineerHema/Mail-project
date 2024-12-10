import Card from 'react-bootstrap/Card';
import "./card.css"


function card() {
  return (
    <>

<div className="card-container">

      <Card className = "hamdoon" border="warning" style={{ width: '18rem' }} >
        <Card.Header>Header</Card.Header>
        <Card.Body>
          <Card.Title>Warning Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
      <br />

 </div>
</>
  );
}

export default card;