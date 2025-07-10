import React from 'react'
import Sidebar from './Sidebar'

const TrainingView = () => {
  return (
    <div className="flex h-screen">
        <Sidebar/>
        <section className='w-full p-6 text-black space-y-8'>
          <div>
        <h2 className="text-2xl font-bold">CAPACITACIONES</h2>
        <p className="text-sm text-gray-600">GRACIAS POR TU SERVICIO</p>
      </div>
        </section>
    </div>
  )
}

export default TrainingView