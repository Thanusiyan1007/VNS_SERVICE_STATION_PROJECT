
import React from 'react'

import { Outlet } from 'react-router-dom'
import NavbarMain from '../components/NavbarMain.jsx'
import CameraSearch from '../components/chatBot/chatWithBot.jsx'

function Layoutmain() {
  return (
    <div>
        <NavbarMain/>
        <Outlet/>
        <CameraSearch/>
    </div>
  )
}

export default Layoutmain