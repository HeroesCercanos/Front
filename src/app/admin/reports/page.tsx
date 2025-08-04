import AdminReports from '@/components/adminDashboard/AdminReports/AdminReports'
import AuthProtected from '@/components/authProtected/authProtected'
import React from 'react'

const reports = () => {
  return (
    <div>
      <AuthProtected>
       <AdminReports/> 
       </AuthProtected>
    </div>
  )
}

export default reports