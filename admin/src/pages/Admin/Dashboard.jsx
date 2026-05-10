import React, {
    useContext,
    useEffect
} from 'react';

import { assets } from '../../assets/assets';

import { AdminContext } from '../../context/AdminContext';

import { AppContext } from '../../context/AppContext';

const Dashboard = () => {

    const {

        aToken,

        getDashData,

        cancelAppointment,

        dashData

    } = useContext(AdminContext);



    const {

        slotDateFormat

    } = useContext(AppContext);



    useEffect(() => {

        if (aToken) {

            getDashData();
        }

    }, [aToken]);



    if (!dashData) {

        return (

            <div className='m-5'>

                <p className='text-gray-500'>

                    Loading Dashboard...

                </p>

            </div>
        );
    }



    return (

        <div className='m-5 w-full'>



            {/* Top Cards */}

            <div className='flex flex-wrap gap-4'>



                {/* Professors */}

                <div className='flex items-center gap-3 bg-white p-5 min-w-52 rounded-xl border border-gray-100 shadow-sm cursor-pointer hover:scale-105 transition-all duration-300'>

                    <img
                        className='w-14'
                        src={assets.doctor_icon}
                        alt="Professors"
                    />

                    <div>

                        <p className='text-2xl font-semibold text-gray-700'>

                            {dashData.professors}

                        </p>

                        <p className='text-gray-400 text-sm'>

                            Professors

                        </p>

                    </div>

                </div>



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



                {/* Heading */}

                <div className='flex items-center gap-3 px-5 py-4 border-b bg-gray-50'>

                    <img
                        src={assets.list_icon}
                        alt="List"
                    />

                    <p className='font-semibold text-gray-700'>

                        Latest Bookings

                    </p>

                </div>



                {/* Appointment List */}

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

                                        {/* Professor Image */}

                                        <img
                                            className='rounded-full w-12 h-12 object-cover bg-gray-200'
                                            src={item.professorData?.image}
                                            alt="Professor"
                                        />



                                        {/* Appointment Info */}

                                        <div className='flex-1 text-sm'>

                                            <p className='text-gray-800 font-semibold'>

                                                {item.professorData?.name}

                                            </p>

                                            <p className='text-gray-500 mt-1'>

                                                Booking on {" "}

                                                {
                                                    slotDateFormat(
                                                        item.slotDate
                                                    )
                                                }

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
    );
};

export default Dashboard;