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
          <Link to='/' className='navbar-logo'>
            CherryTea
            <i class="fa-solid fa-seedling"></i>         
           </Link>
          <ul className='nav-menu'>
            <li className='nav-item'>
              <Link to='/' className='nav-links'>
                Home
              </Link>
            </li>
           
            <li className='nav-item'>
              <Link to='/login' className='nav-links'>
                <Button>Login</Button>
              </Link>
            </li>
          </ul>
        <Button >SIGN UP</Button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;