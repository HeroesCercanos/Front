import Sidebar from '@/components/adminDashboard/Sidebar'
import UserManagmentView from '@/components/adminDashboard/UserManagmentView'
import AuthProtected from '@/components/authProtected/authProtected'
import React from 'react'

const users = () => {
  return (
    <AuthProtected>
    <div> 
        <UserManagmentView/>
    </div>
    </AuthProtected>
  )
}

export default users