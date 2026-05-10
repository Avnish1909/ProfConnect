import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const MyAppointments = () => {

    const { backendUrl, token } = useContext(AppContext)

    const navigate = useNavigate()

    const [appointments, setAppointments] = useState([])

    const [payment, setPayment] = useState('')

    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ]

    // Format Date

    const slotDateFormat = (slotDate) => {

        const dateArray = slotDate.split('_')

        return (

            dateArray[0] +

            " " +

            months[Number(dateArray[1]) - 1] +

            " " +

            dateArray[2]

        )

    }

    // Get User Appointments

    const getUserAppointments = async () => {

        try {

            const { data } = await axios.get(

                backendUrl + '/api/user/appointments',

                {
                    headers: { token }
                }

            )

            if (data.success) {

                setAppointments(data.appointments.reverse())

            } else {

                toast.error(data.message)

            }

        } catch (error) {

            console.log(error)

            toast.error(
                error.response?.data?.message ||
                error.message
            )

        }

    }

    // Cancel Appointment

    const cancelAppointment = async (appointmentId) => {

        try {

            const { data } = await axios.post(

                backendUrl + '/api/user/cancel-appointment',

                { appointmentId },

                {
                    headers: { token }
                }

            )

            if (data.success) {

                toast.success(data.message)

                getUserAppointments()

            } else {

                toast.error(data.message)

            }

        } catch (error) {

            console.log(error)

            toast.error(
                error.response?.data?.message ||
                error.message
            )

        }

    }

    // Razorpay Initialize

    const initPay = (order) => {

        const options = {

            key: import.meta.env.VITE_RAZORPAY_KEY_ID,

            amount: order.amount,

            currency: order.currency,

            name: 'Professor Appointment Payment',

            description: 'Professor Appointment Payment',

            order_id: order.id,

            receipt: order.receipt,

            handler: async (response) => {

                try {

                    const { data } = await axios.post(

                        backendUrl + "/api/user/verify-razorpay",

                        response,

                        {
                            headers: { token }
                        }

                    )

                    if (data.success) {

                        toast.success('Payment Successful')

                        getUserAppointments()

                        navigate('/my-appointments')

                    } else {

                        toast.error(data.message)

                    }

                } catch (error) {

                    console.log(error)

                    toast.error(
                        error.response?.data?.message ||
                        error.message
                    )

                }

            }

        }

        const rzp = new window.Razorpay(options)

        rzp.open()

    }

    // Razorpay Payment

    const appointmentRazorpay = async (appointmentId) => {

        try {

            const { data } = await axios.post(

                backendUrl + '/api/user/payment-razorpay',

                { appointmentId },

                {
                    headers: { token }
                }

            )

            if (data.success) {

                initPay(data.order)

            } else {

                toast.error(data.message)

            }

        } catch (error) {

            console.log(error)

            toast.error(
                error.response?.data?.message ||
                error.message
            )

        }

    }

    // Stripe Payment

    const appointmentStripe = async (appointmentId) => {

        try {

            const { data } = await axios.post(

                backendUrl + '/api/user/payment-stripe',

                { appointmentId },

                {
                    headers: { token }
                }

            )

            if (data.success) {

                const { session_url } = data

                window.location.replace(session_url)

            } else {

                toast.error(data.message)

            }

        } catch (error) {

            console.log(error)

            toast.error(
                error.response?.data?.message ||
                error.message
            )

        }

    }

    useEffect(() => {

        if (token) {

            getUserAppointments()

        }

    }, [token])

    return (

        <div>

            <p className='pb-3 mt-12 text-lg font-medium text-gray-600 border-b'>

                My Appointments

            </p>

            <div>

                {
                    appointments.length === 0 ? (

                        <p className='text-gray-500 mt-6'>
                            No appointments booked yet.
                        </p>

                    ) : (

                        appointments.map((item) => (

                            <div
                                key={item._id}
                                className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b'
                            >

                                {/* Professor Image */}

                                <div>

                                    <img
                                        className='w-36 h-36 object-cover bg-[#EAEFFF] rounded-lg'
                                        src={item.professorData?.image}
                                        alt=""
                                    />

                                </div>

                                {/* Appointment Details */}

                                <div className='flex-1 text-sm text-[#5E5E5E]'>

                                    <p className='text-[#262626] text-base font-semibold'>

                                        {item.professorData?.name}

                                    </p>

                                    <p>

                                        {item.professorData?.speciality}

                                    </p>

                                    <p className='text-[#464646] font-medium mt-1'>

                                        Cabin:

                                    </p>

                                    <p>

                                        {item.professorData?.address?.line1}

                                    </p>

                                    <p>

                                        {item.professorData?.address?.line2}

                                    </p>

                                    <p className='mt-1'>

                                        <span className='text-sm text-[#3C3C3C] font-medium'>

                                            Date & Time:

                                        </span>

                                        {" "}

                                        {slotDateFormat(item.slotDate)}

                                        {" | "}

                                        {item.slotTime}

                                    </p>

                                </div>

                                <div></div>

                                {/* Buttons */}

                                <div className='flex flex-col gap-2 justify-end text-sm text-center'>

                                   
                                    {
                                        !item.cancelled &&
                                        !item.isCompleted && (

                                            <button
                                                onClick={() => cancelAppointment(item._id)}
                                                className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'
                                            >

                                                Cancel Appointment

                                            </button>

                                        )
                                    }

                                    {
                                        item.cancelled &&
                                        !item.isCompleted && (

                                            <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>

                                                Appointment Cancelled

                                            </button>

                                        )
                                    }

                                </div>

                            </div>

                        ))
                    )
                }

            </div>

        </div>

    )

}

export default MyAppointments