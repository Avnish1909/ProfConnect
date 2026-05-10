import React, {
    useContext,
    useEffect
} from 'react';

import { AdminContext } from '../../context/AdminContext';

const ProfessorsList = () => {

    const {

        professors,

        changeAvailability,

        aToken,

        getAllProfessors

    } = useContext(AdminContext);



    useEffect(() => {

        if (aToken) {

            getAllProfessors();
        }

    }, [aToken]);



    return (

        <div className='m-5 max-h-[90vh] overflow-y-scroll'>

            <h1 className='text-lg font-medium text-gray-700'>

                All Professors

            </h1>



            <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>



                {
                    professors.length > 0 ? (

                        professors.map((item, index) => (

                            <div
                                key={item._id || index}
                                className='border border-[#C9D8FF] rounded-xl max-w-56 overflow-hidden cursor-pointer group bg-white shadow-sm hover:shadow-md transition-all duration-300'
                            >

                                {/* Professor Image */}

                                <img
                                    className='bg-[#EAEFFF] group-hover:bg-primary transition-all duration-500 w-full h-56 object-cover'
                                    src={item.image}
                                    alt={item.name}
                                />



                                {/* Professor Details */}

                                <div className='p-4'>

                                    <p className='text-[#262626] text-lg font-medium'>

                                        {item.name}

                                    </p>

                                    <p className='text-[#5C5C5C] text-sm'>

                                        {item.speciality}

                                    </p>



                                    {/* Availability */}

                                    <div className='mt-3 flex items-center gap-2 text-sm'>

                                        <input
                                            onChange={() =>
                                                changeAvailability(
                                                    item._id
                                                )
                                            }
                                            type="checkbox"
                                            checked={item.available}
                                        />

                                        <p className='text-gray-600'>

                                            Available

                                        </p>

                                    </div>

                                </div>

                            </div>
                        ))

                    ) : (

                        <p className='text-gray-500'>

                            No Professors Found

                        </p>
                    )
                }

            </div>

        </div>
    );
};

export default ProfessorsList;