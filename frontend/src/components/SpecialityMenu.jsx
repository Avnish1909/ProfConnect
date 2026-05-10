import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {

    return (

        <div
            id='speciality'
            className='flex flex-col items-center gap-4 py-16 text-[#262626]'
        >

            <h1 className='text-3xl font-medium'>
                Find by Department
            </h1>

            <p className='sm:w-1/3 text-center text-sm'>
                Simply browse through our extensive list of experienced professors,
                schedule your appointment hassle-free.
            </p>

            <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-x-auto'>

                {
                    specialityData.map((item, index) => (

                        <Link
                            key={index}
                            to={`/professors/${item.speciality}`}
                            onClick={() => scrollTo(0, 0)}
                            className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500'
                        >

                            <img
                                className='w-16 sm:w-24 mb-2'
                                src={item.image}
                                alt={item.speciality}
                            />

                            <p className='text-center'>
                                {item.speciality}
                            </p>

                        </Link>
                    ))
                }

            </div>

        </div>
    )
}

export default SpecialityMenu