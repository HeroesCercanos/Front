import AdminCampaignList from '@/components/adminDashboard/AdminCampaignsList'
import AuthProtected from '@/components/authProtected/authProtected'
import React from 'react'

const campaigns = () => {
  return (
    <AuthProtected>
    <div>
        <AdminCampaignList/>
    </div>
    </AuthProtected>
  )
}

export default campaigns