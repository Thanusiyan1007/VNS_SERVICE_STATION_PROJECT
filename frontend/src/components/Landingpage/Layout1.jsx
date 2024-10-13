
import React from 'react'

import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar.jsx'
import CameraSearch from '../chatBot/chatWithBot.jsx'

function Layout1() {
  return (
    <div>
        <Navbar/>
        <Outlet/>
        <CameraSearch/>
    </div>
  )
}

export default Layout1