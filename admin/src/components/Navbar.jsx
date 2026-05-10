import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { ProfessorContext } from '../context/ProfessorContext'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const { pToken, setPToken } = useContext(ProfessorContext)
  const { aToken, setAToken } = useContext(AdminContext)

  const navigate = useNavigate()

  const logout = () => {

    navigate('/')

    pToken && setPToken('')
    pToken && localStorage.removeItem('pToken')

    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
  }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>

      <div className='flex items-center gap-2 text-xs'>

        <p className='text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight'>
  Prof<span className='text-primary'>Connect</span>
</p>

        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>
          {aToken ? 'Admin' : 'Professor'}
        </p>

      </div>

      <button
        onClick={() => logout()}
        className='bg-primary text-white text-sm px-10 py-2 rounded-full'
      >
        Logout
      </button>

    </div>
  )
}

export default Navbar