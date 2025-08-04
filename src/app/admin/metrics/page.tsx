import MetricsView from '@/components/adminDashboard/metrics/MetricsView'
import AuthProtected from '@/components/authProtected/authProtected';
import React from 'react'

const page = () => {
  return (
    <div>
      <AuthProtected>
      <MetricsView/>
      </AuthProtected>
    </div>
  )
}

export default page;