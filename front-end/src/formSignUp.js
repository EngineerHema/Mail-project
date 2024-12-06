import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './formSignup.css'
function SignUpForm() {
  return (
    <div className='all'>
    <div className='form_section_up'>
    <Form>
      <Form.Group>
      <Row>
        <Col>
        <Form.Label>Frist name</Form.Label>
          <Form.Control placeholder="First name" />
          
        </Col>
        <Col>
        <Form.Label>Last Name</Form.Label>
          <Form.Control placeholder="Last name" />
        </Col>
      </Row>
      </Form.Group>
      <p></p>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
       
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="confirm password" />
      </Form.Group>
      <Form.Group>
        <Link to="/" className='already_have'>Already have an account ?</Link>
      </Form.Group>
      <Button variant="primary" type="submit" className='button-submit'>
        Submit
      </Button>
    </Form>
    </div>
    </div>
  );
}

export default SignUpForm;