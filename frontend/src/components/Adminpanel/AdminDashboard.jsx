import React from 'react'
import DashboardStatusgrid from './Shared/DashboardStatusgrid'
import OderCard from './Shared/OderCard'
import TechicianGender from './Shared/TechicianGender'

function AdminDashboard() {
  return (
    <div className='flex flex-col gap-4'>
      <DashboardStatusgrid />
      <div className='flex w gap-4'>
        <OderCard />
      </div>

    </div>
  );
}

export default AdminDashboard;