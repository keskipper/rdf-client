import React from 'react'

function Footer() {
  function getYear(){
    const yr = new Date().getFullYear();
    return yr;
  }

  return (
    <div className="footer-wrapper">
        <div className="footer-content">
            Copyright &copy; {getYear()} Katherine Skipper
        </div>
    </div>
  )
}

export default Footer