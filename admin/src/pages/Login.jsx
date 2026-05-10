import axios from 'axios'
import React, { useContext, useState } from 'react'

import { ProfessorContext } from '../context/ProfessorContext'
import { AdminContext } from '../context/AdminContext'

import { toast } from 'react-toastify'

const Login = () => {

  const [state, setState] = useState('Admin')

  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const { setPToken } = useContext(ProfessorContext)

  const { setAToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {

    event.preventDefault()

    try {

      setLoading(true)

      // Admin Login
      if (state === 'Admin') {

        const { data } = await axios.post(

          `${backendUrl}/api/admin/login`,

          {
            email,
            password
          }
        )

        if (data.success) {

          setAToken(data.token)

          localStorage.setItem(
            'aToken',
            data.token
          )

          toast.success(
            'Admin Login Successful'
          )

        } else {

          toast.error(data.message)
        }

      }

      // Professor Login
      else {

        const { data } = await axios.post(

          `${backendUrl}/api/professor/login`,

          {
            email,
            password
          }
        )

        if (data.success) {

          setPToken(data.token)

          localStorage.setItem(
            'pToken',
            data.token
          )

          toast.success(
            'Professor Login Successful'
          )

        } else {

          toast.error(data.message)
        }

      }

    } catch (error) {

      console.log(error)

      toast.error(
        error.response?.data?.message ||
        error.message
      )

    } finally {

      setLoading(false)
    }
  }

  return (

    <form
      onSubmit={onSubmitHandler}
      className='min-h-[80vh] flex items-center'
    >

      <div className='flex flex-col gap-4 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-2xl text-[#5E5E5E] text-sm shadow-lg bg-white'>

        {/* Heading */}
        <p className='text-2xl font-semibold m-auto'>

          <span className='text-primary'>
            {state}
          </span>

          {' '}Login

        </p>

        {/* Email */}
        <div className='w-full'>

          <p>Email</p>

          <input
            type="email"
            required
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className='border border-[#DADADA] rounded-lg w-full p-2.5 mt-1 outline-primary'
          />

        </div>

        {/* Password */}
        <div className='w-full'>

          <p>Password</p>

          <input
            type="password"
            required
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className='border border-[#DADADA] rounded-lg w-full p-2.5 mt-1 outline-primary'
          />

        </div>

        {/* Button */}
        <button
          disabled={loading}
          className='bg-primary text-white w-full py-2.5 rounded-lg text-base hover:opacity-90 transition-all disabled:opacity-50'
        >

          {
            loading
              ? 'Loading...'
              : 'Login'
          }

        </button>

        {/* Switch Login */}
        {
          state === 'Admin'
            ? (
              <p>

                Professor Login?{' '}

                <span
                  onClick={() =>
                    setState('Professor')
                  }
                  className='text-primary underline cursor-pointer'
                >
                  Click here
                </span>

              </p>
            )
            : (
              <p>

                Admin Login?{' '}

                <span
                  onClick={() =>
                    setState('Admin')
                  }
                  className='text-primary underline cursor-pointer'
                >
                  Click here
                </span>

              </p>
            )
        }

      </div>

    </form>
  )
}

export default Login