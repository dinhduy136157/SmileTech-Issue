import { BrowserRouter as Router, Routes, Route } from 'react-router';
import './App.css'
import User from './components/User'
import UserDetail from './components/UserDetail'
import UserForm from './components/UserForm'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/user/:id" element={<UserDetail />} />
        <Route path="/userform" element={<UserForm />} />
      </Routes>
    </Router>
  );
}

export default App
