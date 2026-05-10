import React, { useContext } from 'react'

import { ProfessorContext } from './context/ProfessorContext'
import { AdminContext } from './context/AdminContext'

import {
  Route,
  Routes,
  Navigate
} from 'react-router-dom'

import {
  ToastContainer
} from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

/* ---------------- Admin Pages ---------------- */

import Dashboard from './pages/Admin/Dashboard'
import AllAppointments from './pages/Admin/AllAppointments'
import AddProfessor from './pages/Admin/AddProfessor'
import ProfessorsList from './pages/Admin/ProfessorsList'
import Analytics from './pages/Admin/Analytics'

/* ---------------- Professor Pages ---------------- */

import ProfessorAppointments from './pages/Professor/ProfessorAppointments'
import ProfessorDashboard from './pages/Professor/ProfessorDashboard'
import ProfessorProfile from './pages/Professor/ProfessorProfile'
import ProfessorPosts from './pages/Professor/ProfessorPosts'

/* ---------------- Login ---------------- */

import Login from './pages/Login'

const App = () => {

  const { pToken } =
    useContext(ProfessorContext)

  const { aToken } =
    useContext(AdminContext)

  return pToken || aToken ? (

    <div className='bg-[#F8F9FD] min-h-screen'>

      <ToastContainer />

      <Navbar />

      <div className='flex items-start'>

        <Sidebar />

        <div className='flex-1 h-screen overflow-y-scroll'>

          <Routes>

            {/* Default Route */}
            <Route
              path='/'
              element={
                aToken
                  ? <Navigate to='/admin-dashboard' />
                  : <Navigate to='/professor-dashboard' />
              }
            />

            {/* ---------------- Admin Routes ---------------- */}

            <Route
              path='/admin-dashboard'
              element={<Dashboard />}
            />

            <Route
              path='/all-appointments'
              element={<AllAppointments />}
            />

            <Route
              path='/add-professor'
              element={<AddProfessor />}
            />

            <Route
              path='/professors-list'
              element={<ProfessorsList />}
            />

            <Route
              path='/analytics'
              element={<Analytics />}
            />

            {/* ---------------- Professor Routes ---------------- */}

            <Route
              path='/professor-dashboard'
              element={<ProfessorDashboard />}
            />

            <Route
              path='/professor-appointments'
              element={<ProfessorAppointments />}
            />

            <Route
              path='/professor-profile'
              element={<ProfessorProfile />}
            />

            <Route
              path='/professor-posts'
              element={<ProfessorPosts />}
            />

          </Routes>

        </div>

      </div>

    </div>

  ) : (

    <>
      <ToastContainer />
      <Login />
    </>

  )
}

export default App