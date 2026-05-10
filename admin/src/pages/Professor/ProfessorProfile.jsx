import React, { useContext, useEffect, useState } from 'react'
import { ProfessorContext } from '../../context/ProfessorContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const ProfessorProfile = () => {

  const {
    pToken,
    profileData,
    setProfileData,
    getProfileData
  } = useContext(ProfessorContext)

  const {
    currency,
    backendUrl
  } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)
  const [loading, setLoading] = useState(false)

  const updateProfile = async () => {

    try {

      setLoading(true)

      const updateData = {
        fees: profileData.fees,
        address: profileData.address,
        available: profileData.available
      }

      const { data } = await axios.post(

        `${backendUrl}/api/professor/update-profile`,

        updateData,

        {
          headers: {
            ptoken: pToken
          }
        }
      )

      if (data.success) {

        toast.success(data.message)

        setIsEdit(false)

        getProfileData()

      } else {

        toast.error(data.message)
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

    if (pToken) {
      getProfileData()
    }

  }, [pToken])

  if (!profileData) {
    return (
      <div className='m-5'>
        <p className='text-gray-500'>
          Loading Profile...
        </p>
      </div>
    )
  }

  return (

    <div className='m-5'>

      <div className='flex flex-col gap-4'>

        {/* Profile Image */}
        <div>

          <img
            className='bg-primary/80 w-full sm:max-w-64 rounded-lg'
            src={profileData.image}
            alt="Professor"
          />

        </div>

        {/* Profile Details */}
        <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white shadow-sm'>

          {/* Name */}
          <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>
            {profileData.name}
          </p>

          {/* Qualification */}
          <div className='flex items-center gap-2 mt-1 text-gray-600'>

            <p>
              {profileData.degree} - {profileData.speciality}
            </p>

            <button className='py-0.5 px-2 border text-xs rounded-full'>
              {profileData.experience}
            </button>

          </div>

          {/* About */}
          <div>

            <p className='flex items-center gap-1 text-sm font-medium text-[#262626] mt-5'>
              About :
            </p>

            <div className='text-sm text-gray-600 max-w-[700px] mt-2'>

              <p>
                {profileData.about}
              </p>

            </div>

          </div>

          {/* Fees */}
          <p className='text-gray-600 font-medium mt-5'>

            Consultation Fee :

            <span className='text-gray-800 ml-2'>

              {
                isEdit ? (

                  <input
                    type='number'
                    value={profileData.fees}
                    onChange={(e) =>
                      setProfileData(prev => ({
                        ...prev,
                        fees: e.target.value
                      }))
                    }
                    className='border rounded px-2 py-1 ml-2'
                  />

                ) : (

                  `${currency} ${profileData.fees}`

                )
              }

            </span>

          </p>

          {/* Address */}
          <div className='flex gap-2 py-4'>

            <p className='font-medium text-gray-700'>
              Office :
            </p>

            <div className='text-sm text-gray-600'>

              {
                isEdit ? (

                  <div className='flex flex-col gap-2'>

                    <input
                      type='text'
                      value={profileData.address?.line1}
                      onChange={(e) =>
                        setProfileData(prev => ({
                          ...prev,
                          address: {
                            ...prev.address,
                            line1: e.target.value
                          }
                        }))
                      }
                      className='border rounded px-2 py-1'
                    />

                    <input
                      type='text'
                      value={profileData.address?.line2}
                      onChange={(e) =>
                        setProfileData(prev => ({
                          ...prev,
                          address: {
                            ...prev.address,
                            line2: e.target.value
                          }
                        }))
                      }
                      className='border rounded px-2 py-1'
                    />

                  </div>

                ) : (

                  <p>
                    {profileData.address?.line1}
                    <br />
                    {profileData.address?.line2}
                  </p>

                )
              }

            </div>

          </div>

          {/* Availability */}
          <div className='flex gap-2 items-center pt-2'>

            <input
              type="checkbox"
              checked={profileData.available}
              onChange={() =>
                isEdit &&
                setProfileData(prev => ({
                  ...prev,
                  available: !prev.available
                }))
              }
            />

            <label>
              Available for appointments
            </label>

          </div>

          {/* Buttons */}
          {
            isEdit ? (

              <button
                onClick={updateProfile}
                disabled={loading}
                className='px-6 py-2 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all disabled:opacity-50'
              >

                {
                  loading
                    ? "Saving..."
                    : "Save"
                }

              </button>

            ) : (

              <button
                onClick={() => setIsEdit(true)}
                className='px-6 py-2 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'
              >
                Edit Profile
              </button>

            )
          }

        </div>

      </div>

    </div>
  )
}

export default ProfessorProfile