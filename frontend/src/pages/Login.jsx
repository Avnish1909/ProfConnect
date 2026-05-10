import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [state, setState] = useState('Sign Up')

  const [name, setName] = useState('')

  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const {
    backendUrl,
    token,
    setToken,
    loadUserProfileData
  } = useContext(AppContext)

  const onSubmitHandler = async (event) => {

    event.preventDefault()

    try {

      setLoading(true)

      // SIGN UP

      if (state === 'Sign Up') {

        const { data } = await axios.post(

          backendUrl + '/api/user/register',

          {
            name,
            email,
            password
          }

        )

        if (data.success) {

          // Save token

          localStorage.setItem('token', data.token)

          // Load profile immediately

          await loadUserProfileData(data.token)

          // Update token state

          setToken(data.token)

          toast.success('Account Created Successfully')

          navigate('/')

        } else {

          toast.error(data.message)

        }

      }

      // LOGIN

      else {

        const { data } = await axios.post(

          backendUrl + '/api/user/login',

          {
            email,
            password
          }

        )

        if (data.success) {

          // Save token

          localStorage.setItem('token', data.token)

          // Load profile immediately

          await loadUserProfileData(data.token)

          // Update token state

          setToken(data.token)

          toast.success('Login Successful')

          navigate('/')

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

  useEffect(() => {

    if (token) {

      navigate('/')

    }

  }, [token])

  return (

    <form
      onSubmit={onSubmitHandler}
      className='min-h-[80vh] flex items-center'
    >

      <div className='flex flex-col gap-4 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-2xl text-[#5E5E5E] text-sm shadow-lg bg-white'>

        {/* Heading */}

        <p className='text-2xl font-semibold'>

          {
            state === 'Sign Up'
              ? 'Create Account'
              : 'Login'
          }

        </p>

        <p className='text-gray-500'>

          Please {

            state === 'Sign Up'
              ? 'sign up'
              : 'log in'

          } to book appointments with professors

        </p>

        {/* Name */}

        {
          state === 'Sign Up' && (

            <div className='w-full'>

              <p>Full Name</p>

              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className='border border-[#DADADA] rounded-lg w-full p-2.5 mt-1 outline-primary'
                type="text"
                placeholder='Enter your name'
                required
              />

            </div>

          )
        }

        {/* Email */}

        <div className='w-full'>

          <p>Email</p>

          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className='border border-[#DADADA] rounded-lg w-full p-2.5 mt-1 outline-primary'
            type="email"
            placeholder='Enter your email'
            required
          />

        </div>

        {/* Password */}

        <div className='w-full'>

          <p>Password</p>

          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className='border border-[#DADADA] rounded-lg w-full p-2.5 mt-1 outline-primary'
            type="password"
            placeholder='Enter your password'
            required
          />

        </div>

        {/* Button */}

        <button
          disabled={loading}
          className='bg-primary text-white w-full py-2.5 rounded-lg text-base hover:opacity-90 transition-all disabled:opacity-50'
        >

          {
            loading
              ? 'Please wait...'
              : state === 'Sign Up'
                ? 'Create Account'
                : 'Login'
          }

        </button>

        {/* Toggle */}

        {
          state === 'Sign Up'

            ? (

              <p>

                Already have an account?

                <span
                  onClick={() => setState('Login')}
                  className='text-primary underline cursor-pointer ml-1'
                >

                  Login here

                </span>

              </p>

            )

            : (

              <p>

                Create a new account?

                <span
                  onClick={() => setState('Sign Up')}
                  className='text-primary underline cursor-pointer ml-1'
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