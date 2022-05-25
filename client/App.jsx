import React from 'react';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <>
        <h1>Cherry Tea</h1>
        {/* <Navbar /> */}
        {/* <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul> */}
      </>
      <Routes>
        <Route exact path="/" element={<Login />}></Route>
        <Route exact path="/home" element={<Home />}></Route>
        <Route exact path="/register" element={<Register />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
