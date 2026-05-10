import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

  const navigate = useNavigate()

  const [showMenu, setShowMenu] = useState(false)

  const {
    token,
    setToken,
    userData,
    setUserData
  } = useContext(AppContext)

  const logout = () => {

    localStorage.removeItem('token')

    setToken('')

    setUserData(false)

    navigate('/login')

  }

  return (

    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-[#ADADAD]'>
      <p className='text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight'>
  Prof<span className='text-primary'>Connect</span>
</p>
      {/* Logo */}

      {/* <img
        onClick={() => navigate('/')}
        className='w-44 cursor-pointer'
        src={assets.logo}
        alt="ProfConnect"
      /> */}

      {/* Desktop Menu */}

      <ul className='md:flex items-start gap-5 font-medium hidden'>

  <NavLink to='/'>
    {({ isActive }) => (
      <li className={`py-1 ${isActive ? 'border-b-2 border-primary text-primary' : ''}`}>
        HOME
      </li>
    )}
  </NavLink>

  <NavLink to='/professors'>
    {({ isActive }) => (
      <li className={`py-1 ${isActive ? 'border-b-2 border-primary text-primary' : ''}`}>
        ALL PROFESSORS
      </li>
    )}
  </NavLink>

  <NavLink to='/about'>
    {({ isActive }) => (
      <li className={`py-1 ${isActive ? 'border-b-2 border-primary text-primary' : ''}`}>
        ABOUT
      </li>
    )}
  </NavLink>

  <NavLink to='/contact'>
    {({ isActive }) => (
      <li className={`py-1 ${isActive ? 'border-b-2 border-primary text-primary' : ''}`}>
        CONTACT
      </li>
    )}
  </NavLink>

  <NavLink to='/browse'>
    {({ isActive }) => (
      <li className={`py-1 ${isActive ? 'border-b-2 border-primary text-primary' : ''}`}>
        BROWSE
      </li>
    )}
  </NavLink>
  <NavLink
  to='https://profconnect-2.onrender.com'
  target='_blank'
>
  <button
    className='border border-primary text-primary px-5 py-2 rounded-full hover:bg-primary hover:text-white transition-all hidden md:block'
  >
    Admin Login
  </button>
</NavLink>

</ul>

      {/* Right Side */}
      

      <div className='flex items-center gap-4'>

        {
          token && userData ? (

            <div className='flex items-center gap-2 cursor-pointer group relative'>

              <img
                className='w-8 h-8 rounded-full object-cover'
                src={userData.image}
                alt=""
              />

              <img
                className='w-2.5'
                src={assets.dropdown_icon}
                alt=""
              />

              {/* Dropdown */}

              <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>

                <div className='min-w-48 bg-gray-50 rounded flex flex-col gap-4 p-4 shadow-lg'>

                  <p
                    onClick={() => navigate('/my-profile')}
                    className='hover:text-black cursor-pointer'
                  >
                    My Profile
                  </p>

                  <p
                    onClick={() => navigate('/my-appointments')}
                    className='hover:text-black cursor-pointer'
                  >
                    My Appointments
                  </p>

                  <p
                    onClick={logout}
                    className='hover:text-black cursor-pointer'
                  >
                    Logout
                  </p>

                </div>

              </div>

            </div>

          ) : (

            <button
              onClick={() => navigate('/login')}
              className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'
            >
              Create Account
            </button>

          )
        }

        {/* Mobile Menu Button */}

        <img
          onClick={() => setShowMenu(true)}
          className='w-6 md:hidden cursor-pointer'
          src={assets.menu_icon}
          alt=""
        />

        {/* Mobile Menu */}

        <div className={`md:hidden ${
          showMenu ? 'fixed w-full' : 'h-0 w-0'
        } right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>

          <div className='flex items-center justify-between px-5 py-6'>

            <img
              src={assets.logo}
              className='w-36'
              alt=""
            />

            <img
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              className='w-7 cursor-pointer'
              alt=""
            />

          </div>

          <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>

            <NavLink
              onClick={() => setShowMenu(false)}
              to='/'
            >
              <p className='px-4 py-2 rounded inline-block'>
                HOME
              </p>
            </NavLink>

            <NavLink
              onClick={() => setShowMenu(false)}
              to='/professors'
            >
              <p className='px-4 py-2 rounded inline-block'>
                ALL PROFESSORS
              </p>
            </NavLink>

            <NavLink
              onClick={() => setShowMenu(false)}
              to='/about'
            >
              <p className='px-4 py-2 rounded inline-block'>
                ABOUT
              </p>
            </NavLink>

            <NavLink
              onClick={() => setShowMenu(false)}
              to='/contact'
            >
              <p className='px-4 py-2 rounded inline-block'>
                CONTACT
              </p>
            </NavLink>

            <NavLink
              onClick={() => setShowMenu(false)}
              to='/browse'
            >
              <p className='px-4 py-2 rounded inline-block'>
                BROWSE
              </p>
            </NavLink>

            <NavLink
            onClick={() => setShowMenu(false)}
            to='https://profconnect-2.onrender.com'
            target='_blank'
          >
            <p className='px-4 py-2 rounded inline-block'>
              ADMIN LOGIN
            </p>
          </NavLink>

          </ul>

        </div>

      </div>

    </div>

  )
}

export default Navbar