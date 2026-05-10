import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import {
    useNavigate,
    useSearchParams
} from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'

const Verify = () => {

    const [searchParams] = useSearchParams()

    const success =
        searchParams.get("success")

    const appointmentId =
        searchParams.get("appointmentId")

    const {
        backendUrl,
        token
    } = useContext(AppContext)

    const navigate = useNavigate()

    // Verify Stripe Payment

    const verifyStripe = async () => {

        try {

            const { data } = await axios.post(

                backendUrl + "/api/user/verify-stripe",

                {
                    success,
                    appointmentId
                },

                {
                    headers: { token }
                }

            )

            if (data.success) {

                toast.success(data.message)

            } else {

                toast.error(data.message)

            }

            navigate("/my-appointments")

        } catch (error) {

            console.log(error)

            toast.error(
                error.response?.data?.message ||
                error.message
            )

            navigate("/my-appointments")

        }

    }

    useEffect(() => {

        if (
            token &&
            appointmentId &&
            success
        ) {

            verifyStripe()

        }

    }, [token, appointmentId, success])

    return (

        <div className='min-h-[60vh] flex flex-col items-center justify-center gap-5'>

            {/* Loader */}

            <div className='w-20 h-20 border-4 border-gray-300 border-t-primary rounded-full animate-spin'></div>

            {/* Text */}

            <p className='text-gray-600 text-lg font-medium'>

                Verifying Payment...

            </p>

        </div>

    )

}

export default Verify