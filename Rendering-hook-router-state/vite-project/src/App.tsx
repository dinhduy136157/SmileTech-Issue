import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Clock from './pages/Clock'
import ToDo from './pages/ToDo'
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Cart from './pages/Cart'


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ToDo/>}/>
        <Route path="/clock" element={<Clock/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/cart" element={<Cart/>}/>

      </Routes>

    </Router>
  )
}

export default App
