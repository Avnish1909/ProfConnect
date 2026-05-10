import React, { useContext, useEffect } from 'react'
import { ProfessorContext } from '../../context/ProfessorContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const ProfessorDashboard = () => {

  const {
    pToken,
    dashData,
    getDashData,
    cancelAppointment,
    completeAppointment
  } = useContext(ProfessorContext)

  const {
    slotDateFormat,
    currency
  } = useContext(AppContext)

  useEffect(() => {
    if (pToken) {
      getDashData()
    }
  }, [pToken])

  if (!dashData) {
    return (
      <div className='m-5'>
        <p className='text-gray-500'>Loading Dashboard...</p>
      </div>
    )
  }

  return (

    <div className='m-5 w-full'>

      {/* Top Cards */}
      <div className='flex flex-wrap gap-4'>

        {/* Earnings */}
        {/* <div className='flex items-center gap-3 bg-white p-5 min-w-52 rounded-xl border border-gray-100 shadow-sm cursor-pointer hover:scale-105 transition-all duration-300'>

          <img
            className='w-14'
            src={assets.earning_icon}
            alt="Earnings"
          />

          <div>
            <p className='text-2xl font-semibold text-gray-700'>
              {currency} {dashData.earnings}
            </p>

            <p className='text-gray-400 text-sm'>
              Earnings
            </p>
          </div>

        </div> */}

        {/* Appointments */}
        <div className='flex items-center gap-3 bg-white p-5 min-w-52 rounded-xl border border-gray-100 shadow-sm cursor-pointer hover:scale-105 transition-all duration-300'>

          <img
            className='w-14'
            src={assets.appointments_icon}
            alt="Appointments"
          />

          <div>
            <p className='text-2xl font-semibold text-gray-700'>
              {dashData.appointments}
            </p>

            <p className='text-gray-400 text-sm'>
              Appointments
            </p>
          </div>

        </div>

        {/* Students */}
        <div className='flex items-center gap-3 bg-white p-5 min-w-52 rounded-xl border border-gray-100 shadow-sm cursor-pointer hover:scale-105 transition-all duration-300'>

          <img
            className='w-14'
            src={assets.patients_icon}
            alt="Students"
          />

          <div>
            <p className='text-2xl font-semibold text-gray-700'>
              {dashData.students}
            </p>

            <p className='text-gray-400 text-sm'>
              Students
            </p>
          </div>

        </div>

      </div>

      {/* Latest Bookings */}
      <div className='bg-white rounded-xl shadow-sm border mt-10 overflow-hidden'>

        <div className='flex items-center gap-3 px-5 py-4 border-b bg-gray-50'>

          <img
            src={assets.list_icon}
            alt="List"
          />

          <p className='font-semibold text-gray-700'>
            Latest Bookings
          </p>

        </div>

        <div>

          {
            dashData.latestAppointments?.length > 0 ? (

              dashData.latestAppointments
                .slice(0, 5)
                .map((item, index) => (

                  <div
                    key={item._id || index}
                    className='flex items-center px-6 py-4 gap-4 border-b last:border-b-0 hover:bg-gray-50 transition-all'
                  >

                    {/* Student Image */}
                    <img
                      className='rounded-full w-10 h-10 object-cover'
                      src={item.userData?.image}
                      alt="Student"
                    />

                    {/* Student Info */}
                    <div className='flex-1 text-sm'>

                      <p className='text-gray-800 font-medium'>
                        {item.userData?.name}
                      </p>

                      <p className='text-gray-500 mt-1'>
                        Booking on {slotDateFormat(item.slotDate)}
                      </p>

                    </div>

                    {/* Status */}
                    {
                      item.cancelled ? (

                        <p className='text-red-400 text-xs font-semibold'>
                          Cancelled
                        </p>

                      ) : item.isCompleted ? (

                        <p className='text-green-500 text-xs font-semibold'>
                          Completed
                        </p>

                      ) : (

                        <div className='flex items-center'>

                          <img
                            onClick={() => cancelAppointment(item._id)}
                            className='w-10 cursor-pointer'
                            src={assets.cancel_icon}
                            alt="Cancel"
                          />

                          <img
                            onClick={() => completeAppointment(item._id)}
                            className='w-10 cursor-pointer'
                            src={assets.tick_icon}
                            alt="Complete"
                          />

                        </div>

                      )
                    }

                  </div>

                ))

            ) : (

              <p className='p-5 text-center text-gray-500'>
                No Recent Appointments
              </p>

            )
          }

        </div>

      </div>

    </div>

  )
}

export default ProfessorDashboard