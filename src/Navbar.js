import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{display:'flex',justifyContent:'space-between',padding:"20px"}}>
        <Link style={{textDecoration:'none'}} to='/'><h1 style={{fontSize:'50px',color:'white'}}>SerieMania</h1></Link>
        <Link style={{textDecoration:'none'}} to='/search'><button><span style={{fontWeight:"bold",marginTop:"5px",fontSize:'15px'}}>Search for tv shows...</span><i className="fa-solid fa-magnifying-glass" style={{fontSize:'20px',color:'white',padding:'5px',backgroundColor:"rgb(48,48,48)",borderRadius:'5px'}}></i></button></Link>
    </nav>
  )
}

export default Navbar