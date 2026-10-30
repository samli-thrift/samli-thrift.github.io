
import { NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';

import { useState,  useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { PageContext } from '../context/PageContext';

import '../scss/components/Navbar.scss';

function Navbar() {
  const { carts } = useContext(CartContext);
  const { currentPage, isDesktop, updateTheme } = useContext(PageContext);
  const [navState, setNavState] = useState("closed");

  function updateNavState(e) {
    e.preventDefault();
    navState == "closed"
      ? setNavState("open")
      : setNavState("closed");
  }

  return (
    <header className="Navbar">
      <div className="container">
        <div className="logo">
          SamLi Thrift
        </div>
        <nav className={navState}>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/shop">Shop</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
            {carts.length > 0 && <li>
              <NavLink to="/cart">Cart</NavLink>
            </li>}
          </ul>
        </nav>
        <SearchBar classNames={["headerVersion"]}/>
        <div className="others">
          <button className="theme-btn" onClick={(e)=>{
            e.preventDefault();
            updateTheme();
          }}><span className="icon-sun"></span></button>
          <button
            className="menu-btn"
            onClick={(e)=>updateNavState(e)}
          >
            {navState == 'closed'?<span className="icon-menu"></span>:<span className="icon-close"></span>}
            </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar;