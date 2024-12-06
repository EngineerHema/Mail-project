
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './formSignIn';
import SignUpForm from './formSignUp';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/about" element={<SignUpForm />} />
      </Routes>
    </Router>
  );
}

export default App;
