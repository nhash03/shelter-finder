import React, { useState } from "react"
import './header.css';

function Header ()  {
  
  return (
    <header>
      
      <nav>

        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/About">About</a></li>
          <li><a href="/Donate">Donate</a></li>
          <li><a href="/">Contact</a></li>
        </ul>
      </nav>
      <form>
        <button>Login</button>
      </form>
    </header>
  )
}

export default Header
