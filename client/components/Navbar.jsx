import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import './../stylesheets/navbar.scss'

function Navbar() {
  // const [click, setClick] = useState(false);
  // const [button, setButton] = useState(true);
  // const handleClick = () => setClick(!click);

  // const showButton = () => {
  //   if (window.innerWidth <= 960) {
  //     setButton(false);
  //   } else {
  //     setButton(true);
  //   }
  // };

  // useEffect(() => {
  //   showButton();
  // }, []);

  // window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <h2 >
            CherryTea
           </h2>
            <i class="fa-solid fa-seedling"></i>         
          <ul className='nav-menu'>
            <li className='nav-item'>
              <Link to='/home' className='nav-links'>
              <Button variant="contained" size="large">Home</Button>

              </Link>
            </li>
           
            <li className='nav-item'>
              <Link to='/' className='nav-links'>
                <Button variant="contained" size="large">Login</Button>
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/register' className='nav-links'>
                 <Button variant="contained" size="large">SIGN UP</Button>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;