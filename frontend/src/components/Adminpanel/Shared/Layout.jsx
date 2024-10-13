import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Adminheader from './Adminheader'

function Layout() {
    return (
        <div className='flex flex-row w-screen h-screen overflow-hidden'>
            <Sidebar />
            <div className='flex-1'>
                <Adminheader/>
                <div className='p-4'>{<Outlet />}</div>
            </div>

        </div>
    )
}

export default Layout