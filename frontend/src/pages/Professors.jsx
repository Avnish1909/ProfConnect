import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'

const Professors = () => {

  const { speciality } = useParams()

  const [filteredProfessors, setFilteredProfessors] = useState([])

  const [showFilter, setShowFilter] = useState(false)

  const navigate = useNavigate()

  const { professors } = useContext(AppContext)

  // Apply Filter
  const applyFilter = () => {

    if (speciality) {

      setFilteredProfessors(
        professors.filter(
          (professor) => professor.speciality === speciality
        )
      )

    } else {

      setFilteredProfessors(professors)

    }

  }

  useEffect(() => {

    applyFilter()

  }, [professors, speciality])

  return (

    <div>

      <p className='text-gray-600'>
        Browse through the professors by department.
      </p>

      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>

        {/* Mobile Filter Button */}

        <button
          onClick={() => setShowFilter(!showFilter)}
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
            showFilter ? 'bg-primary text-white' : ''
          }`}
        >
          Filters
        </button>

        {/* Filter Sidebar */}

        <div
          className={`flex-col gap-4 text-sm text-gray-600 ${
            showFilter ? 'flex' : 'hidden sm:flex'
          }`}
        >

          {[
            'Computer Science',
            'Electronics',
            'Mechanical',
            'Civil',
            'Electrical',
            'PIE'
          ].map((item, index) => (

            <p
              key={index}
              onClick={() =>
                speciality === item
                  ? navigate('/professors')
                  : navigate(`/professors/${item}`)
              }
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                speciality === item
                  ? 'bg-[#E2E5FF] text-black'
                  : ''
              }`}
            >
              {item}
            </p>

          ))}

        </div>

        {/* Professors Grid */}

        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>

          {filteredProfessors.map((item, index) => (

            <div
              key={item._id || index}
              onClick={() => {

                navigate(`/appointment/${item._id}`)

                scrollTo(0, 0)

              }}
              className='border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
            >

              <img
                className='bg-[#EAEFFF] w-full h-52 object-cover'
                src={item.image}
                alt={item.name}
              />

              <div className='p-4'>

                <div
                  className={`flex items-center gap-2 text-sm ${
                    item.available
                      ? 'text-green-500'
                      : 'text-gray-500'
                  }`}
                >

                  <p
                    className={`w-2 h-2 rounded-full ${
                      item.available
                        ? 'bg-green-500'
                        : 'bg-gray-500'
                    }`}
                  ></p>

                  <p>
                    {item.available
                      ? 'Available'
                      : 'Not Available'}
                  </p>

                </div>

                <p className='text-[#262626] text-lg font-medium'>
                  {item.name}
                </p>

                <p className='text-[#5C5C5C] text-sm'>
                  {item.speciality}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  )
}

export default Professors