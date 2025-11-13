import React from 'react'
// import { Button } from 'bootstrap'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const Navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("Token");
    Navigate('/login')
  }


  return (
    <div className='header'>
      <h3>Gramin Chatbot</h3>

      <ul>
      {localStorage.getItem("Token") ?
      (
        <>

          <li>
            {localStorage.getItem("isAdmin") ==="admin"?
            (<Link to ="/addfaq" className='nav-btn'>Post FAQ</Link>)
            :("")}
           <button className="nav-btn" onClick={handleLogout}>Logout</button>
            
          </li>
        </>
      ):
        (
        <>
        <li className='ms-auto'>
          <Link to="/signup" className='nav-btn ms-auto'>Signup</Link>
        
          <Link to="/login" className='nav-btn ms-auto'>Login</Link>
        </li>
        
        </>
        )}


      </ul>
    </div>
  )
}

export default Navbar
