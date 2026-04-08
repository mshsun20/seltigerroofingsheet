import React from 'react'
import Topbar from './Topbar'
import Navbar from './Navbar'

const Header = () => {
  return (
    <div className='header'>
      <Topbar />
      <Navbar />
    </div>
  )
}

export default Header