import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Clock from './pages/clock'
import ToDo from './pages/toDo'
import About from './pages/about'
import Contact from './pages/contact'
import Home from './pages/home'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ToDo/>}/>
        <Route path="/clock" element={<Clock/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/about" element={<About/>}/>
      </Routes>

    </Router>
  )
}

export default App
