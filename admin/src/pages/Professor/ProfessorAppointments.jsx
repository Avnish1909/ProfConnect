import React, {
    useContext,
    useEffect
} from 'react';

import { ProfessorContext } from '../../context/ProfessorContext';

import { AppContext } from '../../context/AppContext';

import { assets } from '../../assets/assets';

const ProfessorAppointments = () => {

    const {

        pToken,

        appointments,

        getAppointments,

        cancelAppointment,

        completeAppointment

    } = useContext(ProfessorContext);



    const {

        slotDateFormat,

        calculateAge,

        currency

    } = useContext(AppContext);



    useEffect(() => {

        if (pToken) {

            getAppointments();
        }

    }, [pToken]);



    return (

        <div className='w-full max-w-6xl m-5'>

            <p className='mb-3 text-lg font-medium text-gray-700'>

                All Appointments

            </p>



            <div className='bg-white border rounded-xl text-sm max-h-[80vh] overflow-y-scroll shadow-sm'>



                {/* Header */}

                <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b bg-gray-50 font-medium text-gray-600'>

                    <p>#</p>

                    <p>Student</p>

                    {/* <p>Payment</p> */}

                    {/* <p>Age</p> */}

                    <p>Date & Time</p>

                    {/* <p>Fees</p> */}

                    <p></p>

                    <p>Action</p>

                </div>



                {/* Appointment List */}

                {

                    appointments.length > 0 ? (

                        appointments.map((item, index) => (

                            <div
                                key={item._id || index}
                                className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50 transition-all'
                            >

                                {/* Index */}

                                <p className='max-sm:hidden'>

                                    {index + 1}

                                </p>



                                {/* Student */}

                                <div className='flex items-center gap-2'>

                                    <img
                                        src={item.userData?.image}
                                        className='w-8 h-8 rounded-full object-cover'
                                        alt="Student"
                                    />

                                    <p>

                                        {item.userData?.name}

                                    </p>

                                </div>



                                {/* Payment */}

                                {/* <div>

                                    <p className='text-xs inline border border-primary px-2 py-1 rounded-full'>

                                        {
                                            item.payment
                                                ? 'Online'
                                                : 'Offline'
                                        }

                                    </p>

                                </div> */}



                                {/* Age */}

                                {/* <p className='max-sm:hidden'>

                                    {
                                        item.userData?.dob &&
                                        item.userData?.dob !== "Not Selected"

                                            ? calculateAge(
                                                item.userData.dob
                                            )

                                            : 'N/A'
                                    }

                                </p> */}



                                {/* Slot */}

                                <p>

                                    {
                                        slotDateFormat(
                                            item.slotDate
                                        )
                                    },

                                    {" "}

                                    {item.slotTime}

                                </p>



                                {/* Fees */}

                                {/* <p>

                                    {currency}

                                    {item.amount}

                                </p> */}


                                <p></p>
                                {/* Actions */}

                                {

                                    item.cancelled ? (

                                        <p className='text-red-400 text-xs font-medium'>

                                            Cancelled

                                        </p>

                                    ) : item.isCompleted ? (

                                        <p className='text-green-500 text-xs font-medium'>

                                            Completed

                                        </p>

                                    ) : (

                                        <div className='flex items-center'>

                                            <img
                                                onClick={() =>
                                                    cancelAppointment(
                                                        item._id
                                                    )
                                                }
                                                className='w-10 cursor-pointer'
                                                src={assets.cancel_icon}
                                                alt="Cancel"
                                            />

                                            <img
                                                onClick={() =>
                                                    completeAppointment(
                                                        item._id
                                                    )
                                                }
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

                            No Appointments Found

                        </p>
                    )
                }

            </div>

        </div>
    );
};

export default ProfessorAppointments;