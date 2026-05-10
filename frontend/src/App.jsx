import React from 'react'

import Navbar from './components/Navbar'

import Footer from './components/Footer'

import { Routes, Route } from 'react-router-dom'

import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'


// Pages

import Home from './pages/Home'

import Professors from './pages/Professors'

import Login from './pages/Login'

import About from './pages/About'

import Contact from './pages/Contact'

import Appointment from './pages/Appointment'

import MyAppointments from './pages/MyAppointments'

import MyProfile from './pages/MyProfile'

import Verify from './pages/Verify'

import Browse from './pages/Browse'


const App = () => {

  return (

    <div className='mx-4 sm:mx-[10%]'>

      {/* Toast */}

      <ToastContainer />

      {/* Navbar */}

      <Navbar />

      {/* Routes */}

      <Routes>

        {/* Home */}

        <Route
          path='/'
          element={<Home />}
        />

        {/* Professors */}

        <Route
          path='/professors'
          element={<Professors />}
        />

        <Route
          path='/professors/:speciality'
          element={<Professors />}
        />

        {/* Login */}

        <Route
          path='/login'
          element={<Login />}
        />

        {/* About */}

        <Route
          path='/about'
          element={<About />}
        />

        {/* Contact */}

        <Route
          path='/contact'
          element={<Contact />}
        />

        {/* Appointment */}

        <Route
          path='/appointment/:professorId'
          element={<Appointment />}
        />

        {/* My Appointments */}

        <Route
          path='/my-appointments'
          element={<MyAppointments />}
        />

        {/* My Profile */}

        <Route
          path='/my-profile'
          element={<MyProfile />}
        />

        {/* Payment Verify */}

        <Route
          path='/verify'
          element={<Verify />}
        />

        {/* Browse Feed */}

        <Route
          path='/browse'
          element={<Browse />}
        />

      </Routes>

      {/* Footer */}

      <Footer />

    </div>
  )
}

export default App