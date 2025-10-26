import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './Layout'
import Dashboard from './pages/Dashboard'
import Fuel from './pages/Fuel'
import VehicleProfile from './pages/VehicleProfile'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/fuel" element={<Fuel />} />
        <Route path="/vehicle" element={<VehicleProfile />} />
      </Routes>
    </Layout>
  )
}

export default App